import React, { useState, useEffect, useContext, useRef } from 'react'
import TasksList from './TasksList'
import TasksNavLeft from './TasksNavLeft'
import TasksNavMobile from './TasksNavMobile'
import { UserContext } from '../Contexts/UserContext'
import { apiCall } from '../Util/api'
import CreateTaskInput from './CreateTaskInput'
import {
    Flex,
    Button,
    VStack,
    Tooltip,
    IconButton,
    Box,
    MenuButton,
    MenuList,
    MenuItem,
    Menu,
} from '@chakra-ui/react'
import useLocalStorage from '../Hooks/UseLocalStorage'
import AllTasksList from './AllTasksList'
import io from 'socket.io-client'
import SearchTasksList from './SearchTasksList'
import SearchInput from '../Navbar/SearchInput'
import { useParams, useNavigate } from 'react-router-dom'
import PaymentStatus from '../Stripe/PaymentStatus'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { TasksContext } from '../Contexts/TasksContext'
import { LabelsContext } from '../Contexts/LabelsContext'
import {
    LeftArrowIcon,
    RightArrowIcon,
    DotsHorizontalIcon,
} from '../ChakraDesign/Icons'
import TasksLayout from '../Layouts/TasksLayout'
import UpcomingTasksList from './UpcomingTasksList'
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

export default function TasksContainer(props) {
    const { user, setUser } = useContext(UserContext)

    let urlParams = useParams()
    const navigate = useNavigate()
    const [urgency, setUrgency] = useState(1)
    const [inbox, setInbox] = useState([])
    const [vanityLink, setVanityLink] = useState('')
    const [isZenMode, setIsZenMode] = useLocalStorage('zenMode', false)
    const [showRemainingLabels, setShowRemainingLabels] = useState(false)
    const [isSearching, setIsSearching] = useState(false)
    const [isLoading, setIsLoading] = useState(null)
    const [unreadInboxTask, setUnreadInboxTask] = useLocalStorage(
        'unreadInboxTask',
        false
    )
    const [isInitialLoadDone, setIsInitialLoadDone] = useState(false)
    const [isSetupGuideOpen, setIsSetupGuideOpen] = useState(false)
    const [newFeature, setNewFeature] = useState(user.newFeature)
    const [featureMessage, setFeatureMessage] = useState(user.newFeatureMessage)
    const [isTemplatesOpen, setIsTemplatesOpen] = useState(false)
    const {
        labels,
        getUsersLabels,
        selectedLabels,
        unselectedLabels,
        filteredLabels,
        setFilteredLabels,
        selectFilterLabel,
        unselectFilterLabel,
    } = useContext(LabelsContext)
    const {
        tasks,
        setTasks,
        tasksRef,
        numCompletedTasks,
        setNumCompletedTasks,
        isSearchActive,
    } = useContext(TasksContext)

    // ref so socket.io can access current state
    const urgencyRef = useRef(urgency)

    //grab all the users tasks on load
    useEffect(() => {
        Promise.all([getTasks()]).then((d) => {
            setIsInitialLoadDone(true)
        })
        getNumCompletedTasks()
        getUsersLabels()
    }, [])

    useEffect(() => {
        console.log(urgency)
    }, [urgency])

    const handleSelect = (label) => {
        selectFilterLabel(label)
    }

    const handleUnselect = (label) => {
        if (label.name !== 'All Labels') {
            unselectFilterLabel(label)
        } else {
            return
        }
    }

    //listen for tasks from integrations, notifications, and god mode refresh
    useEffect(() => {
        const socket = io.connect(process.env.REACT_APP_BACKEND_SERVER)

        // let backend know which user just connected
        socket.on('connect', () => {
            console.log('connected')
            socket.emit('connected', user._id)
        })

        socket.on('newTask', (data) => {
            if (data === user._id.toString()) {
                console.log('new task socket firing')
                getTasks()
                apiCall('GET', `/users/${user._id}`)
                    .then((data) => setUser(data))
                    .catch((err) => alert(err))
            }
        })

        socket.on('newLabels', (data) => {
            if (data === user._id.toString()) {
                console.log('new labels socket firing')
                getUsersLabels()
                // setTasks([])
                getTasks()
            }
        })

        socket.on('task notification', (data) => {
            if (data.userId === user._id.toString()) {
                console.log('task notification socket firing')
                apiCall(
                    'GET',
                    `/users/${data.userId}/tasks/taskId/${data.taskId}`
                )
                    .then((data) => {
                        alert(
                            `This is a friendly reminder to do "${data.description
                                .replace(/<[^>]*>?/gm, '')
                                .substr(0, 200)}"`
                        )
                    })
                    .catch((err) => {
                        alert(err)
                    })
            }
        })

        socket.on('checklist notification', (data) => {
            if (data.userId === user._id.toString()) {
                console.log('checklist notification socket firing')
                apiCall(`GET`, `/users/${data.userId}/checklist/${data.itemId}`)
                    .then((data) => {
                        alert(
                            `This is a friendly reminder to do checklist item "${data.name.substr(
                                0,
                                200
                            )}"`
                        )
                    })
                    .catch((err) => {
                        alert(err)
                    })
            }
        })

        socket.on('community notification', (data) => {
            if (data.userId === user._id.toString()) {
                alert(data.message)
            }
        })

        socket.on('notification sent', async (data) => {
            if (data.userId === user._id.toString()) {
                console.log('notification sent socket firing')
                const newTask = await apiCall(
                    'GET',
                    `/users/${user._id}/tasks/taskId/${data.taskId}`
                )

                let newTasks = [...tasksRef.current]
                newTasks = newTasks.map((task) => {
                    if (task._id === data.taskId) {
                        return newTask
                    } else {
                        return task
                    }
                })
                setTasks(newTasks)
            }
        })

        socket.on('refresh', () => {
            window.location.reload()
        })

        socket.on('newFeature', async () => {
            const newUser = await apiCall(`GET`, `/users/${user._id}`)

            setUser(newUser)
            setNewFeature(newUser.newFeature)
            setFeatureMessage(newUser.newFeatureMessage)
        })

        return () => {
            socket.close()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        urgencyRef.current = urgency
        if (urgency === 'inbox' && unreadInboxTask) {
            setUnreadInboxTask(false)
        }
    }, [urgency])

    const getTasks = async () => {
        console.log('running get tasks')
        setIsLoading(true)
        let tasks = await apiCall('get', `/users/${user._id}/tasks`)

        // make tasks array be in the proper order for dnd purposes
        tasks = tasks.sort((a, b) => a.position - b.position)
        tasks = tasks.sort((a, b) => a.urgency - b.urgency)

        setTasks(tasks)

        setIsLoading(false)
    }

    const getNumCompletedTasks = async () => {
        const num = await apiCall(
            'get',
            `/users/${user._id}/tasks/numCompleted`
        )

        setNumCompletedTasks(num)
    }

    const getSectionTotals = () => {
        const totals = [
            tasks.filter((t) => t.urgency === 0).length,
            tasks.filter((t) => t.urgency === 1).length,
            tasks.filter((t) => t.urgency === 2).length,
            tasks.filter((t) => t.urgency === 3).length,
            numCompletedTasks,
            inbox.length,
        ]

        return totals
    }

    const MoreLabelsMenu = React.forwardRef(({ children, ...rest }, ref) => (
        <span ref={ref} {...rest}>
            <Button
                mb="8px"
                variant={'chip-grey'}
                onClick={() => setShowRemainingLabels(true)}
            >
                <DotsHorizontalIcon />
            </Button>
        </span>
    ))

    return (
        <TasksLayout
            isZenMode={isZenMode}
            setIsZenMode={setIsZenMode}
            setIsTemplatesOpen={setIsTemplatesOpen}
            setIsSetupGuideOpen={setIsSetupGuideOpen}
            searchInput={<SearchInput setIsSearching={setIsSearching} />}
            mobileMenu={
                <TasksNavMobile
                    urgency={urgency}
                    setUrgency={setUrgency}
                    sectionTotals={getSectionTotals}
                    unreadInboxTask={unreadInboxTask}
                    numberOfDueDateTasks={tasks.filter((t) => t.due).length}
                />
            }
            left={
                <VStack width="100%" filter={isSearchActive && 'blur(3px)'}>
                    <TasksNavLeft
                        urgency={urgency}
                        setUrgency={setUrgency}
                        sectionTotals={getSectionTotals}
                        unreadInboxTask={unreadInboxTask}
                        isZenMode={isZenMode}
                        numberOfDueDateTasks={tasks.filter((t) => t.due).length}
                    />
                    <Tooltip
                        label={`${isZenMode ? 'Expand' : 'Collapse'} left side`}
                    >
                        <IconButton
                            color="grey.500"
                            backgroundColor="white"
                            icon={
                                isZenMode ? (
                                    <RightArrowIcon />
                                ) : (
                                    <LeftArrowIcon />
                                )
                            }
                            onClick={() => setIsZenMode(!isZenMode)}
                            alignSelf={!isZenMode && 'flex-start'}
                            display={{ base: 'none', lg: 'block' }}
                            style={{
                                width: '54px',
                                height: 54,
                            }}
                        />
                    </Tooltip>
                </VStack>
            }
            main={
                <>
                    {urgency !== 4 && !isSearchActive && (
                        <Flex
                            width="100%"
                            alignItems="center"
                            paddingLeft="16px"
                            marginTop="11px"
                            justifyContent={
                                urgency !== 'all tasks'
                                    ? 'space-between'
                                    : 'flex-end'
                            }
                            flexDirection={{ base: 'column', sm: 'row' }}
                        >
                            <Box mt="4px" width="100%">
                                <Flex
                                    ml="-20px"
                                    mb="20px"
                                    display={{
                                        base: 'none',
                                        md: 'flex',
                                    }}
                                >
                                    <Button
                                        mb="8px"
                                        variant={
                                            selectedLabels[0]?.name ===
                                            'All Labels'
                                                ? 'chip-colored'
                                                : 'chip-grey'
                                        }
                                        onClick={() =>
                                            handleSelect({
                                                name: 'All Labels',
                                            })
                                        }
                                        background={
                                            selectedLabels[0]?.name ===
                                            'All Labels'
                                                ? 'purple.500'
                                                : 'gray.100'
                                        }
                                        minWidth="104px"
                                    >
                                        {selectedLabels[0]?.name !==
                                            `All Labels` && (
                                            <Box
                                                h="12px"
                                                w="12px"
                                                borderRadius="6px"
                                                bg={'purple.500'}
                                                mr="4px"
                                                ml="-4px"
                                            ></Box>
                                        )}
                                        All Labels
                                    </Button>
                                    <Flex
                                        display={{
                                            base: 'none',
                                            md: 'flex',
                                        }}
                                        width="100%"
                                    >
                                        {selectedLabels.map(
                                            (label) =>
                                                label.name !== 'All Labels' && (
                                                    <Button
                                                        mb="8px"
                                                        variant="chip-colored"
                                                        background={
                                                            label.color === ''
                                                                ? 'purple.500'
                                                                : label.color
                                                        }
                                                        onClick={() =>
                                                            handleUnselect(
                                                                label
                                                            )
                                                        }
                                                    >
                                                        {label.name}
                                                    </Button>
                                                )
                                        )}
                                        {selectedLabels[0]?.name ===
                                            'All Labels' &&
                                            unselectedLabels.map(
                                                (label, i) =>
                                                    label.name !==
                                                        'All Labels' &&
                                                    i < 5 && (
                                                        <Button
                                                            mb="8px"
                                                            variant="chip-grey"
                                                            onClick={() =>
                                                                handleSelect(
                                                                    label
                                                                )
                                                            }
                                                        >
                                                            <Box
                                                                h="12px"
                                                                w="12px"
                                                                borderRadius="6px"
                                                                bg={
                                                                    label.color ===
                                                                    ''
                                                                        ? 'purple.500'
                                                                        : label.color
                                                                }
                                                                mr="4px"
                                                                ml="-4px"
                                                            ></Box>
                                                            {label.name}
                                                        </Button>
                                                    )
                                            )}
                                        {labels.length > 5 &&
                                            unselectedLabels[0]?.name !==
                                                'All Labels' && (
                                                <Menu isLazy matchWidth>
                                                    {({ onClose }) => (
                                                        <>
                                                            <MenuButton
                                                                as={
                                                                    MoreLabelsMenu
                                                                }
                                                            ></MenuButton>
                                                            <MenuList
                                                                flexDirection="column"
                                                                minW="0"
                                                                width="fit-content"
                                                            >
                                                                <Flex flexDir="column">
                                                                    {unselectedLabels.map(
                                                                        (
                                                                            label,
                                                                            i
                                                                        ) =>
                                                                            i >
                                                                                4 && (
                                                                                <Button
                                                                                    mb="8px"
                                                                                    variant={
                                                                                        'chip-grey'
                                                                                    }
                                                                                    width="fit-content"
                                                                                    onClick={() => {
                                                                                        handleSelect(
                                                                                            label
                                                                                        )
                                                                                        onClose()
                                                                                    }}
                                                                                >
                                                                                    <Box
                                                                                        h="12px"
                                                                                        w="12px"
                                                                                        borderRadius="6px"
                                                                                        bg={
                                                                                            label.color ===
                                                                                            ''
                                                                                                ? 'purple.500'
                                                                                                : label.color
                                                                                        }
                                                                                        mr="4px"
                                                                                        ml="-4px"
                                                                                    ></Box>
                                                                                    {
                                                                                        label.name
                                                                                    }
                                                                                </Button>
                                                                            )
                                                                    )}
                                                                </Flex>
                                                            </MenuList>
                                                        </>
                                                    )}
                                                </Menu>
                                            )}
                                    </Flex>
                                </Flex>
                                {urgency !== 'Upcoming' && (
                                    <CreateTaskInput
                                        urgency={urgency}
                                        setIsTemplatesOpen={setIsTemplatesOpen}
                                    />
                                )}
                            </Box>
                        </Flex>
                    )}
                    {props.paymentStatus && (
                        <StripeWrapper user={user}>
                            <PaymentStatus />
                        </StripeWrapper>
                    )}
                    {urgency < 4 && !isSearchActive && isInitialLoadDone && (
                        <TasksList urgency={urgency} />
                    )}
                    {urgency === 'all tasks' && !isSearchActive && (
                        <AllTasksList urgency={urgency} />
                    )}
                    {urgency === 'Upcoming' && <UpcomingTasksList />}
                    {isSearchActive && (
                        <SearchTasksList
                            urgency={urgency}
                            isSearching={isSearching}
                        />
                    )}
                </>
            }
        />
    )
}

const StripeWrapper = (props) => {
    const [stripeIntentSecret, setStripeIntentSecret] = useState(null)

    useEffect(() => {
        if (
            !props.user?.stripeProductId ||
            (props.user.stripeProductId && props.user.isFromTeamAddition)
        ) {
            getIntent()
        }
    }, [])

    const getIntent = async () => {
        try {
            const data = await apiCall('POST', `/stripe/intent`, {
                stripeCustomerId: props.user?.stripeCustomerId,
            })

            setStripeIntentSecret(data.secret)
        } catch (error) {
            alert(error)
        }
    }

    return stripeIntentSecret !== null ? (
        <Elements
            stripe={stripePromise}
            options={{
                clientSecret: stripeIntentSecret,
            }}
        >
            {props.children}
        </Elements>
    ) : (
        props.children
    )
}

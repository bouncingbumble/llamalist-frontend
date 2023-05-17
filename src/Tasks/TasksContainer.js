import React, { useState, useEffect, useContext, useRef } from 'react'
import TasksList from './TasksList'
import TasksNavLeft from './TasksNavLeft'
import { UserContext } from '../Contexts/UserContext'
import { apiCall } from '../Util/api'
import {
    Flex,
    Button,
    VStack,
    Text,
    Container,
    Grid,
    GridItem,
    Avatar,
    Checkbox,
    Input,
    Box,
    SlideFade,
    Collapse,
    ScaleFade,
    FormControl,
} from '@chakra-ui/react'
import NewTaskCard from './NewTaskCard'
import useLocalStorage from '../Hooks/UseLocalStorage'
import io from 'socket.io-client'
import SearchTasksList from './SearchTasksList'
import SearchInput from '../Navbar/SearchInput'
import { useParams, useNavigate } from 'react-router-dom'
import PaymentStatus from '../Stripe/PaymentStatus'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { TasksContext } from '../Contexts/TasksContext'
import { LabelsContext } from '../Contexts/LabelsContext'
import LabelsFilter from './LabelsFilter'
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

export default function TasksContainer(props) {
    const { user, setUser } = useContext(UserContext)
    const { section } = useParams()
    const navigate = useNavigate()

    const [isSearching, setIsSearching] = useState(false)
    const [isLoading, setIsLoading] = useState(null)
    const [isInitialLoadDone, setIsInitialLoadDone] = useState(false)

    const { getUsersLabels } = useContext(LabelsContext)
    const {
        tasks,
        setTasks,
        tasksRef,
        numCompletedTasks,
        setNumCompletedTasks,
        isSearchActive,
        isInQuickCreateMode,
        setIsInQuickCreateMode,
    } = useContext(TasksContext)

    // ref so socket.io can access current state
    const sectionRef = useRef(section)

    //grab all the users tasks on load
    useEffect(() => {
        Promise.all([
            getTasks(),
            getNumCompletedTasks(),
            getUsersLabels(),
        ]).then((d) => {
            setIsInitialLoadDone(true)
        })
    }, [])

    const getTasks = async () => {
        setIsLoading(true)
        let tasks = await apiCall('get', `/users/${user._id}/tasks`)

        // make tasks array be in the proper order for dnd purposes
        tasks = tasks.sort((a, b) => a.position - b.position)

        setTasks([])

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
        const totals = []

        return totals
    }

    const handleCreateTask = () => {
        let newTasks = tasks.map((task, i) => ({ ...task, isNew: false }))

        setTasks([{ name: '', isNew: true }, ...newTasks])
    }

    return (
        <Container maxW="100%" p="0px" flexDir="row" display="flex">
            <VStack
                minWidth="272px"
                filter={isSearchActive && 'blur(3px)'}
                borderRightStyle="solid"
                borderRightWidth="1px"
                borderRightColor="whitesmoke"
                height="100vh"
                alignItems="start"
                pl="16px"
                justifyContent="space-between"
                pb="16px"
            >
                <VStack alignItems="flex-start">
                    <Button
                        justifyContent="center"
                        fontSize="22px"
                        height="48px"
                        width="48px"
                        borderRadius="50%"
                        _hover={{
                            bg: '#D2D5EE',
                        }}
                        ml="4px"
                        mt="8px"
                        mb="8px"
                        bg="#FFFFFF"
                    >
                        🦙
                    </Button>
                    <TasksNavLeft
                        sectionTotals={getSectionTotals}
                        numberOfDueDateTasks={tasks.filter((t) => t.due).length}
                        setSection={(section) => navigate(`/tasks/${section}`)}
                        section={section}
                    />
                    <Button
                        colorScheme="purple"
                        width="224px"
                        size="lg"
                        borderRadius="32px"
                        mt="16px !important"
                        onClick={handleCreateTask}
                    >
                        Create Task
                    </Button>
                </VStack>
                <Flex mt="100%" alignContent="center">
                    <Avatar
                        name="llama user"
                        bg="purple.500"
                        color="#FFFFFF"
                    ></Avatar>
                    <Flex flexDir="column" ml="16px" justifyContent="center">
                        <Text fontWeight="bold"> Llama User</Text>
                        <Text fontSize="xs" color="darkgray.500">
                            Level 16 ✨ Alpaca ✨
                        </Text>
                    </Flex>
                </Flex>
            </VStack>
            <Grid
                templateRows="repeat(1, 1fr)"
                templateColumns="repeat(12, 1fr)"
                width="100%"
                margin="8px 16px"
            >
                <GridItem colSpan={12}>
                    <Flex flexDir="column" width="100%">
                        {section !== 4 && !isSearchActive && (
                            <Flex
                                width="100%"
                                alignItems="center"
                                justifyContent={'space-between'}
                                flexDirection={{
                                    base: 'column',
                                    sm: 'row',
                                }}
                                paddingRight="24px"
                            >
                                <LabelsFilter />
                                <Button
                                    fontSize="22px"
                                    color={
                                        section === 'inbox'
                                            ? 'purple.500'
                                            : 'darkgray.500'
                                    }
                                    fontWeight={
                                        section === 'inbox' ? '600' : '400'
                                    }
                                    bg={
                                        section === 'inbox'
                                            ? '#EFF1FA'
                                            : '#FFFFFF'
                                    }
                                    onClick={() => navigate(`/tasks/inbox`)}
                                    alignItems="center"
                                    justifyContent="center"
                                    height="48px"
                                    width="48px"
                                    borderRadius="50%"
                                    _hover={{
                                        bg: '#D2D5EE',
                                    }}
                                >
                                    📥
                                </Button>
                            </Flex>
                        )}
                    </Flex>
                    <Flex flexDirection="column">
                        {props.paymentStatus && (
                            <StripeWrapper user={user}>
                                <PaymentStatus />
                            </StripeWrapper>
                        )}
                        {!isSearchActive && isInitialLoadDone && <TasksList />}
                        {isSearchActive && (
                            <SearchTasksList
                                section={section}
                                isSearching={isSearching}
                            />
                        )}
                    </Flex>
                </GridItem>
            </Grid>
        </Container>
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

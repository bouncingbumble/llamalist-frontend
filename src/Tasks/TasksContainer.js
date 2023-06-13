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
} from '@chakra-ui/react'
import { io } from 'socket.io-client'
import SearchTasksList from './SearchTasksList'
import { useParams, useNavigate } from 'react-router-dom'
import PaymentStatus from '../Stripe/PaymentStatus'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { TasksContext } from '../Contexts/TasksContext'
import { LabelsContext } from '../Contexts/LabelsContext'
import LabelsFilter from './LabelsFilter'
import { InboxIcon } from '../ChakraDesign/Icons'
import CreateNewTaskCard from './CreateNewTaskCard'
import Llama from '../animations/java-llama-react/Llama'
import { v4 as optoId } from 'uuid'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

export default function TasksContainer(props) {
    const { user, setUser } = useContext(UserContext)
    const { section } = useParams()
    const navigate = useNavigate()

    const [showCreateNewTaskCard, setShowCreateNewTaskCard] = useState(false)
    const [newTaskId, setNewTaskId] = useState(null)
    const [isSearching, setIsSearching] = useState(false)
    const [isLoading, setIsLoading] = useState(null)
    const [isInitialLoadDone, setIsInitialLoadDone] = useState(false)

    const { getUsersLabels } = useContext(LabelsContext)
    const {
        tasks,
        setTasks,
        createTask,
        numCompletedTasks,
        setNumCompletedTasks,
        isSearchActive,
    } = useContext(TasksContext)

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
        const totals = []

        return totals
    }

    const handleCreateTask = () => {
        let id = optoId()
        setNewTaskId(id)
        createTask({ name: '', id })
        setShowCreateNewTaskCard(true)
    }

    useEffect(() => {
        const socket = io(process.env.REACT_APP_BACKEND_SERVER)

        socket.on('connect', () => {
            socket.emit('newConnection', user._id)
        })
    }, [])

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
                bg="#F9FAFB"
            >
                <VStack alignItems="flex-start" mt="4px">
                    <Flex w="100%" alignItems="center">
                        <Text fontSize="40px" mr="8px" ml="8px">
                            🦙
                        </Text>
                        <Text
                            fontWeight="extrabold"
                            fontSize="xl"
                            color="purpleFaded.700"
                        >
                            llama list
                        </Text>
                    </Flex>
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
                <Llama />
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
                padding="8px 16px"
                paddingRight="0px"
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
                                paddingRight="16px"
                            >
                                <LabelsFilter />
                                <Button
                                    fontSize="22px"
                                    color={
                                        section === 'inbox'
                                            ? 'purple.500'
                                            : 'gray.900'
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
                                    <InboxIcon />
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
                        <Flex
                            width="100%"
                            marginLeft="-8px"
                            paddingLeft="8px"
                            paddingRight="8px"
                        >
                            {showCreateNewTaskCard && (
                                <CreateNewTaskCard
                                    id={newTaskId}
                                    setShowCreateNewTaskCard={
                                        setShowCreateNewTaskCard
                                    }
                                />
                            )}
                        </Flex>
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

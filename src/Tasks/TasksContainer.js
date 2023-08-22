import React, { useRef, useState, useEffect } from 'react'
import TasksList from './TasksList'
import TasksNavLeft from './TasksNavLeft'
import { apiCall } from '../Util/api'
import { Howler } from 'howler'
import {
    Flex,
    Button,
    VStack,
    Text,
    Container,
    Grid,
    GridItem,
    Tooltip,
    Box,
} from '@chakra-ui/react'
import { io } from 'socket.io-client'
import { useParams, useNavigate } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import LabelsFilter from './LabelsFilter'
import {
    StarIcon,
    StarIconFilled,
    FireIcon,
    GiftIcon,
    DollarIcon,
} from '../ChakraDesign/Icons'
import Llama from '../animations/java-llama-react/Llama'
import { useQueryClient } from '@tanstack/react-query'
import { useUser, useUserStats } from '../Hooks/UserHooks'
import { useCreateTask } from '../Hooks/TasksHooks'
import LlamaLand from '../animations/java-llama-game/LlamaLand'
import { useLabels } from '../Hooks/LabelsHooks'
import AchievementsModal from '../Achievements/AchievementsModal'
import GoalsModal from '../Achievements/GoalsModal'
import SpeechBubble from '../animations/java-llama-react/SpeechBubble'
import { socket } from '../socket'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

export default function TasksContainer() {
    const { section, selectedLabel } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const user = useUser()
    const createTask = useCreateTask()
    const labels = useLabels()
    const funFact = useRef('Hello')

    const [progress, setProgress] = useState([0, 5])
    const [llamaLandOpen, setLlamaLandOpen] = useState(false)
    const [showSpeechBubble, setShowSpeechBubble] = useState(false)
    const [isAchievementsModalOpen, setIsAchievementsModalOpen] =
        useState(false)

    const [shouldAnimateGoals, setShouldAnimateGoals] = useState([
        false,
        false,
        false,
    ])

    // await apiCall(`DELETE`, `/users/${user._id}/tasks/${taskId}`)

    // const completeTask = async (taskId) => {
    //     switch (user.completeSound) {
    //         case 'bell':
    //             await new Audio(bell).play()
    //             break

    //         case 'ding':
    //             await new Audio(ding).play()
    //             break

    //         case 'pop':
    //             await new Audio(pop).play()
    //             break

    //         case 'waterDrop':
    //             await new Audio(waterDrop).play()
    //             break

    //         default:
    //             break
    //     }

    //     try {
    //         //update task
    //         const updatedTask = await apiCall(
    //             'PUT',
    //             `/users/${user._id}/tasks/${taskId}`,
    //             {
    //                 isCompleted: true,
    //                 completionDate: Date.now(),
    //                 urgency: 4,
    //             }
    //         )

    //         toast({
    //             duration: 3000,
    //             render: () => (
    //                 <ToastyBoi
    //                     message={'success'}
    //                     icon={<CircleCheckIcon fill="white" />}
    //                     backgroundColor="purple.500"
    //                 ></ToastyBoi>
    //             ),
    //         })

    //         return true
    //     } catch (error) {
    //         alert(JSON.stringify(error))

    //         return error
    //     }
    // }

    const getFunFact = async () => {
        const fact = await apiCall(`GET`, `/funfact`)
        funFact.current = fact
    }

    useEffect(() => {
        getFunFact()

        function onConnect() {
            console.log('user connected')
        }

        function onDisconnect() {
            console.log('user disconnected')
        }

        function onNewFunFact(data) {
            console.log('new fun fact')
            funFact.current = data.data
        }

        function onGoalCompleted(data) {
            console.log('goal completed')
            console.log(data)
            setShouldAnimateGoals(() => data.data.isFirstTimeCompleted)
        }

        socket.on('connect', onConnect)
        socket.on('disconnect', onDisconnect)
        socket.on('new fun fact', onNewFunFact)
        socket.on('goal completed', onGoalCompleted)

        return () => {
            socket.off('connect', onConnect)
            socket.off('disconnect', onDisconnect)
            socket.off('new fun fact', onNewFunFact)
            socket.off('goal completed', onGoalCompleted)
        }
    }, [])

    useEffect(() => {
        if (!showSpeechBubble) {
            Howler.stop()
        }
    }, [showSpeechBubble])

    return (
        <Container maxW="100%" p="0px" flexDir="row" display="flex">
            <VStack
                minWidth="272px"
                height="100vh"
                alignItems="start"
                pl="16px"
                justifyContent="space-between"
                pb="16px"
                bg="#F9FAFB"
            >
                <VStack alignItems="flex-start" mt="10px">
                    <TasksNavLeft
                        numberOfDueDateTasks={
                            queryClient.data?.filter((t) => t.due).length
                        }
                    />
                    {section !== 'upcoming' && (
                        <Button
                            colorScheme="purple"
                            width="224px"
                            size="lg"
                            borderRadius="32px"
                            mt="16px !important"
                            onClick={() => {
                                let newLabels = []
                                if (selectedLabel !== 'All Labels') {
                                    newLabels.push(
                                        labels.data.filter(
                                            (l) => l.name === selectedLabel
                                        )[0]
                                    )
                                }
                                let when = null
                                if (section === 'today') {
                                    when = new Date()
                                }
                                createTask.mutate({
                                    name: '',
                                    isNewTask: true,
                                    labels: newLabels,
                                    when,
                                })
                            }}
                        >
                            Create Task
                        </Button>
                    )}
                </VStack>
                <Flex flexDirection="column">
                    <Flex w="100%" alignItems="center" mb="12px">
                        {showSpeechBubble && (
                            <SpeechBubble
                                funFact={funFact.current}
                                setShowSpeechBubble={setShowSpeechBubble}
                            />
                        )}
                        <Text
                            mr="20px"
                            ml="4px"
                            onClick={() => setLlamaLandOpen(true)}
                            onMouseOver={() => setShowSpeechBubble(true)}
                            onMouseLeave={() => setShowSpeechBubble(false)}
                        >
                            <Llama
                                sunnies
                                progress={progress}
                                setProgress={setProgress}
                                minHeight={136}
                            />
                        </Text>
                        <Text
                            fontWeight="extrabold"
                            fontSize="xl"
                            color="purpleSlideFaded.700"
                            alignSelf="flex-end"
                            mb="-12px"
                        >
                            llama list
                        </Text>
                    </Flex>
                    <GoalsModal shouldAnimateGoals={shouldAnimateGoals} />

                    <Flex
                        fontSize="20px"
                        justifyContent="space-between"
                        _hover={{ cursor: 'pointer' }}
                    >
                        <Tooltip label="Golden llamas found">
                            <Flex
                                onClick={() => setIsAchievementsModalOpen(true)}
                                alignItems="center"
                                fontWeight="500"
                            >
                                <GiftIcon mr="8px" color="yellow.500" /> 5
                            </Flex>
                        </Tooltip>
                        <Tooltip label="Baskets of apples acquired">
                            <Flex
                                onClick={() => setIsAchievementsModalOpen(true)}
                                alignItems="center"
                                fontWeight="500"
                            >
                                <DollarIcon mr="8px" color="green.500" /> 51
                            </Flex>
                        </Tooltip>

                        <Tooltip label="Daily Streak">
                            <Flex alignItems="center" fontWeight="500">
                                <FireIcon mr="8px" color="red.500" /> 4
                            </Flex>
                        </Tooltip>
                    </Flex>
                </Flex>
                {llamaLandOpen && (
                    <LlamaLand
                        isOpen={llamaLandOpen}
                        onClose={() => setLlamaLandOpen(false)}
                    />
                )}
            </VStack>
            <Grid
                templateRows="repeat(1, 1fr)"
                templateColumns="repeat(12, 1fr)"
                width="100%"
                padding="8px 16px"
                paddingRight="0px"
            >
                <GridItem colSpan={12}>
                    <Flex flexDir="column" width="100%" mb="8px" mt="12px">
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
                            {/* <Tooltip gutter={0} label="Go to inbox">
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
                                    onClick={() =>
                                        navigate(`/tasks/inbox/All Labels`)
                                    }
                                    alignItems="center"
                                    justifyContent="center"
                                    height="48px"
                                    width="48px"
                                    borderRadius="50%"
                                    _hover={{ color: 'purple.500' }}
                                >
                                    <InboxIcon />
                                </Button>
                            </Tooltip> */}
                        </Flex>
                    </Flex>
                    <Flex flexDirection="column" mt="8px">
                        <TasksList />
                    </Flex>
                </GridItem>
            </Grid>
            {isAchievementsModalOpen && (
                <AchievementsModal
                    isAchievementsModalOpen={isAchievementsModalOpen}
                    setIsAchievementsModalOpen={setIsAchievementsModalOpen}
                />
            )}
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

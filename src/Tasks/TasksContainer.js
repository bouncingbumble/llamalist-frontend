import React, { useState, useEffect } from 'react'
import Llama from '../animations/java-llama-react/Llama'
import scribble from '../sounds/scribble.mp3'
import gameMusic from '../sounds/llama-land-music.mp3'
import TasksList from './TasksList'
import LlamaLand from '../animations/java-llama-game/LlamaLand'
import Goals from '../Achievements/Goals'
import LabelsFilter from './LabelsFilter'
import SpeechBubble from '../animations/java-llama-react/SpeechBubble'
import TasksNavLeft from './TasksNavLeft'
import AchievementsModal from '../Achievements/AchievementsModal'
import { useAuth } from '@clerk/clerk-react'
import { Howl } from 'howler'
import { socket } from '../socket'
import { apiCall, setTokenHeader } from '../Util/api'
import { Elements } from '@stripe/react-stripe-js'
import { useParams } from 'react-router-dom'
import { useLabels } from '../Hooks/LabelsHooks'
import { loadStripe } from '@stripe/stripe-js'
import { useCreateTask } from '../Hooks/TasksHooks'
import { useQueryClient } from '@tanstack/react-query'
import { FireIcon, GiftIcon, DollarIcon } from '../ChakraDesign/Icons'
import {
    Flex,
    Button,
    VStack,
    Text,
    Container,
    Grid,
    GridItem,
    Tooltip,
} from '@chakra-ui/react'
import { useUserStats } from '../Hooks/UserHooks'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

export default function TasksContainer() {
    // hooks
    const labels = useLabels()
    const createTask = useCreateTask()
    const userStats = useUserStats()
    const queryClient = useQueryClient()
    const { section, selectedLabel } = useParams()

    // state
    const [funFact, setFunFact] = useState('')
    const [progress, setProgress] = useState([0, 10])
    const [scribbleSound, setScribbleSound] = useState({})
    const [llamaLandOpen, setLlamaLandOpen] = useState(false)
    const [llamaLandMusic, setLlamaLandMusic] = useState({})
    const [showSpeechBubble, setShowSpeechBubble] = useState(false)
    const [isAchievementsModalOpen, setIsAchievementsModalOpen] =
        useState(false)
    const [shouldAnimateGoals, setShouldAnimateGoals] = useState([
        false,
        false,
        false,
    ])
    const [shouldAnimateLevel, setShouldAnimateLevel] = useState(false)

    const getFunFact = async () => {
        try {
            const fact = await apiCall(`GET`, `/funfact`)
            setFunFact(fact)

            const scribbleEffect = new Howl({
                src: [scribble],
                sprite: { scribble: [0, fact.duration] },
            })
            setScribbleSound({ audio: scribbleEffect, id: null })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFunFact()

        const llamaMusic = new Howl({
            src: [gameMusic],
            loop: true,
        })
        setLlamaLandMusic({ audio: llamaMusic, id: null })

        function onConnect() {
            console.log('user connected')
        }

        function onDisconnect() {
            console.log('user disconnected')
        }

        function onNewFunFact(data) {
            console.log('new fun fact')
            setFunFact(data)

            const scribbleEffect = new Howl({
                src: [scribble],
                sprite: { scribble: [0, data.duration] },
            })
            setScribbleSound({ audio: scribbleEffect, id: null })
        }

        function onGoalCompleted(data) {
            console.log('goal completed')

            setShouldAnimateGoals(() => data.data.isFirstTimeCompleted)
            setShouldAnimateLevel(() => data.data.didCompleteLevel)
            if (data.data.didCompleteLevel) {
                setProgress([5, 10])
                setTimeout(() => {
                    setProgress([0, 10])
                }, 3000)
            }
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
        if (showSpeechBubble) {
            const audioId = scribbleSound.audio.play('scribble')
            scribbleSound.id = audioId
            setScribbleSound(scribbleSound)
        } else {
            if (scribbleSound.id) {
                scribbleSound.audio.stop(scribbleSound.id)
            }
        }
    }, [showSpeechBubble])

    useEffect(() => {
        if (llamaLandOpen) {
            setShowSpeechBubble(false)

            const audioId = llamaLandMusic.audio.play()
            llamaLandMusic.id = audioId
            setLlamaLandMusic(llamaLandMusic)
        } else {
            if (llamaLandMusic.id) {
                llamaLandMusic.audio.stop(llamaLandMusic.id)
            }
        }
    }, [llamaLandOpen])

    const handleCloseLlamaLand = () => {
        setLlamaLandOpen(false)
        apiCall('post', `/gamification`, { didVisitLlamaLand: true })
    }

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
                                funFact={funFact}
                                setShowSpeechBubble={setShowSpeechBubble}
                            />
                        )}
                        <Text
                            ml="4px"
                            mr="20px"
                            cursor="pointer"
                            onClick={() => setLlamaLandOpen(true)}
                            onMouseOver={() => setShowSpeechBubble(true)}
                            onMouseLeave={() => setShowSpeechBubble(false)}
                        >
                            <Llama
                                sunnies
                                progress={progress}
                                setProgress={setProgress}
                                minHeight={136}
                                maxHeight={400}
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
                    {!userStats.isLoading && (
                        <Goals
                            shouldAnimateGoals={shouldAnimateGoals}
                            setShouldAnmiateGoals={setShouldAnimateGoals}
                            shouldAnimateLevel={shouldAnimateLevel}
                            setShouldAnimateLevel={setShouldAnimateLevel}
                            initialLevel={userStats.data.level}
                        />
                    )}

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
                        music={llamaLandMusic}
                        isOpen={llamaLandOpen}
                        onClose={handleCloseLlamaLand}
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

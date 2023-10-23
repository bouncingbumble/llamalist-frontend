import React, { useState, useEffect } from 'react'
import scribble from '../sounds/scribble.mp3'
import streakSoundEffect from '../sounds/streakSound.mp3'
import TasksList from './TasksList'
import LabelsFilter from './LabelsFilter'
import TasksNavLeft from './TasksNavLeft'
import GoldenLlama from '../animations/goldenLlama/GoldenLlama'
import LoadingLlama from '../SharedComponents/LoadingLlama'
import GoldenLlamaFound from '../animations/goldenLlama/GoldenLlamaFound'
import { Howl } from 'howler'
import { socket } from '../socket'
import { apiCall } from '../Util/api'
import { useLabels } from '../Hooks/LabelsHooks'
import { useParams } from 'react-router-dom'
import {
    useCompletedTasksNum,
    useCreateTask,
    useTasks,
} from '../Hooks/TasksHooks'
import GamificationTab from '../GamificationTab/GamificationTab'
import {
    Flex,
    Button,
    VStack,
    Text,
    Container,
    Grid,
    GridItem,
} from '@chakra-ui/react'
import {
    useUpdateUserSettings,
    useUserSettings,
    useUserStats,
} from '../Hooks/UserHooks'
import { v4 as uuidv4 } from 'uuid'
import Frenzyfields from '../animations/fields/frenzyfields'
import CompletedTasksCount from './CompletedTasksCount'
import { useUser } from '@clerk/clerk-react'
import WelcomePopup from './WelcomePopup'

export default function TasksContainer() {
    // hooks
    const labels = useLabels()
    const userStats = useUserStats()
    const userSettings = useUserSettings()
    const updateUserSettings = useUpdateUserSettings()
    const tasks = useTasks()
    const numCompletedTasks = useCompletedTasksNum()
    const createTask = useCreateTask()
    const { section, selectedLabel } = useParams()
    const { user } = useUser()
    // state
    const [funFact, setFunFact] = useState('')
    const [progress, setProgress] = useState([0, 10])
    const [goldenLlama, setGoldenLlama] = useState({})
    const [scribbleSound, setScribbleSound] = useState({})
    const [showSpeechBubble, setShowSpeechBubble] = useState(false)
    const [shouldAnimateLevel, setShouldAnimateLevel] = useState(false)
    const [shouldAnimateStreak, setShouldAnimateStreak] = useState(false)
    const [shouldAnimateGoals, setShouldAnimateGoals] = useState([
        false,
        false,
        false,
    ])

    const streakSound = new Howl({ src: [streakSoundEffect] })

    useEffect(() => {
        if (user) {
            if (process.env.REACT_APP_ENVIRONMENT === 'production') {
                if (window.LogRocket) {
                    window.LogRocket.identify(user.id, {
                        name: user.fullName,
                        email: user.primaryEmailAddress.emailAddress,
                    })
                }
            }
        }
    }, [])

    useEffect(() => {
        if (!userSettings.isLoading) {
            if (userSettings.data.stripeCustomerId === '') {
                updateUserSettings.mutate({
                    ...userSettings.data,
                    email: user.primaryEmailAddress.emailAddress,
                    name: user.fullName,
                    createStripeCustomer: true,
                })
            }
        }
    }, [userSettings.isLoading])

    const getLlamaInfo = async () => {
        try {
            // grab llama object
            const llama = await apiCall(`GET`, `/llama`)

            // filter out necessary info for speech bubble
            const fact = {
                speed: llama.funFactSpeed,
                sequence: llama.funFactSequence,
            }

            // init scribble sound and length
            const scribbleEffect = new Howl({
                src: [scribble],
                sprite: { scribble: [0, llama.funFactDuration] },
            })

            let llamaFound = false
            const lastLlamaFound =
                userStats.data?.goldenLlamasFound[
                    userStats.data.goldenLlamasFound.length - 1
                ]
            const lastLlamaUpdate = llama.lastGoldenLlamaUpdate

            if (
                lastLlamaFound &&
                lastLlamaUpdate &&
                new Date(lastLlamaFound) >= new Date(lastLlamaUpdate)
            ) {
                llamaFound = true
            }

            // set fun fact and golden llama state
            setFunFact(fact)
            setScribbleSound({ audio: scribbleEffect, id: null })
            setGoldenLlama({
                found: llamaFound,
                index: llama.goldenLlamaIndex,
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (userStats.status === 'success') {
            getLlamaInfo()
        }
    }, [userStats.status])

    useEffect(() => {
        function onConnect() {
            console.log('user connected')
        }

        function onDisconnect() {
            console.log('user disconnected')
        }

        function onNewFunFact(newFact) {
            console.log('new fun fact')
            setFunFact(newFact)

            const scribbleEffect = new Howl({
                src: [scribble],
                sprite: { scribble: [0, newFact.duration] },
            })
            setScribbleSound({ audio: scribbleEffect, id: null })
        }

        function onNewGoldenLlama(newIndex) {
            setGoldenLlama({ found: false, index: newIndex })
        }

        function onGoalCompleted(data) {
            if (data.data.userId === user.id) {
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
        }
        function onStreakIncremented(data) {
            if (data.data.userId === user.id) {
                userStats.refetch()
                console.log('streak incremented')
                setShouldAnimateStreak(false)
                setTimeout(() => {
                    setShouldAnimateStreak(true)
                    userStats.refetch()
                    streakSound.play()
                    setTimeout(() => {
                        setShouldAnimateStreak(false)
                    }, 3000)
                }, 1000)
            }
        }

        function onApplesAqcuired(data) {
            if (data.data.userId === user.id) {
                console.log('apples acquired')
                userStats.refetch()
                numCompletedTasks.refetch()
            }
        }

        function newTask(data) {
            if (data.data.userId === user.id) {
                tasks.refetch()
            }
        }

        socket.on('connect', onConnect)
        socket.on('disconnect', onDisconnect)
        socket.on('new fun fact', onNewFunFact)
        socket.on('goal completed', onGoalCompleted)
        socket.on('apples acquired', onApplesAqcuired)
        socket.on('new llama location', onNewGoldenLlama)
        socket.on('streak incremented', onStreakIncremented)
        socket.on('new task', newTask)

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

    return (
        <Container maxW="100%" p="0px" flexDir="row" display="flex">
            {labels.isSuccess &&
            userStats.isSuccess &&
            tasks.isSuccess &&
            numCompletedTasks.isSuccess &&
            (tasks.data.length === 0 || !tasks.data[0].completedDate) ? (
                <>
                    <Flex
                        minWidth="300px"
                        direction="column"
                        height="100vh"
                        alignItems="start"
                        pl="20px"
                        pr="20px"
                        justifyContent="space-between"
                    >
                        <VStack
                            alignItems="flex-start"
                            mt="8px"
                            width="100%"
                            zIndex={1}
                        >
                            <Flex
                                w="100%"
                                justifyContent="space-between"
                                alignItems="center"
                                pl="8px"
                                pr="8px"
                                mb="8px"
                            >
                                <Text fontSize="2xl" fontWeight="extrabold">
                                    llama list
                                </Text>
                                <Flex
                                    fontSize="22px"
                                    fontWeight="extrabold"
                                    justifyContent="center"
                                    alignItems="end"
                                    paddingRight="8px"
                                    paddingTop="8px"
                                >
                                    {!numCompletedTasks.isLoading && (
                                        <CompletedTasksCount
                                            numCompletedTasks={
                                                numCompletedTasks.data
                                            }
                                        />
                                    )}
                                </Flex>
                            </Flex>

                            <TasksNavLeft />
                            {section !== 'upcoming' && (
                                <Button
                                    colorScheme="purple"
                                    width="100%"
                                    size="xl"
                                    borderRadius="32px"
                                    mt="16px !important"
                                    onClick={() => {
                                        let newLabels = []
                                        if (selectedLabel !== 'All Labels') {
                                            newLabels.push(
                                                labels.data.filter(
                                                    (l) =>
                                                        l.name === selectedLabel
                                                )[0]
                                            )
                                        }
                                        let when = null
                                        let isInbox = false
                                        if (section === 'today') {
                                            when = new Date()
                                        }
                                        if (section === 'inbox') {
                                            isInbox = true
                                        }
                                        createTask.mutate({
                                            name: '',
                                            isNewTask: true,
                                            key: uuidv4(),
                                            labels: newLabels,
                                            when: when,
                                            isInbox,
                                        })
                                    }}
                                >
                                    Create Task
                                </Button>
                            )}
                            {!goldenLlama.found && goldenLlama.index === 0 && (
                                <Flex width="100%" justify="center" pr="32px">
                                    <GoldenLlama
                                        hidden
                                        goldenLlama={goldenLlama}
                                        setGoldenLlama={setGoldenLlama}
                                    />
                                </Flex>
                            )}
                        </VStack>
                        <Frenzyfields
                            userStats={userStats}
                            funFact={funFact}
                            scribbleSound={scribbleSound}
                            showSpeechBubble={showSpeechBubble}
                            setShowSpeechBubble={setShowSpeechBubble}
                            progress={progress}
                            setProgress={setProgress}
                            goldenLlama={goldenLlama}
                            setGoldenLlama={setGoldenLlama}
                        />
                    </Flex>
                    <Grid
                        templateRows="repeat(1, 1fr)"
                        templateColumns="repeat(12, 1fr)"
                        width="100%"
                        padding="8px 16px"
                        paddingRight="0px"
                    >
                        <GridItem colSpan={12}>
                            <Flex
                                flexDir="column"
                                width="100%"
                                mb="8px"
                                mt="12px"
                            >
                                <Flex
                                    width="100%"
                                    alignItems="flex-start"
                                    justifyContent={'space-between'}
                                    flexDirection={{
                                        base: 'column',
                                        sm: 'row',
                                    }}
                                    paddingRight="16px"
                                >
                                    <LabelsFilter
                                        goldenLlama={goldenLlama}
                                        setGoldenLlama={setGoldenLlama}
                                    />
                                    {userStats.data && (
                                        <GamificationTab
                                            userStats={userStats}
                                            goldenLlama={goldenLlama}
                                            setGoldenLlama={setGoldenLlama}
                                            shouldAnimateGoals={
                                                shouldAnimateGoals
                                            }
                                            setShouldAnimateGoals={
                                                setShouldAnimateGoals
                                            }
                                            setShouldAnimateLevel={
                                                setShouldAnimateLevel
                                            }
                                            shouldAnimateLevel={
                                                shouldAnimateLevel
                                            }
                                            shouldAnimateStreak={
                                                shouldAnimateStreak
                                            }
                                        />
                                    )}
                                </Flex>
                            </Flex>
                            <Flex
                                flexDirection="column"
                                mt="22px"
                                pl="20px"
                                pr="20px"
                            >
                                <TasksList
                                    goldenLlama={goldenLlama}
                                    setGoldenLlama={setGoldenLlama}
                                />
                            </Flex>
                        </GridItem>
                    </Grid>
                    <GoldenLlamaFound />
                </>
            ) : (
                <Flex width="100%" height="100vh">
                    <LoadingLlama />
                </Flex>
            )}
            {!userSettings.isLoading && userSettings.data.llamaName === '' && (
                <WelcomePopup />
            )}
        </Container>
    )
}

// const StripeWrapper = (props) => {
//     const [stripeIntentSecret, setStripeIntentSecret] = useState(null)

//     useEffect(() => {
//         if (
//             !props.user?.stripeProductId ||
//             (props.user.stripeProductId && props.user.isFromTeamAddition)
//         ) {
//             getIntent()
//         }
//     }, [])

//     const getIntent = async () => {
//         try {
//             const data = await apiCall('POST', `/stripe/intent`, {
//                 stripeCustomerId: props.user?.stripeCustomerId,
//             })

//             setStripeIntentSecret(data.secret)
//         } catch (error) {
//             alert(error)
//         }
//     }

//     return stripeIntentSecret !== null ? (
//         <Elements
//             stripe={stripePromise}
//             options={{
//                 clientSecret: stripeIntentSecret,
//             }}
//         >
//             {props.children}
//         </Elements>
//     ) : (
//         props.children
//     )
// }

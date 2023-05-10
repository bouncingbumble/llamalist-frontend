import React, { useState, useEffect, useContext } from 'react'
import { app } from '@microsoft/teams-js'
import { CarrotIcon } from '../../ChakraDesign/Icons'
import { UserContext } from '../../Contexts/UserContext'
import { TasksContext } from '../../Contexts/TasksContext'
import { LabelsContext } from '../../Contexts/LabelsContext'
import { apiCall, setTokenHeader } from '../../Util/api'
import {
    Text,
    Flex,
    Link,
    Button,
    Divider,
    Collapse,
    CircularProgress,
} from '@chakra-ui/react'
import io from 'socket.io-client'
import Logo from '../Logo'
import TaskList from './TaskList'
import jwtDecode from 'jwt-decode'
import MicrosoftSignIn from './MirosoftSignIn'
import MicrosoftCreateTask from './MicrosoftCreateTask'

export default function TeamsTabContainer() {
    const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    const { user, setUser } = useContext(UserContext)
    const { tasksRef, setTasks } = useContext(TasksContext)
    const { labels, setLabels, getUsersLabels } = useContext(LabelsContext)

    const [msId, setMsId] = useState('')
    const [hostName, setHostName] = useState('')
    const [showMore, setShowMore] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isSignedIn, setIsSignedIn] = useState(false)

    // auth flow functions
    const initializeMsUser = async () => {
        app.initialize()
        const msContext = await app.getContext()

        // detect which microsoft app we are in
        setHostName(msContext.app.host.name)

        // grab msUserId and check db for a correlated OO user
        const msUserId = msContext.user.id
        setMsId(msUserId)
        const foundUser = await apiCall(`GET`, `/msteams/user/${msUserId}`)

        if (foundUser) {
            localStorage.setItem('msllamaListJwtToken', foundUser.token)
            localStorage.setItem('ooProfilePhoto', foundUser.profilePhotoUrl)

            setUser(foundUser)
            setIsSignedIn(true)
            setTokenHeader(foundUser.token)
        } else {
            setIsSignedIn(false)
        }
        setIsLoading(false)
    }

    const checkToken = () => {
        const token = localStorage.getItem('msllamaListJwtToken')

        if (token) {
            const foundUser = jwtDecode(token)

            foundUser.profilePhotoUrl = localStorage.getItem('ooProfilePhoto')
            foundUser.token = token

            setUser(foundUser)
            setIsSignedIn(true)
            setTokenHeader(token)
        } else {
            setIsSignedIn(false)
        }
        setIsLoading(false)
    }

    // user data functions
    const getTasks = async () => {
        let tasks = await apiCall('get', `/users/${user._id}/tasks`)

        // make tasks array be in the proper order for dnd purposes
        tasks = tasks.sort((a, b) => a.position - b.position)
        tasks = tasks.sort((a, b) => a.urgency - b.urgency)

        setTasks(tasks)
    }

    // setup socket
    useEffect(() => {
        if (isSignedIn) {
            const socket = io.connect(process.env.REACT_APP_BACKEND_SERVER)

            socket.on('newTasksMicrosoft', (data) => {
                if (data === user._id.toString()) {
                    setTasks([])
                    getTasks()
                    apiCall(`GET`, `/msteams/user/${msId}`)
                        .then((data) => setUser(data))
                        .catch((error) => alert(error))
                }
            })

            socket.on('newLabelsMicrosoft', (data) => {
                if (data === user._id.toString()) {
                    console.log('were in')
                    getUsersLabels()
                }
                setTasks([])
                getTasks()
            })

            socket.on('notification sent', async (data) => {
                if (data.userId === user._id.toString()) {
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

            return () => {
                socket.close()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSignedIn])

    // determine method of authentication
    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const browser = params.get('browser')

        if (browser) {
            checkToken()
        } else {
            initializeMsUser()
        }
    }, [])

    // grab user data on sign in
    useEffect(() => {
        if (isSignedIn) {
            getTasks()
            getUsersLabels()
        }
    }, [isSignedIn])

    return (
        <>
            {isLoading ? (
                <Flex direction="column" w="100%" h="100vh" alignItems="center">
                    <img
                        style={{
                            height: '156px',
                            marginTop: '15%',
                        }}
                        src="/otter.png"
                    />
                    <CircularProgress isIndeterminate color="purple.500" />
                    <Text fontSize="20px" mt="8px">
                        Loading...
                    </Text>
                </Flex>
            ) : (
                <Flex
                    mt="24px"
                    pb="48px"
                    align="center"
                    direction="column"
                    overflowX="hidden"
                >
                    {!isSignedIn && (
                        <>
                            <Logo />
                            <MicrosoftSignIn
                                msId={msId}
                                setUser={setUser}
                                setIsSignedIn={setIsSignedIn}
                            />
                        </>
                    )}
                    {isSignedIn && (
                        <>
                            <MicrosoftCreateTask
                                hostName={hostName}
                                setIsSignedIn={setIsSignedIn}
                            />
                            <Divider
                                w="80%"
                                mt="8px"
                                mb="8px"
                                border="4px"
                                color="gray.600"
                                borderRadius="8px"
                            />
                            <TaskList />
                            {hostName === 'Teams' && !mobile && (
                                <>
                                    <Button
                                        mt="48px"
                                        onClick={() => setShowMore(!showMore)}
                                        rightIcon={
                                            <CarrotIcon
                                                transform={
                                                    showMore && 'rotate(180deg)'
                                                }
                                                transition="all 0.3s"
                                            />
                                        }
                                    >
                                        {showMore
                                            ? 'Show less'
                                            : 'Learn about our message extension'}{' '}
                                    </Button>
                                    <Collapse in={showMore}>
                                        <Flex
                                            direction="column"
                                            alignItems="center"
                                        >
                                            <Divider
                                                w="90%"
                                                mt="48px"
                                                mb="48px"
                                                borderWidth="2px"
                                                borderRadius="2px"
                                            />
                                            <Text p="0px 16px">
                                                You can also create a task in
                                                llama list by using our message
                                                extension:
                                            </Text>
                                            <Text p="16px 48px">
                                                1. Navigate to any chat bubble
                                                and hover over the three dots
                                                <br />
                                                2. Click on "More Actions"
                                                <br />
                                                3. Click "Create Task in Office
                                                Otter"
                                            </Text>
                                            <img
                                                style={{
                                                    width: '90%',
                                                    maxWidth: '720px',
                                                    borderRadius: '16px',
                                                    boxShadow:
                                                        '0 8px 16px 0 rgba(56, 96, 165, 0.15)',
                                                }}
                                                alt="extension screenshot"
                                                src="https://office-otter-production.s3.us-east-2.amazonaws.com/73bad228-5091-4792-a50b-1e966d7d0a24extensionscreenshot.png"
                                            />
                                        </Flex>
                                    </Collapse>
                                </>
                            )}
                            {!mobile && (
                                <Link
                                    mt="16px"
                                    target="_blank"
                                    alignSelf="center"
                                    href={`${process.env.REACT_APP_FRONTEND}`}
                                >
                                    <Text
                                        ml="4px"
                                        display="flex"
                                        color="purple.500"
                                        alignItems="center"
                                    >
                                        {' '}
                                        <span>Go to llama list now</span>
                                        <span style={{ height: '10px' }}>
                                            <img
                                                style={{
                                                    height: '10px',
                                                    width: '10px',
                                                    marginLeft: '4px',
                                                }}
                                                alt="popout icon"
                                                src="https://office-otter-production.s3.us-east-2.amazonaws.com/9d88f0b4-187c-456a-89cb-01c09ae0894fpopout.png"
                                            />
                                        </span>
                                    </Text>
                                </Link>
                            )}
                        </>
                    )}
                </Flex>
            )}
        </>
    )
}

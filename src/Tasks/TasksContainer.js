import React, { useState, useEffect } from 'react'
import TasksList from './TasksList'
import TasksNavLeft from './TasksNavLeft'
import { apiCall } from '../Util/api'
import {
    Flex,
    Button,
    VStack,
    Text,
    Container,
    Grid,
    GridItem,
    Input,
    Checkbox,
    SlideFade,
} from '@chakra-ui/react'
import { io } from 'socket.io-client'
import { useParams, useNavigate } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import LabelsFilter from './LabelsFilter'
import { InboxIcon } from '../ChakraDesign/Icons'
import Llama from '../animations/java-llama-react/Llama'
import { useQueryClient } from '@tanstack/react-query'
import { useUser } from '../Hooks/UserHooks'
import { useCreateTask } from '../Hooks/TasksHooks'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

export default function TasksContainer() {
    const { section } = useParams()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const user = useUser()
    const createTask = useCreateTask()
    const [showCreateTaskInput, setShowCreateTaskInput] = useState(false)
    const [newTaskCardName, setNewTaskCardName] = useState('')
    const [progress, setProgress] = useState([0, 5])
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
                <VStack alignItems="flex-start" mt="10px">
                    <TasksNavLeft
                        numberOfDueDateTasks={
                            queryClient.data?.filter((t) => t.due).length
                        }
                        setSection={(section) => navigate(`/tasks/${section}`)}
                        section={section}
                    />
                    <Button
                        colorScheme="purple"
                        width="224px"
                        size="lg"
                        borderRadius="32px"
                        mt="16px !important"
                        onClick={() => {
                            setShowCreateTaskInput(true)
                        }}
                    >
                        Create Task
                    </Button>
                </VStack>
                <Flex w="100%" alignItems="center" mb="24px">
                    <Text mr="20px" ml="4px">
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
                        mb="-8px"
                    >
                        llama list
                    </Text>
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
                    <Flex flexDir="column" width="100%" mb="3px">
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
                                fontWeight={section === 'inbox' ? '600' : '400'}
                                bg={section === 'inbox' ? '#EFF1FA' : '#FFFFFF'}
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
                    </Flex>
                    <Flex flexDirection="column">
                        {showCreateTaskInput && (
                            <SlideFade
                                in={showCreateTaskInput}
                                direction="top"
                                offsetY="-24px"
                                transition={{
                                    enter: { duration: 0.2 },
                                    exit: { duration: 0.2 },
                                }}
                            >
                                <Flex
                                    flexDirection="column"
                                    w="100%"
                                    borderRadius="md"
                                    bg="white"
                                    cursor="pointer"
                                    height={showCreateTaskInput ? 'auto' : 0}
                                    p="8px 16px"
                                >
                                    <Flex justifyContent="space-between">
                                        <Flex
                                            alignItems="center"
                                            justifyContent="space-between"
                                            width="100%"
                                        >
                                            <Flex
                                                alignItems="center"
                                                width="100%"
                                            >
                                                <Checkbox
                                                    size="lg"
                                                    colorScheme="purple"
                                                    borderColor="gray.900"
                                                />
                                                <Text
                                                    ml="8px"
                                                    fontSize="18px"
                                                    lineHeight={0}
                                                    mt="1px"
                                                >
                                                    <Input
                                                        placeholder="task name..."
                                                        type="text"
                                                        size="md"
                                                        pl="8px"
                                                        value={newTaskCardName}
                                                        onChange={(e) =>
                                                            setNewTaskCardName(
                                                                e.target.value
                                                            )
                                                        }
                                                        autoFocus
                                                        height={'24px'}
                                                        onKeyDown={(e) => {
                                                            if (
                                                                e.key ===
                                                                'Enter'
                                                            ) {
                                                                createTask.mutate(
                                                                    {
                                                                        name: newTaskCardName,
                                                                    }
                                                                )
                                                                setShowCreateTaskInput(
                                                                    false
                                                                )
                                                                setNewTaskCardName(
                                                                    ''
                                                                )
                                                            }
                                                        }}
                                                    />
                                                </Text>
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </SlideFade>
                        )}
                        <TasksList />
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

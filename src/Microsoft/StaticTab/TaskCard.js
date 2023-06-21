import React, { useEffect, useContext, useState } from 'react'
import { format } from 'date-fns'
import { isOverDue } from '../../Util/timeUtils'
import { UserContext } from '../../Contexts/UserContext'
import { TasksContext } from '../../Contexts/TasksContext'
import { apiCall } from '../../Util/api'
import {
    Box,
    Flex,
    Checkbox,
    Text,
    Button,
    IconButton,
    Spacer,
    Progress,
    VStack,
    Collapse,
    useToast,
} from '@chakra-ui/react'
import {
    CarrotIcon,
    PushPinIcon,
    NotesIcon,
    CircleCheckIcon,
} from '../../ChakraDesign/Icons'
import Notes from '../../Tasks/TaskCard/Notes'
import Checklist from '../../Tasks/TaskCard/Checklist'
import ToastyBoi from '../../SharedComponents/ToastyBoi'
import Description from '../../Tasks/TaskCard/Description'

export default function TaskCard({ task }) {
    const toast = useToast()
    const { user, setUser } = useContext(UserContext)
    const { updateTask, completeTask } = useContext(TasksContext)

    const [expanded, setExpanded] = useState(false)
    const [taskLabels, setTaskLabels] = useState(task.labels)
    const [description, setDescription] = useState(task.description)
    const [isCompleted, setIsCompleted] = useState(task.isCompleted)
    const [notes, setNotes] = useState(task.notes.join('\n\n'))
    const [taskUrgency, setTaskUrgency] = useState(task.urgency)
    const [dueDate, setDueDate] = useState(task.due)
    const [notifications, setNotifications] = useState([...task.notifications])
    const [checklist, setChecklist] = useState(
        [...task.checklist].sort((a, b) => a.position - b.position)
    )
    const [progress, setProgress] = useState([
        checklist.filter((todo) => todo.complete).length,
        checklist.length,
    ])

    // task card actions
    const handleClickTask = () => {
        if (!expanded) {
            setExpanded(true)
        }
    }

    const handleCloseTask = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setExpanded(false)
        task.openUp = false
    }

    const handleCheck = async () => {
        setIsCompleted(true)
        setExpanded(false)

        const response = await completeTask(task._id, taskUrgency)
        if (response.status === 500) {
            setIsCompleted(false)
        }
    }

    const handleUpdate = (newData, field) => {
        switch (field) {
            case 'description':
                setDescription(newData.description)
                break

            case 'checklist':
                break
            case 'notes':
                setNotes(newData.notes)

                break
            default:
                alert('not a valid update field')
                break
        }
        updateTask(task._id, newData, taskUrgency)
    }

    // checklist actions
    const createItem = async ({ name }) => {
        const newChecklist = [...checklist]
        const newItem = {
            name,
            position:
                newChecklist.length === 0
                    ? 1000
                    : newChecklist[newChecklist.length - 1].position + 10,
            notifications: [],
        }

        try {
            const createdItem = await apiCall(
                `POST`,
                `/users/${user._id}/checklist/${task._id}`,
                newItem
            )

            let updatedChecklist = [...newChecklist]
            updatedChecklist.push(createdItem)
            setChecklist(updatedChecklist)
            updateTask(task._id, { checklist: updatedChecklist }, taskUrgency)
        } catch (error) {
            console.log(error)
        }
    }

    const updateItem = async (itemId, updates) => {
        try {
            const updatedItem = await apiCall(
                `PUT`,
                `/users/${user._id}/checklist/${task._id}/${itemId}`,
                updates
            )
            let newChecklist = [...checklist]
            newChecklist = newChecklist.map((item) => {
                if (item._id === itemId) {
                    return updatedItem
                } else {
                    return item
                }
            })

            return updatedItem
        } catch (error) {
            alert(JSON.stringify(error))
            return error
        }
    }

    const deleteItem = async (itemId) => {
        const newChecklist = [...checklist].filter(
            (item) => item._id !== itemId
        )

        setChecklist(newChecklist)
        updateTask(task._id, { checklist: newChecklist }, taskUrgency)

        try {
            apiCall(
                `DELETE`,
                `/users/${user._id}/checklist/${task._id}/${itemId}`
            )
        } catch (error) {
            console.log(error)
        }
    }

    // notification actions
    const createNotification = async (data) => {
        try {
            const newNotifications = await apiCall(
                'POST',
                `/users/${user._id}/notifications/${task._id}`,
                {
                    timeToSend: data.timeToSend,
                    type: data.type,
                }
            )

            setNotifications(newNotifications)
            updateTask(
                task._id,
                { notifications: newNotifications },
                task.urgency
            )

            toast({
                duration: 3000,
                render: () => (
                    <ToastyBoi
                        message="Notification scheduled."
                        icon={<CircleCheckIcon fill="white" />}
                        backgroundColor="purple.500"
                    />
                ),
            })
            //if user has no default, set one on their first notification selection
            if (user.notificationSettings.type === null) {
                const notificationSettings = {
                    type: data.type,
                    endOfDay: user.notificationSettings.endOfDay,
                    timezone: user.notificationSettings.timezone,
                    beginningOfDay: user.notificationSettings.beginningOfDay,
                }
                try {
                    const newUserData = await apiCall(
                        'PUT',
                        `/users/${user._id}`,
                        { notificationSettings }
                    )
                    setUser(newUserData)
                } catch (error) {
                    console.log(error)
                }
            }
        } catch (error) {
            alert(error)
        }
    }

    const handleDeleteNotification = async (notificationId) => {
        try {
            await apiCall(
                'DELETE',
                `/users/${user._id}/notifications/${notificationId}`
            )

            toast({
                duration: 3000,
                render: () => (
                    <ToastyBoi
                        message="Notification cancelled."
                        icon={<CircleCheckIcon fill="white" />}
                        backgroundColor="purple.500"
                    />
                ),
            })
        } catch (error) {
            alert(error)
        }

        let newNotifications = notifications.filter(
            (n) => n._id !== notificationId
        )

        setNotifications(newNotifications)
        updateTask(task._id, { notifications: newNotifications }, taskUrgency)
    }

    // listen for updates to child components
    useEffect(() => {
        setProgress([
            checklist.filter((todo) => todo.complete).length,
            checklist.length,
        ])
    }, [checklist, expanded])

    useEffect(() => {
        setNotifications([...task.notifications])
    }, [task.notifications])

    useEffect(() => {
        setChecklist(
            [...task.checklist].sort((a, b) => a.position - b.position)
        )
    }, [task.checklist])

    useEffect(() => {
        setTaskLabels([...task.labels].map((l) => ({ ...l, selected: true })))
    }, [task.labels])

    return (
        <Box
            w="100%"
            p="16px"
            mt="16px"
            cursor="pointer"
            borderRadius="8px"
            onClick={handleClickTask}
            backgroundColor="colors.white"
            boxShadow={`${expanded && '0 8px 16px 0 rgba(56, 96, 165, 0.15)'}`}
            _hover={{
                boxShadow: '0 8px 16px 0 rgba(56, 96, 165, 0.15)',
                transition: '0.3s',
            }}
        >
            <Flex
                width="100%"
                minHeight="48px"
                justifyContent={{ base: 'start', md: 'space-between' }}
            >
                <Checkbox
                    size="lg"
                    marginTop="14px"
                    colorScheme="blue"
                    alignSelf="flex-start"
                    onChange={handleCheck}
                    isChecked={isCompleted}
                    onTouchStart={handleCheck}
                />
                <Box
                    style={{
                        marginLeft: '-4px',
                        alignSelf: 'start',
                        paddingRight: '24px',
                        marginTop: expanded && '11px',
                    }}
                    w={expanded ? 'calc(100% - 64px)' : '100%'}
                >
                    <VStack flexDirection={expanded ? 'row' : 'column'}>
                        <Flex flexDirection="row" w="100%" alignItems="center">
                            {task.isPinned && !expanded && (
                                <Box
                                    style={{
                                        color: 'pink',
                                        marginLeft: '16px',
                                        marginRight: '-8px',
                                        alignSelf: 'flex-start',
                                    }}
                                >
                                    <PushPinIcon />
                                </Box>
                            )}
                            <Description
                                key={task._id}
                                expanded={expanded}
                                description={description}
                                handleUpdate={handleUpdate}
                            />
                        </Flex>
                        {!expanded && (
                            <Flex
                                zIndex="-1"
                                width="100%"
                                alignItems="center"
                                paddingLeft="13px"
                            >
                                {(task.due || task.isCompleted) && (
                                    <Flex alignItems="center">
                                        <Button
                                            pl="0"
                                            pr="0"
                                            mt="2px"
                                            mb="2px"
                                            mr="16px"
                                            variant="chip-colored"
                                            color={
                                                isOverDue(task.due)
                                                    ? 'red.500'
                                                    : 'colors.black'
                                            }
                                        >
                                            <Box mr="6px" fontSize="16px">
                                                {!task.isCompleted
                                                    ? '⏰'
                                                    : '✅'}
                                            </Box>
                                            {format(
                                                new Date(
                                                    !task.isCompleted
                                                        ? task.due
                                                        : task.completionDate
                                                ),
                                                'MMM d, h:mma'
                                            )}
                                        </Button>
                                    </Flex>
                                )}
                                {(taskLabels.length > 0 ||
                                    task.due ||
                                    task.completionDate) && (
                                    <Flex>
                                        <Box
                                            style={{
                                                marginRight: 'auto',
                                                alignSelf: 'center',
                                            }}
                                            display={{
                                                md: 'flex',
                                                base: 'none',
                                            }}
                                        >
                                            {taskLabels.map((label, i) => (
                                                <Button
                                                    key={i}
                                                    mt="2px"
                                                    mb="2px"
                                                    variant="chip-colored"
                                                    background={
                                                        label.color === ''
                                                            ? 'purple.500'
                                                            : label.color
                                                    }
                                                >
                                                    {label.name}
                                                </Button>
                                            ))}
                                        </Box>
                                    </Flex>
                                )}
                                {progress[1] > 0 && (
                                    <>
                                        <Progress
                                            height="8px"
                                            width="100%"
                                            marginTop="0px"
                                            colorScheme="blue"
                                            marginRight="16px"
                                            borderRadius="16px"
                                            marginLeft={
                                                (taskLabels.length > 0 ||
                                                    task.due) &&
                                                '8px'
                                            }
                                            value={
                                                (progress[0] / progress[1]) *
                                                100
                                            }
                                        />

                                        <Text
                                            mr="8px"
                                            marginTop="0px"
                                            fontSize="small"
                                            color="grey.900"
                                            fontWeight="bold"
                                        >
                                            {progress[0]}/{progress[1]}
                                        </Text>
                                    </>
                                )}
                                {task.notes[0]?.length > 7 && (
                                    <Box mr="8px" zIndex={200}>
                                        <NotesIcon color="grey.500" />
                                    </Box>
                                )}
                            </Flex>
                        )}
                    </VStack>
                </Box>
                {expanded && (
                    <IconButton
                        size="lg"
                        color="grey.900"
                        borderRadius="xl"
                        alignSelf="flex-start"
                        backgroundColor="transparent"
                        icon={<CarrotIcon />}
                        onClick={handleCloseTask}
                    />
                )}
            </Flex>
            <Collapse in={expanded} unmountOnExit>
                <Box
                    marginTop="8px"
                    id="card content"
                    marginLeft="32px"
                    marginRight="32px"
                >
                    <Notes notes={notes} handleUpdate={handleUpdate} />
                    <Spacer h="8px" />
                    <Checklist
                        taskId={task._id}
                        items={checklist}
                        setItems={setChecklist}
                        progress={progress}
                        expanded={expanded}
                        setExpaned={setExpanded}
                        updateTask={updateTask}
                        createItem={createItem}
                        updateItem={updateItem}
                        deleteItem={deleteItem}
                        taskUrgency={taskUrgency}
                    />
                </Box>
            </Collapse>
        </Box>
    )
}

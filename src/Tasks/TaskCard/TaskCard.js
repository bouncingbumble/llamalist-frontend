import React, { useEffect, useContext, useState } from 'react'
import { UserContext } from '../../Contexts/UserContext'
import { apiCall } from '../../Util/api'
import {
    Box,
    Flex,
    useToast,
    Checkbox,
    Text,
    Button,
    Tooltip,
    IconButton,
    Spacer,
    Progress,
    VStack,
} from '@chakra-ui/react'
import { sub, format } from 'date-fns'
import {
    CarrotIcon,
    CircleCheckIcon,
    PushPinIcon,
} from '../../ChakraDesign/Icons'
import ActionsBar from './ActionsBar'
import Description from './Description'
import Checklist from './Checklist'
import Notes from './Notes'
import ToastyBoi from '../../SharedComponents/ToastyBoi'
import { PaidPopUpContext } from '../../Contexts/PaidPopupContext'
import { isOverDue } from '../../Util/timeUtils'
import { TasksContext } from '../../Contexts/TasksContext'

export default function TaskCard({
    task,
    index,
    cards,
    urgency,
    setCards,
    disableDrag,
    updateCompletedTask,
}) {
    // context
    const { updateTask, completeTask } = useContext(TasksContext)
    const { user, setUser } = useContext(UserContext)
    const { setPaidPopup } = useContext(PaidPopUpContext)

    //animation state
    const [isCompleted, setIsCompleted] = useState(task.isCompleted)
    const [checkboxHovered, setCheckboxHovered] = useState(false)
    const [expanded, setExpanded] = useState(task.expanded)
    const [dueDate, setDueDate] = useState(task.due)
    const [notifications, setNotifications] = useState([...task.notifications])
    const [description, setDescription] = useState(task.description)
    const [notes, setNotes] = useState(task.notes?.join('\n\n'))
    const [cardHasBeenHovered, setCardHasBeenHovered] = useState(false)
    const [checklist, setChecklist] = useState(
        [...task.checklist].sort((a, b) => a.position - b.position)
    )

    // styles for draggable task card
    const taskCardStyle = (isDragging, draggableStyle) => {
        let transform = draggableStyle.transform

        if (transform) {
            transform =
                'translate(0px' +
                transform.slice(transform.indexOf(','), transform.length)
        }
        return {
            ...draggableStyle,
            transform: transform,
            cursor: 'pointer',
            marginTop: '16px',
            padding: '16px',
            borderRadius: '8px',
            backgroundColor: 'gray.200',
        }
    }

    const [progress, setProgress] = useState([
        checklist.filter((todo) => todo.complete).length,
        checklist.length,
    ])

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

    const [taskLabels, setTaskLabels] = useState([
        ...task.labels.map((l) => ({ ...l, selected: true })),
    ])
    const toast = useToast()

    useEffect(() => {
        if (task.openUp) {
            setExpanded(true)
        }
    }, [task.openUp])

    const handleCloseTask = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setExpanded(false)
        task.openUp = false
    }

    const handleClickTask = (e) => {
        if (!expanded) {
            setExpanded(true)
        }
    }

    const handleCheck = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (urgency === 4) {
            updateCompletedTask(task._id, { urgency: 1, isCompleted: false })
        } else {
            setIsCompleted(true)
            setExpanded(false)
            const v = await completeTask(task._id, task.urgency)
            if (v.status === 500) {
                setIsCompleted(false)
            }
        }
    }

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
                    ></ToastyBoi>
                ),
            })
            //if user has no default, set one on their first notification selection
            if (user.notificationSettings.type === null) {
                const notificationSettingsObj = {
                    beginningOfDay: user.notificationSettings.beginningOfDay,
                    endOfDay: user.notificationSettings.endOfDay,
                    timezone: user.notificationSettings.timezone,
                    type: data.type,
                }
                try {
                    const newUserData = await apiCall(
                        'PUT',
                        `/users/${user._id}`,
                        {
                            notificationSettings: notificationSettingsObj,
                        }
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

    const createGoogleCalendarEvent = () => {
        const title =
            description.length > 50
                ? description.substring(0, 50) + '...'
                : description

        let details = ''
        if (checklist.length > 0) {
            details += `<h3><u>Checklist Items</u>:</h3>`
            details += '<ul>'
            checklist.forEach((item) => (details += `<li>${item.name}</li>`))
            details += '</ul>'
        }
        if (task.notes.length > 0) {
            details += '<h3><u>Notes</u>:</h3>'
            details += `<span>${task.notes[0]}</span>`
        }
        details +=
            task.notes.length > 0
                ? `\n\n<a href="${process.env.REACT_APP_URL}/tasks/${task._id}">View task in llama list</a>\n\n`
                : `<a href="${process.env.REACT_APP_URL}/tasks/${task._id}">View task in llama list</a>\n\n`

        let redirectURL =
            'https://www.google.com/calendar/render?action=TEMPLATE' +
            `&text=${title}` +
            `&details=${details}` +
            `&trp=false` +
            `sprop=name:`

        if (dueDate) {
            let start = sub(new Date(dueDate), { minutes: 30 })
            let end = new Date(dueDate)

            start = `${format(start, 'yyyyMMdd')}T${format(start, 'HHmmss')}`
            end = `${format(end, 'yyyyMMdd')}T${format(end, 'HHmmss')}`

            redirectURL += `&dates=${start}/${end}`
        }

        window.open(encodeURI(redirectURL), '_blank')
    }

    const handleUpdate = async (newData, field) => {
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
        updateTask(task._id, newData, urgency)
    }

    const handleUpdateDueDate = (newData) => {
        setDueDate(newData.due)
        if (urgency === 4) {
            updateCompletedTask(task._id, newData)
        } else {
            updateTask(task._id, newData, urgency)
        }
    }

    // API's to pass to checklist component
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
            updateTask(task._id, { checklist: updatedChecklist }, urgency)
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
            if (error.data.error.message === 'Subscription error') {
                setPaidPopup({
                    show: true,
                    reason: 'Oops! It looks like you hit a limit on your free plan 😢. You can continue using your free account. 🎉 Upgrade if you want to complete more than 10 items.',
                    hideButtons: false,
                })
            } else {
                alert(JSON.stringify(error))
            }
            return error
        }
    }

    const deleteItem = async (itemId) => {
        const newChecklist = [...checklist].filter(
            (item) => item._id !== itemId
        )
        // try to set the correct section state here i think
        setChecklist(newChecklist)
        updateTask(task._id, { checklist: newChecklist }, urgency)

        try {
            apiCall(
                `DELETE`,
                `/users/${user._id}/checklist/${task._id}/${itemId}`
            )
        } catch (error) {
            console.log(error)
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
                    ></ToastyBoi>
                ),
            })
        } catch (error) {
            alert(error)
        }

        let newNotifications = notifications.filter(
            (n) => n._id !== notificationId
        )
        setNotifications(newNotifications)
        updateTask(task._id, { notifications: newNotifications }, urgency)
    }

    const saveAsTemplate = async () => {
        // create new template
        const newTemplate = await apiCall(
            `POST`,
            `/users/${user._id}/templates`,
            {
                description,
                notes,
                labels: taskLabels,
            }
        )

        // copy and create new checklist objects
        for await (let item of checklist) {
            const checklistItem = {
                name: item.name,
                complete: false,
                completionDate: null,
                position: item.position,
            }
            try {
                await apiCall(
                    `POST`,
                    `/users/${user._id}/checklist/${newTemplate._id}?template=true`,
                    checklistItem
                )
            } catch (error) {
                console.log(error)
            }
        }

        // success
        toast({
            duration: 3000,
            render: () => (
                <ToastyBoi
                    message="Task saved as template"
                    icon={<CircleCheckIcon fill="white" />}
                    backgroundColor="purple.500"
                />
            ),
        })
    }

    const handleHover = () => {
        setCardHasBeenHovered(true)
    }

    return (
        <Box
            w="100%"
            _hover={{
                boxShadow: '0 8px 16px 0 rgba(56, 96, 165, 0.15)',
                transition: '0.3s',
            }}
            boxShadow={`${expanded && '0 8px 16px 0 rgba(56, 96, 165, 0.15)'}`}
            onClick={handleClickTask}
            backgroundColor="colors.white"
            style={taskCardStyle()}
            className="minibarparent"
            onMouseEnter={handleHover}
        >
            <Flex
                id="top-bar"
                justifyContent={{ base: 'start', md: 'space-between' }}
                width="100%"
                minHeight="48px"
            >
                <Tooltip
                    label="Complete task"
                    isOpen={checkboxHovered}
                    offset={[8, 18]}
                >
                    <Checkbox
                        isChecked={isCompleted}
                        onChange={handleCheck}
                        onTouchStart={handleCheck}
                        colorScheme="blue"
                        alignSelf={'flex-start'}
                        marginTop="14px"
                        size="lg"
                        onMouseOver={() => setCheckboxHovered(true)}
                        onMouseLeave={() => setCheckboxHovered(false)}
                    ></Checkbox>
                </Tooltip>
                <Box
                    style={{
                        paddingRight: '24px',
                        alignSelf: 'start',
                        marginLeft: '-4px',
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
                                expanded={expanded}
                                description={description}
                                handleUpdate={handleUpdate}
                                key={task._id}
                            />
                        </Flex>
                        {!expanded && (
                            <Flex
                                width="100%"
                                alignItems="center"
                                paddingLeft="13px"
                                zIndex="-1"
                            >
                                {(task.due || task.isCompleted) && (
                                    <Flex alignItems="center">
                                        <Button
                                            variant="chip-colored"
                                            mt={'2px'}
                                            mb={'2px'}
                                            // mr="16px"
                                            color={
                                                isOverDue(task.due)
                                                    ? 'red.500'
                                                    : 'colors.black'
                                            }
                                            pl="0"
                                            pr="0"
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
                                {task.notes && task.notes[0]?.length > 7 && (
                                    <Tooltip name="This item has notes">
                                        <Flex mr="8px" zIndex={200}>
                                            📝
                                        </Flex>
                                    </Tooltip>
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
                                                base: 'none',
                                                md: 'flex',
                                            }}
                                        >
                                            {taskLabels.map((label, i) => (
                                                <Button
                                                    variant="chip-colored"
                                                    background={
                                                        label.color === ''
                                                            ? 'purple.500'
                                                            : label.color
                                                    }
                                                    key={i}
                                                    mt={'2px'}
                                                    mb={'2px'}
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
                                            value={
                                                (progress[0] / progress[1]) *
                                                100
                                            }
                                            colorScheme="blue"
                                            borderRadius="16px"
                                            height="8px"
                                            width="100%"
                                            marginRight="16px"
                                            marginTop="0px"
                                            marginLeft={
                                                (taskLabels.length > 0 ||
                                                    task.due) &&
                                                '8px'
                                            }
                                        />

                                        <Text
                                            fontSize="small"
                                            color="grey.900"
                                            fontWeight="bold"
                                            marginTop="0px"
                                            mr="8px"
                                        >
                                            {progress[0]}/{progress[1]}
                                        </Text>
                                    </>
                                )}
                            </Flex>
                        )}
                    </VStack>
                </Box>
                {expanded && (
                    <IconButton
                        icon={<CarrotIcon />}
                        onClick={handleCloseTask}
                        size="lg"
                        borderRadius="xl"
                        backgroundColor="transparent"
                        color="grey.900"
                        alignSelf="flex-start"
                    ></IconButton>
                )}
            </Flex>
            {expanded && (
                <Box>
                    <Box
                        id="card content"
                        marginLeft="32px"
                        marginRight="32px"
                        marginTop="8px"
                    >
                        <Notes notes={notes} handleUpdate={handleUpdate} />
                        <Spacer h="8px" />
                        <Checklist
                            taskId={task._id}
                            items={checklist}
                            setItems={setChecklist}
                            expanded={expanded}
                            setExpanded={setExpanded}
                            progress={progress}
                            taskUrgency={task.urgency}
                            sectionUrgency={urgency}
                            createItem={createItem}
                            updateItem={updateItem}
                            deleteItem={deleteItem}
                        />
                    </Box>
                    <ActionsBar
                        task={task}
                        cards={cards}
                        setCards={setCards}
                        taskUrgency={task.urgency}
                        urgency={urgency}
                        taskLabels={taskLabels}
                        setTaskLabels={setTaskLabels}
                        updateCompletedTask={updateCompletedTask}
                        due={dueDate}
                        handleUpdateDueDate={handleUpdateDueDate}
                        createGoogleCalendarEvent={createGoogleCalendarEvent}
                        createNotification={createNotification}
                        notifications={notifications}
                        setNotifications={setNotifications}
                        handleDeleteNotification={handleDeleteNotification}
                        saveAsTemplate={saveAsTemplate}
                        isCompleted={task.isCompleted}
                        shareLinkPermissionType={task.shareLinkPermissionType}
                        isPinned={task.isPinned}
                    />
                </Box>
            )}
        </Box>
    )
}

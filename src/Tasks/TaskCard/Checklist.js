import React, { useEffect, useState, useContext } from 'react'
import {
    Box,
    Input,
    VStack,
    Flex,
    Checkbox,
    Progress,
    useToast,
    Tooltip,
    Text,
} from '@chakra-ui/react'
import ChecklistActionsBar from './ChecklistActionsBar'
import { apiCall } from '../../Util/api'
import ToastyBoi from '../../SharedComponents/ToastyBoi'
import {
    CircleCheckIcon,
    TrashIcon,
    DragAndDropIcon,
} from '../../ChakraDesign/Icons'
import UpdateChecklistItemFormBlock from './UpdateChecklistItemFormBlock'
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    rectIntersection,
} from '@dnd-kit/core'
import {
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable'
import {
    restrictToVerticalAxis,
    restrictToHorizontalAxis,
} from '@dnd-kit/modifiers'
import { CSS } from '@dnd-kit/utilities'
import LlamaFormBlock from './LllamaFormBlock'
import { useTasks } from '../../Hooks/TaskHooks'
import { useUser } from '../../Hooks/UserHooks'

export default function Checklist({ taskId, checklist }) {
    const toast = useToast()

    const [items, setItems] = useState(checklist)

    const tasks = useTasks()
    const user = useUser()

    const progress = items?.filter((item) => item.isCompleted).length

    const createItem = async ({ name }) => {
        const newChecklist = [...items]
        const newItem = {
            name,
            position:
                newChecklist.length === 0
                    ? 1000
                    : newChecklist[newChecklist.length - 1].position + 10,
        }

        try {
            apiCall(`POST`, `/users/${user._id}/checklist/${taskId}`, newItem)

            let updatedChecklist = [...newChecklist]
            updatedChecklist.push(newItem)
            setItems(updatedChecklist)
        } catch (error) {
            console.log(error)
        }
    }

    const updateItem = async (itemId, updates) => {
        try {
            apiCall(
                `PUT`,
                `/users/${user._id}/checklist/${taskId}/${itemId}`,
                updates
            )
            let newChecklist = [...items]
            newChecklist = newChecklist.map((item) => {
                if (item._id === itemId) {
                    return { ...item, ...updates }
                } else {
                    return item
                }
            })

            setItems(newChecklist)
        } catch (error) {
            alert(JSON.stringify(error))
            return error
        }
    }

    const deleteItem = async (itemId) => {
        const newChecklist = [...items].filter((item) => item._id !== itemId)

        setItems(newChecklist)

        try {
            apiCall(
                `DELETE`,
                `/users/${user._id}/checklist/${taskId}/${itemId}`
            )
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditItemName = async (itemId, newName) => {
        const newItems = items.map((item) => {
            if (item._id === itemId) {
                item.name = newName
            }
            return item
        })

        updateItem(itemId, { name: newName })
    }

    const handleCompleteItem = async (item) => {
        const updates = {
            complete: !item.complete,
            completionDate: !item.complete ? new Date() : null,
        }
        let newItems = items.map((oldItem) => {
            if (oldItem._id === item._id) {
                oldItem.complete = updates.complete
                oldItem.completionDate = updates.completionDate
            }
            return oldItem
        })
        setItems(newItems)

        const v = await updateItem(item._id, updates)
        if (v.status === 500) {
            newItems = items.map((oldItem) => {
                if (oldItem._id === item._id) {
                    oldItem.complete = false
                    oldItem.completionDate = null
                }
                return oldItem
            })
            setItems(newItems)
        }
    }

    const onSortEnd = async (oldItemId, newItemId) => {
        let oldIndex = items.findIndex((object) => {
            return object._id === oldItemId
        })
        let newIndex = items.findIndex((object) => {
            return object._id === newItemId
        })
        let newPosition
        const dragItem = items[oldIndex]
        const newItems = reorder(items, oldIndex, newIndex)

        if (newIndex === 0) {
            newPosition = newItems[1].position - 10
        } else if (newIndex === newItems.length - 1) {
            newPosition = newItems[newItems.length - 2].position + 10
        } else {
            const position1 = newItems[newIndex - 1].position
            const position2 = newItems[newIndex + 1].position
            newPosition = (position1 + position2) / 2
        }
        newItems[newIndex].position = newPosition
        setItems(newItems)

        updateItem(dragItem._id, { position: newPosition })
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)

        return result
    }

    const handleChecklistToTask = async (item) => {
        const taskData = {
            description: item.name,
        }

        // remove item from state
        const newChecklist = [...items].filter((i) => i._id !== item._id)
        setItems(newChecklist)

        // actually delete the checklist item
        await apiCall(
            `DELETE`,
            `/users/${user._id}/checklist/${taskId}/${item._id}`
        )

        // create the task and update section state
        const newTask = await apiCall('POST', `/users/${user._id}/tasks`, {
            ...taskData,
        })
        newTask.openUp = true
        let newTasks = [...tasks]
        newTasks.unshift(newTask)

        // setTasks(newTasks)

        toast({
            duration: 3000,
            render: () => (
                <ToastyBoi
                    message={'Item converted to task.'}
                    icon={<CircleCheckIcon fill="white" />}
                    backgroundColor="purple.500"
                ></ToastyBoi>
            ),
        })
    }

    return (
        <VStack>
            {items.length > 0 && (
                <Flex width="100%" alignItems="center">
                    <Progress
                        value={(progress[0] / progress[1]) * 100}
                        colorScheme="blue"
                        borderRadius="16px"
                        height="8px"
                        width="100%"
                        marginRight="16px"
                        sx={{
                            '& > div:first-child': {
                                transitionProperty: 'width',
                            },
                        }}
                    />

                    <Text fontSize="small" color="grey.900" fontWeight="bold">
                        {progress[0]}/{progress[1]}
                    </Text>
                </Flex>
            )}
            <NewChecklistItemForm handleSubmit={createItem} />

            <ItemsList
                items={items}
                setItems={setItems}
                user={user}
                updateItem={updateItem}
                taskId={taskId}
                handleEditItemName={handleEditItemName}
                handleCompleteItem={handleCompleteItem}
                deleteChecklistItem={deleteItem}
                handleChecklistToTask={handleChecklistToTask}
                onSortEnd={onSortEnd}
            />
        </VStack>
    )
}

const ItemsList = ({
    items,
    setItems,
    user,
    taskId,
    updateItem,
    cantComplete,
    handleEditItemName,
    handleCompleteItem,
    deleteChecklistItem,
    handleChecklistToTask,
    sectionUrgency,
    onSortEnd,
}) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    function handleDragEnd(event) {
        const { active, over } = event
        if (active !== null && over !== null) {
            if (active.id !== null && over.id !== null) {
                if (active.id !== over.id) {
                    onSortEnd(active.id, over.id)
                }
            }
        }
    }

    const getDndModifiers = () => {
        const modifiers = [restrictToVerticalAxis]

        return modifiers
    }

    const [draggingId, setDraggingId] = useState(null)
    const [shouldShowCompletedItems, setShouldShowCompletedItems] =
        useState(false)

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={rectIntersection}
            modifiers={getDndModifiers()}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={items.map((i) => i._id)}
                strategy={verticalListSortingStrategy}
            >
                <VStack width="100%">
                    {items.map(
                        (item, index) =>
                            !item.complete && (
                                <ChecklistItem
                                    item={item}
                                    items={items}
                                    setItems={setItems}
                                    user={user}
                                    key={item._id}
                                    updateItem={updateItem}
                                    cantComplete={cantComplete}
                                    taskId={taskId}
                                    handleEditItemName={handleEditItemName}
                                    handleCompleteItem={handleCompleteItem}
                                    deleteChecklistItem={deleteChecklistItem}
                                    handleChecklistToTask={
                                        handleChecklistToTask
                                    }
                                    sectionUrgency={sectionUrgency}
                                    id={item._id}
                                    draggingId={draggingId}
                                    setDraggingId={setDraggingId}
                                />
                            )
                    )}
                    {items.filter((item, index) => item.complete).length >
                        0 && (
                        <Flex justifyContent="flex-start" width="100%">
                            <Text
                                color="grey.600"
                                onClick={() =>
                                    setShouldShowCompletedItems(
                                        !shouldShowCompletedItems
                                    )
                                }
                            >
                                {!shouldShowCompletedItems ? 'Show ' : 'Hide '}
                                completed items{' '}
                                {'(' +
                                    items.filter((i) => i.complete).length +
                                    ')'}
                            </Text>
                        </Flex>
                    )}
                    {shouldShowCompletedItems &&
                        items.map(
                            (item, index) =>
                                item.complete && (
                                    <ChecklistItem
                                        item={item}
                                        items={items}
                                        setItems={setItems}
                                        user={user}
                                        key={item._id}
                                        updateItem={updateItem}
                                        cantComplete={cantComplete}
                                        taskId={taskId}
                                        handleEditItemName={handleEditItemName}
                                        handleCompleteItem={handleCompleteItem}
                                        deleteChecklistItem={
                                            deleteChecklistItem
                                        }
                                        handleChecklistToTask={
                                            handleChecklistToTask
                                        }
                                        id={item._id}
                                        draggingId={draggingId}
                                        setDraggingId={setDraggingId}
                                    />
                                )
                        )}
                </VStack>
            </SortableContext>
        </DndContext>
    )
}

const ChecklistItem = ({
    item,
    items,
    setItems,
    user,
    updateItem,
    handleEditItemName,
    handleCompleteItem,
    deleteChecklistItem,
    handleChecklistToTask,
    id,
    draggingId,
    setDraggingId,
}) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id })

    const [isChecked, setIsChecked] = useState(item.complete)

    let style = {
        transform: CSS.Translate.toString(transform),
        transition,
        marginLeft: -72,
        pointerEvents: draggingId !== null && draggingId !== id && 'none',
        marginTop: 0,
    }

    const toast = useToast()
    const handleEditItem = async (newText) => {
        handleEditItemName(item._id, newText)
    }

    const [dueDate, setDueDate] = React.useState(item.due)
    const [notifications, setNotifications] = React.useState(
        item.notifications ? [...item.notifications] : []
    )

    useEffect(() => {
        if (
            item.notifications?.length > 0 &&
            typeof item.notifications[0] === 'object'
        ) {
            setNotifications([...item.notifications])
        }
    }, [item.notifications])

    const createNotification = async (data) => {
        try {
            // create the new notification
            const newNotifications = await apiCall(
                'POST',
                `/users/${user._id}/checklistNotifications/${item._id}`,
                {
                    timeToSend: data.timeToSend,
                    type: data.type,
                }
            )

            // update state
            let newItems = [...items]
            newItems = newItems.map((i) => {
                if (i._id === item._id) {
                    i.notifications = newNotifications
                }
                return i
            })
            setItems(newItems)
            setNotifications(newNotifications)
            updateItem(item._id, { notifications: newNotifications })

            // notify user
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
                } catch (error) {
                    console.log(error)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteNotification = async (notificationId) => {
        try {
            // delete notification
            await apiCall(
                'DELETE',
                `/users/${user._id}/checklistNotifications/${notificationId}`
            )

            // update state
            const newNotifications = notifications.filter(
                (n) => n._id !== notificationId
            )
            let newItems = [...items]
            newItems = newItems.map((i) => {
                if (i._id === item._id) {
                    i.notifications = newNotifications
                }
                return i
            })
            setItems(newItems)
            setNotifications(newNotifications)
            updateItem(item._id, { notifications: newNotifications })

            // notify user
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
    }

    const handleCheck = () => {
        setIsChecked(!isChecked)

        if (!isChecked) {
            setTimeout(() => {
                setNotifications(notifications.filter((n) => n.sent))
                handleCompleteItem(item)
            }, 1000)
        } else {
            setNotifications(notifications.filter((n) => n.sent))
            handleCompleteItem(item)
        }
    }

    const handleDragStart = () => {
        setDraggingId(id)
    }
    const handleDragStop = () => {
        setDraggingId(null)
    }

    return (
        <Flex
            ref={setNodeRef}
            style={style}
            justifyContent="flex-start"
            w="100%"
            alignItems="center"
            id="parent"
            onMouseLeave={handleDragStop}
        >
            <div
                style={{
                    marginRight: 12,
                }}
                className={'hidden-child'}
                id="handyhands"
                {...attributes}
                {...listeners}
                onMouseDown={handleDragStart}
                onMouseUp={handleDragStop}
            >
                <DragAndDropIcon color="#b1bdd1" />
            </div>
            <Checkbox
                marginRight="16px"
                isChecked={isChecked}
                onChange={() => handleCheck()}
                style={{ cursor: 'pointer' }}
                size="lg"
            />
            <Box w="100%" overflow="hidden">
                <UpdateChecklistItemForm
                    name={item.name}
                    handleSubmit={handleEditItem}
                />
            </Box>
            <Tooltip label="delete checklist item">
                <Flex align="center">
                    <TrashIcon
                        mt="8px"
                        mb="8px"
                        mr="32px"
                        color="grey.900"
                        onClick={() => deleteChecklistItem(item._id)}
                    />
                </Flex>
            </Tooltip>
            <ChecklistActionsBar
                user={user}
                updateItem={updateItem}
                item={item}
                items={items}
                setItems={setItems}
                deleteChecklistItem={deleteChecklistItem}
                handleChecklistToTask={handleChecklistToTask}
            />
        </Flex>
    )
}

const NewChecklistItemForm = ({ handleSubmit }) => {
    return (
        <Flex width="100%">
            <Input
                focusBorderColor="purple.500"
                _focus={{
                    backgroundColor: 'rgba(118, 61, 225, 0.1)',
                }}
                variant="outline"
                onChange={(event) => event.target.value}
                onBlur={handleSubmit}
                onKeyDown={(event) => {
                    event.keyCode === 13 && handleSubmit()
                }}
            />
        </Flex>
    )
}

const UpdateChecklistItemForm = ({ handleSubmit, name }) => {
    return (
        <UpdateChecklistItemFormBlock
            description={name}
            handleSubmit={(evt) => handleSubmit(evt.target.innerText)}
            style={{
                width: '100%',
                paddingTop: 4,
                paddingBottom: 4,
                whiteSpace: 'pre-wrap',
            }}
        ></UpdateChecklistItemFormBlock>
    )
}

// <Formik
//     enableReinitialize
//     initialValues={{ name: '' }}
//     onSubmit=}
// >
//     {(props) => (
//         <Form
//             style={{
//                 width: '100%',
//                 display: 'flex',
//                 alignItems: 'center',
//             }}
//         >
//             <Input
//                 placeholder="Add a checklist item"
//                 name="name"
//                 variant="unstyled"
//                 onChange={props.handleChange}
//                 onBlur={props.handleSubmit}
//                 value={props.values.name}
//                 onSubmit={props.handleSubmit}
//                 autoComplete="off"
//                 className="office-otter-form"
//             />
//         </Form>
//     )}
// </Formik>

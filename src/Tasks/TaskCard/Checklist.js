import React, { useEffect, useState, useContext } from 'react'
import {
    Box,
    Text,
    Flex,
    Input,
    VStack,
    Tooltip,
    Checkbox,
    Progress,
} from '@chakra-ui/react'
import {
    useSensor,
    useSensors,
    DndContext,
    PointerSensor,
    KeyboardSensor,
    rectIntersection,
} from '@dnd-kit/core'
import {
    useSortable,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
    useCreateChecklistItem,
    useDeleteChecklistItem,
    useUpdateChecklistItem,
} from '../../Hooks/ChecklistHooks'
import { CSS } from '@dnd-kit/utilities'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { useCreateTask, useUpdateTask } from '../../Hooks/TasksHooks'
import { DragAndDropIcon, PencilSquareIcon } from '../../ChakraDesign/Icons'

export default function Checklist({ task, checklist, noAutoFocus }) {
    // state for dnd
    const [items, setItems] = useState(checklist)

    const [progress, setProgress] = useState([
        checklist?.filter((item) => item.completedDate).length,
        checklist?.length,
    ])

    useEffect(() => {
        setItems(checklist)
    }, [checklist])

    return (
        <VStack pl="0px" margin="8px 0px">
            {items?.length > 0 && (
                <Flex mr="24px" pl="40px" width="100%" alignItems="center">
                    <Progress
                        height="8px"
                        width="100%"
                        marginRight="16px"
                        borderRadius="16px"
                        backgroundColor="gray.50"
                        value={(progress[0] / progress[1]) * 100}
                        sx={{
                            '& > div:first-child': {
                                transitionProperty: 'width',
                                backgroundColor: 'purple.300',
                            },
                        }}
                    />

                    <Text fontSize="small" color="grey.900" fontWeight="bold">
                        {progress[0]}/{progress[1]}
                    </Text>
                </Flex>
            )}
            <NewChecklistItemForm
                task={task}
                items={items}
                progress={progress}
                setProgress={setProgress}
                noAutoFocus={noAutoFocus}
            />
            <ItemsList
                task={task}
                items={items}
                setItems={setItems}
                progress={progress}
                setProgress={setProgress}
            />
        </VStack>
    )
}

const ItemsList = ({ items, setItems, task, progress, setProgress }) => {
    // query
    const updateTask = useUpdateTask()

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

    const onSortEnd = async (oldItemId, newItemId) => {
        // grab relevant indices
        let oldIndex = items.findIndex((object) => {
            return object._id === oldItemId
        })
        let newIndex = items.findIndex((object) => {
            return object._id === newItemId
        })

        // reorder the array
        const newItems = Array.from(items)
        const [removed] = newItems.splice(oldIndex, 1)
        newItems.splice(newIndex, 0, removed)

        // update state and queries
        setItems(newItems)
        updateTask.mutate({ ...task, checklist: newItems })
    }

    return (
        <>
            {items?.length > 0 && (
                <VStack width="100%">
                    <DndContext
                        sensors={sensors}
                        onDragEnd={handleDragEnd}
                        modifiers={getDndModifiers()}
                        collisionDetection={rectIntersection}
                    >
                        <SortableContext
                            items={items?.map((i) => i._id)}
                            strategy={verticalListSortingStrategy}
                        >
                            {items?.map(
                                (item) =>
                                    !item.completedDate && (
                                        <ChecklistItem
                                            item={item}
                                            task={task}
                                            id={item._id}
                                            key={item._id}
                                            progress={progress}
                                            draggingId={draggingId}
                                            setProgress={setProgress}
                                            setDraggingId={setDraggingId}
                                        />
                                    )
                            )}
                        </SortableContext>
                    </DndContext>
                    {items?.filter((item) => item.completedDate).length > 0 && (
                        <Flex pl="8px" width="100%" justifyContent="flex-start">
                            <Text
                                mb="4px"
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
                                    items.filter((i) => i.completedDate)
                                        .length +
                                    ')'}
                            </Text>
                        </Flex>
                    )}
                    {shouldShowCompletedItems &&
                        items?.map(
                            (item) =>
                                item.completedDate && (
                                    <ChecklistItem
                                        item={item}
                                        task={task}
                                        id={item._id}
                                        key={item._id}
                                        progress={progress}
                                        draggingId={draggingId}
                                        setProgress={setProgress}
                                        setDraggingId={setDraggingId}
                                    />
                                )
                        )}
                </VStack>
            )}
        </>
    )
}

const ChecklistItem = ({
    item,
    task,
    progress,
    draggingId,
    setProgress,
    setDraggingId,
}) => {
    // query
    const createTask = useCreateTask()
    const updateChecklistItem = useUpdateChecklistItem()
    const deleteChecklistItem = useDeleteChecklistItem()

    // state
    const [isHovered, setIsHovered] = useState(false)
    const [isChecked, setIsChecked] = useState(Boolean(item.completedDate))

    // dnd styles and handlers
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: item._id })

    let style = {
        transition,
        marginTop: 0,
        transform: CSS.Translate.toString(transform),
        pointerEvents: draggingId !== null && draggingId !== item._id && 'none',
    }

    const handleDragStart = () => {
        setDraggingId(item._id)
    }
    const handleDragStop = () => {
        setDraggingId(null)
    }

    // item handlers
    const handleCheck = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setIsChecked(!isChecked)

        if (!item.completedDate) {
            setProgress([progress[0] + 1, progress[1]])
            setTimeout(() => {
                updateChecklistItem.mutate({
                    item,
                    task,
                    updates: { completedDate: new Date() },
                })
            }, 1000)
        } else {
            setProgress([progress[0] - 1, progress[1]])
            updateChecklistItem.mutate({
                item,
                task,
                updates: { completedDate: null },
            })
        }
    }

    const editName = (newName) => {
        const input = document.getElementById(`item-${item._id}`)
        input.blur()
        updateChecklistItem.mutate({ item, task, updates: { name: newName } })
    }

    const convertToTask = async () => {
        createTask.mutate({
            name: item.name,
            when: task.when,
            due: task.due,
            labels: [...task.labels],
            from: 'checklist',
        })
        deleteChecklistItem.mutate({ item, task })
        const newProgress = item.completedDate ? progress[0] - 1 : progress[0]
        setProgress([newProgress, progress[1] - 1])
    }

    // anchor tooltip using refs
    const ForwardRefWrapper = React.forwardRef(({ children, ...rest }, ref) => (
        <span ref={ref} {...rest}>
            {children}
        </span>
    ))

    const CustomTooltip = ({ label, children }) => (
        <Tooltip label={label}>
            <ForwardRefWrapper>{children}</ForwardRefWrapper>
        </Tooltip>
    )

    return (
        <Flex
            h="40px"
            w="100%"
            id="parent"
            style={style}
            ref={setNodeRef}
            alignItems="center"
            justifyContent="flex-start"
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                {...listeners}
                {...attributes}
                id="handyhands"
                onMouseUp={handleDragStop}
                onMouseDown={handleDragStart}
                style={{
                    marginRight: 7,
                    marginLeft: -4,
                    visibility: !isHovered && 'hidden',
                }}
            >
                <DragAndDropIcon color="#b1bdd1" />
            </div>

            <Flex onClick={handleCheck}>
                <Checkbox
                    size="lg"
                    marginRight="4px"
                    colorScheme="purple"
                    isChecked={isChecked}
                />
            </Flex>
            <Box w="100%" overflow="hidden">
                {!item.completedDate ? (
                    <>
                        {!isChecked ? (
                            <Input
                                h="30px"
                                p="2px 8px"
                                border="none"
                                id={`item-${item._id}`}
                                defaultValue={item.name}
                                className="strike"
                                onBlur={(event) => editName(event.target.value)}
                                onKeyDown={(event) =>
                                    event.keyCode === 13 &&
                                    editName(event.target.value)
                                }
                                _focus={{
                                    boxShadow: 'none',
                                    backgroundColor: 'rgba(118, 61, 225, 0.1)',
                                }}
                            />
                        ) : (
                            <span
                                className="strike"
                                style={{ marginLeft: '8px' }}
                            >
                                {item.name}
                            </span>
                        )}
                    </>
                ) : (
                    <span
                        style={{
                            marginLeft: '8px',
                            textDecoration: 'line-through',
                        }}
                    >
                        {item.name}
                    </span>
                )}
            </Box>
            {isHovered && (
                <CustomTooltip label="Convert to task">
                    <PencilSquareIcon
                        mr="8px"
                        onClick={convertToTask}
                        _hover={{ color: 'purple.500' }}
                    />
                </CustomTooltip>
            )}
        </Flex>
    )
}

const NewChecklistItemForm = ({
    task,
    items,
    progress,
    setProgress,
    noAutoFocus,
}) => {
    const [newItemName, setNewItemName] = useState('')
    const createChecklistItem = useCreateChecklistItem()

    const createItem = async (newName) => {
        setNewItemName('')
        if (newName) {
            const item = {
                name: newName,
                position:
                    items.length === 0
                        ? 1000
                        : items[items.length - 1].position + 10,
            }
            createChecklistItem.mutate({ item, task })
            setProgress([progress[0], progress[1] + 1])
        }
    }

    return (
        <Flex pl="20px" width="100%">
            <Input
                height="30px"
                padding="2px 8px"
                borderWidth="0px"
                value={newItemName}
                placeholder="Add a checklist item..."
                onBlur={() => createItem(newItemName)}
                onChange={(event) => setNewItemName(event.target.value)}
                onKeyDown={(event) => {
                    event.keyCode === 13 && createItem(newItemName)
                }}
                _focus={{
                    boxShadow: 'none',
                    borderWidth: '0px',
                    backgroundColor: 'rgba(118, 61, 225, 0.1)',
                }}
                autoFocus={noAutoFocus ? false : true}
            />
        </Flex>
    )
}

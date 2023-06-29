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

export default function Checklist({ task, checklist }) {
    // state for dnd
    const [items, setItems] = useState(checklist)

    const progress = [
        checklist?.filter((item) => item.completedDate).length,
        checklist?.length,
    ]

    useEffect(() => {
        setItems(checklist)
    }, [checklist])

    return (
        <VStack pl="20px" margin="8px 0px">
            {items?.length > 0 && (
                <Flex mr="24px" pl="20px" width="100%" alignItems="center">
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
            <NewChecklistItemForm task={task} items={items} />
            <ItemsList task={task} items={items} setItems={setItems} />
        </VStack>
    )
}

const ItemsList = ({ items, setItems, task }) => {
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
        <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
            modifiers={getDndModifiers()}
            collisionDetection={rectIntersection}
        >
            {items?.length > 0 && (
                <SortableContext
                    items={items?.map((i) => i._id)}
                    strategy={verticalListSortingStrategy}
                >
                    <VStack width="100%">
                        {items?.map(
                            (item) =>
                                !item.completedDate && (
                                    <ChecklistItem
                                        item={item}
                                        task={task}
                                        id={item._id}
                                        key={item._id}
                                        draggingId={draggingId}
                                        setDraggingId={setDraggingId}
                                    />
                                )
                        )}
                        {items?.filter((item) => item.completedDate).length >
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
                                    {!shouldShowCompletedItems
                                        ? 'Show '
                                        : 'Hide '}
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
                                            draggingId={draggingId}
                                            setDraggingId={setDraggingId}
                                        />
                                    )
                            )}
                    </VStack>
                </SortableContext>
            )}
        </DndContext>
    )
}

const ChecklistItem = ({ item, task, draggingId, setDraggingId }) => {
    // query
    const createTask = useCreateTask()
    const updateChecklistItem = useUpdateChecklistItem()
    const deleteChecklistItem = useDeleteChecklistItem()

    // state
    const [isHovered, setIsHovered] = useState(false)

    // dnd styles and handlers
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: item._id })

    let style = {
        transform: CSS.Translate.toString(transform),
        transition,
        pointerEvents: draggingId !== null && draggingId !== item._id && 'none',
        marginTop: 0,
    }

    const handleDragStart = () => {
        setDraggingId(item._id)
    }
    const handleDragStop = () => {
        setDraggingId(null)
    }

    // item handlers
    const handleCheck = () => {
        const completedDate = !item.completedDate ? new Date() : null
        updateChecklistItem.mutate({
            item,
            task,
            updates: { completedDate },
        })
    }

    const editName = (newName) => {
        const input = document.getElementById(`item-${item._id}`)
        input.blur()
        updateChecklistItem.mutate({ item, task, updates: { name: newName } })
    }

    const convertToTask = async () => {
        createTask.mutate({ name: item.name })
        deleteChecklistItem.mutate({ item, task })
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
                className={'hidden-child'}
                style={{ marginRight: 12 }}
                onMouseUp={handleDragStop}
                onMouseDown={handleDragStart}
            >
                <DragAndDropIcon color="#b1bdd1" />
            </div>
            <Checkbox
                size="lg"
                marginRight="4px"
                colorScheme="purple"
                onChange={handleCheck}
                style={{ cursor: 'pointer' }}
                isChecked={item.completedDate}
            />
            <Box w="100%" overflow="hidden">
                <Input
                    h="30px"
                    p="2px 8px"
                    border="none"
                    id={`item-${item._id}`}
                    defaultValue={item.name}
                    onBlur={(event) => editName(event.target.value)}
                    onKeyDown={(event) =>
                        event.keyCode === 13 && editName(event.target.value)
                    }
                    _focus={{
                        boxShadow: 'none',
                        backgroundColor: 'rgba(118, 61, 225, 0.1)',
                    }}
                />
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

const NewChecklistItemForm = ({ task, items }) => {
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
        }
    }

    return (
        <Flex width="100%">
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
            />
        </Flex>
    )
}

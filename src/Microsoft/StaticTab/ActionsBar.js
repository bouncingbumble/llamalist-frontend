import React, { useState, useContext } from 'react'
import { format } from 'date-fns'
import { apiCall } from '../../Util/api'
import { isOverDue } from '../../Util/timeUtils'
import { UserContext } from '../../Contexts/UserContext'
import { TasksContext } from '../../Contexts/TasksContext'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Box,
    Flex,
    Button,
    Tooltip,
    Text,
} from '@chakra-ui/react'
import {
    ActivityIcon,
    CarrotIcon,
    ClockIcon,
    LabelIcon,
    TrashIcon,
    InfoIcon,
} from '../../ChakraDesign/Icons'
import LabelModal from '../../Tasks/LabelModal'
import DueDateModal from '../../Tasks/DueDateModal'

export default function ActionsBar({
    due,
    setDue,
    taskLabels,
    setTaskLabels,
    taskId,
    taskUrgency,
    isCompleted,
    notifications,
    setNotifications,
    createNotification,
    handleDeleteNotification,
}) {
    const { user } = useContext(UserContext)
    const { tasks, setTasks, updateTask, deleteTask, changeTasksUrgency } =
        useContext(TasksContext)

    const [isDueDateModalOpen, setIsDueDateModalOpen] = useState(false)
    const [isLabelsModalOpen, setIsLabelsModalOpen] = useState(false)
    const [isNotificationsModalOpen, setIsNotificationsModalOpen] =
        useState(false)

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

    // label actions
    const updateTaskLabels = (newLabels) => {
        updateTask(taskId, { labels: newLabels }, taskUrgency)
    }

    // due date actions
    const handleUpdateDueDate = (newData) => {
        setDue(newData.due)
        updateTask(taskId, newData, 'all tasks')
    }

    return (
        <Flex justify="space-between" mt="24px">
            <Flex alignItems="center">
                <Menu isLazy>
                    <MenuButton
                        as={Button}
                        rightIcon={<CarrotIcon />}
                        minWidth="136px"
                        height="40px"
                        display="flex"
                        alignItems="center"
                        fontSize="md"
                        color="purple.500"
                        justifyContent="space-between"
                    ></MenuButton>
                    <MenuList></MenuList>
                </Menu>
                {due && (
                    <CustomTooltip label="The urgency of this task is being ottermatically updated because it has a due date set.">
                        <span>
                            <InfoIcon
                                fill="pink.500"
                                h="16px"
                                w="16px"
                                marginLeft="4px"
                            />
                        </span>
                    </CustomTooltip>
                )}
                <Box marginLeft="16px">
                    {taskLabels.map((label) => (
                        <Button
                            variant="chip-colored"
                            background={
                                label.color === '' ? 'purple.500' : label.color
                            }
                            onClick={() => setIsLabelsModalOpen(true)}
                        >
                            {label.name}
                        </Button>
                    ))}
                </Box>
            </Flex>
            <Flex alignItems="center">
                <Flex
                    alignItems="center"
                    display={{ base: 'none', lg: 'flex' }}
                >
                    <Button
                        variant="icon-button-text"
                        onClick={() => setIsLabelsModalOpen(true)}
                        leftIcon={<LabelIcon marginRight="0px" />}
                    >
                        Label
                    </Button>
                    <Button
                        variant="icon-button-text"
                        onClick={() => setIsDueDateModalOpen(true)}
                        leftIcon={<ClockIcon />}
                    >
                        {due ? (
                            <Text
                                fontSize="sm"
                                alignSelf="center"
                                color={
                                    isOverDue(due) ? 'red.500' : 'colors.black'
                                }
                                display={{
                                    base: 'none',
                                    md: 'flex',
                                }}
                                marginLeft="4px"
                                marginRight="4px"
                            >
                                {format(new Date(due), 'M/d, h:mma')}
                            </Text>
                        ) : (
                            'Due'
                        )}
                    </Button>
                    <Button
                        variant="icon-button-text"
                        onClick={() => setIsNotificationsModalOpen(true)}
                        leftIcon={<ActivityIcon />}
                    >
                        Remind
                    </Button>
                    <Button
                        variant="icon-button-text"
                        onClick={() => deleteTask(taskId)}
                        leftIcon={<TrashIcon />}
                    >
                        Delete
                    </Button>
                </Flex>
            </Flex>
            {/* MODALS */}
            {isLabelsModalOpen && (
                <LabelModal
                    cards={tasks}
                    setCards={setTasks}
                    isOpen={isLabelsModalOpen}
                    selectedLabels={taskLabels}
                    setSelectedLabels={setTaskLabels}
                    updateCardLabels={updateTaskLabels}
                    onClose={() => setIsLabelsModalOpen(false)}
                />
            )}
            {isDueDateModalOpen && (
                <DueDateModal
                    due={due}
                    submit={(data) => handleUpdateDueDate(data)}
                    user={user}
                    isOpen={isDueDateModalOpen}
                    onClose={() => setIsDueDateModalOpen(false)}
                    urgencyDescription
                    urgency={taskUrgency}
                    taskId={taskId}
                />
            )}
        </Flex>
    )
}

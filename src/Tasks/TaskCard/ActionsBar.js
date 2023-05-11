import React, { useState, useContext } from 'react'
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
    CalendarIcon,
    KebabIcon,
    AttachmentIcon,
    TemplateIcon,
    TrashIcon,
    InfoIcon,
    PushPinIcon,
    HourglassIcon,
} from '../../ChakraDesign/Icons'
import { format } from 'date-fns'
import { apiCall } from '../../Util/api'
import { isOverDue } from '../../Util/timeUtils'
import { UserContext } from '../../Contexts/UserContext'
import { TasksContext } from '../../Contexts/TasksContext'
import LabelModal from '../LabelModal'
import DueDateModal from '../DueDateModal'

export default function ActionsBar({
    task,
    cards,
    setCards,
    taskUrgency,
    taskLabels,
    setTaskLabels,
    due,
    handleUpdateDueDate,
    updateCompletedTask,
    createGoogleCalendarEvent,
    createNotification,
    notifications,
    setNotifications,
    saveAsTemplate,
    handleDeleteNotification,
    shareLinkPermissionType,
    isCompleted,
    urgency,
    isPinned,
}) {
    // stat variables
    const [isDueDateModalOpen, setIsDueDateModalOpen] = useState(false)
    const [isLabelsModalOpen, setIsLabelsModalOpen] = useState(false)
    const [isTimeKeepingModalOpen, setIsTimeKeepingModalOpen] = useState(false)
    const [isNotificationsModalOpen, setIsNotificationsModalOpen] =
        useState(false)

    // context variables
    const { user } = useContext(UserContext)
    const { updateTask, deleteTask, changeTasksUrgency } =
        useContext(TasksContext)

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

    const UrgencySelector = React.forwardRef(({ children, ...rest }, ref) => (
        <span ref={ref} {...rest}>
            <Button
                rightIcon={<CarrotIcon />}
                minWidth="136px"
                height="40px"
                display="flex"
                alignItems="center"
                fontSize="md"
                color="purple.500"
                justifyContent="space-between"
            >
                {children}
            </Button>
        </span>
    ))

    const MoreActionsButton = React.forwardRef(({ children, ...rest }, ref) => (
        <span ref={ref} {...rest}>
            <Button variant="more-actions" leftIcon={<KebabIcon />}>
                {children}
            </Button>
        </span>
    ))

    const updateTaskLabels = (newLabels) => {
        if (updateCompletedTask) {
            updateCompletedTask(task._id, { labels: newLabels })
        } else {
            updateTask(task._id, { labels: newLabels }, urgency)
        }
    }

    return (
        <Flex justifyContent="space-between" marginTop="24px">
            <Flex alignItems="center">
                <Menu isLazy>
                    <CustomTooltip label="Set urgency">
                        <MenuButton as={UrgencySelector}></MenuButton>
                    </CustomTooltip>
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
                    {isPinned && (
                        <CustomTooltip label="Unpin task">
                            <Button
                                variant="icon-button-text"
                                onClick={() =>
                                    updateTask(
                                        task._id,
                                        {
                                            isPinned: false,
                                        },
                                        urgency
                                    )
                                }
                                leftIcon={<PushPinIcon marginRight="0px" />}
                            >
                                Unpin
                            </Button>
                        </CustomTooltip>
                    )}
                    <CustomTooltip label="Add and remove labels">
                        <Button
                            variant="icon-button-text"
                            onClick={() => setIsLabelsModalOpen(true)}
                            leftIcon={<LabelIcon marginRight="0px" />}
                        >
                            Label
                        </Button>
                    </CustomTooltip>
                    <CustomTooltip label="Set a due date & your task will auto-sort">
                        <Button
                            variant="icon-button-text"
                            onClick={() => setIsDueDateModalOpen(true)}
                            leftIcon={<ClockIcon />}
                            maxW="none"
                        >
                            {due ? (
                                <Text
                                    fontSize="sm"
                                    alignSelf="center"
                                    color={
                                        isOverDue(due)
                                            ? 'red.500'
                                            : 'colors.black'
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
                    </CustomTooltip>
                    <CustomTooltip label="Set a notification">
                        <Button
                            variant="icon-button-text"
                            onClick={() => setIsNotificationsModalOpen(true)}
                            leftIcon={<ActivityIcon />}
                        >
                            Remind
                        </Button>
                    </CustomTooltip>
                </Flex>
                <Menu isLazy placement="left">
                    <CustomTooltip label="More actions">
                        <MenuButton as={MoreActionsButton}>More</MenuButton>
                    </CustomTooltip>
                    <MenuList>
                        <MenuItem
                            display={{ base: 'block', md: 'none' }}
                            icon={<ClockIcon width="24px" />}
                            onClick={() => setIsDueDateModalOpen(true)}
                        >
                            Set Due Date
                        </MenuItem>
                        <MenuItem
                            display={{ base: 'block', md: 'none' }}
                            icon={<ActivityIcon width="24px" />}
                            onClick={() => setIsNotificationsModalOpen(true)}
                        >
                            Set Notification
                        </MenuItem>
                        <MenuItem
                            display={{ base: 'block', md: 'none' }}
                            icon={<LabelIcon width="24px" />}
                            onClick={() => setIsLabelsModalOpen(true)}
                        >
                            Add Label
                        </MenuItem>
                        <MenuItem
                            icon={<HourglassIcon width="24px" />}
                            onClick={() => setIsTimeKeepingModalOpen(true)}
                        >
                            Track Time
                        </MenuItem>
                        <MenuItem
                            icon={<PushPinIcon width="24px" />}
                            onClick={() => {
                                updateTask(
                                    task._id,
                                    {
                                        isPinned: isPinned ? false : true,
                                    },
                                    urgency
                                )
                            }}
                        >
                            {isPinned ? 'Unpin task' : 'Pin task'}
                        </MenuItem>
                        <MenuItem
                            icon={<CalendarIcon width="24px" />}
                            onClick={createGoogleCalendarEvent}
                        >
                            Add to calendar
                        </MenuItem>
                        <MenuItem
                            icon={<TemplateIcon width="24px" />}
                            onClick={() => saveAsTemplate()}
                        >
                            Save as Template
                        </MenuItem>
                        {urgency !== 4 && (
                            <MenuItem
                                icon={<TrashIcon width="24px" />}
                                onClick={() => deleteTask(task._id)}
                            >
                                Delete
                            </MenuItem>
                        )}
                    </MenuList>
                </Menu>
            </Flex>
            {isDueDateModalOpen && (
                <DueDateModal
                    due={due}
                    submit={(data) => handleUpdateDueDate(data)}
                    isOpen={isDueDateModalOpen}
                    onClose={() => setIsDueDateModalOpen(false)}
                    urgencyDescription
                    urgency={urgency}
                    taskId={task._id}
                />
            )}
            {isLabelsModalOpen && (
                <LabelModal
                    cards={cards}
                    setCards={setCards}
                    isOpen={isLabelsModalOpen}
                    selectedLabels={taskLabels}
                    setSelectedLabels={setTaskLabels}
                    updateCardLabels={updateTaskLabels}
                    onClose={() => setIsLabelsModalOpen(false)}
                />
            )}
        </Flex>
    )
}

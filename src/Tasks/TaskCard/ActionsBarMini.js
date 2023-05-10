import React, { useState, useContext } from 'react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Flex,
    Button,
} from '@chakra-ui/react'
import {
    ActivityIcon,
    ClockIcon,
    LabelIcon,
    CalendarIcon,
    KebabIcon,
    AttachmentIcon,
    TemplateIcon,
    TrashIcon,
    PushPinIcon,
    HourglassIcon,
} from '../../ChakraDesign/Icons'
import { UserContext } from '../../Contexts/UserContext'
import { TasksContext } from '../../Contexts/TasksContext'
import { apiCall } from '../../Util/api'
import LabelModal from '../LabelModal'
import NotificationModal from '../NotificationModal'
import DueDateModal from '../DueDateModal'

export default function ActionsBarMini({
    task,
    cards,
    setCards,
    taskLabels,
    setTaskLabels,
    due,
    updateCompletedTask,
    handleUpdateDueDate,
    createGoogleCalendarEvent,
    createNotification,
    notifications,
    setNotifications,
    saveAsTemplate,
    handleDeleteNotification,
    shareLinkPermissionType,
    urgency,
    isPinned,
}) {
    // state variables
    const [isDueDateModalOpen, setIsDueDateModalOpen] = useState(false)
    const [isLabelsModalOpen, setIsLabelsModalOpen] = useState(false)
    const [isNotificationsModalOpen, setIsNotificationsModalOpen] =
        useState(false)
    const [isTimeKeepingModalOpen, setIsTimeKeepingModalOpen] = useState(false)

    // context variables
    const { user } = useContext(UserContext)
    const { updateTask, deleteTask } = useContext(TasksContext)

    const updateTaskLabels = (newLabels) => {
        if (updateCompletedTask) {
            updateCompletedTask(task._id, { labels: newLabels })
        } else {
            updateTask(task._id, { labels: newLabels }, urgency)
        }
    }

    return (
        <Flex
            justifyContent="space-between"
            style={{
                zIndex: 500,
                backgroundColor: '#f7f9fc',
                height: 40,
                marginTop: -40,
                position: 'sticky',
                width: 300,
                marginLeft: -300,
            }}
            boxShadow="hard"
            borderRadius="20px"
            display={{ base: 'none', md: 'flex' }}
            className="minibarchild"
        >
            <Flex alignItems="center">
                <Flex alignItems="center">
                    <Button
                        variant="icon-button-text-mini"
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsLabelsModalOpen(true)
                        }}
                        leftIcon={<LabelIcon marginRight="0px" w={5} h={5} />}
                    >
                        Label
                    </Button>
                    <Button
                        variant="icon-button-text-mini"
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsDueDateModalOpen(true)
                        }}
                        leftIcon={<ClockIcon w={5} h={5} />}
                    >
                        Due
                    </Button>
                    <Button
                        variant="icon-button-text-mini"
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsNotificationsModalOpen(true)
                        }}
                        leftIcon={<ActivityIcon w={5} h={5} />}
                    >
                        Remind
                    </Button>
                </Flex>
                <Menu
                    isLazy
                    placement="bottom-start"
                    preventOverflow
                    computePositionOnMount
                    strategy="fixed"
                    position="absolute"
                >
                    <MenuButton
                        as={Button}
                        variant="icon-button-text-mini"
                        leftIcon={<KebabIcon marginRight="-16px" w={5} h={5} />}
                        onClick={(e) => e.stopPropagation()}
                    >
                        More
                    </MenuButton>
                    <MenuList zIndex="3000">
                        <MenuItem
                            icon={<CalendarIcon width="24px" />}
                            onClick={createGoogleCalendarEvent}
                        >
                            Add to calendar
                        </MenuItem>
                        {urgency !== 4 && (
                            <MenuItem
                                icon={<TrashIcon width="24px" />}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    deleteTask(task._id)
                                }}
                            >
                                Delete
                            </MenuItem>
                        )}
                    </MenuList>
                </Menu>
            </Flex>
            {/* MODALS */}
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
            {isNotificationsModalOpen && (
                <NotificationModal
                    usersNotificationType={user.notificationSettings.type}
                    submit={createNotification}
                    notifications={notifications}
                    setNotifications={setNotifications}
                    handleDeleteNotification={handleDeleteNotification}
                    isOpen={isNotificationsModalOpen}
                    onClose={() => setIsNotificationsModalOpen(false)}
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

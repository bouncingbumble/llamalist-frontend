import React, { useState } from 'react'
import {
    Box,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Flex,
    Button,
    Tooltip,
    Text,
} from '@chakra-ui/react'
import {
    ActivityIcon,
    ClockIcon,
    TrashIcon,
    MeatballIcon,
    AddTaskIcon,
} from '../../ChakraDesign/Icons'
import { isOverDue } from '../../Util/timeUtils'
import { format } from 'date-fns'
import DueDateModal from '../DueDateModal'

export default function ChecklistActionsBar({
    updateItem,
    item,
    items,
    setItems,
    handleChecklistToTask,
    sectionUrgency,
    deleteChecklistItem,
    dueDate,
    setDueDate,
    notifications,
    user,
    setNotifications,
    createNotification,
    handleDeleteNotification,
}) {
    const handleUpdateDueDate = async (dueDate) => {
        setDueDate(dueDate.due)
        const updatedItem = await updateItem(item._id, dueDate)

        let newItems = [...items]
        newItems = newItems.map((i) => {
            if (i._id === item._id) {
                i.due = dueDate.due
            }
            return i
        })
        setItems(newItems)
        setNotifications([...updatedItem.notifications])
    }

    const [isDueDateModalOpen, setIsDueDateModalOpen] = useState(false)
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

    const MoreActionsButton = React.forwardRef(({ children, ...rest }, ref) => (
        <span ref={ref} {...rest}>
            <Button variant="icon-button">{children}</Button>
        </span>
    ))

    return (
        <Box className={!dueDate && 'hidden-child'} marginLeft="auto">
            <Flex alignItems="center">
                <Flex
                    alignItems="center"
                    display={{ base: 'none', md: 'flex' }}
                >
                    <Menu isLazy>
                        <Flex>
                            <CustomTooltip label="Set a due date">
                                <Button
                                    variant="icon-button"
                                    onClick={() => setIsDueDateModalOpen(true)}
                                >
                                    <ClockIcon />
                                </Button>
                            </CustomTooltip>
                            {dueDate && (
                                <Text
                                    fontSize="sm"
                                    alignSelf="center"
                                    color={
                                        isOverDue(dueDate)
                                            ? 'red.500'
                                            : 'colors.black'
                                    }
                                    display={{
                                        base: 'none',
                                        md: 'flex',
                                    }}
                                    width="114px !important"
                                >
                                    {format(new Date(dueDate), 'MMM d, h:mma')}
                                </Text>
                            )}
                        </Flex>

                        <CustomTooltip label="Set a notification">
                            <Button
                                variant="icon-button"
                                onClick={() =>
                                    setIsNotificationsModalOpen(true)
                                }
                            >
                                <ActivityIcon />
                                {notifications.filter((n) => !n.sent).length >
                                    0 && <div className="badge"></div>}
                            </Button>
                        </CustomTooltip>
                    </Menu>
                </Flex>
                <Menu isLazy>
                    <CustomTooltip label="More actions">
                        <MenuButton as={MoreActionsButton}>
                            <MeatballIcon />
                        </MenuButton>
                    </CustomTooltip>
                    <MenuList>
                        <MenuItem
                            display={{ base: 'block', md: 'none' }}
                            icon={<ClockIcon />}
                            onClick={() => setIsDueDateModalOpen(true)}
                        >
                            Set Due Date
                        </MenuItem>
                        <MenuItem
                            display={{ base: 'block', md: 'none' }}
                            icon={<ActivityIcon />}
                            onClick={() => setIsNotificationsModalOpen(true)}
                        >
                            Set Notification
                        </MenuItem>

                        {sectionUrgency !== 'all tasks' &&
                            Number(sectionUrgency) !== 4 && (
                                <MenuItem
                                    icon={<AddTaskIcon />}
                                    onClick={() => handleChecklistToTask(item)}
                                >
                                    Convert to Task
                                </MenuItem>
                            )}
                        <MenuItem
                            icon={<TrashIcon />}
                            onClick={() => deleteChecklistItem(item._id)}
                        >
                            Delete
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
            {isDueDateModalOpen && (
                <DueDateModal
                    due={dueDate}
                    submit={(data) => handleUpdateDueDate(data)}
                    user={user}
                    isOpen={isDueDateModalOpen}
                    onClose={() => setIsDueDateModalOpen(false)}
                />
            )}
        </Box>
    )
}

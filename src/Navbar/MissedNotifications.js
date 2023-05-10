import React, { useState, useEffect } from 'react'
import {
    Box,
    Checkbox,
    Flex,
    Text,
    Tooltip,
    Button,
    VStack,
} from '@chakra-ui/react'
import format from 'date-fns/format'
import { apiCall } from '../Util/api'
import { ActivityIcon } from '../ChakraDesign/Icons'
import OOModal from '../SharedComponents/OOModal'

export default function MissedNotifications({ user }) {
    const [checkboxHovered, setCheckboxHovered] = useState([])
    const [missedNotifications, setMissedNotifications] = useState([])
    const [isMissedNotificationsModalOpen, setIsMissedNotificationsModalOpen] =
        useState(false)

    useEffect(() => {
        getMissedNotifications()
    }, [])

    useEffect(() => {
        setCheckboxHovered(Array(missedNotifications.length).fill(false))
    }, [missedNotifications])

    const handleCheckboxHover = (index) => {
        let newCheckboxHovered = [...checkboxHovered]
        newCheckboxHovered[index] = true
        setCheckboxHovered(newCheckboxHovered)
    }

    const handleCheckboxUnhover = (index) => {
        let newCheckboxHovered = [...checkboxHovered]
        newCheckboxHovered[index] = false
        setCheckboxHovered(newCheckboxHovered)
    }

    const getMissedNotifications = async () => {
        try {
            let taskNotisMissed = await apiCall(
                'GET',
                `/users/${user._id}/notifications`
            )

            taskNotisMissed = await Promise.all(
                taskNotisMissed.map(async (n) => {
                    const task = await apiCall(
                        'GET',
                        `/users/${user._id}/tasks/taskId/${n.task}`
                    )
                    n.description = task.description
                    n.parent = 'task'

                    return n
                })
            )

            let checklistNotisMissed = await apiCall(
                'GET',
                `/users/${user._id}/checklistNotifications`
            )

            checklistNotisMissed = await Promise.all(
                checklistNotisMissed.map(async (n) => {
                    const item = await apiCall(
                        'GET',
                        `/users/${user._id}/checklist/${n.checklistItem}`
                    )
                    n.description = item.name
                    n.parent = 'checklist'

                    return n
                })
            )

            setMissedNotifications([
                ...taskNotisMissed,
                ...checklistNotisMissed,
            ])
        } catch (error) {
            console.log(error)
        }
    }

    const markAllAsRead = () => {
        try {
            setMissedNotifications([])
            apiCall('PUT', `/users/${user._id}/notifications/allNotis/markAll`)
            apiCall(
                'PUT',
                `/users/${user._id}/checklistNotifications/allNotis/markAll`
            )
        } catch (error) {
            console.log(error)
        }
    }

    const markNotificationRead = async (noti) => {
        try {
            if (noti.parent === 'task') {
                await apiCall(
                    'PUT',
                    `/users/${user._id}/notifications/${noti._id}`,
                    {
                        missed: false,
                    }
                )
            } else if (noti.parent === 'checklist') {
                await apiCall(
                    'PUT',
                    `/users/${user._id}/checklistNotifications/${noti._id}`,
                    { missed: false }
                )
            }

            const newMissedNotifications = [...missedNotifications].filter(
                (n) => n._id !== noti._id
            )

            setMissedNotifications(newMissedNotifications)
        } catch (error) {
            alert(error)
        }
    }

    const ForwardRefWrapper = React.forwardRef(({ children, ...rest }, ref) => (
        <span ref={ref} {...rest}>
            {children}
        </span>
    ))

    const CustomTooltip = ({ label, children }) => (
        <Tooltip label={label} placement="bottom-end">
            <ForwardRefWrapper>{children}</ForwardRefWrapper>
        </Tooltip>
    )

    return (
        <>
            <CustomTooltip label="See your missed notifications">
                <Button
                    variant="icon-button"
                    color="black"
                    onClick={() => setIsMissedNotificationsModalOpen(true)}
                >
                    <ActivityIcon />
                    {missedNotifications.length > 0 && (
                        <div className="badge"></div>
                    )}
                </Button>
            </CustomTooltip>
            {isMissedNotificationsModalOpen && (
                <OOModal
                    title="Missed notifications"
                    isOpen={isMissedNotificationsModalOpen}
                    onClose={() => setIsMissedNotificationsModalOpen(false)}
                    secondaryButton={
                        missedNotifications.length > 0 && {
                            text: 'Clear all',
                            onClick: markAllAsRead,
                        }
                    }
                >
                    {missedNotifications.length > 0 ? (
                        <Box>
                            {missedNotifications.map((n, index) => (
                                <Flex key={n._id}>
                                    <Tooltip
                                        label="Mark as read"
                                        isOpen={checkboxHovered[index]}
                                    >
                                        <Checkbox
                                            onMouseOver={() =>
                                                handleCheckboxHover(index)
                                            }
                                            onMouseLeave={() =>
                                                handleCheckboxUnhover(index)
                                            }
                                            onChange={() =>
                                                markNotificationRead(n)
                                            }
                                        />
                                    </Tooltip>
                                    <VStack ml="8px" alignItems="flex-start">
                                        <Flex>
                                            {n.description &&
                                            n.description.replace(
                                                /<[^>]+>/g,
                                                ''
                                            ).length > 43
                                                ? n.description
                                                      .replace(/<[^>]+>/g, '')
                                                      .substring(0, 42) + '...'
                                                : n.description.replace(
                                                      /<[^>]+>/g,
                                                      ''
                                                  )}
                                        </Flex>
                                        <Text
                                            fontSize="xs"
                                            color="grey.800"
                                            mt="0px !important"
                                        >
                                            {n.parent} {'  '}
                                            {n.timeToSend &&
                                                format(
                                                    new Date(n.timeToSend),
                                                    'MMM d'
                                                )}{' '}
                                            {n.timeToSend &&
                                                format(
                                                    new Date(n.timeToSend),
                                                    'h:mmaaa'
                                                )}
                                        </Text>
                                    </VStack>
                                </Flex>
                            ))}
                        </Box>
                    ) : (
                        <Flex
                            flexDir="column"
                            alignItems="center"
                            justifyContent="center"
                            width="100%"
                        >
                            <img
                                src="otter.ico"
                                alt="otter boi"
                                style={{
                                    width: '20%',
                                    paddingTop: 24,
                                    paddingBottom: 16,
                                }}
                            />
                            <Text fontSize="md">No Missed Notifications!</Text>
                        </Flex>
                    )}
                </OOModal>
            )}
        </>
    )
}

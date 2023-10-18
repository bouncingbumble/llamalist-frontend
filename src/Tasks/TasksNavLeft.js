import React from 'react'
import { Button, Flex, Box, Divider } from '@chakra-ui/react'
import {
    CalendarIcon,
    ListIcon,
    SnoozeIcon,
    SunIcon,
    InboxIcon,
} from '../ChakraDesign/Icons'
import { useParams, useNavigate } from 'react-router-dom'
import { useTasks } from '../Hooks/TasksHooks'
import { isTodayOrEarlier } from './Upcoming'

export default function TasksNav() {
    const { section, selectedLabel } = useParams()
    const tasks = useTasks()

    const navigate = useNavigate()

    const buttons = [
        {
            left: <ListIcon />,
            name: 'All',
            right: tasks.data?.filter((t) => !t.isInbox).length,
        },
        {
            left: <SunIcon />,
            name: 'Today',
            right: tasks.data?.filter((t) => isTodayOrEarlier(t) && !t.isInbox)
                .length,
        },
        {
            left: <CalendarIcon />,
            name: 'Upcoming',
            right: tasks.data?.filter(
                (t) => (t.due || t.when) && !isTodayOrEarlier(t) && !t.isInbox
            ).length,
        },
        {
            left: <SnoozeIcon />,
            name: 'Someday',
            right: tasks.data?.filter((t) => !t.due && !t.when && !t.isInbox)
                .length,
        },
    ]

    return (
        <>
            <Button
                variant={section === 'inbox' && 'ghost'}
                onClick={() => navigate(`/tasks/inbox/${selectedLabel}`)}
                key={'inbox'}
                justifyContent="space-between"
                fontWeight={section === 'inbox' ? '600' : '400'}
                height="48px"
                borderRadius="32px"
                color={section === 'inbox' ? 'purple.500' : 'gray.900'}
                _hover={{
                    bg: '#D6CEF2',
                }}
                width="100%"
                fontSize="22px"
            >
                <Flex width="100%" alignItems="center">
                    <Flex
                        alignSelf="center"
                        fontWeight={'inbox' === section ? '600' : '400'}
                        color={'inbox' === section ? 'purple.500' : 'gray.900'}
                    >
                        <InboxIcon />
                    </Flex>
                    <Box mr="auto" ml="16px" alignSelf="center">
                        Inbox
                    </Box>
                    <Box
                        textColor={
                            'inbox' === section ? 'purple.500' : 'grey.900'
                        }
                        alignSelf="center"
                    >
                        {tasks.data?.filter((t, i) => t.isInbox).length}
                    </Box>
                </Flex>
            </Button>
            <Flex w="100%" mb="8px !important">
                <Divider />
            </Flex>
            {buttons.map((b) => (
                <Button
                    variant={section === b.name.toLowerCase() && 'ghost'}
                    onClick={() =>
                        navigate(
                            `/tasks/${b.name.toLowerCase()}/${selectedLabel}`
                        )
                    }
                    key={b.name}
                    justifyContent="space-between"
                    fontSize="22px"
                    fontWeight={
                        section === b.name.toLowerCase() ? '600' : '400'
                    }
                    height="48px"
                    borderRadius="32px"
                    color={
                        section === b.name.toLowerCase()
                            ? 'purple.500'
                            : 'gray.900'
                    }
                    _hover={{
                        bg: '#D6CEF2',
                    }}
                    width="100%"
                >
                    <Flex width="100%" alignItems="center">
                        <Flex
                            alignSelf="center"
                            fontWeight={
                                section === b.name.toLowerCase() ? '600' : '400'
                            }
                            color={
                                section === b.name.toLowerCase()
                                    ? 'purple.500'
                                    : 'gray.900'
                            }
                        >
                            {b.left}
                        </Flex>
                        <Box mr="auto" ml="16px" alignSelf="center">
                            {b.name}
                        </Box>
                        <Box
                            textColor={
                                section === b.name.toLowerCase()
                                    ? 'purple.500'
                                    : 'grey.900'
                            }
                            alignSelf="center"
                        >
                            {b.right}
                        </Box>
                    </Flex>
                </Button>
            ))}
        </>
    )
}

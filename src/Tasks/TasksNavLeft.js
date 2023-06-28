import React from 'react'
import { Button, Flex, Box } from '@chakra-ui/react'
import {
    CalendarIcon,
    ListIcon,
    SnoozeIcon,
    SunIcon,
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
            right: tasks.data.length,
        },
        {
            left: <SunIcon />,
            name: 'Today',
            right: tasks.data.filter((t) => isTodayOrEarlier(t)).length,
        },
        {
            left: <CalendarIcon />,
            name: 'Upcoming',
            right: tasks.data.filter(
                (t) => (t.due || t.when) && !isTodayOrEarlier(t)
            ).length,
        },
        {
            left: <SnoozeIcon />,
            name: 'Someday',
            right: tasks.data.filter((t) => !t.due && !t.when).length,
        },
    ]

    return buttons.map((b) => (
        <Button
            variant={section === b.name.toLowerCase() && 'ghost'}
            onClick={() =>
                navigate(`/tasks/${b.name.toLowerCase()}/${selectedLabel}`)
            }
            key={b.name}
            justifyContent="space-between"
            fontSize="lg"
            fontWeight={section === b.name.toLowerCase() ? '600' : '400'}
            height="48px"
            mt="0px !important"
            borderRadius="32px"
            color={section === b.name.toLowerCase() ? 'purple.500' : 'gray.900'}
            _hover={{
                bg: '#D6CEF2',
            }}
            width="192px"
        >
            <Flex width="100%" alignItems="center">
                <Flex
                    alignSelf="center"
                    mt="-1px"
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
    ))
}

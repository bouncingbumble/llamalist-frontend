import React from 'react'
import { Button, Flex, Box } from '@chakra-ui/react'
import {
    CalendarIcon,
    ListIcon,
    SnoozeIcon,
    SunIcon,
} from '../ChakraDesign/Icons'

export default function TasksNav({ section, setSection }) {
    const buttons = [
        {
            left: <ListIcon />,
            name: 'All',
            right: '0',
        },
        {
            left: <SunIcon />,
            name: 'Today',
            right: '0',
        },
        {
            left: <CalendarIcon />,
            name: 'Upcoming',
            right: '0',
        },
        {
            left: <SnoozeIcon />,
            name: 'Someday',
            right: '0',
        },
    ]

    return buttons.map((b) => (
        <Button
            variant={section === b.name.toLowerCase() && 'ghost'}
            onClick={() => setSection(b.name.toLowerCase())}
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

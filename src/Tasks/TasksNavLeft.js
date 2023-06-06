import React from 'react'
import { VStack, Divider, Flex } from '@chakra-ui/react'
import LeftNavButton from '../SharedComponents/LeftNavButton'
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
        <LeftNavButton
            left={b.left}
            text={b.name}
            right={0}
            selected={section === b.name.toLowerCase()}
            handleClick={() => setSection(b.name.toLowerCase())}
            key={b.name}
        />
    ))
}

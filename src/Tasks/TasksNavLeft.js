import React from 'react'
import { VStack, Divider, Flex } from '@chakra-ui/react'
import LeftNavButton from '../SharedComponents/LeftNavButton'

export default function TasksNav({ section, setSection }) {
    const buttons = [
        {
            left: '📥',
            name: 'Inbox',
            right: '0',
            value: 'inbox',
        },
        {
            left: '💯',
            name: 'All',
            right: '0',
        },
        {
            left: '☀️',
            name: 'Today',
            right: '0',
        },
        {
            left: '📆',
            name: 'Upcoming',
            right: '0',
        },
        {
            left: '🥱',
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

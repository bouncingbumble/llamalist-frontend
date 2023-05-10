import React, { useContext } from 'react'

import { UserContext } from '../Contexts/UserContext'
import { VStack, Divider } from '@chakra-ui/react'
import BUTTONS from './navButtons'
import LeftNavButton from '../SharedComponents/LeftNavButton'

export default function TasksNav({
    urgency,
    setUrgency,
    sectionTotals,
    unreadInboxTask,
    isZenMode,
    numberOfDueDateTasks,
}) {
    const { user } = useContext(UserContext)

    const handleSetUrgency = (urency) => {
        setUrgency(urency)
    }

    return (
        <VStack justifyItems="center" w="100%">
            <LeftNavButton
                left="💯"
                text="All tasks"
                right={
                    sectionTotals()[0] +
                    sectionTotals()[1] +
                    sectionTotals()[2] +
                    sectionTotals()[3]
                }
                selected={urgency === 'all tasks'}
                handleClick={() => handleSetUrgency('all tasks')}
                isZenMode={isZenMode}
            />
            <LeftNavButton
                left="📆"
                text="Upcoming"
                right={numberOfDueDateTasks}
                selected={urgency === 'Upcoming'}
                handleClick={() => handleSetUrgency('Upcoming')}
                isZenMode={isZenMode}
            />
            {BUTTONS.map((b, i) => (
                <LeftNavButton
                    left={b.left}
                    text={b.text}
                    right={sectionTotals()[i]}
                    selected={urgency === i}
                    handleClick={() => handleSetUrgency(i)}
                    key={i}
                    isZenMode={isZenMode}
                />
            ))}
            <Divider style={{ marginBottom: 8 }} />
            <LeftNavButton
                left={'📥'}
                text="inbox"
                right={sectionTotals()[5]}
                selected={urgency === 'inbox'}
                handleClick={() => handleSetUrgency('inbox')}
                badge={unreadInboxTask}
                isZenMode={isZenMode}
            />
        </VStack>
    )
}

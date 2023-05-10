import React from 'react'
import { VStack, Menu, MenuList, Divider } from '@chakra-ui/react'
import BUTTONS from './navButtons'
import MobileNavButton from '../SharedComponents/MobileNavButton'
import MobileNavMenuItem from '../SharedComponents/MobileNavMenuItem'

export default function TasksNavMobile({
    urgency,
    setUrgency,
    sectionTotals,
    unreadInboxTask,
    numberOfDueDateTasks,
}) {
    return (
        <VStack justifyItems="center" w="100%">
            <Menu>
                {urgency === 'all tasks' ? (
                    <MobileNavButton
                        left={'💯'}
                        text="all Tasks"
                        badge={unreadInboxTask}
                    />
                ) : urgency === 'inbox' ? (
                    <MobileNavButton
                        left={''}
                        text="inbox"
                        badge={unreadInboxTask}
                    />
                ) : urgency === 'Upcoming' ? (
                    <MobileNavButton left={'📆'} text="Upcoming" />
                ) : (
                    <MobileNavButton
                        left={BUTTONS[urgency].left}
                        text={BUTTONS[urgency].text}
                        badge={unreadInboxTask}
                    />
                )}
                <MenuList>
                    <MobileNavMenuItem
                        left={'💯'}
                        text="all Tasks"
                        right={
                            sectionTotals()[0] +
                            sectionTotals()[1] +
                            sectionTotals()[2] +
                            sectionTotals()[3]
                        }
                        selected={urgency === 'all tasks'}
                        handleClick={() => setUrgency('all tasks')}
                    />
                    <MobileNavMenuItem
                        left={'📆'}
                        text="Upcoming"
                        right={numberOfDueDateTasks}
                        selected={urgency === 'Upcoming'}
                        handleClick={() => setUrgency('Upcoming')}
                    />
                    {BUTTONS.map((b, i) => (
                        <MobileNavMenuItem
                            left={b.left}
                            text={b.text}
                            right={sectionTotals()[i]}
                            selected={urgency === i}
                            handleClick={() => setUrgency(i)}
                            key={i}
                        />
                    ))}
                    <Divider color="gray.200" />
                    <MobileNavMenuItem
                        left={'📥'}
                        text={'inbox'}
                        right={sectionTotals()[5]}
                        selected={urgency === 'inbox'}
                        handleClick={() => setUrgency('inbox')}
                        badge={unreadInboxTask}
                    />
                </MenuList>
            </Menu>
        </VStack>
    )
}

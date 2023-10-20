import React from 'react'
import { VStack, Flex, Button, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import Upcoming, { isTodayOrEarlier } from './Upcoming'
import TaskCard from './TaskCard/TaskCard'
import IntroMessageCard from './IntroMessageCard'
import GoldenLlama from '../animations/goldenLlama/GoldenLlama'
import { useTasks } from '../Hooks/TasksHooks'

const INTRO_CARD_MESSAGE = {
    all: {
        color: 'purpleFaded.500',
        title: 'All',
        lines: [
            'See all your tasks ready to be worked on here.',
            'Inbox is a holding zone for tasks without dates or sent in from integrations.',
        ],
    },
    today: {
        color: 'green.500',
        title: 'Today',
        lines: [
            'Tasks scheduled or marked with a deadline for today, overdue tasks, and calendar events occurring today (if linked), appear here.',
            'Come here to know exactly what you need to get done each day.',
        ],
    },
    someday: {
        color: 'blue.500',
        title: 'Someday',
        lines: [
            'Tasks without a date come here. You will get to them eventually ;)',
        ],
    },
    upcoming: {
        color: 'yellow.500',
        title: 'Upcoming',
        lines: [
            'Tasks scheduled or marked with a deadline in the future show up here.',
        ],
    },
    inbox: {
        color: 'aqua.500',
        title: 'Inbox',
        lines: [
            'Centralize your tasks on the go by ',
            <Flex>
                - forwarding emails to
                <Text color="purple.500" ml="4px">
                    tasks@llamalist.com
                </Text>
            </Flex>,
            <Flex alignItems="center">
                - texting in tasks to
                <Text color="purple.500" ml="4px" mr="4px">
                    {' '}
                    805-329-7379
                </Text>
            </Flex>,
            <Flex mb="16px">
                (be sure to add your phone number in your profile first)
            </Flex>,
            'Add a label or date to move them into your list.',
            ,
        ],
    },
}

const AllTasks = ({ tasks, goldenLlama, setGoldenLlama }) =>
    tasks.map((t) => (
        <TaskCard
            taskData={t}
            goldenLlama={goldenLlama}
            setGoldenLlama={setGoldenLlama}
            key={t.key}
        />
    ))

const Today = ({ tasks }) =>
    tasks.map(
        (t) => isTodayOrEarlier(t) && <TaskCard taskData={t} key={t.key} />
    )
const Someday = ({ tasks }) =>
    tasks.map(
        (t, i) => !t.due && !t.when && <TaskCard taskData={t} key={t.key} />
    )

const Inbox = ({ tasks }) =>
    tasks.map((t, i) => t?.isInbox && <TaskCard taskData={t} key={t.key} />)

export default function TasksList({ goldenLlama, setGoldenLlama }) {
    const { section, selectedLabel } = useParams()
    let taskData = useTasks()
    let tasks =
        selectedLabel === 'All Labels'
            ? taskData.data
            : taskData.data?.filter((t) =>
                  t.labels.map((l) => l.name).includes(selectedLabel)
              )
    if (section !== 'inbox') {
        tasks = tasks?.filter((t) => !t.isInbox)
    }
    const PIXELS_SUBTRACT = 80

    return (
        <VStack
            id="tasks-list"
            width="100%"
            overflowY="auto"
            marginLeft="-8px"
            paddingLeft="8px"
            paddingRight="8px"
            height={`calc(100vh - ${PIXELS_SUBTRACT}px)`}
        >
            {taskData.isSuccess && (
                <>
                    <IntroMessageCard
                        color={INTRO_CARD_MESSAGE[section].color}
                        title={INTRO_CARD_MESSAGE[section].title}
                        lines={INTRO_CARD_MESSAGE[section].lines}
                    />
                    {section === 'inbox' && <Inbox tasks={tasks} />}
                    {section === 'all' && (
                        <>
                            <AllTasks
                                tasks={tasks}
                                goldenLlama={goldenLlama}
                                setGoldenLlama={setGoldenLlama}
                            />
                            {!goldenLlama.found && goldenLlama.index === 4 && (
                                <Flex
                                    style={{
                                        marginTop: 'auto',
                                        marginBottom: '2px',
                                    }}
                                >
                                    <GoldenLlama
                                        hidden
                                        goldenLlama={goldenLlama}
                                        setGoldenLlama={setGoldenLlama}
                                    />
                                </Flex>
                            )}
                        </>
                    )}
                    {section === 'today' && (
                        <>
                            <Today tasks={tasks} />
                            {!goldenLlama.found && goldenLlama.index === 5 && (
                                <Flex
                                    style={{
                                        marginTop: 'auto',
                                        marginBottom: '2px',
                                    }}
                                >
                                    <GoldenLlama
                                        hidden
                                        goldenLlama={goldenLlama}
                                        setGoldenLlama={setGoldenLlama}
                                    />
                                </Flex>
                            )}
                        </>
                    )}
                    {section === 'upcoming' && (
                        <>
                            <Upcoming tasks={tasks} />
                            {!goldenLlama.found && goldenLlama.index === 6 && (
                                <Flex style={{ marginTop: 'auto' }}>
                                    <GoldenLlama
                                        hidden
                                        goldenLlama={goldenLlama}
                                        setGoldenLlama={setGoldenLlama}
                                    />
                                </Flex>
                            )}
                        </>
                    )}
                    {section === 'someday' && (
                        <>
                            <Someday tasks={tasks} />
                            {!goldenLlama.found && goldenLlama.index === 7 && (
                                <Flex
                                    style={{
                                        marginTop: 'auto',
                                        marginBottom: '2px',
                                    }}
                                >
                                    <GoldenLlama
                                        hidden
                                        goldenLlama={goldenLlama}
                                        setGoldenLlama={setGoldenLlama}
                                    />
                                </Flex>
                            )}
                        </>
                    )}
                </>
            )}
        </VStack>
    )
}

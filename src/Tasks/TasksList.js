import React, { useContext } from 'react'
import { VStack, Text, Flex, Button } from '@chakra-ui/react'
import { TasksContext } from '../Contexts/TasksContext'
import { LabelsContext } from '../Contexts/LabelsContext'
import TaskCard from './TaskCard/TaskCard'
import { useParams } from 'react-router-dom'
import Upcoming, { isTodayOrEarlier } from './Upcoming'
import NewTaskCard from './NewTaskCard'
import IntroMessageCard from './IntroMessageCard'

export default function TasksList() {
    const { tasks, setTasks } = useContext(TasksContext)
    const { selectedLabels } = useContext(LabelsContext)
    const { section } = useParams()

    const hasSelectedLabel = (task) => {
        let hasLabel = false
        const taskLabelNames = task.labels?.map((t) => t.name)
        const selectedLabelNames = selectedLabels.map((l) => l.name)

        taskLabelNames.map((name) => {
            if (selectedLabelNames.includes(name)) {
                hasLabel = true
            }
        })

        if (selectedLabelNames[0] === 'All Labels') {
            hasLabel = true
        }

        return hasLabel
    }

    const AllTasks = () => tasks.map((t, i) => <NewTaskCard taskData={t} />)

    const Today = () => (
        <>
            <IntroMessageCard
                color="green.500"
                title="Today"
                lines={[
                    'Tasks scheduled for today, tasks due today, and calendar events occurring today (if linked), appear here.',
                    'Come here to know exactly what you need to get done each day.',
                ]}
            />
            {tasks.map(
                (t, i) =>
                    (hasSelectedLabel(t) && isTodayOrEarlier(t.due)) ||
                    (tasks.labels?.filter((l) => l.name).includes('today') && (
                        <NewTaskCard taskData={t} />
                    ))
            )}
        </>
    )

    const Someday = () => (
        <>
            <IntroMessageCard
                color="blue.500"
                title="Someday"
                lines={[
                    'Tasks without a due date or Today label come here for you to get to later.',
                ]}
            />

            {tasks.map(
                (t, i) =>
                    hasSelectedLabel(t) &&
                    !t.due &&
                    !tasks?.labels?.filter((l) => l.name).includes('today') && (
                        <NewTaskCard taskData={t} />
                    )
            )}
        </>
    )

    const Inbox = () => {
        return (
            <>
                <IntroMessageCard
                    color="aqua.500"
                    title="Inbox"
                    lines={[
                        'All tasks sent in from external sources (Teams, text, email) come here.',
                        'Add a label or a due date to move them into your list.',
                    ]}
                />

                {tasks.map(
                    (t, i) =>
                        !isTodayOrEarlier(t.due) &&
                        tasks.labels
                            .filter((l) => l.name)
                            .includes('inbox') && <NewTaskCard taskData={t} />
                )}
            </>
        )
    }

    return (
        tasks && (
            <VStack
                id="tasks-list"
                width="100%"
                mt="8px"
                height="calc(100vh - 72px)"
                overflowY="scroll"
                marginLeft="-8px"
                paddingLeft="8px"
                paddingRight="8px"
            >
                {section === 'inbox' && <Inbox />}
                {section === 'all' && <AllTasks />}
                {section === 'today' && <Today />}
                {section === 'upcoming' && <Upcoming />}
                {section === 'someday' && <Someday />}
            </VStack>
        )
    )
}

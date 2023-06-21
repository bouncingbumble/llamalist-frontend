import React, { useContext } from 'react'
import { VStack, Text, Flex, Button } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import Upcoming, { isTodayOrEarlier } from './Upcoming'
import TaskCard from './TaskCard'
import IntroMessageCard from './IntroMessageCard'
import { useTasks } from '../Hooks/TasksHooks'

const AllTasks = ({ tasks }) => {
    return tasks.map((t, i) => <TaskCard taskData={t} key={t._id} />)
}

const Today = ({ tasks }) => {
    const { selectedLabels } = []
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
    return (
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
                        <TaskCard taskData={t} />
                    ))
            )}
        </>
    )
}

const Someday = ({ tasks }) => {
    const { selectedLabels } = []
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
    return (
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
                        <TaskCard taskData={t} />
                    )
            )}
        </>
    )
}

const Inbox = ({ tasks }) => {
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
                    tasks.labels.filter((l) => l.name).includes('inbox') && (
                        <TaskCard taskData={t} />
                    )
            )}
        </>
    )
}

export default function TasksList() {
    const { section, selectedLabel } = useParams()
    let taskData = useTasks()
    let tasks =
        selectedLabel === 'All Labels'
            ? taskData.data
            : taskData.data.filter((t) =>
                  t.labels.map((l) => l.name).includes(selectedLabel)
              )

    return (
        taskData.isSuccess && (
            <VStack
                id="tasks-list"
                width="100%"
                height="calc(100vh - 72px)"
                overflowY="scroll"
                marginLeft="-8px"
                paddingLeft="8px"
                paddingRight="8px"
            >
                {section === 'inbox' && <Inbox tasks={tasks} />}
                {section === 'all' && <AllTasks tasks={tasks} />}
                {section === 'today' && <Today tasks={tasks} />}
                {section === 'upcoming' && <Upcoming tasks={tasks} />}
                {section === 'someday' && <Someday tasks={tasks} />}
            </VStack>
        )
    )
}

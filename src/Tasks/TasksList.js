import React, { useContext } from 'react'
import { VStack, Text } from '@chakra-ui/react'
import { TasksContext } from '../Contexts/TasksContext'
import { LabelsContext } from '../Contexts/LabelsContext'
import TaskCard from './TaskCard/TaskCard'
import { useParams } from 'react-router-dom'
import Upcoming, { isTodayOrEarlier } from './Upcoming'
import NewTaskCard from './NewTaskCard'

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

    const AllTasks = () =>
        tasks.map((t, i) => (
            <NewTaskCard name={t.name} id={t.id} isNew={t.isNew} key={t.id} />
        ))

    const Today = () => (
        <>
            <Text>Hello from today</Text>
            {tasks.map(
                (t, i) =>
                    (hasSelectedLabel(t) && isTodayOrEarlier(t.due)) ||
                    (tasks.labels.filter((l) => l.name).includes('today') && (
                        <TaskCard
                            task={t}
                            index={i}
                            key={t._id}
                            cards={tasks}
                            setCards={setTasks}
                        />
                    ))
            )}
        </>
    )

    const Someday = () => (
        <>
            <Text>Hello from someday</Text>
            {tasks.map(
                (t, i) =>
                    hasSelectedLabel(t) &&
                    !t.due &&
                    !tasks.labels.filter((l) => l.name).includes('today') && (
                        <TaskCard
                            task={t}
                            index={i}
                            key={t._id}
                            cards={tasks}
                            setCards={setTasks}
                        />
                    )
            )}
        </>
    )

    const Inbox = () => (
        <>
            <Text>Hello from inbox</Text>
            {tasks.map(
                (t, i) =>
                    !isTodayOrEarlier(t.due) &&
                    tasks.labels.filter((l) => l.name).includes('inbox') && (
                        <TaskCard
                            task={t}
                            index={i}
                            key={t._id}
                            cards={tasks}
                            setCards={setTasks}
                        />
                    )
            )}
        </>
    )

    return (
        tasks && (
            <VStack id="tasks-list" width="100%" mt="8px">
                {section === 'inbox' && <Inbox />}
                {section === 'all' && <AllTasks />}
                {section === 'today' && <Today />}
                {section === 'upcoming' && <Upcoming />}
                {section === 'someday' && <Someday />}
            </VStack>
        )
    )
}

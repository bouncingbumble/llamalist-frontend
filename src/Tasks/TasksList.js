import React, { useContext } from 'react'
import { apiCall } from '../Util/api'
import { Box, VStack } from '@chakra-ui/react'
import { UserContext } from '../Contexts/UserContext'
import { TasksContext } from '../Contexts/TasksContext'
import { LabelsContext } from '../Contexts/LabelsContext'
import TaskCard from './TaskCard/TaskCard'
import EmptyTaskBoi from './EmptyTaskBoi'

export default function TasksList({ urgency }) {
    const { user } = useContext(UserContext)
    const { tasks, setTasks } = useContext(TasksContext)
    const { selectedLabels } = useContext(LabelsContext)

    console.log(selectedLabels)
    // dnd library needs styles to be in a separate function
    const containerStyle = (isDraggingOver) => ({
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 8,
        marginLeft: -8,
        marginRight: -8,
        marginTop: 0,
        cursor: isDraggingOver ? 'grabbing' : 'grab',
    })

    const onDragEnd = (result) => {
        // Initialize variables for function
        const { destination, source } = result
        const newIndex = destination ? destination.index : source.index
        let newSection = [...tasks].filter((t) => t.urgency === urgency)
        let newPosition = null

        if (newIndex === source.index) {
            return
        } else {
            // reorder the new section to reflect dnd
            let dragTask = newSection[source.index]
            newSection.splice(source.index, 1)
            newSection.splice(newIndex, 0, dragTask)

            // Calculate new position of task
            if (newIndex === 0) {
                newPosition = newSection[1].position - 100
            } else if (newIndex === newSection.length - 1) {
                newPosition = newSection[newSection.length - 2].position + 100
            } else {
                const position1 = newSection[newIndex - 1].position
                const position2 = newSection[newIndex + 1].position

                newPosition = (position1 + position2) / 2
            }

            // update position attribute in the dnd task
            newSection[newIndex].position = newPosition

            // update tasks array
            let newTasksArray = [...tasks].filter((t) => t.urgency !== urgency)
            newTasksArray = [...newTasksArray, ...newSection]
            newTasksArray.sort((a, b) => a.urgency - b.urgency)

            setTasks(newTasksArray)

            // update task position
            apiCall('PUT', `/users/${user._id}/tasks/${dragTask._id}`, {
                position: newPosition,
            })
            return
        }
    }

    const hasSelectedLabel = (task) => {
        let hasLabel = false
        const taskLabelNames = task.labels.map((t) => t.name)
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
        tasks && (
            <VStack id="tasks-list">
                {tasks
                    .filter((t) => t.urgency === urgency && !t.isPinned)
                    .map(
                        (t, i) =>
                            hasSelectedLabel(t) && (
                                <TaskCard
                                    task={t}
                                    index={i}
                                    key={t._id}
                                    cards={tasks}
                                    urgency={urgency}
                                    setCards={setTasks}
                                />
                            )
                    )}
                {tasks.filter((t) => t.urgency === urgency).length === 0 && (
                    <EmptyTaskBoi urgency={urgency} />
                )}
            </VStack>
        )
    )
}

import React, { useContext } from 'react'
import { TasksContext } from '../Contexts/TasksContext'
import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import TaskCard from './TaskCard/TaskCard'
import { LabelsContext } from '../Contexts/LabelsContext'

export default function AllTasksList({ urgency, noHeaders }) {
    const { tasks, setTasks } = useContext(TasksContext)

    const { selectedLabels } = useContext(LabelsContext)
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
        <Box
            maxHeight="calc(100vh - 136px)"
            overflow="auto"
            style={{
                paddingLeft: 8,
                paddingRight: 8,
                paddingBottom: 8,
                marginLeft: -8,
                marginRight: -8,
                marginTop: 8,
            }}
            width="100%"
        >
            <VStack id="tasks-list">
                {tasks.filter((t) => t.isPinned).length > 0 && (
                    <Box
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Flex alignItems="center" marginRight="16px">
                            <span
                                style={{
                                    paddingRight: 8,
                                    fontSize: 22,
                                }}
                            >
                                📌
                            </span>
                            <Text
                                color="purple.500"
                                fontSize="md"
                                fontWeight="bold"
                                whiteSpace="nowrap"
                                marginLeft="8px"
                            >
                                Pinned
                            </Text>
                        </Flex>
                        <hr
                            style={{
                                height: 1,
                                backgroundColor: '#E5ECF6',
                                border: '1px solid #E5ECF6',
                                width: '100%',
                                borderRadius: 16,
                            }}
                        />
                    </Box>
                )}
                {tasks
                    .filter((t) => t.isPinned)
                    .map((t, i) => (
                        <TaskCard
                            task={t}
                            index={i}
                            key={t._id}
                            cards={tasks}
                            urgency={urgency}
                            disableDrag={true}
                            setCards={setTasks}
                        />
                    ))}
            </VStack>
        </Box>
    )
}

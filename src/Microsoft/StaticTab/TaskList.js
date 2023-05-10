import React, { useContext } from 'react'
import { TasksContext } from '../../Contexts/TasksContext'
import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import TaskCard from './TaskCard'

export default function TaskList() {
    const { tasks } = useContext(TasksContext)

    return (
        <Box
            w="80%"
            overflow="auto"
            height="calc(100vh - 136px)"
            style={{
                marginTop: 8,
                marginLeft: -8,
                marginRight: -8,
                paddingLeft: 8,
                paddingRight: 8,
                paddingBottom: 8,
            }}
        >
            <VStack>
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
                                    fontSize: 22,
                                    paddingRight: 8,
                                }}
                            >
                                📌
                            </span>
                            <Text
                                fontSize="md"
                                color="purple.500"
                                marginLeft="8px"
                                fontWeight="bold"
                                whiteSpace="nowrap"
                            >
                                Pinned
                            </Text>
                        </Flex>
                        <hr
                            style={{
                                height: 1,
                                width: '100%',
                                borderRadius: '16px',
                                backgroundColor: '#E5ECF6',
                                border: '1px solid #E5ECF6',
                            }}
                        />
                    </Box>
                )}
                {tasks
                    .filter((t) => t.isPinned)
                    .map((t, i) => (
                        <TaskCard task={t} key={t._id} />
                    ))}
            </VStack>
        </Box>
    )
}

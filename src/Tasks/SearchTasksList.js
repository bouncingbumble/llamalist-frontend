import React, { useContext } from 'react'
import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react'
import TaskCard from './TaskCard/TaskCard'
import { CloseIcon } from '../ChakraDesign/Icons'
import { TasksContext } from '../Contexts/TasksContext'

export default function SearchTasksList({ urgency, isSearching }) {
    // context
    const { tasks, setTasks, searchResults, setIsSearchActive } =
        useContext(TasksContext)

    return (
        <Box>
            <Flex
                justifyContent="space-between"
                alignItems="center"
                width="100%"
            >
                <Text fontSize="xl" fontWeight="bold">
                    {isSearching ? 'Searching . . .' : 'Search results'}
                </Text>
                <Button
                    height="48px"
                    width="48px"
                    marginRight="16px"
                    onClick={() => setIsSearchActive(false)}
                >
                    <CloseIcon></CloseIcon>
                </Button>
            </Flex>
            <Box
                height="calc(100vh - 136px)"
                overflow="auto"
                style={{
                    paddingLeft: 8,
                    paddingRight: 8,
                    paddingBottom: 8,
                    marginLeft: -8,
                    marginRight: -8,
                }}
            >
                <VStack id="tasks-list">
                    {searchResults.map((t, i) => (
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
                    )
                    {searchResults.length === 0 && (
                        <Text fontSize="large">No tasks found :(</Text>
                    )}
                </VStack>
            </Box>
        </Box>
    )
}

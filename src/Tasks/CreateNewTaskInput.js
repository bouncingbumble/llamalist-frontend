import React, { useState } from 'react'
import {
    Flex,
    Button,
    VStack,
    Text,
    Container,
    Grid,
    GridItem,
    Input,
    Checkbox,
    SlideFade,
} from '@chakra-ui/react'
import { useCreateTask } from '../Hooks/TasksHooks'

export default function CreateNewTaskInput({
    showCreateTaskInput,
    setShowCreateTaskInput,
}) {
    const [newTaskCardName, setNewTaskCardName] = useState('')
    const createTask = useCreateTask()
    return (
        <SlideFade
            in={showCreateTaskInput}
            direction="top"
            offsetY="-24px"
            transition={{
                enter: { duration: 0.2 },
                exit: { duration: 0.2 },
            }}
            height={showCreateTaskInput ? 'auto' : 0}
        >
            <Flex
                w="100%"
                borderRadius="md"
                bg="white"
                cursor="pointer"
                p={showCreateTaskInput && '8px 16px'}
                alignItems="center"
                pr="16px"
                height={showCreateTaskInput ? 'auto' : 0}
            >
                <Checkbox
                    size="lg"
                    colorScheme="purple"
                    borderColor="purple.500"
                />
                <Text
                    ml="8px"
                    fontSize="18px"
                    lineHeight={0}
                    mt="1px"
                    width="100%"
                >
                    <Input
                        placeholder="task name..."
                        focusBorderColor="purple.500"
                        type="text"
                        size="md"
                        pl="8px"
                        value={newTaskCardName}
                        onChange={(e) => setNewTaskCardName(e.target.value)}
                        autoFocus
                        height={'24px'}
                        width="100%"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                createTask.mutate({
                                    name: newTaskCardName,
                                })
                                setShowCreateTaskInput(false)
                            }
                        }}
                    />
                </Text>
            </Flex>
        </SlideFade>
    )
}

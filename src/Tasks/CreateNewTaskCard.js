import React, { useState, useEffect, useContext, useRef } from 'react'
import {
    Flex,
    Checkbox,
    Input,
    Box,
    SlideFade,
    Collapse,
    Fade,
} from '@chakra-ui/react'
import { TasksContext } from '../Contexts/TasksContext'
import { CalendarIcon } from '../ChakraDesign/Icons'

export default function CreateNewTaskCard({ id, setShowCreateNewTaskCard }) {
    const { tasks, setTasks, updateTask } = useContext(TasksContext)

    const [newTaskCardName, setNewTaskCardName] = useState('')

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            updateTask(id, { name: newTaskCardName })
            setTasks([{ id, name: newTaskCardName }, ...tasks])
            setShowCreateNewTaskCard(false)
        }
    }

    return (
        <Fade
            in={true}
            style={{ width: '100%' }}
            offsetY="-200px"
            transition={{ enter: { duration: 0.6 } }}
        >
            <Flex
                flexDirection="column"
                w="100%"
                borderRadius="md"
                p="8px 16px"
                bg="white"
                maxHeight={newTaskCardName.length < 4 && '40px'}
                boxShadow={newTaskCardName.length > 3 && 'hard'}
                cursor="pointer"
            >
                <Flex>
                    <Checkbox size="lg" colorScheme="purple" />
                    <Input
                        placeholder="task name..."
                        type="text"
                        size="md"
                        pl="8px"
                        value={newTaskCardName}
                        onChange={(e) => setNewTaskCardName(e.target.value)}
                        autoFocus
                        height={'24px'}
                        onKeyDown={handleKeyDown}
                    />
                </Flex>
                <Collapse in={newTaskCardName.length > 3} animateOpacity>
                    <SlideFade in={newTaskCardName.length > 3}>
                        <Box pb="8px">
                            <Flex mt="8px">Notes Section</Flex>
                            <Flex mt="8px" justifyContent="space-between">
                                <Flex>Labels Section</Flex>
                                <Flex>
                                    <Flex>
                                        <CalendarIcon />
                                    </Flex>
                                    checklist || add to calendar
                                </Flex>
                            </Flex>
                        </Box>
                    </SlideFade>
                </Collapse>
            </Flex>
        </Fade>
    )
}

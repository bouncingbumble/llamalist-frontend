import React, { useState, useEffect, useContext, useRef } from 'react'
import {
    Flex,
    Button,
    VStack,
    Text,
    Container,
    Grid,
    GridItem,
    Avatar,
    Checkbox,
    Input,
    Box,
    SlideFade,
    Collapse,
    ScaleFade,
    FormControl,
    Fade,
    useDisclosure,
} from '@chakra-ui/react'
import { TasksContext } from '../Contexts/TasksContext'

export default function NewTaskCard({ name, id, isNew }) {
    const [taskName, setTaskName] = useState(name)
    const [collapseTask, setCollapseTask] = useState(false)
    const { isOpen, onToggle } = useDisclosure()
    const {
        tasks,
        setTasks,
        createTask,
        tasksRef,
        numCompletedTasks,
        setNumCompletedTasks,
        isSearchActive,
        updateTask,
    } = useContext(TasksContext)

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setCollapseTask(true)
            updateTask(id, { name: taskName })
        }
    }

    const handleBlur = () => {
        setCollapseTask(true)
        setTasks(tasks.map((t) => ({ ...t, isNew: false })))
    }

    const handleSetTaskName = (e) => {
        setTaskName(e.target.value)
    }

    return isNew ? (
        <Fade
            in={isNew}
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
                maxHeight={taskName.length < 4 && '40px'}
                onClick={onToggle}
                boxShadow={
                    taskName.length > 3 && !collapseTask && isNew && 'hard'
                }
            >
                <Flex>
                    <Checkbox size="lg" colorScheme="purple" />
                    {isNew && (
                        <Input
                            placeholder="task name..."
                            type="text"
                            size="md"
                            pl="8px"
                            value={taskName}
                            onChange={handleSetTaskName}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            onBlurCapture={handleBlur}
                            height={'24px'}
                        />
                    )}
                </Flex>
                <Collapse
                    in={
                        (taskName.length > 3 && !collapseTask && isNew) ||
                        isOpen
                    }
                    animateOpacity
                >
                    <SlideFade in={taskName.length > 3}>
                        <Box pb="8px">
                            <Flex mt="8px">Notes Section</Flex>
                            <Flex mt="8px" justifyContent="space-between">
                                <Flex>Labels Section</Flex>
                                <Flex>Actions section</Flex>
                            </Flex>
                        </Box>
                    </SlideFade>
                </Collapse>
            </Flex>
        </Fade>
    ) : (
        <Flex
            flexDirection="column"
            w="100%"
            borderRadius="md"
            p="8px 16px"
            bg="white"
            boxShadow={isOpen && 'hard'}
            onClick={onToggle}
        >
            <Flex justifyContent="space-between">
                <Flex alignItems="center" width="100%">
                    <Checkbox size="lg" colorScheme="purple" />
                    <Text ml="8px">{name}</Text>
                </Flex>
                <Flex w="100%" onClick={onToggle}></Flex>
            </Flex>
            <Collapse in={isOpen} animateOpacity>
                <SlideFade in={taskName.length > 3}>
                    <Box pb="8px">
                        <Flex mt="8px">Notes Section</Flex>
                        <Flex mt="8px" justifyContent="space-between">
                            <Flex>Labels Section</Flex>
                            <Flex>Actions section</Flex>
                        </Flex>
                    </Box>
                </SlideFade>
            </Collapse>
        </Flex>
    )
}

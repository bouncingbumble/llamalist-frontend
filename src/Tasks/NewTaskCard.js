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
} from '@chakra-ui/react'
import { TasksContext } from '../Contexts/TasksContext'

export default function NewTaskCard({ name, id, isNew }) {
    const [taskName, setTaskName] = useState(name)
    const [collapseTask, setCollapseTask] = useState(false)
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
        <SlideFade
            direction="top"
            in={isNew}
            style={{ width: '100%' }}
            offsetY="-200px"
            transition={{ enter: { duration: 0.4 } }}
        >
            <Flex
                flexDirection="column"
                w="100%"
                boxShadow="md"
                borderRadius="md"
                p="8px 16px"
                maxHeight={taskName.length < 4 && '40px'}
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
                    in={taskName.length > 3 && !collapseTask && isNew}
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
        </SlideFade>
    ) : (
        <Flex
            flexDirection="column"
            w="100%"
            boxShadow="md"
            borderRadius="md"
            p="8px 16px"
        >
            <Flex>
                <Checkbox size="lg" colorScheme="purple" />
                <Text ml="8px">{name}</Text>
            </Flex>
            <Collapse
                in={taskName.length > 3 && !collapseTask && isNew}
                out={collapseTask}
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
    )
}

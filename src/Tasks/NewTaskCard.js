import React, { useState } from 'react'
import {
    Flex,
    Text,
    Checkbox,
    Box,
    SlideFade,
    Collapse,
    IconButton,
} from '@chakra-ui/react'
import Notes from './TaskCard/Notes'
import {
    CalendarIcon,
    ListIcon,
    ExportToCalIcon,
    LabelIcon,
} from '../ChakraDesign/Icons'

export default function NewTaskCard({ taskData }) {
    const [task, setTask] = useState(taskData)
    const [isOpen, setIsOpen] = useState(false)

    const handleOpenTaskCard = () => {
        setIsOpen(true)
    }

    return (
        <Flex
            flexDirection="column"
            w="100%"
            borderRadius="md"
            p="8px 16px"
            bg="white"
            boxShadow={isOpen && 'hard'}
            onClick={handleOpenTaskCard}
            cursor="pointer"
        >
            <Flex justifyContent="space-between">
                <Flex alignItems="center" width="100%">
                    <Checkbox
                        size="lg"
                        colorScheme="purple"
                        borderColor="gray.900"
                    />
                    <Text ml="8px">{task.name}</Text>
                </Flex>
                <Flex w="100%" onClick={handleOpenTaskCard}></Flex>
            </Flex>
            <Collapse in={isOpen} animateOpacity>
                <SlideFade in={task.name.length > 3}>
                    <Box pb="8px">
                        <Notes task={task} setTask={setTask} />
                        <Flex mt="8px" justifyContent="space-between">
                            <Flex>
                                {' '}
                                <IconButton
                                    variant="ghost"
                                    colorScheme="gray"
                                    aria-label="Add a label"
                                    icon={<LabelIcon />}
                                />
                            </Flex>
                            <Flex>
                                <Flex>
                                    <IconButton
                                        variant="ghost"
                                        colorScheme="gray"
                                        aria-label="Add a due date"
                                        icon={<CalendarIcon />}
                                    />
                                </Flex>
                                <Flex>
                                    <IconButton
                                        variant="ghost"
                                        colorScheme="gray"
                                        aria-label="Add a checklist"
                                        icon={<ListIcon />}
                                    />
                                </Flex>
                                <Flex>
                                    <IconButton
                                        variant="ghost"
                                        colorScheme="gray"
                                        aria-label="Schedule time on your calendar"
                                        icon={<ExportToCalIcon />}
                                    />
                                </Flex>
                            </Flex>
                        </Flex>
                    </Box>
                </SlideFade>
            </Collapse>
        </Flex>
    )
}

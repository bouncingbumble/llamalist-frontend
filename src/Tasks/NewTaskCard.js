import React, { useState } from 'react'
import {
    Flex,
    Text,
    Checkbox,
    Box,
    SlideFade,
    Collapse,
    IconButton,
    useDisclosure,
} from '@chakra-ui/react'
import Notes from './TaskCard/Notes'
import {
    CalendarIcon,
    ListIcon,
    ExportToCalIcon,
    LabelIcon,
    CarrotIcon,
} from '../ChakraDesign/Icons'

export default function NewTaskCard({ taskData }) {
    const [task, setTask] = useState(taskData)
    const { isOpen, onToggle } = useDisclosure()

    return (
        <Flex
            flexDirection="column"
            w="100%"
            borderRadius="md"
            p="8px 16px"
            bg="white"
            boxShadow={isOpen && 'hard'}
            onClick={onToggle}
            cursor="pointer"
        >
            <Flex justifyContent="space-between">
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                >
                    <Flex>
                        <Checkbox
                            size="lg"
                            colorScheme="purple"
                            borderColor="gray.900"
                        />
                        <Text ml="8px">{task.name}</Text>
                    </Flex>
                    {isOpen && (
                        <IconButton
                            colorScheme="gray"
                            variant="ghost"
                            icon={<CarrotIcon />}
                            onClick={onToggle}
                        ></IconButton>
                    )}
                </Flex>
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

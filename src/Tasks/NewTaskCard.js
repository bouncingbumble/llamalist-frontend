import React, { useState, useContext } from 'react'
import {
    Flex,
    Text,
    Checkbox,
    Box,
    SlideFade,
    Collapse,
    IconButton,
    useDisclosure,
    Button,
} from '@chakra-ui/react'
import Notes from './TaskCard/Notes'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {
    CalendarIcon,
    ListIcon,
    ExportToCalIcon,
    LabelIcon,
    CarrotIcon,
    XCircle,
    FlagIcon,
    SunIcon,
} from '../ChakraDesign/Icons'
import { format, isToday } from 'date-fns'
import Checklist from './TaskCard/Checklist'

export default function NewTaskCard({ taskData }) {
    const [task, setTask] = useState(taskData)
    const [showDatePicker, setShowDatePicker] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const updateTask = () => {}

    return (
        <Flex
            flexDirection="column"
            w="100%"
            borderRadius="md"
            p="8px 16px"
            bg="white"
            boxShadow={isOpen && 'hard'}
            onClick={onOpen}
            cursor="pointer"
        >
            <Flex justifyContent="space-between">
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    width="100%"
                >
                    <Flex alignItems="center" width="100%">
                        <Checkbox
                            size="lg"
                            colorScheme="purple"
                            borderColor="gray.900"
                        />
                        <Text ml="8px" fontSize="18px" lineHeight={0} mt="1px">
                            {task.name}
                        </Text>
                    </Flex>
                    {isOpen && (
                        <IconButton
                            colorScheme="gray"
                            variant="ghost"
                            icon={<CarrotIcon />}
                            onClick={(e) => {
                                e.stopPropagation()
                                onClose()
                            }}
                        ></IconButton>
                    )}
                </Flex>
            </Flex>
            <Collapse in={isOpen} animateOpacity>
                <SlideFade in={task.name.length > 3}>
                    <Box pb="8px">
                        <Notes task={task} setTask={setTask} />
                        <Checklist
                            taskId={task.id}
                            checklist={task.checklist}
                        />
                        <Flex mt="8px" justifyContent="space-between">
                            <Flex alignItems="center">
                                <IconButton
                                    variant="ghost"
                                    colorScheme="gray"
                                    aria-label="Add a label"
                                    icon={<LabelIcon />}
                                />
                                {task.when && (
                                    <DatePicker
                                        selected={new Date(task.when)}
                                        onChange={(date) => {
                                            setTask({ ...task, when: date })
                                            updateTask(task.id, { when: date })
                                        }}
                                        calendarClassName="when"
                                        customInput={
                                            <Button
                                                size="xs"
                                                colorScheme="aqua"
                                                color="gray.900"
                                                className="dueDateButton"
                                                mr="4px"
                                            >
                                                {isToday(
                                                    new Date(task.when)
                                                ) ? (
                                                    <Flex alignItems="center">
                                                        <SunIcon fontSize="18px" />{' '}
                                                        Today
                                                    </Flex>
                                                ) : (
                                                    format(
                                                        new Date(task.when),
                                                        'MMM dd'
                                                    )
                                                )}
                                                <Flex
                                                    visibility="hidden"
                                                    width="0px"
                                                    id="removeDueDate"
                                                    alignItems="center"
                                                    opacity="0"
                                                    color="gray.700"
                                                    _hover={{
                                                        color: 'gray.900',
                                                    }}
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        e.stopPropagation()
                                                        setTask({
                                                            ...task,
                                                            when: null,
                                                        })
                                                        updateTask(task.id, {
                                                            when: null,
                                                        })
                                                    }}
                                                    zIndex="9000"
                                                >
                                                    <XCircle fontSize="16px" />
                                                </Flex>
                                            </Button>
                                        }
                                    />
                                )}
                                {task.due && (
                                    <DatePicker
                                        selected={new Date(task.due)}
                                        onChange={(date) => {
                                            setTask({ ...task, due: date })
                                            updateTask(task.id, { due: date })
                                        }}
                                        customInput={
                                            <Button
                                                size="xs"
                                                colorScheme="redFaded"
                                                color="gray.900"
                                                className="dueDateButton"
                                            >
                                                Due{' '}
                                                {format(
                                                    new Date(task.due),
                                                    'MMM dd'
                                                )}
                                                <Flex
                                                    visibility="hidden"
                                                    width="0px"
                                                    id="removeDueDate"
                                                    alignItems="center"
                                                    opacity="0"
                                                    color="gray.700"
                                                    _hover={{
                                                        color: 'gray.900',
                                                    }}
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        e.stopPropagation()
                                                        setTask({
                                                            ...task,
                                                            due: null,
                                                        })
                                                        updateTask(task.id, {
                                                            due: null,
                                                        })
                                                    }}
                                                    zIndex="9000"
                                                >
                                                    <XCircle fontSize="16px" />
                                                </Flex>
                                            </Button>
                                        }
                                    />
                                )}
                            </Flex>
                            <Flex>
                                {!task.when && (
                                    <DatePicker
                                        selected={new Date()}
                                        onChange={(date) => {
                                            setTask({ ...task, when: date })
                                            updateTask(task.id, { when: date })
                                        }}
                                        customInput={
                                            <IconButton
                                                variant="ghost"
                                                colorScheme="gray"
                                                aria-label="When"
                                                icon={<CalendarIcon />}
                                                onClick={() =>
                                                    setShowDatePicker(true)
                                                }
                                            />
                                        }
                                        calendarClassName="when"
                                    />
                                )}
                                {!task.due && (
                                    <DatePicker
                                        selected={new Date()}
                                        onChange={(date) => {
                                            setTask({ ...task, due: date })
                                            updateTask(task.id, { due: date })
                                        }}
                                        customInput={
                                            <IconButton
                                                variant="ghost"
                                                colorScheme="gray"
                                                aria-label="Add a due date"
                                                icon={<FlagIcon />}
                                                onClick={() =>
                                                    setShowDatePicker(true)
                                                }
                                            />
                                        }
                                    />
                                )}
                                <IconButton
                                    variant="ghost"
                                    colorScheme="gray"
                                    aria-label="Add a checklist"
                                    icon={<ListIcon />}
                                />
                            </Flex>
                        </Flex>
                    </Box>
                </SlideFade>
            </Collapse>
        </Flex>
    )
}

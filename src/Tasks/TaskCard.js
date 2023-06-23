import React, { useState, useRef, useEffect } from 'react'
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
    Input,
    Fade,
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
import { useUpdateTask } from '../Hooks/TasksHooks'
import LabelInput from './LabelInput'
import LlamaChip from '../SharedComponents/LlamaChip'

export default function TaskCard({ taskData }) {
    const [showLabelInput, setShowLabelInput] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const updateTask = useUpdateTask()
    const whenRef = useRef()
    const dueRef = useRef()
    const [name, setName] = useState(taskData.name)

    setTimeout(() => {
        if (taskData.isNewTask) {
            onOpen()
        }
    }, 64)

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
            mt={isOpen ? '-2px' : '4px'}
            className={taskData.isNewTask && 'fade-in'}
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
                        {isOpen || taskData.isNewTask ? (
                            <Input
                                placeholder="task name..."
                                focusBorderColor="white"
                                type="text"
                                size="md"
                                pl="8px"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoFocus
                                height={'24px'}
                                width="100%"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        updateTask.mutate({
                                            ...taskData,
                                            name: name,
                                            isNewTask: false,
                                        })
                                    }
                                }}
                            />
                        ) : (
                            <Text
                                ml="8px"
                                fontSize="18px"
                                lineHeight={0}
                                mt="1px"
                            >
                                {taskData.name}
                            </Text>
                        )}
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
            <Collapse
                in={isOpen}
                animateOpacity
                style={{ overflow: 'visible' }}
            >
                <SlideFade in={isOpen}>
                    <Box pb="8px">
                        <Notes task={taskData} setTask={updateTask} />
                        {/* <Checklist
                            taskId={taskData._id}
                            checklist={taskData.checklist}
                        /> */}
                        <Flex mt="8px" justifyContent="space-between">
                            <Flex alignItems="center" width="100%">
                                <IconButton
                                    mr="4px"
                                    variant="ghost"
                                    colorScheme="gray"
                                    aria-label="Add a label"
                                    icon={<LabelIcon />}
                                    onClick={() => setShowLabelInput(true)}
                                />
                                {showLabelInput && (
                                    <LabelInput
                                        task={taskData}
                                        setShowLabelInput={setShowLabelInput}
                                    />
                                )}
                                {taskData.labels?.map((label) => (
                                    <LlamaChip
                                        text={label.name}
                                        color="#FFFFFF"
                                        colorScheme="blue"
                                        handleRemove={() => {
                                            updateTask.mutate({
                                                ...taskData,
                                                labels: taskData.labels.filter(
                                                    (l) => l._id !== label._id
                                                ),
                                            })
                                        }}
                                    ></LlamaChip>
                                ))}

                                {taskData.when && (
                                    <DatePicker
                                        selected={new Date(taskData.when)}
                                        onChange={(date) => {
                                            updateTask.mutate({
                                                ...taskData,
                                                when: date,
                                            })
                                        }}
                                        calendarClassName="when"
                                        ref={whenRef}
                                        customInput={
                                            <LlamaChip
                                                colorScheme="aqua"
                                                color="gray.900"
                                                handleRemove={() => {
                                                    updateTask.mutate({
                                                        ...taskData,
                                                        when: null,
                                                    })
                                                }}
                                                text={
                                                    isToday(
                                                        new Date(taskData.when)
                                                    ) ? (
                                                        <Flex alignItems="center">
                                                            <SunIcon fontSize="18px" />{' '}
                                                            Today
                                                        </Flex>
                                                    ) : (
                                                        format(
                                                            new Date(
                                                                taskData.when
                                                            ),
                                                            'MMM dd'
                                                        )
                                                    )
                                                }
                                                handleClick={() =>
                                                    whenRef.current.setOpen(
                                                        true
                                                    )
                                                }
                                            ></LlamaChip>
                                        }
                                    />
                                )}
                                {taskData.due && (
                                    <DatePicker
                                        selected={new Date(taskData.due)}
                                        onChange={(date) => {
                                            updateTask.mutate({
                                                ...taskData,
                                                due: date,
                                            })
                                        }}
                                        ref={dueRef}
                                        customInput={
                                            <LlamaChip
                                                size="xs"
                                                colorScheme="redFaded"
                                                color="gray.900"
                                                handleRemove={() =>
                                                    updateTask.mutate({
                                                        ...taskData,
                                                        due: null,
                                                    })
                                                }
                                                handleClick={() =>
                                                    dueRef.current.setOpen(true)
                                                }
                                                text={`Due
                                                ${format(
                                                    new Date(taskData.due),
                                                    'MMM dd'
                                                )}`}
                                            ></LlamaChip>
                                        }
                                    />
                                )}
                            </Flex>
                            <Flex>
                                {!taskData.when && (
                                    <DatePicker
                                        selected={new Date()}
                                        onChange={(date) => {
                                            updateTask.mutate({
                                                ...taskData,
                                                when: date,
                                            })
                                        }}
                                        customInput={
                                            <IconButton
                                                variant="ghost"
                                                colorScheme="gray"
                                                aria-label="When"
                                                icon={<CalendarIcon />}
                                            />
                                        }
                                        calendarClassName="when"
                                    />
                                )}
                                {!taskData.due && (
                                    <DatePicker
                                        selected={new Date()}
                                        onChange={(date) => {
                                            updateTask.mutate({
                                                ...taskData,
                                                due: date,
                                            })
                                        }}
                                        customInput={
                                            <IconButton
                                                variant="ghost"
                                                colorScheme="gray"
                                                aria-label="Add a due date"
                                                icon={<FlagIcon />}
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

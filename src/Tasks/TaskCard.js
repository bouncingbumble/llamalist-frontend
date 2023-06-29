import React, { useState, useRef } from 'react'
import {
    Flex,
    Text,
    Checkbox,
    Box,
    SlideFade,
    Collapse,
    IconButton,
    useDisclosure,
    Input,
} from '@chakra-ui/react'
import Notes from './TaskCard/Notes'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {
    CalendarIcon,
    ListIcon,
    LabelIcon,
    CarrotIcon,
    FlagIcon,
    SunIcon,
    NoteIcon,
    ChecklistIcon,
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
    const progress = [
        taskData.checklist?.filter((item) => item.completedDate).length,
        taskData.checklist?.length,
    ]

    setTimeout(() => {
        if (taskData.isNewTask) {
            onOpen()
        }
    }, 64)

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.target.blur()
            updateTask.mutate({
                ...taskData,
                name: name,
                isNewTask: false,
            })
        }
    }

    const handleBlur = (e) => {
        updateTask.mutate({
            ...taskData,
            name: name,
            isNewTask: false,
        })
    }

    const ChipSection = () => (
        <Flex justifyContent="space-between" width="100%" alignItems="center">
            <Flex>
                {taskData.labels?.map((label) => (
                    <LlamaChip
                        text={label.name}
                        color="#FFFFFF"
                        colorScheme="blue"
                    ></LlamaChip>
                ))}
            </Flex>
            <Box>
                {taskData.when && (
                    <LlamaChip
                        colorScheme="aqua"
                        color="gray.900"
                        text={
                            isToday(new Date(taskData.when))
                                ? 'Today'
                                : format(new Date(taskData.when), 'MMM dd')
                        }
                        leftIcon={
                            isToday(new Date(taskData.when)) ? (
                                <SunIcon
                                    height="14px"
                                    width="14px"
                                    marginRight="4px"
                                />
                            ) : (
                                <CalendarIcon
                                    height="14px"
                                    width="14px"
                                    marginRight="4px"
                                />
                            )
                        }
                    ></LlamaChip>
                )}
                {taskData.due && (
                    <LlamaChip
                        size="xs"
                        colorScheme="redFaded"
                        color="gray.900"
                        text={
                            isToday(new Date(taskData.due))
                                ? 'Today'
                                : format(new Date(taskData.due), 'MMM dd')
                        }
                        leftIcon={
                            isToday(new Date(taskData.due)) ? (
                                <SunIcon
                                    height="14px"
                                    width="14px"
                                    marginRight="4px"
                                />
                            ) : (
                                <FlagIcon
                                    height="14px"
                                    width="14px"
                                    marginRight="4px"
                                />
                            )
                        }
                    ></LlamaChip>
                )}
            </Box>
        </Flex>
    )

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
            <Flex>
                <Flex
                    alignItems="center"
                    justifyContent={isOpen ? 'space-between' : 'flex-start'}
                    width="100%"
                >
                    <Flex
                        alignItems="center"
                        mr="8px"
                        width={isOpen ? '100%' : 'auto'}
                    >
                        <Checkbox
                            size="lg"
                            colorScheme="purple"
                            borderColor="gray.900"
                        />
                        {taskData.isNewTask || isOpen ? (
                            <Input
                                placeholder="task name..."
                                focusBorderColor="white"
                                border="none"
                                type="text"
                                size="md"
                                fontSize="18px"
                                pl="8px"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoFocus={taskData.isNewTask}
                                height={'24px'}
                                width="100%"
                                onBlur={handleBlur}
                                onKeyDown={handleKeyDown}
                            />
                        ) : (
                            <Text
                                ml="8px"
                                fontSize="18px"
                                lineHeight={0}
                                width="max-content"
                            >
                                {name}
                            </Text>
                        )}
                    </Flex>
                    {!isOpen && taskData.notes?.length > 7 && (
                        <NoteIcon
                            fontSize="20x"
                            height="20px"
                            width="20px"
                            marginRight="8px"
                        />
                    )}
                    {!isOpen && progress[1] > 0 && (
                        <>
                            <ChecklistIcon mr="8px" />
                            <Text
                                fontSize="small"
                                color="grey.900"
                                fontWeight="bold"
                            >
                                {progress[0]}/{progress[1]}
                            </Text>
                        </>
                    )}
                    {!isOpen && <ChipSection />}
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
                        <Notes task={taskData} updateTask={updateTask} />
                        <Checklist
                            task={taskData}
                            checklist={taskData.checklist}
                        />
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
                                                leftIcon={
                                                    isToday(
                                                        new Date(taskData.when)
                                                    ) ? (
                                                        <SunIcon
                                                            height="14px"
                                                            width="14px"
                                                            marginRight="4px"
                                                        />
                                                    ) : (
                                                        <CalendarIcon
                                                            height="14px"
                                                            width="14px"
                                                            marginRight="4px"
                                                        />
                                                    )
                                                }
                                                text={
                                                    isToday(
                                                        new Date(taskData.when)
                                                    )
                                                        ? 'Today'
                                                        : format(
                                                              new Date(
                                                                  taskData.when
                                                              ),
                                                              'MMM dd'
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
                                                leftIcon={
                                                    isToday(
                                                        new Date(taskData.due)
                                                    ) ? (
                                                        <SunIcon
                                                            height="14px"
                                                            width="14px"
                                                            marginRight="4px"
                                                        />
                                                    ) : (
                                                        <FlagIcon
                                                            height="14px"
                                                            width="14px"
                                                            marginRight="4px"
                                                        />
                                                    )
                                                }
                                                text={
                                                    isToday(
                                                        new Date(taskData.due)
                                                    )
                                                        ? 'Today'
                                                        : `
                                                ${format(
                                                    new Date(taskData.due),
                                                    'MMM dd'
                                                )}`
                                                }
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

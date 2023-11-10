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
    Progress,
    Tooltip,
    Image,
} from '@chakra-ui/react'
import Notes from './Notes'
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
    SnoozeIcon,
} from '../../ChakraDesign/Icons'
import { format, isToday } from 'date-fns'
import Checklist from './Checklist'
import { useUpdateTask } from '../../Hooks/TasksHooks'
import { useUpdateLabel } from '../../Hooks/LabelsHooks'
import LabelInput from '../LabelInput'
import LlamaChip from '../../SharedComponents/LlamaChip'
import pop from '../../sounds/pop.mp3'
import { Howl } from 'howler'
import { useParams } from 'react-router-dom'
import LlamaMode from '../../images/favicon.ico'
import LlamaModeModal from './LlamaModeModal'

export default function TaskCard({ taskData, goldenLlama, setGoldenLlama }) {
    const completionSound = new Howl({ src: [pop] })
    const [showLabelInput, setShowLabelInput] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const updateTask = useUpdateTask()
    const updateLabel = useUpdateLabel()
    const whenRef = useRef()
    const dueRef = useRef()
    const [name, setName] = useState(taskData.name)
    const [isNewTask, setIsNewTask] = useState(taskData.isNewTask)
    const [showChecklist, setShowChecklist] = useState(
        Boolean(taskData.checklist?.length)
    )
    const { section } = useParams()

    const progress = [
        taskData.checklist?.filter((item) => item.completedDate).length,
        taskData.checklist?.length,
    ]
    const [isChecked, setIsChecked] = useState(Boolean(taskData.completedDate))
    const [isLlamaModeOpen, setIsLlamaModeOpen] = useState(false)

    setTimeout(() => {
        if (isNewTask && !isChecked) {
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
            if (isNewTask) {
                setIsNewTask(false)
                onClose()
            }
        }
    }

    const handleBlur = () => {
        setIsNewTask(false)
        updateTask.mutate({
            ...taskData,
            name: name,
            isNewTask: false,
        })
    }

    const handleCheckboxClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (taskData.completedDate === null) {
            setIsChecked(true)
            onClose()
            setTimeout(() => {
                updateTask.mutate({
                    ...taskData,
                    completedDate: new Date(),
                })
            }, 1000)

            setTimeout(() => {
                completionSound.play()
            }, 1300)
        } else {
            setIsChecked(false)
            onClose()
            setTimeout(() => {
                updateTask.mutate({
                    ...taskData,
                    completedDate: null,
                })
            }, 300)
        }
    }

    const handleSetTaskName = (v) => {
        if (v.length < 80) {
            setName(v)
        } else {
            alert(
                'Please limit the length of your task name. Use the notes section for more details.'
            )
        }
    }

    const ChipSection = () => (
        <Flex
            justifyContent="space-between"
            width="100%"
            alignItems="center"
            ml="8px"
        >
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
                                    height="16px"
                                    width="16px"
                                    marginRight="6px"
                                />
                            ) : (
                                <CalendarIcon
                                    height="16px"
                                    width="16px"
                                    marginRight="6px"
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
                                    height="16px"
                                    width="16px"
                                    marginRight="6px"
                                />
                            ) : (
                                <FlagIcon
                                    height="16px"
                                    width="16px"
                                    marginRight="6px"
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
            p="16px 16px 12px 16px"
            boxShadow={isOpen && 'lg'}
            onClick={onOpen}
            cursor="pointer"
            mt="4px"
            mb={isOpen && '16px'}
            className={isNewTask && 'fade-in'}
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
                        {' '}
                        <Flex onClick={handleCheckboxClick} alignItems="center">
                            <Checkbox
                                size="lg"
                                colorScheme="purple"
                                borderColor="gray.900"
                                isChecked={isChecked}
                            />
                        </Flex>
                        {taskData.completedDate &&
                            taskData.completedDate !== null && (
                                <Flex
                                    w="80px"
                                    ml="12px"
                                    fontWeight="500"
                                    alignItems="center"
                                    color="purple.500"
                                    height="32px"
                                    fontSize="18px"
                                    pt="2px"
                                >
                                    {format(
                                        new Date(taskData.completedDate),
                                        'MMM dd'
                                    )}
                                </Flex>
                            )}
                        {isOpen ? (
                            <Input
                                placeholder="task name..."
                                focusBorderColor="white"
                                border="none"
                                type="text"
                                size="lg"
                                fontSize="18px"
                                padding="1px 4px 2px 4px"
                                ml={!taskData.completedDate ? '8px' : '18px'}
                                value={name}
                                onChange={(e) =>
                                    handleSetTaskName(e.target.value)
                                }
                                autoFocus={isNewTask && !isChecked}
                                height="30px"
                                width="100%"
                                onBlur={handleBlur}
                                onKeyDown={handleKeyDown}
                                _focus={{
                                    boxShadow: 'none',
                                    borderWidth: '0px',
                                    backgroundColor: 'rgba(118, 61, 225, 0.1)',
                                }}
                            />
                        ) : (
                            <Flex
                                ml="12px"
                                fontSize="18px"
                                width="max-content"
                                className={
                                    isChecked &&
                                    !taskData.completedDate &&
                                    'strike'
                                }
                                height="32px"
                                alignItems="center"
                            >
                                {name}
                            </Flex>
                        )}
                    </Flex>
                    {!isOpen && progress[1] > 0 && (
                        <Box width="400px" margin="0px 8px" mt="2px">
                            <Flex mr="24px" width="100%" alignItems="center">
                                <Progress
                                    height="8px"
                                    width="100%"
                                    marginRight="16px"
                                    borderRadius="16px"
                                    backgroundColor="gray.50"
                                    value={(progress[0] / progress[1]) * 100}
                                    sx={{
                                        '& > div:first-child': {
                                            transitionProperty: 'width',
                                            backgroundColor: 'purple.300',
                                        },
                                    }}
                                />

                                <Text
                                    fontSize="small"
                                    color="grey.900"
                                    fontWeight="bold"
                                >
                                    {progress[0]}/{progress[1]}
                                </Text>
                            </Flex>
                        </Box>
                    )}
                    {!isOpen && taskData.notes?.length > 7 && (
                        <NoteIcon
                            fontSize="20x"
                            height="20px"
                            width="20px"
                            mr="8px"
                            mt="2px"
                            ml="4px"
                        />
                    )}

                    {!isOpen && <ChipSection />}
                    {isOpen && (
                        <IconButton
                            colorScheme="gray"
                            variant="ghost"
                            icon={<CarrotIcon />}
                            onClick={(e) => {
                                e.stopPropagation()
                                setIsNewTask(false)
                                onClose()
                                updateTask.mutate({
                                    ...taskData,
                                    isNewTask: false,
                                })
                            }}
                            mt="2px"
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
                    <Box>
                        <Notes task={taskData} updateTask={updateTask} />
                        {(showChecklist || taskData.checklist?.length > 0) && (
                            <Checklist
                                task={taskData}
                                checklist={taskData.checklist}
                            />
                        )}

                        <Flex
                            mt="16px"
                            justifyContent="space-between"
                            id="action-buttons"
                            alignItems="center"
                            height="36px"
                        >
                            <Flex alignItems="center" width="100%">
                                <Tooltip label="Add a label">
                                    <IconButton
                                        mr="4px"
                                        variant="ghost"
                                        colorScheme="gray"
                                        icon={<LabelIcon />}
                                        aria-label="Add a label"
                                        onClick={() => setShowLabelInput(true)}
                                    />
                                </Tooltip>
                                {showLabelInput && (
                                    <LabelInput
                                        task={taskData}
                                        goldenLlama={goldenLlama}
                                        setGoldenLlama={setGoldenLlama}
                                        setShowLabelInput={setShowLabelInput}
                                    />
                                )}
                                {taskData.labels?.map((label) => (
                                    <LlamaChip
                                        color="#FFFFFF"
                                        text={label.name}
                                        colorScheme="blue"
                                        handleUpdate={(newName) => {
                                            const newLabel = {
                                                ...label,
                                                name: newName,
                                            }
                                            updateLabel.mutate(newLabel)
                                        }}
                                        handleRemove={() => {
                                            updateTask.mutate({
                                                ...taskData,
                                                labels: taskData.labels.filter(
                                                    (l) => l._id !== label._id
                                                ),
                                            })
                                        }}
                                    />
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
                                                            height="16px"
                                                            width="16px"
                                                            marginRight="6px"
                                                        />
                                                    ) : (
                                                        <CalendarIcon
                                                            height="16px"
                                                            width="16px"
                                                            marginRight="6px"
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
                                                            height="16px"
                                                            width="16px"
                                                            marginRight="6px"
                                                        />
                                                    ) : (
                                                        <FlagIcon
                                                            height="16px"
                                                            width="16px"
                                                            marginRight="6px"
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
                                {section === 'inbox' && (
                                    <Tooltip
                                        label="Move to someday"
                                        offset={[-10, 8]}
                                    >
                                        <IconButton
                                            variant="ghost"
                                            colorScheme="gray"
                                            icon={<SnoozeIcon />}
                                            aria-label="Move to someday"
                                            onClick={() =>
                                                updateTask.mutate({
                                                    ...taskData,
                                                    isInbox: false,
                                                })
                                            }
                                        />
                                    </Tooltip>
                                )}

                                {!taskData.when && (
                                    <DatePicker
                                        selected={new Date()}
                                        onChange={(date) => {
                                            updateTask.mutate({
                                                ...taskData,
                                                isInbox: false,
                                                when: date,
                                            })
                                        }}
                                        customInput={
                                            <Flex>
                                                <Tooltip
                                                    label="Set a start date"
                                                    offset={[-10, 8]}
                                                >
                                                    <IconButton
                                                        variant="ghost"
                                                        aria-label="When"
                                                        colorScheme="gray"
                                                        icon={<CalendarIcon />}
                                                    />
                                                </Tooltip>
                                            </Flex>
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
                                                isInbox: false,
                                            })
                                        }}
                                        customInput={
                                            <Flex>
                                                <Tooltip
                                                    label="Set a due date"
                                                    offset={[-10, 8]}
                                                >
                                                    <IconButton
                                                        variant="ghost"
                                                        colorScheme="gray"
                                                        icon={<FlagIcon />}
                                                        aria-label="Add a due date"
                                                    />
                                                </Tooltip>
                                            </Flex>
                                        }
                                    />
                                )}
                                {!showChecklist && (
                                    <Tooltip
                                        label="Add a checklist"
                                        offset={[-16, 8]}
                                    >
                                        <IconButton
                                            variant="ghost"
                                            colorScheme="gray"
                                            icon={<ListIcon />}
                                            aria-label="Add a checklist"
                                            onClick={() =>
                                                setShowChecklist(true)
                                            }
                                        />
                                    </Tooltip>
                                )}
                                {section === 'today' && (
                                    <Tooltip
                                        label="Work on this task in LLAMA MODE"
                                        offset={[-10, 8]}
                                    >
                                        <IconButton
                                            variant="ghost"
                                            colorScheme="gray"
                                            icon={
                                                <Image
                                                    src={LlamaMode}
                                                    alt="llama mode"
                                                    width="56px"
                                                />
                                            }
                                            aria-label="Move to someday"
                                            onClick={() =>
                                                setIsLlamaModeOpen(true)
                                            }
                                        />
                                    </Tooltip>
                                )}
                            </Flex>
                        </Flex>
                    </Box>
                </SlideFade>
            </Collapse>
            {isLlamaModeOpen && (
                <LlamaModeModal
                    task={taskData}
                    onClose={() => setIsLlamaModeOpen(false)}
                    handleSetTaskName={handleSetTaskName}
                    handleBlur={handleBlur}
                    handleKeyDown={handleKeyDown}
                />
            )}
        </Flex>
    )
}

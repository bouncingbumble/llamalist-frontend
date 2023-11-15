import React, { useRef, useState } from 'react'
import {
    Flex,
    Text,
    Button,
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Input,
    useInterval,
    IconButton,
} from '@chakra-ui/react'
import Notes from './Notes'
import Checklist from './Checklist'
import format from 'format-duration'
import { PauseIcon, PlayIcon } from '../../ChakraDesign/Icons'

export default function LlamaModeModal({
    task,
    handleSetTaskName,
    onClose,
    handleBlur,
    handleKeyDown,
    name,
    updateTask,
}) {
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(true)
    const [countDownTime, setCountDownTime] = useState(3600)
    const shouldRunTimer = useRef(false)
    const [isPlaying, setIsPlaying] = useState(false)

    setTimeout(() => {
        setShowWelcomeMessage(false)
    }, 3000)

    const addMinutes = () => {
        //add 15 minutes
        setCountDownTime(countDownTime + 900)
    }
    const subMinutes = () => {
        if (countDownTime > 900) {
            //sub 15 minutes
            setCountDownTime(countDownTime - 900)
        }
    }

    let interval = useInterval(() => {
        if (shouldRunTimer.current) {
            setCountDownTime(countDownTime - 1)
        }
    }, 1000)

    const startTimer = () => {
        clearInterval(interval)
        shouldRunTimer.current = !shouldRunTimer.current
        setIsPlaying(!isPlaying)
    }

    const reset = () => {
        clearInterval(interval)
        shouldRunTimer.current = false
        setCountDownTime(3600)
        setIsPlaying(false)
    }

    const formattedTime = () => {
        const time = format(countDownTime * 1000, {
            leading: true,
        })
        const timeArray = time.split('')
        return timeArray.map((v) => (
            <Flex
                w={v === ':' ? '20px' : '40px'}
                pl="8px"
                pr="8px"
                justifyContent="center"
                alignItems="center"
                lineHeight="1"
            >
                {v}
            </Flex>
        ))
    }

    return (
        <Modal size="full" isOpen={true} onClose={onClose} autoFocus={false}>
            <ModalOverlay />
            <ModalContent backgroundColor={showWelcomeMessage && 'gray.600'}>
                {showWelcomeMessage ? (
                    <Flex alignItems="center" flexDirection="column">
                        <Flex
                            mt="12vh"
                            fontSize="56px"
                            justifyContent="center"
                            className="gamer-text"
                            color="white"
                        >
                            <Text className="loading">
                                Activating LLAMA MODE . . .
                            </Text>
                        </Flex>

                        <Text
                            mt="12vh"
                            fontSize="36px"
                            justifyContent="center"
                            className="gamer-text"
                            color="gray.700"
                            paddingLeft="5vw"
                            paddingRight="5vw"
                            paddingTop="5vh"
                            paddingBottom="5vh"
                            textAlign="center"
                        >
                            {name}
                        </Text>
                    </Flex>
                ) : (
                    <>
                        <Flex
                            flexDirection="column"
                            paddingLeft="5vw"
                            paddingRight="5vw"
                            paddingTop="5vh"
                            paddingBottom="5vh"
                        >
                            <Input
                                placeholder="task name..."
                                focusBorderColor="white"
                                border="none"
                                type="text"
                                size="xl"
                                fontSize="22px"
                                padding="24px 16px"
                                value={name}
                                onChange={(e) =>
                                    handleSetTaskName(e.target.value)
                                }
                                height="30px"
                                width="100%"
                                onBlur={handleBlur}
                                onKeyDown={handleKeyDown}
                                _focus={{
                                    boxShadow: 'none',
                                    borderWidth: '0px',
                                    backgroundColor: 'rgba(118, 61, 225, 0.1)',
                                }}
                                borderRadius="8px"
                            />
                            <Notes task={task} updateTask={updateTask} />
                            <Checklist
                                task={task}
                                checklist={task.checklist}
                                noAutoFocus
                            />
                            <ModalCloseButton marginTop="5px" />
                        </Flex>
                        <Flex
                            w="100%"
                            flexDirection="column"
                            alignItems="center"
                        >
                            <Flex
                                onClick={() => reset()}
                                fontSize="18px"
                                _hover={{
                                    textDecoration: 'underline',
                                    cursor: 'pointer',
                                }}
                            >
                                reset
                            </Flex>
                            <Flex
                                justifyContent="space-around"
                                m="32px"
                                alignItems="center"
                            >
                                <Flex
                                    onClick={() => subMinutes()}
                                    fontSize="24px"
                                    _hover={{
                                        textDecoration: 'underline',
                                        cursor: 'pointer',
                                    }}
                                >
                                    -15
                                </Flex>
                                <Flex
                                    ml="32px"
                                    mr="32px"
                                    w="240px"
                                    justifyContent="center"
                                    fontSize="56px"
                                    fontWeight="bold"
                                >
                                    {formattedTime()}
                                </Flex>
                                <Flex
                                    onClick={() => addMinutes()}
                                    fontSize="24px"
                                    _hover={{
                                        textDecoration: 'underline',
                                        cursor: 'pointer',
                                    }}
                                >
                                    +15
                                </Flex>
                            </Flex>
                            <Flex
                                onClick={() => startTimer()}
                                _hover={{ cursor: 'pointer' }}
                            >
                                {isPlaying ? (
                                    <PauseIcon
                                        color="purple.500"
                                        height="48px"
                                        width="48px"
                                    />
                                ) : (
                                    <PlayIcon
                                        color="purple.500"
                                        height="48px"
                                        width="48px"
                                    />
                                )}
                            </Flex>

                            <Flex mt="48px">
                                ----------llama----------apple----------apple--------apple-----------10
                                apples
                            </Flex>
                        </Flex>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

//on press play llama jumps and then starts running, jumps when he collects apples, sound plays on completion of time and when new apples grabbed

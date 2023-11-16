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
    Image,
} from '@chakra-ui/react'
import Notes from './Notes'
import Checklist from './Checklist'
import format from 'format-duration'
import { PauseIcon, PlayIcon } from '../../ChakraDesign/Icons'
import { Howl } from 'howler'
import levelUpEffect from '../../sounds/level-up-1.mp3'
import Llama from '../../animations/java-llama-react/Llama'
import RunningLlama from '../../animations/llama-mode/RunningLlama'

export default function LlamaModeModal({
    task,
    handleSetTaskName,
    onClose,
    handleBlur,
    handleKeyDown,
    name,
    updateTask,
}) {
    const levelUpSound = new Howl({
        src: [levelUpEffect],
        rate: 1.2,
    })

    const [showWelcomeMessage, setShowWelcomeMessage] = useState(true)
    const [countDownTime, setCountDownTime] = useState(60)
    const [totalTime, setTotalTime] = useState(60)
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
        if (countDownTime !== 0 && shouldRunTimer.current) {
            setCountDownTime(countDownTime - 1)

            let increment = totalTime / 4

            if (countDownTime + 1 === increment) {
                jump()
            }
            if (countDownTime + 1 === increment * 2) {
                jump()
            }
            if (countDownTime + 1 === increment * 3) {
                jump()
            }
        } else {
            if (shouldRunTimer.current === true) {
                levelUpSound.play()
            }
            shouldRunTimer.current = false
            setIsPlaying(false)
        }
    }, 1000)

    const startTimer = () => {
        clearInterval(interval)
        shouldRunTimer.current = !shouldRunTimer.current
        if (!isPlaying) {
            setTimeout(() => {
                jump()
            }, 500)
        }
        setIsPlaying(!isPlaying)
    }

    const reset = () => {
        clearInterval(interval)
        shouldRunTimer.current = false
        setCountDownTime(60)
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

    // game functions
    function jump() {
        let jumper = document.getElementById('jumper')
        let tail = document.querySelector('.tail-game')
        let frontLegDark = document.querySelector('.leg-front-dark')
        let frontLegLight = document.querySelector('.leg-front-light')
        let backLegDark = document.querySelector('.leg-back-dark')
        let backLegLight = document.querySelector('.leg-back-light')

        const jumpLevel = 1

        const delay = 1400 - jumpLevel * 200

        jumper.classList.add(`jump-${jumpLevel}`)
        tail.classList.add(`tail-jump-${jumpLevel}`)
        frontLegDark.classList.add(`prance-front-dark-${jumpLevel}`)
        frontLegLight.classList.add(`prance-front-light-${jumpLevel}`)
        backLegDark.classList.add(`prance-back-dark-${jumpLevel}`)
        backLegLight.classList.add(`prance-back-light-${jumpLevel}`)

        setTimeout(() => {
            jumper.classList.remove(`jump-${jumpLevel}`)
            tail.classList.remove(`tail-jump-${jumpLevel}`)
            frontLegDark.classList.remove(`prance-front-dark-${jumpLevel}`)
            frontLegLight.classList.remove(`prance-front-light-${jumpLevel}`)
            backLegDark.classList.remove(`prance-back-dark-${jumpLevel}`)
            backLegLight.classList.remove(`prance-back-light-${jumpLevel}`)
        }, delay)
    }

    return (
        <Modal size="full" isOpen={true} onClose={onClose} autoFocus={false}>
            <ModalOverlay />
            <ModalContent backgroundColor={showWelcomeMessage && 'gray.600'}>
                {showWelcomeMessage ? (
                    <Flex alignItems="center" flexDirection="column">
                        <Flex
                            mt="12vh"
                            fontSize="32px"
                            justifyContent="center"
                            className="gamer-text"
                            color="white"
                            pl="10vw"
                            pr="10vw"
                            w="100%"
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
                            w="100%"
                            flexDirection="column"
                            alignItems="center"
                            mt="10vh"
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

                            <Flex
                                mt="48px"
                                justifyContent="center"
                                border="1px solid purple"
                                position="relative"
                                height="300px"
                                width="80vw"
                                flexDirection="column"
                            >
                                {isPlaying ? (
                                    <Box
                                        style={{
                                            position: 'absolute',
                                            right: `calc(${
                                                (countDownTime / totalTime) *
                                                100
                                            }% - 70px)`,
                                        }}
                                        transition="2.1s ease all"
                                    >
                                        <RunningLlama
                                            sunnies
                                            llamaHeight={120}
                                            noAbsolute
                                        />
                                    </Box>
                                ) : (
                                    <Llama
                                        sunnies
                                        minHeight={120}
                                        progress={[0, 10]}
                                    />
                                )}
                                <Flex>
                                    <Box
                                        style={{
                                            width: '90px',
                                            height: '40px',
                                            backgroundColor: 'green',
                                            borderRadius: '50px 50px 0 0',
                                            zIndex: 100,
                                        }}
                                    ></Box>
                                    <Box
                                        style={{
                                            width: '90px',
                                            height: '40px',
                                            backgroundColor: 'green',
                                            borderRadius: '50px 50px 0 0',
                                        }}
                                    ></Box>
                                    <Box
                                        style={{
                                            width: '90px',
                                            height: '40px',
                                            backgroundColor: 'green',
                                            borderRadius: '50px 50px 0 0',
                                        }}
                                    ></Box>
                                    <Box
                                        style={{
                                            width: '90px',
                                            height: '40px',
                                            backgroundColor: 'green',
                                            borderRadius: '50px 50px 0 0',
                                        }}
                                    ></Box>
                                    <Box
                                        style={{
                                            width: '90px',
                                            height: '40px',
                                            backgroundColor: 'green',
                                            borderRadius: '50px 50px 0 0',
                                        }}
                                    ></Box>
                                </Flex>
                            </Flex>
                        </Flex>
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
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

//on press play llama jumps and then starts running, jumps when he collects apples, sound plays on completion of time and when new apples grabbed

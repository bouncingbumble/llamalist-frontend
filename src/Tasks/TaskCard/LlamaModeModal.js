import React, { useRef, useState } from 'react'
import {
    Flex,
    Text,
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    Input,
    useInterval,
} from '@chakra-ui/react'
import Notes from './Notes'
import Checklist from './Checklist'
import format from 'format-duration'
import { PauseIcon, PlayIcon } from '../../ChakraDesign/Icons'
import { Howl } from 'howler'
import levelUpEffect from '../../sounds/level-up-1.mp3'
import Llama from '../../animations/java-llama-react/Llama'
import LlamaModeLlama from '../../animations/llama-mode/LlamaModeLlama'
import './llamaMode.css'
import Tree from '../../animations/llama-mode/Tree'
import Bush from '../../animations/llama-mode/Bush'
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
    const [showApple1, setShowApple1] = useState(true)
    const [showApple2, setShowApple2] = useState(true)
    const [showApple3, setShowApple3] = useState(true)
    const [showApple4, setShowApple4] = useState(true)
    const [progress, setProgress] = useState([0, 10])

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

            if (countDownTime - 1 === increment) {
                eatApple()
                setShowApple3(false)
            }
            if (countDownTime - 1 === increment * 2) {
                eatApple()
                setShowApple2(false)
            }
            if (countDownTime - 1 === increment * 3) {
                eatApple()
                setShowApple1(false)
            }
        } else {
            if (shouldRunTimer.current === true) {
                levelUpSound.play()
                setShowApple4(false)
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
                eatApple()
            }, 500)
        }
        setIsPlaying(!isPlaying)
    }

    const reset = () => {
        clearInterval(interval)
        shouldRunTimer.current = false
        setCountDownTime(60)
        setIsPlaying(false)
        setShowApple1(true)
        setShowApple2(true)
        setShowApple3(true)
        setShowApple4(true)
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
    function eatApple() {
        const delay = 1400 - 200

        setProgress([5, 10])

        const llama = document.getElementById(`jumper`)
        const llamaNeck = document.getElementById('neck')
        const llamaMouth = document.getElementById(`mouth`)

        llamaMouth.classList.remove('mouth')
        llamaMouth.classList.remove('monch')
        llamaMouth.classList.add('open-mouth')
        llama.classList.remove('bounce-llama')
        llamaNeck.classList.remove('bounce-neck')

        setTimeout(() => {
            llama.classList.add('bounce-llama')

            setProgress([0, 10])

            llamaMouth.classList.remove('open-mouth')

            llamaNeck.classList.add('bounce-neck')
            llamaMouth.classList.add('monch')

            setTimeout(() => {
                llama.classList.remove('bounce-llama')
            }, 1000)

            llamaNeck.classList.remove('bounce-neck')
            setTimeout(() => {
                llamaMouth.classList.remove('monch')
                llamaMouth.classList.add('mouth')
            }, 2000)
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
                            pt="10vh"
                            backgroundColor="#9CD3F9"
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
                                position="relative"
                                paddingTop="32px"
                                width="100%"
                                flexDirection="column"
                                backgroundColor="#9CD3F9"
                                height="194px"
                                paddingLeft="32px"
                                paddingRight="32px"
                            >
                                <Box
                                    style={{
                                        position: 'absolute',
                                        right: `calc(${
                                            (countDownTime / totalTime) * 100
                                        }%)`,
                                        bottom: 20,
                                    }}
                                    transition="2.1s ease all"
                                    zIndex={10}
                                >
                                    <LlamaModeLlama
                                        sunnies
                                        llamaHeight={120}
                                        progress={progress}
                                    />
                                </Box>

                                <Flex mt="auto" ml="-32px" mr="-32px">
                                    <Bush />
                                    <div style={{ display: 'absolute' }}>
                                        <Tree />
                                    </div>
                                    <Bush />
                                    <Bush /> <Bush /> <Bush />
                                    <Bush />
                                    <div style={{ display: 'absolute' }}>
                                        <Tree showApple={showApple1} />
                                    </div>
                                    <Bush /> <Bush /> <Bush />
                                    <Bush /> <Bush /> <Bush />
                                    <div style={{ display: 'absolute' }}>
                                        <Tree showApple={showApple2} />
                                    </div>
                                    <Bush /> <Bush />
                                    <Bush /> <Bush />
                                    <Bush /> <Bush />
                                    <div style={{ display: 'absolute' }}>
                                        <Tree showApple={showApple3} />
                                    </div>
                                    <Bush />
                                    <Bush /> <Bush />
                                    <Bush /> <Bush />
                                    <div style={{ display: 'absolute' }}>
                                        <Tree showApple={showApple4} />
                                    </div>
                                    <Bush />
                                    <Bush />
                                    <Bush />
                                    <Bush />
                                    <Bush />
                                    <div style={{ display: 'absolute' }}>
                                        <Tree />
                                    </div>
                                    <Bush />
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

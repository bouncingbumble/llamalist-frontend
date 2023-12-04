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
    Checkbox,
} from '@chakra-ui/react'
import Notes from './Notes'
import Checklist from './Checklist'
import format from 'format-duration'
import { PauseIcon, PlayIcon } from '../../ChakraDesign/Icons'
import { Howl } from 'howler'
import levelUpEffect from '../../sounds/level-up-1.mp3'
import LlamaModeLlama from '../../animations/llama-mode/LlamaModeLlama'
import './llamaMode.css'
import Tree from '../../animations/llama-mode/Tree'
import Bush from '../../animations/llama-mode/Bush'
import { useUpdateStats, useUserStats } from '../../Hooks/UserHooks'

export default function LlamaModeModal({
    task,
    handleSetTaskName,
    onClose,
    handleBlur,
    handleKeyDown,
    name,
    updateTask,
    handleCheckboxClick,
    isChecked,
}) {
    const levelUpSound = new Howl({
        src: [levelUpEffect],
        rate: 1.2,
    })

    const [showWelcomeMessage, setShowWelcomeMessage] = useState(true)
    const [countDownTime, setCountDownTime] = useState(300)
    const [totalTime, setTotalTime] = useState(300)
    const shouldRunTimer = useRef(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [showApple1, setShowApple1] = useState(true)
    const [showApple2, setShowApple2] = useState(true)
    const [showApple3, setShowApple3] = useState(true)
    const [showApple4, setShowApple4] = useState(true)
    const [progress, setProgress] = useState([0, 10])

    const stats = useUpdateStats()
    const userStats = useUserStats()
    setTimeout(() => {
        setShowWelcomeMessage(false)
    }, 3000)

    const addMinutes = (seconds) => {
        //add 15 minutes
        setCountDownTime(countDownTime + seconds)
        setTotalTime(totalTime + seconds)
    }
    const subMinutes = (seconds) => {
        if (countDownTime > seconds) {
            //sub 15 minutes
            setCountDownTime(countDownTime - seconds)
            setTotalTime(totalTime - seconds)
        }
    }

    let interval = useInterval(() => {
        if (countDownTime !== 0 && shouldRunTimer.current) {
            setCountDownTime(countDownTime - 1)

            let increment = totalTime / 4

            if (countDownTime - 1 === increment) {
                eatApple()
                setTimeout(() => {
                    setShowApple3(false)
                }, 1000)
            }
            if (countDownTime - 1 === increment * 2) {
                eatApple()
                setTimeout(() => {
                    setShowApple2(false)
                }, 1000)
            }
            if (countDownTime - 1 === increment * 3) {
                eatApple()
                setTimeout(() => {
                    setShowApple1(false)
                }, 1000)
            }
        } else {
            if (shouldRunTimer.current === true) {
                eatApple()

                setTimeout(() => {
                    setShowApple4(false)
                    levelUpSound.play()
                }, 1000)
                setTimeout(() => {
                    setIsPlaying(false)
                }, 2000)
            }

            shouldRunTimer.current = false
        }
    }, 1000)

    const startTimer = () => {
        if (countDownTime > 0) {
            clearInterval(interval)
            shouldRunTimer.current = !shouldRunTimer.current

            setIsPlaying(!isPlaying)
        } else {
            alert('please add more time 🦙')
        }
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
        const crumbs = document.getElementsByClassName('crumby')

        setTimeout(() => {
            llama.classList.add('bounce-llama')

            setProgress([0, 10])

            llamaMouth.classList.remove('open-mouth')

            llamaNeck.classList.add('bounce-neck')
            llamaMouth.classList.add('monch')
            crumbs[0].classList.add('crumby-flying-top-right')
            crumbs[1].classList.add('crumby-flying-top-left')
            crumbs[2].classList.add('crumby-flying-bottom-right')
            crumbs[3].classList.add('crumby-flying-bottom-left')

            setTimeout(() => {
                crumbs[0].classList.remove('crumby-flying-top-right')
                crumbs[1].classList.remove('crumby-flying-top-left')
                crumbs[2].classList.remove('crumby-flying-bottom-right')
                crumbs[3].classList.remove('crumby-flying-bottom-left')
            }, 500)
            setTimeout(() => {
                llama.classList.remove('bounce-llama')
            }, 1000)

            llamaNeck.classList.remove('bounce-neck')
            setTimeout(() => {
                llamaMouth.classList.remove('monch')
                llamaMouth.classList.add('mouth')
                stats.mutate({
                    ...userStats.data,
                    applesCount: userStats.data?.applesCount + 1,
                })
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
                                    onClick={() => subMinutes(60)}
                                    fontSize="18px"
                                    marginRight="8px"
                                    _hover={{
                                        textDecoration: 'underline',
                                        cursor: 'pointer',
                                    }}
                                >
                                    -1
                                </Flex>
                                <Flex
                                    onClick={() => subMinutes(900)}
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
                                    mr="24px"
                                    w="240px"
                                    justifyContent="center"
                                    fontSize="56px"
                                    fontWeight="bold"
                                >
                                    {formattedTime()}
                                </Flex>
                                <Flex
                                    onClick={() => addMinutes(900)}
                                    fontSize="24px"
                                    _hover={{
                                        textDecoration: 'underline',
                                        cursor: 'pointer',
                                    }}
                                >
                                    +15
                                </Flex>
                                <Flex
                                    onClick={() => addMinutes(60)}
                                    fontSize="18px"
                                    _hover={{
                                        textDecoration: 'underline',
                                        cursor: 'pointer',
                                    }}
                                    marginLeft="8px"
                                >
                                    +1
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
                                w="100%"
                                justifyContent="space-between"
                                mt="48px"
                                backgroundColor="#9CD3F9"
                                height="194px"
                            >
                                <Flex
                                    w="10%"
                                    flexDirection="column"
                                    paddingTop="32px"
                                    justifyContent="center"
                                    position="relative"
                                >
                                    <Flex mt="auto" w="100%">
                                        <Bush />
                                        <div style={{ display: 'absolute' }}>
                                            <Tree />
                                        </div>
                                        <Bush />
                                    </Flex>
                                </Flex>
                                <Flex
                                    justifyContent="center"
                                    position="relative"
                                    width="80%"
                                    flexDirection="column"
                                    paddingTop="32px"
                                >
                                    <Flex mt="auto" w="100%">
                                        {isPlaying && (
                                            <Box
                                                style={{
                                                    position: 'absolute',
                                                    right: `calc(${
                                                        (countDownTime /
                                                            totalTime) *
                                                        100
                                                    }% + 170px)`,
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
                                        )}
                                        <Bush />
                                        <Bush /> <Bush />
                                        <div style={{ display: 'absolute' }}>
                                            <Tree
                                                showApple={showApple1}
                                                right={10}
                                            />
                                        </div>
                                        <Bush /> <Bush />
                                        <Bush /> <Bush />
                                        <div style={{ display: 'absolute' }}>
                                            <Tree
                                                showApple={showApple2}
                                                right={-10}
                                            />
                                        </div>
                                        <Bush /> <Bush />
                                        <Bush />
                                        <Bush /> <Bush />
                                        <div style={{ display: 'absolute' }}>
                                            <Tree
                                                showApple={showApple3}
                                                right={-20}
                                            />
                                        </div>
                                        <Bush /> <Bush />
                                        <Bush /> <Bush />
                                        <div style={{ display: 'absolute' }}>
                                            <Tree
                                                showApple={showApple4}
                                                right={-30}
                                            />
                                        </div>
                                        <Bush />
                                        <Bush />
                                        <Bush />
                                    </Flex>
                                </Flex>
                                <Flex
                                    w="10%"
                                    flexDirection="column"
                                    paddingTop="32px"
                                    justifyContent="center"
                                    position="relative"
                                >
                                    <Flex mt="auto" w="100%">
                                        <Bush />
                                        <div style={{ display: 'absolute' }}>
                                            <Tree />
                                        </div>

                                        <Bush />
                                    </Flex>
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
                            <Flex
                                onClick={handleCheckboxClick}
                                alignItems="center"
                            >
                                <Checkbox
                                    size="lg"
                                    colorScheme="purple"
                                    borderColor="gray.900"
                                    isChecked={isChecked}
                                />

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
                                        backgroundColor:
                                            'rgba(118, 61, 225, 0.1)',
                                    }}
                                    borderRadius="8px"
                                />
                            </Flex>
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

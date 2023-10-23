import React, { useEffect, useState } from 'react'
import space3 from '../../../images/space3.png'
import Llama from '../../java-llama-react/Llama'
import SpeechBubble from '../../java-llama-react/SpeechBubble'
import chompSound from '../../../sounds/chomp.mp3'
import { Howl } from 'howler'
import { DndContext } from '@dnd-kit/core'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { DraggableApple } from '../../../Tasks/DraggableApple'
import { Box, Flex, Progress } from '@chakra-ui/react'
import { useUserStats, useUpdateStats } from '../../../Hooks/UserHooks'

export default function Space({
    index,
    slide,
    offset,
    store,
    funFact,
    scribbleSound,
    showSpeechBubble,
    setShowSpeechBubble,
}) {
    const id = uuidv4()
    const chomp = new Howl({ src: [chompSound] })

    // state
    const [dragging, setDragging] = useState(false)
    const [progress, setProgress] = useState([0, 10])
    const [openHelmet, setOpenHelmet] = useState(false)

    // hooks
    const navigate = useNavigate()
    const userStats = useUserStats()
    const updateStats = useUpdateStats()

    const goToLlamaLand = () => {
        if (!store) {
            if (scribbleSound.id) {
                scribbleSound.audio.stop(scribbleSound.id)
            }
            navigate('/llamaLand')
        }
    }

    const llamaFeedingsToday = () => {
        let feedings = 0
        userStats.data?.llamaFeedings.map((feeding) => {
            if (
                Math.abs(new Date() - new Date(feeding)) / 36e5 <
                new Date().getHours()
            ) {
                feedings = feedings + 1
            }
        })

        return feedings
    }

    const handleOpenSpeechBubble = () => {
        if (!dragging && !store) {
            setShowSpeechBubble(true)
        }
    }

    // declare DOM elements and positions
    let moonX
    let moonY
    let moonFace
    let moonRect
    let spaceContainer
    let crumb1 = 0 + slide * 4
    let crumb2 = 1 + slide * 4
    let crumb3 = 2 + slide * 4
    let crumb4 = 3 + slide * 4

    const getEyeAngle = (event) => {
        // get mouse position
        const mouseX = event.clientX
        const mouseY = event.clientY

        // calculate angles in radians
        const angle = Math.atan2(mouseY - moonY, mouseX - moonX)

        // deconstruct angles into x and y coordinates
        const translateX = 5 * Math.cos(angle)
        const translateY = 5 * Math.sin(angle)

        // apply transform to face
        moonFace.style.transform = `translate(${translateX}px, ${translateY}px)`
    }

    const handleDragStart = () => {
        setDragging(true)
        setOpenHelmet(true)
        setProgress([0.3, 10])

        const llama = document.getElementById(`llama-${id}`)
        const llamaNeck = document.getElementById(`neck-${id}`)
        const llamaMouth = document.getElementById(`mouth-${id}`)

        llamaMouth.classList.remove('mouth')
        llamaMouth.classList.remove('monch')
        llamaMouth.classList.add('open-mouth')
        llama.classList.remove('bounce-llama')
        llamaNeck.classList.remove('bounce-neck')
    }

    const handleDragEnd = (e) => {
        setOpenHelmet(false)
        setProgress([0, 10])

        const llamaMouth = document.getElementById(`mouth-${id}`)
        llamaMouth.classList.remove('open-mouth')

        if (e.over && e.over.id === 'droppable') {
            chomp.play()

            const llama = document.getElementById(`llama-${id}`)
            const llamaNeck = document.getElementById(`neck-${id}`)
            llama.classList.add('bounce-llama')
            llamaNeck.classList.add('bounce-neck')
            llamaMouth.classList.add('monch')

            const crumbs = document.getElementsByClassName('crumb')
            crumbs[crumb1].classList.add('crumb-flying-top-right')
            crumbs[crumb2].classList.add('crumb-flying-top-left')
            crumbs[crumb3].classList.add('crumb-flying-bottom-right')
            crumbs[crumb4].classList.add('crumb-flying-bottom-left')

            setTimeout(() => {
                crumbs[crumb1].classList.remove('crumb-flying-top-right')
                crumbs[crumb2].classList.remove('crumb-flying-top-left')
                crumbs[crumb3].classList.remove('crumb-flying-bottom-right')
                crumbs[crumb4].classList.remove('crumb-flying-bottom-left')
                setDragging(false)

                updateStats.mutate({
                    ...userStats.data,
                    applesCount: userStats.data?.applesCount - 1,
                    fedLlama: true,
                })
            }, 500)

            setTimeout(() => {
                llama.classList.remove('bounce-llama')
                llamaNeck.classList.remove('bounce-neck')
            }, 1000)

            setTimeout(() => {
                llamaMouth.classList.remove('monch')
                llamaMouth.classList.add('mouth')
            }, 2000)
        } else {
            setDragging(false)
            llamaMouth.classList.add('mouth')
        }
    }

    useEffect(() => {
        setTimeout(() => {
            // define DOM elements and positions once page has loaded
            const moonFaces = document.getElementsByClassName('moon-face')
            moonFace = moonFaces[moonFaces.length - 1]
            moonRect = moonFace.getBoundingClientRect()
            moonX = moonRect.left + moonRect.width / 2
            moonY = moonRect.top + moonRect.height / 2
            spaceContainer = document.getElementById(
                `space-container${store ? '-store' : ''}`
            )
            // add/remove event listener
            spaceContainer?.addEventListener('mousemove', getEyeAngle)
        }, 500)
        return () => {
            spaceContainer?.removeEventListener('mousemove', getEyeAngle)
        }
    }, [offset, slide])

    return (
        <Flex
            overflow="hidden"
            direction="column"
            width="300px"
            height="100%"
            backgroundImage={space3}
            backgroundSize="300px"
            backgroundPosition={store ? 'bottom' : 'top -20vh left 0px'}
            justify="end"
            position="relative"
        >
            <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
                <Flex
                    width="300px"
                    height="100%"
                    direction="column"
                    justify="end"
                    align="center"
                    position="relative"
                    id={`space-container${store ? '-store' : ''}`}
                >
                    <div class="moon">
                        <div class="moon-row">
                            <div class="crater crater1"></div>
                            <div class="crater crater2"></div>
                        </div>
                        <div class="moon-row">
                            <div class="crater crater3"></div>
                            <div class="moon-face">
                                <div class="blush"></div>
                                <div class="moon-eye moon-eye-l"></div>
                                <div class="moon-mouth"></div>
                                <div class="moon-eye moon-eye-r"></div>
                                <div class="blush"></div>
                            </div>
                        </div>
                        <div class="moon-row">
                            <div class="crater crater4"></div>
                            <div class="crater crater5"></div>
                        </div>
                    </div>
                    <div class="moon-shadow"></div>
                    <div class="orbit">
                        <div class="rocket">
                            <div class="rocket-window"></div>
                        </div>
                    </div>
                    <div
                        class="space-llama"
                        onClick={goToLlamaLand}
                        onMouseOver={handleOpenSpeechBubble}
                        onMouseLeave={() => {
                            !store && setShowSpeechBubble(false)
                        }}
                        style={{
                            width: '110px',
                            cursor: !store && 'pointer',
                            marginBottom: !store && '8px',
                        }}
                    >
                        <Llama
                            space
                            id={id}
                            minHeight={150}
                            maxHeight={300}
                            progress={progress}
                            openHelmet={openHelmet}
                        />
                    </div>

                    {!store && (
                        <Flex pl="8px" alignItems="center" mb="8px">
                            <Box fontWeight="500" color="white">
                                hunger
                            </Box>
                            <Progress
                                ml="8px"
                                mb="-2px"
                                height="8px"
                                width="200px"
                                borderRadius="16px"
                                backgroundColor="gray.50"
                                value={(llamaFeedingsToday() / 3) * 100}
                                className={
                                    llamaFeedingsToday() === 0 && 'borderBlink'
                                }
                                sx={{
                                    '& > div:first-child': {
                                        transitionProperty: 'width',
                                        backgroundColor:
                                            llamaFeedingsToday() > 2
                                                ? 'green.500'
                                                : llamaFeedingsToday() > 1
                                                ? 'orange.500'
                                                : 'red.500',
                                    },
                                }}
                            />
                        </Flex>
                    )}
                </Flex>
                {!store && (
                    <Flex position="absolute" zIndex={0}>
                        {userStats.data?.applesCount > 0 && (
                            <Box position="absolute" left="30px" bottom="24vh">
                                <DraggableApple num={0} />
                            </Box>
                        )}
                        {userStats.data?.applesCount > 1 && (
                            <Box position="absolute" left="260px" bottom="30vh">
                                <DraggableApple num={1} />
                            </Box>
                        )}
                        {userStats.data?.applesCount > 2 && (
                            <Box position="absolute" left="80px" bottom="43vh">
                                <DraggableApple num={2} />
                            </Box>
                        )}
                        {userStats.data?.applesCount > 3 && (
                            <Box position="absolute" left="180px" bottom="15vh">
                                <DraggableApple num={3} />
                            </Box>
                        )}
                        {userStats.data?.applesCount > 4 && (
                            <Box position="absolute" left="160px" bottom="28vh">
                                <DraggableApple num={4} />
                            </Box>
                        )}
                        {!store && userStats.data?.applesCount > 5 && (
                            <Box position="absolute" left="30px" bottom="35vh">
                                <DraggableApple num={5} />
                            </Box>
                        )}
                        {!store && userStats.data?.applesCount > 6 && (
                            <Box position="absolute" left="260px" bottom="18vh">
                                <DraggableApple num={6} />
                            </Box>
                        )}
                    </Flex>
                )}
            </DndContext>
            {showSpeechBubble && slide === index && (
                <div
                    style={{
                        left: '-10px',
                        bottom: '40px',
                        position: 'absolute',
                    }}
                >
                    <SpeechBubble
                        funFact={funFact}
                        setShowSpeechBubble={setShowSpeechBubble}
                    />
                </div>
            )}
        </Flex>
    )
}

import React, { useEffect, useState } from 'react'
import './fields.css'
import { Box, Text, Flex, Progress } from '@chakra-ui/react'
import { DndContext } from '@dnd-kit/core'
import { Howl } from 'howler'
import Llama from '../llama/Llama'
import SpeechBubble from '../llama/SpeechBubble'
import scribble from './scribble.mp3'
import chompSound from './chomp.mp3'
import { apiCall } from './api'
import { DraggableApple } from './DraggableApple'

export default function Frenzyfields() {
    const [llamaFeedings, setLlamaFeedings] = useState(0)
    const [progress, setProgress] = useState([0, 10])
    const [disableDrag, setDisableDrag] = useState(false)
    const [showSpeechBubble, setShowSpeechBubble] = useState(false)
    const [scribbleSound, setScribbleSound] = useState({})
    const [funFact, setFunFact] = useState('')

    var html,
        sun,
        rainbow,
        rabbit,
        snow,
        rain,
        lightColours,
        mediumColours,
        darkColours,
        backgroundColours,
        bushColours,
        cloudColours,
        seasons,
        season

    var c = 1

    useEffect(() => {
        getLlamaInfo()
    }, [])

    const getLlamaInfo = async () => {
        try {
            // grab llama object
            const llama = await apiCall(`GET`, `/llama`)

            // filter out necessary info for speech bubble
            const fact = {
                speed: llama.funFactSpeed,
                sequence: llama.funFactSequence,
            }

            // init scribble sound and length
            const scribbleEffect = new Howl({
                src: [scribble],
                sprite: { scribble: [0, llama.funFactDuration] },
            })

            // set fun fact and golden llama state
            setFunFact(fact)
            setScribbleSound({ audio: scribbleEffect, id: null })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (showSpeechBubble) {
            const audioId = scribbleSound.audio.play('scribble')
            scribbleSound.id = audioId
            setScribbleSound(scribbleSound)
        } else {
            if (scribbleSound.id) {
                scribbleSound.audio.stop(scribbleSound.id)
            }
        }
    }, [showSpeechBubble])

    const handleDragEnd = (e) => {
        // remove open mouth class
        const mouth = document.querySelector('.open-mouth')
        mouth.classList.remove('open-mouth')

        setProgress([0, 10])

        // if he eats it
        if (e.over && e.over.id === 'droppable') {
            setDisableDrag(true)
            const chomp = new Howl({
                src: [chompSound],
            })
            chomp.play()

            setLlamaFeedings(llamaFeedings + 1)

            const llama = document.querySelector('.alpaca')
            const neck = document.querySelector('.neck')
            neck.classList.add('bounce-neck')
            llama.classList.add('bounce-llama')

            mouth.classList.add('monch')
            setTimeout(() => {
                neck.classList.remove('bounce-neck')
                llama.classList.remove('bounce-llama')
                mouth.classList.remove('monch')
                mouth.classList.add('mouth')
                setDisableDrag(false)
            }, 1000)

            const crumbs = document.getElementsByClassName('crumb')
            crumbs[0].classList.add('crumb-flying-top-right')
            crumbs[1].classList.add('crumb-flying-top-left')
            crumbs[2].classList.add('crumb-flying-bottom-right')
            crumbs[3].classList.add('crumb-flying-bottom-left')

            setTimeout(() => {
                crumbs[0].classList.remove('crumb-flying-top-right')
                crumbs[1].classList.remove('crumb-flying-top-left')
                crumbs[2].classList.remove('crumb-flying-bottom-right')
                crumbs[3].classList.remove('crumb-flying-bottom-left')
            }, 500)
        } else {
            mouth.classList.add('mouth')
        }
    }

    const handleDragStart = () => {
        setProgress([0.5, 10])
        const mouth = document.querySelector('.mouth')
        mouth.classList.remove('mouth')
        mouth.classList.add('open-mouth')
    }

    useEffect(() => {
        html = document.getElementsByClassName('bigContainer')[0]
        sun = document.querySelector('.sun')
        rabbit = document.querySelector('.rabbit')
        snow = document.querySelectorAll('.snow')
        rain = document.querySelectorAll('.rain')

        lightColours = ['#9DD7FB', '#A0CC00', '#DAD607', '#FAB061']
        mediumColours = ['#7AC0CD', '#A7CC00', '#96B800', '#FE9D0B']
        darkColours = ['#56A0C8', '#4DA85B', '#BAAB26', '#FE6C0B']
        backgroundColours = ['#D2EEE8', '#EBF7FF', '#F9F08B', '#FFDC8A']
        bushColours = ['#FAFAFA', '#73BF7F', '#90B800', '#E26E3C']
        cloudColours = ['#FAFAFA', '#FAFAFA', '#FAFAFA', '#F0FAF7']
        seasons = ['Winter', 'Spring', 'Summer', 'Autumn']
    }, [])

    function updateSeasons() {
        if (html) {
            html.style.setProperty('--bgd-color', backgroundColours[c])
            html.style.setProperty('--light', lightColours[c])
            html.style.setProperty('--medium', mediumColours[c])
            html.style.setProperty('--dark', darkColours[c])
            html.style.setProperty('--bush', bushColours[c])
            html.style.setProperty('--cloud', cloudColours[c])
            season = seasons[c]

            //add snow if season = winter
            snow.forEach(function (el) {
                season !== seasons[0]
                    ? (el.style.display = 'none')
                    : (el.style.display = 'block')
            })

            rabbit.classList.add('animated')

            //add rainbow if season = spring
            if (season === seasons[1]) {
                html.style.setProperty('--rabbit', '#9E6255')
            }

            //add sun and rabbit if season = summer
            if (season === seasons[2]) {
                html.style.setProperty('--sun', '#ffb53a')
                html.style.setProperty('--rabbit', '#9E6255')
            } else {
                html.style.setProperty('--sun', 'transparent')
            }

            //add rain if season = autumn
            rain.forEach(function (el) {
                season === seasons[3]
                    ? (el.style.display = 'block')
                    : (el.style.display = 'none')
            })

            //increment array index
            c = (c + 1) % seasons.length
        }
    }

    //animate all
    let nF = 0
    function animate() {
        if (++nF % 600 === 0) {
            updateSeasons()
        }
        requestAnimationFrame(animate)
    }
    animate()

    return (
        <Box className="bigContainer">
            <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
                <div className="container">
                    <Text
                        fontWeight="extrabold"
                        fontSize="xl"
                        color="purpleSlideFaded.700"
                        pt="8px"
                        pl="16px"
                        zIndex={200}
                        position="relative"
                    ></Text>
                    <div className="season" />
                    <div className="sun" />
                    <div className="cloud-group">
                        <div className="cloud">
                            <div className="weather-container">
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />

                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                            </div>
                        </div>

                        <div className="cloud">
                            <div className="weather-container">
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                            </div>
                        </div>
                        <div className="cloud">
                            <div className="weather-container">
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                            </div>
                        </div>
                        <div className="cloud">
                            <div className="weather-container">
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                            </div>
                        </div>
                        <div className="cloud">
                            <div className="weather-container">
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                            </div>
                        </div>
                        <div className="cloud">
                            <div className="weather-container">
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                            </div>
                        </div>
                        <div className="cloud">
                            <div className="weather-container">
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                            </div>
                        </div>
                        <div className="cloud">
                            <div className="weather-container">
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="snow" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                                <div className="rain" />
                            </div>
                        </div>
                    </div>
                    <div className="base">
                        <div className="bush-group">
                            <div className="bush" />
                            <div className="bush" />
                            <div className="bush" />
                            <div className="bush" />
                            <div className="bush" />
                            <div className="bush" />
                            <div className="bush" />
                            <div className="bush" />
                            <div className="bush" />
                            <Flex
                                position="relative"
                                zIndex="500"
                                top="-4px"
                                left="188px"
                                alignItems="center"
                            >
                                <Box fontWeight="500">hunger</Box>
                                <Progress
                                    ml="8px"
                                    mb="-2px"
                                    height="8px"
                                    width="210px"
                                    marginRight="16px"
                                    borderRadius="16px"
                                    backgroundColor="gray.50"
                                    zIndex="500"
                                    className={
                                        llamaFeedings === 0 && 'borderBlink'
                                    }
                                    value={(llamaFeedings / 3) * 100}
                                    sx={{
                                        '& > div:first-child': {
                                            transitionProperty: 'width',
                                            backgroundColor:
                                                llamaFeedings > 2
                                                    ? 'green.500'
                                                    : llamaFeedings > 1
                                                    ? 'orange.500'
                                                    : 'red.500',
                                        },
                                    }}
                                />
                            </Flex>
                        </div>

                        <Flex flexDirection="row">
                            <Flex
                                w="100%"
                                alignItems="flex-end"
                                mb="12px"
                                justifyContent="flex-end"
                            >
                                <Flex
                                    ml="40px"
                                    cursor="pointer"
                                    onMouseOver={() =>
                                        setShowSpeechBubble(true)
                                    }
                                    onMouseLeave={() =>
                                        setShowSpeechBubble(false)
                                    }
                                >
                                    <div className="rabbit">
                                        <Llama
                                            sunnies
                                            progress={progress}
                                            setProgress={setProgress}
                                            minHeight={136}
                                            maxHeight={400}
                                        />
                                    </div>
                                </Flex>
                            </Flex>
                        </Flex>

                        <div className="tree-group">
                            <div className="tree">
                                <div className="trunk" />
                                <div className="tree-top" />
                            </div>
                            <div className="tree">
                                <div className="trunk" />
                                <div className="tree-top" />
                            </div>
                            <div className="tree">
                                <div className="trunk" />
                                <div className="tree-top" />
                            </div>
                            <div className="" />
                            <div className="" />
                            <div className="tree">
                                <div className="trunk" />
                                <div className="tree-top" />
                                <Box position="absolute" top="-40px" left="8px">
                                    <DraggableApple
                                        num={6}
                                        disabled={disableDrag}
                                    />
                                </Box>
                            </div>
                            <div className="tree">
                                <div className="trunk" />
                                <div className="tree-top" />
                            </div>

                            <div className="tree">
                                <div className="trunk" />
                                <div className="tree-top" />
                                <div className="tree-top" />
                                <div className="tree-top" />
                            </div>
                            <div className="tree">
                                <div className="trunk" />
                                <div className="tree-top"></div>
                            </div>
                            <div className="" />
                            <div className="tree" zIndex="5">
                                <div className="trunk" />
                                <div className="tree-top" />
                                <div className="tree-top" />

                                <div className="tree-top" />
                                <Box top="-50" position="absolute" zIndex="5">
                                    <DraggableApple
                                        num={0}
                                        disabled={disableDrag}
                                    />
                                </Box>
                                <Box
                                    top="-22"
                                    left="-10"
                                    position="absolute"
                                    zIndex="5"
                                >
                                    <DraggableApple
                                        num={1}
                                        disabled={disableDrag}
                                    />
                                </Box>
                            </div>
                            <div className="tree" zIndex="5">
                                <div className="trunk" />
                                <div className="tree-top" />
                                <div className="tree-top" />
                                <div className="tree-top" />
                                <Box
                                    position="absolute"
                                    left="-30px"
                                    top="-80px"
                                >
                                    <DraggableApple
                                        num={2}
                                        disabled={disableDrag}
                                    />
                                </Box>
                                <Box position="absolute" top="-60px">
                                    <DraggableApple
                                        num={3}
                                        disabled={disableDrag}
                                    />
                                </Box>
                            </div>
                        </div>
                    </div>

                    <Box position="absolute" left="150px" top="210px">
                        <DraggableApple num={4} disabled={disableDrag} />
                    </Box>
                    <Box position="absolute" left="160px" top="260px">
                        <DraggableApple num={5} disabled={disableDrag} />
                    </Box>
                    {showSpeechBubble && (
                        <SpeechBubble
                            funFact={funFact}
                            setShowSpeechBubble={setShowSpeechBubble}
                        />
                    )}
                </div>
            </DndContext>
        </Box>
    )
}

import React, { useEffect, useState } from 'react'
import '../fields.css'
import { Box, Text, Flex, Progress } from '@chakra-ui/react'
import { DndContext } from '@dnd-kit/core'
import { Howl } from 'howler'
import chompSound from '../../../sounds/chomp.mp3'
import { DraggableApple } from '../../../Tasks/DraggableApple'
import { v4 as uuidv4 } from 'uuid'
import Llama from '../../java-llama-react/Llama'
import SpeechBubble from '../../java-llama-react/SpeechBubble'
import { useUserStats, useUpdateStats } from '../../../Hooks/UserHooks'
import { useNavigate } from 'react-router-dom'
import GoldenLlama from '../../goldenLlama/GoldenLlama'

export default function Nature({
    index,
    slide,
    store,
    name,
    funFact,
    goldenLlama,
    setGoldenLlama,
    scribbleSound,
    showSpeechBubble,
    setShowSpeechBubble,
}) {
    const id = uuidv4()
    const chomp = new Howl({ src: [chompSound] })

    // state
    const [progress, setProgress] = useState([0, 10])
    const [dragging, setDragging] = useState(false)

    // hooks
    const navigate = useNavigate()
    const userStats = useUserStats()
    const updateStats = useUpdateStats()

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
        season = name

    var c = 1

    let crumb1 = 0 + slide * 4
    let crumb2 = 1 + slide * 4
    let crumb3 = 2 + slide * 4
    let crumb4 = 3 + slide * 4

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

    const handleDragEnd = (e) => {
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

    const handleDragStart = () => {
        setDragging(true)
        setProgress([0.5, 10])

        const llama = document.getElementById(`llama-${id}`)
        const llamaNeck = document.getElementById(`neck-${id}`)
        const llamaMouth = document.getElementById(`mouth-${id}`)

        llamaMouth.classList.remove('mouth')
        llamaMouth.classList.remove('monch')
        llamaMouth.classList.add('open-mouth')
        llama.classList.remove('bounce-llama')
        llamaNeck.classList.remove('bounce-neck')
    }

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
    if (season === 'All Seasons') {
        animate()
    }

    useEffect(() => {
        html = document.querySelector(`#container-${id}`)
        sun = document.querySelector(`#sun-${id}`)
        rabbit = document.querySelector(`#rabbit-${id}`)
        snow = document.querySelectorAll(`.snow-${id}`)
        rain = document.querySelectorAll(`.rain-${id}`)

        lightColours = ['#9DD7FB', '#A0CC00', '#DAD607', '#FAB061']
        mediumColours = ['#7AC0CD', '#A7CC00', '#96B800', '#FE9D0B']
        darkColours = ['#56A0C8', '#4DA85B', '#BAAB26', '#FE6C0B']
        backgroundColours = ['#D2EEE8', '#EBF7FF', '#F9F08B', '#FFDC8A']
        bushColours = ['#FAFAFA', '#73BF7F', '#90B800', '#E26E3C']
        cloudColours = ['#FAFAFA', '#FAFAFA', '#FAFAFA', '#F0FAF7']
        seasons = ['Winter', 'Spring', 'Summer', 'Autumn']

        if (season !== 'All Seasons') {
            c = seasons.indexOf(season)
            updateSeasons()
        }
    }, [])

    return (
        <Box id={`container-${id}`} className="bigContainer">
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
                    <div id={`sun-${id}`} className="sun" />
                    <div className="cloud-group">
                        <div className="cloud">
                            <div className="weather-container">
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                            </div>
                        </div>
                        <div className="cloud cloud2">
                            {!store &&
                                !goldenLlama.found &&
                                goldenLlama.index === 1 && (
                                    <Flex width="100%" justify="center">
                                        <GoldenLlama
                                            hidden
                                            minHeight={30}
                                            goldenLlama={goldenLlama}
                                            setGoldenLlama={setGoldenLlama}
                                        />
                                    </Flex>
                                )}
                            <div className="weather-container">
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`snow snow-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
                                <div className={`rain rain-${id}`} />
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
                            {!store && (
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
                                            llamaFeedingsToday() === 0 &&
                                            'borderBlink'
                                        }
                                        value={(llamaFeedingsToday() / 3) * 100}
                                        sx={{
                                            '& > div:first-child': {
                                                transitionProperty: 'width',
                                                backgroundColor:
                                                    llamaFeedingsToday() > 2
                                                        ? 'green.500'
                                                        : llamaFeedingsToday() >
                                                          1
                                                        ? 'orange.500'
                                                        : 'red.500',
                                            },
                                        }}
                                    />
                                </Flex>
                            )}
                            {!store &&
                                !goldenLlama.found &&
                                goldenLlama.index === 2 && (
                                    <Flex
                                        top="-16px"
                                        left="430px"
                                        zIndex={500}
                                        position="absolute"
                                    >
                                        <GoldenLlama
                                            hidden
                                            minHeight={40}
                                            goldenLlama={goldenLlama}
                                            setGoldenLlama={setGoldenLlama}
                                        />
                                    </Flex>
                                )}
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
                                    cursor={!store && 'pointer'}
                                    onClick={goToLlamaLand}
                                    onMouseOver={handleOpenSpeechBubble}
                                    onMouseLeave={() => {
                                        !store && setShowSpeechBubble(false)
                                    }}
                                >
                                    <div id={`rabbit-${id}`} className="rabbit">
                                        <Llama
                                            store
                                            id={id}
                                            minHeight={136}
                                            maxHeight={400}
                                            progress={progress}
                                            setProgress={setProgress}
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
                                {!store && userStats.data?.applesCount > 6 && (
                                    <Box
                                        zIndex={0}
                                        position="absolute"
                                        top="-40px"
                                        left="8px"
                                    >
                                        <DraggableApple num={6} />
                                    </Box>
                                )}
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
                                <div className="tree-top">
                                    {!store &&
                                        !goldenLlama.found &&
                                        goldenLlama.index === 3 && (
                                            <Flex
                                                top="2px"
                                                left="8px"
                                                zIndex={10}
                                                position="absolute"
                                            >
                                                <GoldenLlama
                                                    hidden
                                                    minHeight={24}
                                                    goldenLlama={goldenLlama}
                                                    setGoldenLlama={
                                                        setGoldenLlama
                                                    }
                                                />
                                            </Flex>
                                        )}
                                </div>
                            </div>
                            <div className="" />
                            <div className="tree" zIndex="5">
                                <div className="trunk" />
                                <div className="tree-top" />
                                <div className="tree-top" />

                                <div className="tree-top" />
                                {!store && userStats.data?.applesCount > 0 && (
                                    <Box
                                        top="-50"
                                        position="absolute"
                                        zIndex={0}
                                    >
                                        <DraggableApple num={0} />
                                    </Box>
                                )}
                                {!store && userStats.data?.applesCount > 1 && (
                                    <Box
                                        top="-22"
                                        left="-10"
                                        position="absolute"
                                        zIndex={0}
                                    >
                                        <DraggableApple num={1} />
                                    </Box>
                                )}
                            </div>
                            <div className="tree" zIndex="5">
                                <div className="trunk" />
                                <div className="tree-top" />
                                <div className="tree-top" />
                                <div className="tree-top" />
                                {!store && userStats.data?.applesCount > 2 && (
                                    <Box
                                        position="absolute"
                                        left="-30px"
                                        top="-80px"
                                        zIndex={0}
                                    >
                                        <DraggableApple num={2} />
                                    </Box>
                                )}
                                {!store && userStats.data?.applesCount > 3 && (
                                    <Box
                                        zIndex={0}
                                        position="absolute"
                                        top="-60px"
                                    >
                                        <DraggableApple num={3} />
                                    </Box>
                                )}
                            </div>
                        </div>
                    </div>

                    {!store && userStats.data?.applesCount > 4 && (
                        <Box
                            zIndex={0}
                            position="absolute"
                            left="30px"
                            top="230px"
                        >
                            <DraggableApple num={4} />
                        </Box>
                    )}
                    {!store && userStats.data?.applesCount > 5 && (
                        <Box
                            zIndex={0}
                            position="absolute"
                            left="60px"
                            top="260px"
                        >
                            <DraggableApple num={5} />
                        </Box>
                    )}
                    {showSpeechBubble && slide === index && (
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

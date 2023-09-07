import React, { useEffect, useState } from 'react'
import './fields.css'
import { Box, Text, Flex, Progress } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { DndContext } from '@dnd-kit/core'
import { Howl } from 'howler'
import Llama from '../java-llama-react/Llama'
import SpeechBubble from '../../animations/java-llama-react/SpeechBubble'
import chompSound from '../../sounds/chomp.mp3'
import { useUpdateStats } from '../../Hooks/UserHooks'
import { DraggableApple } from '../../Tasks/DraggableApple'

export default function Frenzyfields({
    userStats,
    funFact,
    scribbleSound,
    showSpeechBubble,
    setShowSpeechBubble,
    progress,
    setProgress,
}) {
    const navigate = useNavigate()
    const [isDropped, setIsDropped] = useState(false)
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
        season

    var c = 1

    const goToLlamaLand = () => {
        if (scribbleSound.id) {
            scribbleSound.audio.stop(scribbleSound.id)
        }
        navigate('/llamaLand')
    }

    const handleDragEnd = e => {
        if (e.over && e.over.id === 'droppable') {
            setIsDropped(true)
            const chomp = new Howl({
                src: [chompSound],
            })
            chomp.play()

            updateStats.mutate({
                ...userStats.data,
                applesCount: userStats.data?.applesCount - 1,
                fedLlama: true,
            })
            setProgress([2, 10])
            setTimeout(() => {
                setProgress([0, 10])
            }, 200)
        }
    }

    const handleDragStart = () => {
        setProgress([1, 10])
    }

    useEffect(() => {
        html = document.getElementsByClassName('bigContainer')[0]
        sun = document.querySelector('.sun')
        rabbit = document.querySelector('.rabbit')
        snow = document.querySelectorAll('.snow')
        rain = document.querySelectorAll('.rain')
        lightColours = ['#97ABD5', '#85AF8B', '#D1C455', '#F99E85']
        mediumColours = ['#4666AB', '#77A67E', '#C9BB3C', '#F88E71']
        darkColours = ['#344C80', '#669B6E', '#9A8F2A', '#F45D34']
        backgroundColours = ['#E7E2F7', '#DAEDE8', '#FBFAF1', '#FDDFD6']
        bushColours = ['#FBFAF1', '#77A67E', '#D8CD6F', '#F88E71']
        cloudColours = ['#FBFAF1', '#FBFAF1', '#FBFAF1', '#F0F3F9']
        seasons = ['Winter', 'Spring', 'Summer', 'Autumn']
    }, [])

    const llamaFeedingsToday = () => {
        let feedings = 0
        userStats.data.llamaFeedings?.map(feeding => {
            if (
                Math.abs(new Date() - new Date(feeding)) / 36e5 <
                new Date().getHours()
            ) {
                feedings = feedings + 1
            }
        })

        return feedings
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
            snow.forEach(function(el) {
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
            rain.forEach(function(el) {
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
        <Box className="bigContainer" marginLeft="-16px" marginBottom="-16px">
            <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
                <div className="container">
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
                                left="204px"
                                alignItems="center"
                            >
                                hunger
                                {userStats.data && (
                                    <Progress
                                        ml="8px"
                                        mb="-2px"
                                        height="8px"
                                        width="172px"
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
                                )}
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
                                    onClick={goToLlamaLand}
                                >
                                    <div className="rabbit">
                                        {showSpeechBubble && (
                                            <SpeechBubble
                                                funFact={funFact}
                                                setShowSpeechBubble={
                                                    setShowSpeechBubble
                                                }
                                            />
                                        )}
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
                                {userStats.data?.applesCount > 6 && (
                                    <Box
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
                                {userStats.data?.applesCount > 4 && (
                                    <Box
                                        position="absolute"
                                        left="-30px"
                                        top="-80px"
                                    >
                                        <DraggableApple num={4} />
                                    </Box>
                                )}
                                {userStats.data?.applesCount > 5 && (
                                    <Box position="absolute" top="-60px">
                                        <DraggableApple num={5} />
                                    </Box>
                                )}
                            </div>
                            <div className="tree">
                                <div className="trunk" />
                                <div className="tree-top" />
                            </div>
                            <div className="" />
                            <div className="tree" zIndex="5">
                                <div className="trunk" />
                                <div className="tree-top" />
                                <div className="tree-top" />

                                <div className="tree-top" />
                                {userStats.data?.applesCount > 0 && (
                                    <Box
                                        top="-50"
                                        position="absolute"
                                        zIndex="5"
                                    >
                                        <DraggableApple num={0} />
                                    </Box>
                                )}
                                {userStats.data?.applesCount > 1 && (
                                    <Box
                                        top="-22"
                                        left="-10"
                                        position="absolute"
                                        zIndex="5"
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
                                {userStats.data?.applesCount > 2 && (
                                    <Box
                                        position="absolute"
                                        left="-30px"
                                        top="-80px"
                                    >
                                        <DraggableApple num={2} />
                                    </Box>
                                )}
                                {userStats.data?.applesCount > 3 && (
                                    <Box position="absolute" top="-60px">
                                        <DraggableApple num={3} />
                                    </Box>
                                )}
                            </div>
                        </div>
                    </div>
                    <Text
                        fontWeight="extrabold"
                        fontSize="xl"
                        color="purpleSlideFaded.700"
                        alignSelf="flex-end"
                        pt="24px"
                        pl="16px"
                        zIndex={200}
                        position="relative"
                        onMouseOver={() => setShowSpeechBubble(true)}
                        onMouseLeave={() => setShowSpeechBubble(false)}
                    >
                        llama list
                    </Text>
                </div>
            </DndContext>
        </Box>
    )
}

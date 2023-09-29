import React, { useState, useRef, useEffect } from 'react'
import Nature from './LlamaLocations/Nature'
import useLocalStorage from '../../Hooks/UseLocalStorage'
import { Box, Flex, Text } from '@chakra-ui/react'
import { LeftArrowIcon, RightArrowIcon } from '../../ChakraDesign/Icons'

export default function Frenzyfields({
    funFact,
    userStats,
    goldenLlama,
    scribbleSound,
    setGoldenLlama,
    showSpeechBubble,
    setShowSpeechBubble,
}) {
    // ref
    const timeoutRef = useRef(null)

    // state
    const [slide, setSlide] = useLocalStorage('llamaLocation', 0)
    const [titleOpacity, setTitleOpacity] = useState(0)
    const [showArrows, setShowArrows] = useState(false)

    const slideForward = () => {
        if (slide === userStats.data.llamaLocations.length - 1) {
            setSlide(0)
        } else {
            setSlide(slide + 1)
        }
        showTitle()
    }

    const slideBack = () => {
        if (slide === 0) {
            setSlide(userStats.data.llamaLocations.length - 1)
        } else {
            setSlide(slide - 1)
        }
        showTitle()
    }

    const showTitle = () => {
        if (titleOpacity === 0) {
            setTimeout(() => {
                setTitleOpacity(1)
            }, 0)
            timeoutRef.current = setTimeout(() => {
                setTitleOpacity(0)
            }, 1500)
        } else {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = setTimeout(() => {
                setTitleOpacity(0)
            }, 1500)
        }
    }

    return (
        <>
            {userStats.data && (
                <>
                    <Flex
                        pl="16px"
                        pr="16px"
                        zIndex={2}
                        left="0px"
                        top="480px"
                        width="300px"
                        position="absolute"
                        transition="0.3s ease all"
                        opacity={showArrows ? 1 : 0}
                        justifyContent="space-between"
                        onMouseOver={() => setShowArrows(true)}
                        onMouseLeave={() => setShowArrows(false)}
                    >
                        <LeftArrowIcon
                            width="48px"
                            height="48px"
                            cursor="pointer"
                            onClick={slideBack}
                            style={{ transition: '0.3s ease all' }}
                            _hover={{
                                height: '32px',
                                width: '32px',
                                marginTop: '-4px',
                            }}
                        />

                        <RightArrowIcon
                            width="48px"
                            height="48px"
                            cursor="pointer"
                            onClick={slideForward}
                            style={{ transition: '0.3s ease all' }}
                            _hover={{
                                height: '32px',
                                width: '32px',
                                marginTop: '-4px',
                            }}
                        />
                    </Flex>
                    <Flex
                        ml="-20px"
                        zIndex={1}
                        width="300px"
                        top="474px"
                        fontWeight="bold"
                        fontSize="24px"
                        transition="1s ease all"
                        position="absolute"
                        justify="center"
                        onMouseOver={() => setShowArrows(true)}
                        onMouseLeave={() => setShowArrows(false)}
                    >
                        <Text opacity={titleOpacity} transition="1s ease all">
                            {userStats.data.llamaLocations[slide].type}
                        </Text>
                    </Flex>
                    <Flex
                        h="100%"
                        ml="-20px"
                        width="300px"
                        overflow="hidden"
                        position="absolute"
                        onMouseOver={() => setShowArrows(true)}
                        onMouseLeave={() => setShowArrows(false)}
                    >
                        <Flex
                            ml={`-${slide * 300}px`}
                            transition="0.3s ease all"
                        >
                            {userStats.data.llamaLocations.map(
                                (location, index) => {
                                    if (location.component === 'Nature') {
                                        return (
                                            <Nature
                                                index={index}
                                                slide={slide}
                                                funFact={funFact}
                                                season={location.type}
                                                goldenLlama={goldenLlama}
                                                scribbleSound={scribbleSound}
                                                setGoldenLlama={setGoldenLlama}
                                                showSpeechBubble={
                                                    showSpeechBubble
                                                }
                                                setShowSpeechBubble={
                                                    setShowSpeechBubble
                                                }
                                            />
                                        )
                                    } else if (location.component === 'Space') {
                                        return <></>
                                    } else {
                                        return <></>
                                    }
                                }
                            )}
                        </Flex>
                    </Flex>
                </>
            )}
        </>
    )
}

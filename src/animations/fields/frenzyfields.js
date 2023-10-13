import React, { useState, useRef, useEffect } from 'react'
import Nature from './LlamaLocations/Nature'
import Space from './LlamaLocations/Space'
import useLocalStorage from '../../Hooks/UseLocalStorage'
import { Flex, Text } from '@chakra-ui/react'
import { getLocations } from '../../GamificationTab/LlamaStore/Locations/LocationsList'
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

    const locations = getLocations(userStats.data?.llamaLocations).filter(
        (location) => location.unlocked
    )

    const slideForward = () => {
        if (slide === locations.length - 1) {
            setSlide(0)
        } else {
            setSlide(slide + 1)
        }
        showTitle()
    }

    const slideBack = () => {
        if (slide === 0) {
            setSlide(locations.length - 1)
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
                        color={locations[slide].name === 'Space' && 'white'}
                    >
                        <LeftArrowIcon
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
                        <Text
                            color={locations[slide].name === 'Space' && 'white'}
                            opacity={titleOpacity}
                            transition="1s ease opacity"
                        >
                            {locations[slide].name}
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
                            {locations.map((location, index) => (
                                // if (location.name === 'Winter') {
                                //     return (
                                //         <Nature
                                //             index={index}
                                //             slide={slide}
                                //             funFact={funFact}
                                //             name={location.name}
                                //             goldenLlama={goldenLlama}
                                //             scribbleSound={scribbleSound}
                                //             setGoldenLlama={setGoldenLlama}
                                //             showSpeechBubble={showSpeechBubble}
                                //             setShowSpeechBubble={
                                //                 setShowSpeechBubble
                                //             }
                                //         />
                                //     )
                                // } else if (location.component === 'Space') {
                                //     return (
                                //         <Space
                                //             index={index}
                                //             slide={slide}
                                //             funFact={funFact}
                                //             scribbleSound={scribbleSound}
                                //             showSpeechBubble={showSpeechBubble}
                                //             setShowSpeechBubble={
                                //                 setShowSpeechBubble
                                //             }
                                //         />
                                //     )
                                // } else {
                                //     return <></>
                                // }
                                <Flex
                                    as={location.component}
                                    index={index}
                                    slide={slide}
                                    funFact={funFact}
                                    name={location.name}
                                    goldenLlama={goldenLlama}
                                    scribbleSound={scribbleSound}
                                    setGoldenLlama={setGoldenLlama}
                                    showSpeechBubble={showSpeechBubble}
                                    setShowSpeechBubble={setShowSpeechBubble}
                                />
                            ))}
                        </Flex>
                    </Flex>
                </>
            )}
        </>
    )
}

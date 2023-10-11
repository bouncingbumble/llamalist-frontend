import React, { useState } from 'react'
import Space from '../../animations/fields/LlamaLocations/Space'
import Nature from '../../animations/fields/LlamaLocations/Nature'
import { Flex } from '@chakra-ui/react'
import { LeftArrowIcon, RightArrowIcon } from '../../ChakraDesign/Icons'

export default function LocationsTab() {
    const [carouselOffset, setCarouselOffset] = useState(0)

    const dummyArray = new Array(2).fill(0)

    const slideLeft = () => {
        if (carouselOffset < 0) {
            setCarouselOffset(carouselOffset + 1)
        } else {
            console.log('left tapped out')
        }
    }

    const slideRight = () => {
        if (carouselOffset > 1 - dummyArray.length) {
            setCarouselOffset(carouselOffset - 1)
        } else {
            console.log('right tapped out')
        }
    }

    return (
        <Flex
            pt="32px"
            width="100%"
            align="center"
            justify="center"
            height="calc(100vh - 240px)"
        >
            <Flex width="10%" justify="center">
                <LeftArrowIcon
                    width="72px"
                    height="72px"
                    cursor="pointer"
                    onClick={slideLeft}
                    transition="0.3s ease all"
                    _hover={{ height: '88px', width: '88px' }}
                />
            </Flex>
            <Flex width="996px" height="100%" overflow="hidden">
                <Flex
                    align="center"
                    transition="0.5s ease all"
                    ml={`${332 + carouselOffset * 332}px`}
                >
                    {dummyArray.map((el, index) => (
                        <Flex
                            ml="16px"
                            mr="16px"
                            width="300px"
                            overflow="hidden"
                            borderRadius="16px"
                            transition="0.5s ease all"
                            height={index === -carouselOffset ? '100%' : '90%'}
                        >
                            {index === 0 ? (
                                <Nature
                                    store
                                    slide={index}
                                    season="Summer"
                                    goldenLlama={{ found: true, index: null }}
                                />
                            ) : (
                                <Space store slide={index} />
                            )}
                        </Flex>
                    ))}
                </Flex>
            </Flex>
            <Flex width="10%" justify="center">
                <RightArrowIcon
                    width="72px"
                    height="72px"
                    cursor="pointer"
                    onClick={slideRight}
                    transition="0.3s ease all"
                    _hover={{ height: '88px', width: '88px' }}
                />
            </Flex>
        </Flex>
    )
}

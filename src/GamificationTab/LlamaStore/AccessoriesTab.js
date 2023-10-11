import React, { useState, useEffect } from 'react'
import Llama from '../../animations/java-llama-react/Llama'
import AccessoriesTile from './AccessoriesTile'
import { Box, Flex } from '@chakra-ui/react'
import { accessories } from './Accessories/AccessoriesList'
import { LeftArrowIcon, RightArrowIcon } from '../../ChakraDesign/Icons'

export default function AccessoriesTab() {
    const [llamaSize, setLlamaSize] = useState(null)
    const [carouselOffset, setCarouselOffset] = useState(0)

    const setScreenSize = () => {
        if (window.innerHeight < 600) {
            setLlamaSize(window.innerHeight * 0.2)
        } else if (window.innerHeight < 925) {
            setLlamaSize(window.innerHeight * 0.3)
        } else {
            setLlamaSize(window.innerHeight * 0.4)
        }
    }
    window.onresize = setScreenSize

    useEffect(() => {
        setScreenSize()
        return () => {
            window.onresize = null
        }
    }, [])

    const slideLeft = () => {
        if (carouselOffset < 0) {
            setCarouselOffset(carouselOffset + 1)
        } else {
            setCarouselOffset(0.1)
            setTimeout(() => {
                setCarouselOffset(0)
            }, 150)
        }
    }

    const slideRight = () => {
        const slidesOnScreen = Math.floor((window.innerWidth - 200) / 300)
        if (carouselOffset > slidesOnScreen - accessories.length) {
            setCarouselOffset(carouselOffset - 1)
        } else {
            const placeholder = carouselOffset
            setCarouselOffset(placeholder - 0.1)
            setTimeout(() => {
                setCarouselOffset(placeholder)
            }, 150)
        }
    }

    return (
        <Box height="calc(100vh - 240px)" width="100%">
            {llamaSize && (
                <>
                    <Flex pt="32px" width="100%" justify="center">
                        <Llama id={0} progress={[0, 1]} minHeight={llamaSize} />
                    </Flex>
                    <Flex
                        h="37%"
                        mt="32px"
                        width="100%"
                        borderRadius="16px"
                        backgroundColor="blueFaded.100"
                        boxShadow="0px 0px 10px 1px #7E87B288"
                    >
                        <Flex
                            p="8px"
                            align="center"
                            cursor="pointer"
                            onClick={slideLeft}
                            borderLeftRadius="16px"
                            transition="0.3s ease all"
                            backgroundColor="blueFaded.200"
                            _hover={{ backgroundColor: 'blueFaded.300' }}
                        >
                            <LeftArrowIcon
                                width="32px"
                                height="32px"
                                fill="blue.600"
                            />
                        </Flex>
                        <Flex
                            pt="24px"
                            pb="24px"
                            maxWidth="100%"
                            overflow="hidden"
                            padding="24px 16px"
                        >
                            <Flex
                                ml={`${carouselOffset * 324}px`}
                                transition="0.5s ease all"
                            >
                                {accessories.map((accessory) => (
                                    <AccessoriesTile accessory={accessory} />
                                ))}
                            </Flex>
                        </Flex>
                        <Flex
                            p="8px"
                            ml="auto"
                            align="center"
                            cursor="pointer"
                            onClick={slideRight}
                            borderRightRadius="16px"
                            transition="0.3s ease all"
                            backgroundColor="blueFaded.200"
                            _hover={{ backgroundColor: 'blueFaded.300' }}
                        >
                            <RightArrowIcon
                                width="32px"
                                height="32px"
                                fill="blue.600"
                            />
                        </Flex>
                    </Flex>
                </>
            )}
        </Box>
    )
}

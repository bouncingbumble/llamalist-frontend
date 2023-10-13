import React, { useState } from 'react'
import LocationsTile from './LocationsTile'
import { Flex } from '@chakra-ui/react'
import { getLocations } from './LocationsList'
import { useUserStats } from '../../../Hooks/UserHooks'
import { LeftArrowIcon, RightArrowIcon } from '../../../ChakraDesign/Icons'

export default function LocationsTab() {
    const [carouselOffset, setCarouselOffset] = useState(0)

    // hooks
    const userStats = useUserStats()
    const locations = getLocations(userStats.data.llamaLocations)

    // console.log(locations)

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
        if (carouselOffset > 1 - locations.length) {
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
                    {locations.map((location, index) => (
                        <LocationsTile
                            index={index}
                            location={location}
                            offset={-carouselOffset}
                        />
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

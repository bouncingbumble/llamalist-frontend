import React, { useState } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { useUserStats } from '../../../Hooks/UserHooks'
import { LeftArrowIcon, RightArrowIcon } from '../../../ChakraDesign/Icons'
import GoldenLlama from '../../../animations/goldenLlama/GoldenLlama'
import Llama from '../../../animations/java-llama-react/Llama'
import { getAccessories } from '../Accessories/AccessoriesList'
import LlamaTile from './LlamaTile'

export default function LlamasTab() {
    const [carouselOffset, setCarouselOffset] = useState(0)

    // hooks
    const userStats = useUserStats()
    const accessories = getAccessories(userStats.data.llamaAccessories)

    const llamas = [
        {
            component: (
                <Llama
                    id={0}
                    progress={[0, 1]}
                    minHeight={300}
                    sunnies={accessories[0].wearing}
                    bowtie={accessories[1].wearing}
                />
            ),
            text: 'Assigned',
        },
        {
            component: (
                <GoldenLlama
                    minHeight={300}
                    hidden={false}
                    goldenLlama={{ found: true }}
                />
            ),
            text: 'Prestige to unlock',
        },
    ]
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
        if (carouselOffset > 1 - llamas.length) {
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
            <Flex
                width="996px"
                height="100%"
                overflow="hidden"
                justifyContent="center"
                alignItems="center"
            >
                <Flex
                    alignItems="center"
                    align="center"
                    transition="0.5s ease all"
                    ml={`${332 + carouselOffset * 664}px`}
                >
                    {llamas.map((l, i) => (
                        <LlamaTile
                            index={i}
                            offset={-carouselOffset}
                            llama={l}
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

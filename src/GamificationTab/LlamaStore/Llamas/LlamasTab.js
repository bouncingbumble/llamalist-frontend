import React, { useState } from 'react'
import { Flex, Text, useToast } from '@chakra-ui/react'
import { useUpdateStats, useUserStats } from '../../../Hooks/UserHooks'
import { LeftArrowIcon, RightArrowIcon } from '../../../ChakraDesign/Icons'
import GoldenLlama from '../../../animations/goldenLlama/GoldenLlama'
import Llama from '../../../animations/java-llama-react/Llama'
import { getAccessories } from '../Accessories/AccessoriesList'
import LlamaTile from './LlamaTile'
import LlamaToastyBoi from '../../LlamaToastyBoi'

export default function LlamasTab() {
    const [carouselOffset, setCarouselOffset] = useState(0)

    // hooks
    const userStats = useUserStats()
    const updateUserStats = useUpdateStats()
    const accessories = getAccessories(userStats.data.llamaAccessories)
    const toast = useToast()
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
            text: userStats.data.currentLlama === '' ? 'Equipped' : 'Equip',
        },
        {
            component: (
                <GoldenLlama
                    minHeight={300}
                    hidden={false}
                    goldenLlama={{ found: true }}
                />
            ),
            text:
                userStats.data.currentLlama === 'golden' ? 'Equipped' : 'Equip',
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

    const assignLlama = (i) => {
        let equipped = false
        if (i === 0) {
            updateUserStats.mutate({
                ...userStats.data,
                currentLlama: '',
            })
            equipped = true
        }
        if (i === 1) {
            // if (userStats.data.level > 9) {
            updateUserStats.mutate({
                ...userStats.data,
                currentLlama: 'golden',
            })
            equipped = true
            // } else {
            //     alert('You must complete level 10 to unlock the Golden Boi')
            // }
        }

        equipped &&
            toast({
                duration: 6000,
                isClosable: true,
                position: 'bottom',
                render: () => (
                    <LlamaToastyBoi
                        title="New llama boi equipped"
                        colorScheme="greenFaded"
                    />
                ),
            })
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
                            assignLlama={assignLlama}
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

import React from 'react'
import purchaseSound from '../../../sounds/purchase3.mp3'
import LlamaToastyBoi from '../../LlamaToastyBoi'
import { Howl } from 'howler'
import { WarningIcon } from '../../../ChakraDesign/Icons'
import { Flex, Text, useToast } from '@chakra-ui/react'
import { useUserStats, useUpdateStats } from '../../../Hooks/UserHooks'

export default function LocationsTile({ index, offset, location }) {
    const toast = useToast()
    const userStats = useUserStats()
    const updateStats = useUpdateStats()
    const buySound = new Howl({ src: [purchaseSound] })

    const buyLocation = () => {
        if (!location.unlocked) {
            if (userStats.data.applesCount >= location.price) {
                buySound.play()

                const newLocation = { ...location, unlocked: true }
                const currentLocations = [...userStats.data.llamaLocations]

                updateStats.mutate({
                    ...userStats.data,
                    applesCount: userStats.data?.applesCount - location.price,
                    llamaLocations: [...currentLocations, newLocation],
                })
            } else {
                const priceDiff = location.price - userStats.data.applesCount
                toast({
                    duration: 6000,
                    render: () => (
                        <LlamaToastyBoi
                            iconRight={<div />}
                            colorScheme="redFaded"
                            iconLeft={<WarningIcon />}
                            title={`You need ${priceDiff} more apples!`}
                        />
                    ),
                })
            }
        }
    }

    return (
        <Flex
            ml="16px"
            mr="16px"
            width="300px"
            direction="column"
            overflow="hidden"
            borderRadius="16px"
            transition="0.5s ease all"
            position="relative"
            height={index === offset ? '100%' : '90%'}
        >
            <Flex
                pl="24px"
                pr="24px"
                width="100%"
                height="64px"
                minHeight="64px"
                bg="purple.500"
                align="center"
                onClick={buyLocation}
                justify="space-between"
                cursor={!location.unlocked && 'pointer'}
                zIndex={999}
            >
                <Text color="white" fontSize="24px" fontWeight="bold">
                    {location.name}
                </Text>
                {!location.unlocked && (
                    <Text color="white" fontSize="22px">
                        🍎{location.price}
                    </Text>
                )}
            </Flex>
            <Flex
                height="100%"
                overflow="hidden"
                borderBottomRadius="16px"
                style={{ position: 'absolute', bottom: '0px' }}
            >
                <Flex
                    store
                    as={location.component}
                    slide={index}
                    offset={offset}
                    name={location.name}
                />
            </Flex>
        </Flex>
    )
}

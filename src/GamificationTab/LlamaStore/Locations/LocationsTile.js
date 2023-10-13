import React from 'react'
import purchaseSound from '../../../sounds/purchase3.mp3'
import { Howl } from 'howler'
import { Flex, Text } from '@chakra-ui/react'
import { useUserStats, useUpdateStats } from '../../../Hooks/UserHooks'

export default function LocationsTile({ index, offset, location }) {
    const userStats = useUserStats()
    const updateStats = useUpdateStats()
    const buySound = new Howl({ src: [purchaseSound] })

    const buyLocation = () => {
        if (!location.unlocked) {
            buySound.play()

            const newLocation = { ...location, unlocked: true }
            const currentLocations = [...userStats.data.llamaLocations]

            updateStats.mutate({
                ...userStats.data,
                applesCount: userStats.data?.applesCount - location.price,
                llamaLocations: [...currentLocations, newLocation],
            })
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
            height={index === offset ? '100%' : '90%'}
        >
            <Flex
                pl="24px"
                pr="24px"
                width="100%"
                height="64px"
                bg="purple.500"
                align="center"
                onClick={buyLocation}
                justify="space-between"
                cursor={!location.unlocked && 'pointer'}
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
                as={location.component}
                store
                slide={index}
                offset={offset}
                name={location.name}
            />
        </Flex>
    )
}

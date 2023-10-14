import React from 'react'
import purchaseSound from '../../../sounds/purchase3.mp3'
import LlamaToastyBoi from '../../LlamaToastyBoi'
import { Howl } from 'howler'
import { WarningIcon } from '../../../ChakraDesign/Icons'
import { Flex, Text, useToast } from '@chakra-ui/react'
import { useUserStats, useUpdateStats } from '../../../Hooks/UserHooks'

export default function AccessoriesTile({ accessory }) {
    const toast = useToast()
    const userStats = useUserStats()
    const updateStats = useUpdateStats()
    const buySound = new Howl({ src: [purchaseSound] })

    const buyAccessory = () => {
        if (userStats.data.applesCount >= accessory.price) {
            buySound.play()

            const currentAccessories = [...userStats.data.llamaAccessories]
            const newAccessory = { ...accessory, unlocked: true, wearing: true }

            updateStats.mutate({
                ...userStats.data,
                applesCount: userStats.data?.applesCount - accessory.price,
                llamaAccessories: [...currentAccessories, newAccessory],
            })
        } else {
            const priceDiff = accessory.price - userStats.data.applesCount
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

    const toggleAccesory = () => {
        const updatedAccessories = userStats.data.llamaAccessories.map(
            (item) => {
                if (item.name === accessory.name) {
                    return { ...accessory, wearing: !accessory.wearing }
                } else {
                    return item
                }
            }
        )
        updateStats.mutate({
            ...userStats.data,
            llamaAccessories: [...updatedAccessories],
        })
    }

    return (
        <Flex
            mr="24px"
            bg="gray.50"
            width="300px"
            minWidth="300px"
            direction="column"
            borderRadius="16px"
            justify="space-between"
        >
            <Flex height="75%" width="100%" align="center" justify="center">
                <Flex as={accessory.component} size={150} />
            </Flex>
            <Flex
                height="25%"
                color="white"
                align="center"
                bg="purple.500"
                justify="center"
                cursor="pointer"
                borderBottomRadius="16px"
                transition="0.3s ease background"
                _hover={{ backgroundColor: 'purple.400' }}
                onClick={accessory.unlocked ? toggleAccesory : buyAccessory}
            >
                {accessory.unlocked ? (
                    <Text fontSize="20px">
                        {accessory.wearing ? 'Remove ' : 'Sport '}
                        {accessory.name}
                    </Text>
                ) : (
                    <Flex
                        pl="24px"
                        pr="24px"
                        width="100%"
                        justify="space-between"
                    >
                        <Text fontWeight="bold" fontSize="20px">
                            {accessory.name}
                        </Text>
                        <Text ml="8px" fontSize="20px">
                            🍎{accessory.price}
                        </Text>
                    </Flex>
                )}
            </Flex>
        </Flex>
    )
}

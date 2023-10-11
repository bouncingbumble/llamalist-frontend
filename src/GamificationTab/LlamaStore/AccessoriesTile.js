import React from 'react'
import { Flex, Text } from '@chakra-ui/react'

export default function AccessoriesTile({ accessory }) {
    const buyAccessory = () => {
        console.log('buy accessory: ' + accessory.name)
    }

    const toggleAccesory = () => {
        console.log('toggle accessory: ' + accessory.name)
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

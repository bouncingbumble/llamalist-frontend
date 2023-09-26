import React from 'react'
import { Center, Text, Flex } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export const Logo = () => {
    return (
        <Link to="/tasks">
            <Flex alignItems="center">
                <Center
                    height="52px"
                    width="52px"
                    shadow="base"
                    fontSize="xl"
                    padding="8px"
                    borderRadius="8px"
                    backgroundColor="purple.500"
                >
                    🦙
                </Center>
                <Text
                    fontSize="xl"
                    fontWeight="bold"
                    letterSpacing=".8px"
                    ml="16px"
                    color="black"
                >
                    llama list
                </Text>
            </Flex>
        </Link>
    )
}

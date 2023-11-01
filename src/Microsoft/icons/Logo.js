import React from 'react'
import { Flex, Center, Text } from '@chakra-ui/react'

export default function Logo({ taskCard }) {
    return (
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
            <Flex ml="16px" direction="column">
                <Text
                    fontSize="xl"
                    fontWeight="bold"
                    letterSpacing=".8px"
                    color="black"
                    lineHeight="1.3"
                >
                    llama list
                </Text>
                <Text
                    fontSize="14px"
                    color="#a0aec0"
                    alignSelf={taskCard ? 'start' : 'center'}
                >
                    for Microsoft Teams, Outlook, and Office
                </Text>
            </Flex>
        </Flex>
    )
}

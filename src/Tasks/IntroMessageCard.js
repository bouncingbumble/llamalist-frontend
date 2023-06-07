import React from 'react'
import { VStack, Text, Flex, Button } from '@chakra-ui/react'

export default function IntroMessageCard({ color, title, lines }) {
    return (
        <Flex w="100%">
            <Flex
                w="100%"
                p="16px"
                backgroundColor={color}
                borderRadius="16px"
                color="white"
                flexDirection="column"
                shadow="base"
            >
                <Text fontSize="xl" fontWeight="600">
                    {title}
                </Text>

                {lines.map((l) => (
                    <Text fontSize="lg">{l}</Text>
                ))}

                <Button variant="link" mt="16px" color="gray.900">
                    don't show again
                </Button>
            </Flex>
        </Flex>
    )
}

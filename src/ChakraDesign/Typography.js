import React from 'react'
import { Box, Text, VStack, Flex, Button } from '@chakra-ui/react'

export default function Typography() {
    return (
        <VStack align="flex-start">
            <Text fontSize="3xl">Typography</Text>
            <Box>
                <Text fontSize="xl" fontWeight="bold">
                    xl
                </Text>
                <Text fontSize="lg">lg</Text>
                <Text fontSize="md" fontWeight="bold">
                    md
                </Text>
                <Text fontSize="sm">sm</Text>
                <Text fontSize="xs">xs</Text>
            </Box>
        </VStack>
    )
}

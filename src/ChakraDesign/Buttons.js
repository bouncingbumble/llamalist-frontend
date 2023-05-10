import React from 'react'
import { Box, Text, VStack, Flex, Button } from '@chakra-ui/react'
import { LabelIcon } from './Icons'

export default function Buttons() {
    return (
        <VStack align="flex-start">
            <Text fontSize="3xl">Buttons</Text>
            <Box>
                <Text fontSize="sm">blue</Text>
                <Flex>
                    <Button colorScheme="blue" variant="solid" size="md">
                        medium button
                    </Button>
                    <Button colorScheme="blue" variant="solid" size="lg">
                        large button
                    </Button>
                </Flex>
            </Box>
            <Box>
                <Text fontSize="sm">grey</Text>
                <Flex>
                    <Button variant="grey" size="md" color="colors.black">
                        Button
                    </Button>
                    <Button variant="grey" size="lg" color="colors.black">
                        Button
                    </Button>
                </Flex>
            </Box>
            <Text fontSize="3xl">Chips</Text>
            <Box>
                <Text fontSize="sm">blue</Text>
                <Flex>
                    <Button colorScheme="blue" variant="solid" size="sm">
                        Button
                    </Button>
                </Flex>
            </Box>
            <Box>
                <Text fontSize="sm">grey</Text>
                <Flex>
                    <Button variant="grey" size="sm" color="colors.black">
                        Button
                    </Button>
                </Flex>
            </Box>
            <Text fontSize="3xl">Icon Button</Text>
            <Box>
                <Text fontSize="sm">blue</Text>
                <Flex>
                    <Button variant="icon-button">
                        <LabelIcon />
                    </Button>
                </Flex>
            </Box>
        </VStack>
    )
}

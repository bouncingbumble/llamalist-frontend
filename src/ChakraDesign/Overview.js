import React from 'react'
import { Box, Text, Button, Flex } from '@chakra-ui/react'

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl']
export default function Overview() {
    return (
        <Flex flexDirection="column" p="16px">
            <Text fontSize="xl">Colors</Text>
            <Flex flexDirection="column">
                <Flex w="200px">
                    white
                    <Box
                        height="48px"
                        width="48px"
                        ml="auto"
                        backgroundColor="white.500"
                        borderRadius="50%"
                    ></Box>
                    <Box
                        height="48px"
                        width="48px"
                        backgroundColor="whiteFaded.500"
                        borderRadius="50%"
                    ></Box>
                </Flex>
                <Flex w="200px">
                    gray
                    <Box
                        height="48px"
                        width="48px"
                        ml="auto"
                        backgroundColor="gray.500"
                        borderRadius="50%"
                    ></Box>
                    <Box
                        height="48px"
                        width="48px"
                        backgroundColor="grayFaded.500"
                        borderRadius="50%"
                    ></Box>
                </Flex>
                <Flex w="200px">
                    black
                    <Box
                        height="48px"
                        width="48px"
                        backgroundColor="black"
                        borderRadius="50%"
                        ml="auto"
                    ></Box>
                </Flex>
                <Flex w="200px">
                    purple
                    <Box
                        height="48px"
                        width="48px"
                        backgroundColor="purple.500"
                        borderRadius="50%"
                        ml="auto"
                    ></Box>
                    <Box
                        height="48px"
                        width="48px"
                        backgroundColor="purpleFaded.500"
                        borderRadius="50%"
                    ></Box>
                </Flex>
                <Flex w="200px">
                    blue
                    <Box
                        height="48px"
                        width="48px"
                        ml="auto"
                        backgroundColor="blue.500"
                        borderRadius="50%"
                    ></Box>
                    <Box
                        height="48px"
                        width="48px"
                        backgroundColor="blueFaded.500"
                        borderRadius="50%"
                    ></Box>
                </Flex>
                <Flex w="200px">
                    green
                    <Box
                        height="48px"
                        width="48px"
                        ml="auto"
                        backgroundColor="green.500"
                        borderRadius="50%"
                    ></Box>
                    <Box
                        height="48px"
                        width="48px"
                        backgroundColor="greenFaded.500"
                        borderRadius="50%"
                    ></Box>
                </Flex>
                <Flex w="200px">
                    aqua
                    <Box
                        height="48px"
                        width="48px"
                        ml="auto"
                        backgroundColor="aqua.500"
                        borderRadius="50%"
                    ></Box>
                    <Box
                        height="48px"
                        width="48px"
                        backgroundColor="aquaFaded.500"
                        borderRadius="50%"
                    ></Box>
                </Flex>
                <Flex w="200px">
                    yellow
                    <Box
                        height="48px"
                        width="48px"
                        ml="auto"
                        backgroundColor="yellow.500"
                        borderRadius="50%"
                    ></Box>
                    <Box
                        height="48px"
                        width="48px"
                        backgroundColor="yellowFaded.500"
                        borderRadius="50%"
                    ></Box>
                </Flex>
                <Flex w="200px">
                    red
                    <Box
                        height="48px"
                        width="48px"
                        ml="auto"
                        backgroundColor="red.500"
                        borderRadius="50%"
                    ></Box>
                    <Box
                        height="48px"
                        width="48px"
                        backgroundColor="redFaded.500"
                        borderRadius="50%"
                    ></Box>
                </Flex>

                <Flex w="200px">
                    brown
                    <Box
                        height="48px"
                        width="48px"
                        ml="auto"
                        backgroundColor="brown.500"
                        borderRadius="50%"
                    ></Box>
                    <Box
                        height="48px"
                        width="48px"
                        backgroundColor="brownFaded.500"
                        borderRadius="50%"
                    ></Box>
                </Flex>
            </Flex>
            <Text fontSize="xl">Typography</Text>
            <Flex flexDirection="column">
                {SIZES.map((size) => (
                    <Text fontSize={size}>Rubik - {size}</Text>
                ))}
            </Flex>
            <Text fontSize="xl">Buttons</Text>
            <Flex flexDirection="column">
                <Box>
                    {SIZES.map((size) => (
                        <Button size={size} colorScheme="purple" mr="8px">
                            Purple - {size}
                        </Button>
                    ))}
                </Box>
            </Flex>
        </Flex>
    )
}

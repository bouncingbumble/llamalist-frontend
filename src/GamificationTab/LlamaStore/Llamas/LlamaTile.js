import React from 'react'
import { Flex, Text, useToast } from '@chakra-ui/react'
import { useUserStats, useUpdateStats } from '../../../Hooks/UserHooks'

export default function LlamaTile({ index, offset, llama }) {
    const toast = useToast()
    const userStats = useUserStats()

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
            alignItems="center"
        >
            {llama.component}
            <Flex
                borderBottomRadius="16px"
                backgroundColor="purple.500"
                justifyContent="center"
                alignItems="center"
                mt="64px"
                w="300px"
                height="48px"
            >
                <Text fontWeight="bold" color="white" fontSize="lg">
                    {llama.text}
                </Text>
            </Flex>
        </Flex>
    )
}

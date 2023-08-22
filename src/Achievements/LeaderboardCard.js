import React from 'react'
import { Flex } from '@chakra-ui/react'

export default function LeaderboardCard({ emoji, avatarBg, name, score }) {
    return (
        <Flex
            width="600px"
            justifyContent="space-between"
            alignItems="center"
            backgroundColor="gray.100"
            color="white"
            padding="12px 16px"
            borderRadius="16px"
            marginBottom="8px"
            boxShadow="lg"
            marginLeft="8px"
        >
            <Flex
                fontSize="24px"
                borderRadius="50%"
                backgroundColor={avatarBg}
                height="40px"
                width="40px"
                alignItems="center"
                justifyContent="center"
            >
                {emoji}
            </Flex>
            <Flex fontSize="18px" mr="auto" ml="16px">
                {name}
            </Flex>
            <Flex fontSize="24px" fontWeight="bold">
                {score}
            </Flex>
        </Flex>
    )
}

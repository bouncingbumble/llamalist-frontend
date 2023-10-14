import React from 'react'
import { Text, Flex } from '@chakra-ui/react'
import {
    StarIconFilled,
    CheckmarkIcon,
    WarningIcon,
} from '../ChakraDesign/Icons'

export default function LlamaToastyBoi({
    title,
    details,
    iconLeft,
    iconRight,
    colorScheme,
}) {
    return (
        <Flex
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            py={4}
            px={4}
            borderRadius="8px"
            border="2px solid #515A87"
            bgColor={`${colorScheme}.100`}
        >
            {iconLeft ? iconLeft : <StarIconFilled />}
            <Flex flexDirection="column">
                <Text fontSize="md" fontWeight="500">
                    {title}
                </Text>
            </Flex>
            {iconRight ? iconRight : <CheckmarkIcon className="bouncey-boi" />}
        </Flex>
    )
}

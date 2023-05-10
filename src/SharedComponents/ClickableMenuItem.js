import React, { useState } from 'react'
import { Flex } from '@chakra-ui/react'

export default function ClickableMenuItem({
    icon,
    onClose,
    display,
    children,
}) {
    return (
        <Flex
            p="12px 12.8px"
            borderRadius="8px"
            justify="space-between"
            fontWeight="bold"
            display={display}
            onClick={() => onClose && onClose()}
            _hover={{
                bg: 'purple.500',
                color: 'white',
            }}
        >
            {icon}
            {children}
        </Flex>
    )
}

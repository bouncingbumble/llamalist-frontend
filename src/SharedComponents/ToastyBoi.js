import React from 'react'
import { Box } from '@chakra-ui/react'

export default function ToastyBoi({ backgroundColor, icon, message }) {
    return (
        <Box
            color="white"
            p={3}
            bg={backgroundColor}
            borderRadius="8px"
            fontWeight="bold"
            padding="16px"
            boxShadow="0 8px 16px 0 rgba(56, 96, 165, 0.15)"
            display="flex"
            alignItems="center"
        >
            {icon}
            <Box ml="16px">{message}</Box>
        </Box>
    )
}

import React from 'react'
import { MenuItem, Box } from '@chakra-ui/react'

export default function MobileNavMenuItem({
    selected,
    left,
    text,
    right,
    handleClick,
    badge,
}) {
    return (
        <MenuItem selected={selected} onClick={handleClick}>
            <Box fontSize="20px" alignSelf="center">
                {left}
            </Box>
            <Box
                mr="auto"
                ml={`${left?.length > 0 && '16px'}`}
                alignSelf="center"
            >
                {text}
            </Box>
            <Box textColor={'grey.900'} alignSelf="center">
                {badge && (
                    <div
                        className="badge"
                        style={{ top: '315px', right: '18px' }}
                    />
                )}
                {right}
            </Box>
        </MenuItem>
    )
}

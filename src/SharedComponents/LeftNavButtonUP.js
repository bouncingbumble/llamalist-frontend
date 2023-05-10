import React from 'react'
import { Button, Flex, Box, Tooltip } from '@chakra-ui/react'

export default function LeftNavButtonUP({
    selected,
    left,
    text,
    right,
    handleClick,
    badge,
    isZenMode,
}) {
    return (
        <Button
            variant="left-nav-button"
            bg={`${selected && 'blue.50'}`}
            textColor={`${selected && 'purple.500'}`}
            onClick={handleClick}
            maxWidth={'none'}
        >
            <Flex
                justifyContent={isZenMode ? 'center' : 'space-between'}
                width="100%"
            >
                <Tooltip label={isZenMode && text}>
                    <Box fontSize="22px" alignSelf="center">
                        {left}
                    </Box>
                </Tooltip>
                {!isZenMode && (
                    <Box
                        mr="auto"
                        ml={`${left.length > 0 && '16px'}`}
                        alignSelf="center"
                        display={{ base: 'none', sm: 'block' }}
                    >
                        {' '}
                        {text}
                    </Box>
                )}
                {!isZenMode && (
                    <Box
                        textColor={selected ? 'purple.500' : 'grey.900'}
                        alignSelf="center"
                        display={{ base: 'none', sm: 'block' }}
                        ml="8px"
                    >
                        {right}
                        {badge && (
                            <div
                                className="badge"
                                style={{ marginTop: '8px', marginRight: '8px' }}
                            />
                        )}
                    </Box>
                )}
            </Flex>
        </Button>
    )
}

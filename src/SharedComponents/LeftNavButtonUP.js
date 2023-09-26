import React from 'react'
import { Button, Flex, Box, Tooltip } from '@chakra-ui/react'

export default function LeftNavButtonUP({
    selected,
    left,
    text,
    right,
    handleClick,
    badge,
}) {
    return (
        <Button
            variant="left-nav-button"
            bg={`${selected && 'blue.50'}`}
            textColor={`${selected && 'purple.500'}`}
            onClick={handleClick}
            maxWidth={'none'}
        >
            <Flex justifyContent={'space-between'} width="100%">
                <Box fontSize="22px" alignSelf="center">
                    {left}
                </Box>
                <Box
                    mr="auto"
                    ml={`${left.length > 0 && '16px'}`}
                    alignSelf="center"
                    display={{ base: 'none', sm: 'block' }}
                >
                    {' '}
                    {text}
                </Box>
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
            </Flex>
        </Button>
    )
}

import React from 'react'
import { Button, Flex, Box } from '@chakra-ui/react'

export default function LeftNavButton({
    selected,
    left,
    text,
    right,
    handleClick,
    badge,
}) {
    console.log(selected)
    return (
        <Button
            colorScheme="purple"
            variant={selected ? 'solid' : 'ghost'}
            onClick={handleClick}
            key={text}
            justifyContent="space-between"
            w="100%"
        >
            <Flex width="100%">
                <Box fontSize="22px" alignSelf="center">
                    {left}
                </Box>
                <Box
                    mr="auto"
                    ml={`${left.length > 0 && '16px'}`}
                    alignSelf="center"
                >
                    {' '}
                    {text}
                </Box>
                <Box
                    textColor={selected ? 'purple.500' : 'grey.900'}
                    alignSelf="center"
                >
                    {right}
                    {badge && (
                        <div
                            className="badge"
                            style={{
                                marginTop: '8px',
                                marginRight: '8px',
                            }}
                        />
                    )}
                </Box>
            </Flex>
        </Button>
    )
}

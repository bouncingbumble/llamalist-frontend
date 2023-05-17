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
    return (
        <Button
            variant={selected && 'ghost'}
            onClick={handleClick}
            key={text}
            justifyContent="space-between"
            fontSize="lg"
            fontWeight={selected ? '600' : '400'}
            height="48px"
            mt="0px !important"
            borderRadius="32px"
            color={selected ? 'purple.500' : 'darkgray.500'}
            _hover={{
                bg: '#D2D5EE',
            }}
            width="192px"
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

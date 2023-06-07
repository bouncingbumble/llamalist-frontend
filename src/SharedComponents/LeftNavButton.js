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
            color={selected ? 'purple.500' : 'gray.900'}
            _hover={{
                bg: '#D6CEF2',
            }}
            width="192px"
        >
            <Flex width="100%" alignItems="center">
                <Flex
                    alignSelf="center"
                    mt="-1px"
                    fontWeight={selected ? '600' : '400'}
                    color={selected ? 'purple.500' : 'gray.900'}
                >
                    {left}
                </Flex>
                <Box mr="auto" ml="16px" alignSelf="center">
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

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
            variant="left-nav-button"
            bg={`${selected && 'blue.50'}`}
            textColor={`${selected && 'purple.500'}`}
            onClick={handleClick}
            key={text}
        >
            <>
                <Box
                    position="absolute"
                    top="0px"
                    right="0px"
                    color={selected ? 'purple.500' : 'grey.900'}
                    h="18px"
                    minW="18px"
                    borderRadius="9px"
                    fontSize="12px"
                    p="0px 4px"
                    pt="1px"
                    alignItems="center"
                    justifyContent="center"
                >
                    {right}
                </Box>
                <Flex width="100%">
                    <Box fontSize="22px" alignSelf="center">
                        {left}
                    </Box>
                    <Box
                        mr="auto"
                        ml={`${left.length > 0 && '16px'}`}
                        alignSelf="center"
                        display={{ base: 'none', lg: 'block' }}
                    >
                        {' '}
                        {text}
                    </Box>
                    <Box
                        textColor={selected ? 'purple.500' : 'grey.900'}
                        alignSelf="center"
                        display={{ base: 'none', lg: 'block' }}
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
            </>
        </Button>
    )
}

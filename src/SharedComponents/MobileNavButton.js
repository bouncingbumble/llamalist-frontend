import React from 'react'
import { MenuButton, Flex, Box, Button } from '@chakra-ui/react'
import { CarrotIcon } from '../ChakraDesign/Icons'

export default function MobileNavButton({ left, text, right, badge }) {
    return (
        <MenuButton
            as={Button}
            rightIcon={<CarrotIcon />}
            leftIcon={left === 'discover' && '🔍'}
            height="40px"
            w="200px"
            textColor="purple.500"
            fontWeight="bold"
            fontSize="16px"
            textTransform="capitalize"
        >
            <Flex width="100%" justifyContent="space-between">
                <Box fontSize="20px" alignSelf="center" mr="4px">
                    {left}
                </Box>
                <Box
                    mr="auto"
                    ml={`${text.length > 0 && '16px'}`}
                    margin="auto"
                    alignSelf="center"
                >
                    {text}
                </Box>
                {badge && (
                    <div className="badge" style={{ top: -4, right: -4 }} />
                )}
            </Flex>
        </MenuButton>
    )
}

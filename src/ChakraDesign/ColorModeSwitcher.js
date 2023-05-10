import React from 'react'
import {
    useColorMode,
    useColorModeValue,
    IconButton,
    Button,
} from '@chakra-ui/react'

export const ColorModeSwitcher = (props) => {
    const { toggleColorMode } = useColorMode()
    const text = useColorModeValue('dark', 'light')
    const SwitchIcon = useColorModeValue('dark', 'light')

    return (
        <Button
            //mt="8px"
            alignSelf="start"
            size="md"
            fontSize="16px"
            fontWeight="default"
            variant="ghost"
            //colorScheme="blue"
            //marginLeft="16px"
            onClick={toggleColorMode}
        >
            {`${text} mode`}
        </Button>
    )
}

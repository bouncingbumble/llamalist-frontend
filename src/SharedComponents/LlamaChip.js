import React from 'react'
import { Flex, Button } from '@chakra-ui/react'
import { XCircle } from '../ChakraDesign/Icons'

export default function LlamaChip({
    text,
    colorScheme,
    color,
    variant,
    handleClick,
    handleRemove,
    style,
}) {
    return (
        <Button
            size="xs"
            colorScheme={colorScheme}
            color={color}
            variant={variant}
            mr="8px"
            className="llamaChip"
            onClick={handleClick}
            style={style}
        >
            {text}
            {handleRemove && (
                <Flex
                    visibility="hidden"
                    width="0px"
                    alignItems="center"
                    opacity="0"
                    color={color}
                    _hover={{
                        color: color,
                        filter: 'brightness(80%)',
                    }}
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleRemove()
                    }}
                >
                    <XCircle fontSize="16px" />
                </Flex>
            )}
        </Button>
    )
}

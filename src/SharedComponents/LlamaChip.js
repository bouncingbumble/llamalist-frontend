import React, { useState } from 'react'
import { Flex, Button, Input, Box } from '@chakra-ui/react'
import { XCircle } from '../ChakraDesign/Icons'

export default function LlamaChip({
    text,
    color,
    style,
    variant,
    leftIcon,
    handleUpdate,
    colorScheme,
    handleClick,
    handleRemove,
}) {
    const [isEditing, setIsEditing] = useState(false)

    const handleSubmit = (newValue) => {
        setIsEditing(false)
        handleUpdate(newValue)
    }
    return (
        <>
            {!isEditing ? (
                <Button
                    mr="8px"
                    size="xs"
                    style={style}
                    color={color}
                    variant={variant}
                    className="llamaChip"
                    onClick={
                        handleUpdate ? () => setIsEditing(true) : handleClick
                    }
                    colorScheme={colorScheme}
                >
                    {leftIcon}
                    {text}
                    {handleRemove && (
                        <Flex
                            width="0px"
                            opacity="0"
                            color={color}
                            visibility="hidden"
                            alignItems="center"
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
                            <XCircle fontSize="14px" />
                        </Flex>
                    )}
                </Button>
            ) : (
                <Box width="160px">
                    <Input
                        autoFocus
                        height="32px"
                        maxLength="20"
                        padding="0px 16px"
                        borderRadius="16px"
                        defaultValue={text}
                        backgroundColor="#3860b81a"
                        onKeyDown={(event) =>
                            event.keyCode === 13 &&
                            handleSubmit(event.target.value)
                        }
                        onBlur={(event) => handleSubmit(event.target.value)}
                    />
                </Box>
            )}
        </>
    )
}

import React from 'react'
import { Flex, Text, Button, Box, VStack, MenuItem } from '@chakra-ui/react'

export default function MenuCard({
    title,
    children,
    onClose,
    thirdButton,
    thirdButtonText,
    thirdButtonStyle,
    thirdButtonClickHandler,
    onSubmit,
    mainButtonText,
    disableSubmit,
}) {
    return (
        <VStack alignItems="start">
            <Text fontSize="md" fontWeight="bold">
                {title}
            </Text>
            <Box>{children}</Box>
            <Flex
                justifyContent="space-between"
                width="100%"
                style={{ marginTop: '24px' }}
            >
                <Flex>
                    <MenuItem style={{ all: 'initial' }}>
                        <Button
                            onClick={onClose}
                            variant="solid"
                            size="md"
                            color="colors.black"
                            style={{
                                height: '32px',
                                fontSize: '12px',
                                textTransform: 'capitalize',
                                fontWeight: 'bold',
                                padding: '8px 16px',
                                fontFamily: 'poppins',
                            }}
                        >
                            close
                        </Button>
                    </MenuItem>
                    {thirdButton && (
                        <Button
                            style={thirdButtonStyle}
                            onClick={thirdButtonClickHandler}
                        >
                            {thirdButtonText}
                        </Button>
                    )}
                </Flex>
                <MenuItem style={{ all: 'initial' }}>
                    <Button
                        onClick={onSubmit}
                        colorScheme="blue"
                        variant="solid"
                        size="md"
                        isDisabled={disableSubmit}
                        style={{
                            height: '32px',
                            fontSize: '12px',
                            textTransform: 'capitalize',
                            fontWeight: 'bold',
                            padding: '8px 16px',
                            fontFamily: 'poppins',
                        }}
                    >
                        {Boolean(mainButtonText) ? mainButtonText : 'submit'}
                    </Button>
                </MenuItem>
            </Flex>
        </VStack>
    )
}

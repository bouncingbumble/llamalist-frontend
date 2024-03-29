import React from 'react'
import {
    Flex,
    Text,
    Button,
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
} from '@chakra-ui/react'

export default function LLModal({
    isOpen,
    onClose,
    onSubmit,
    title,
    width,
    children,
    overflow,
    secondaryButton,
    disableSubmit,
    backgroundColor,
}) {
    const handleSubmit = () => {
        onSubmit()
        onClose()
    }
    return (
        <Modal
            size="full"
            isOpen={isOpen}
            onClose={onClose}
            scrollBehavior={overflow === 'hidden' && 'inside'}
        >
            <ModalOverlay />
            <ModalContent
                maxW={width && width}
                backgroundColor={backgroundColor}
            >
                <Text fontSize="lg" fontWeight="bold" pl="16px" pt="16px">
                    {title}
                </Text>
                <ModalCloseButton marginTop="5px" />
                <ModalBody overflow={overflow}>
                    <Box>{children}</Box>
                </ModalBody>
                <ModalFooter>
                    {secondaryButton && (
                        <Button
                            mr={onSubmit && 3}
                            colorScheme={!onSubmit && 'blue'}
                            variant={
                                onSubmit && !secondaryButton.style && 'grey'
                            }
                            style={
                                secondaryButton.style && secondaryButton.style
                            }
                            disabled={secondaryButton.disabled}
                            onClick={secondaryButton.onClick}
                        >
                            {secondaryButton.text}
                        </Button>
                    )}
                    {onSubmit && (
                        <Button
                            colorScheme="blue"
                            onClick={handleSubmit}
                            isDisabled={disableSubmit}
                        >
                            Submit
                        </Button>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

import React, { useState } from 'react'
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
    Input,
} from '@chakra-ui/react'

export default function LlamaModeModal({
    task,
    handleSetTaskName,
    onClose,
    handleBlur,
    handleKeyDown,
}) {
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(true)

    setTimeout(() => {
        setShowWelcomeMessage(false)
    }, 3000)
    return (
        <Modal size="full" isOpen={true} onClose={onClose} autoFocus={false}>
            <ModalOverlay />
            <ModalContent backgroundColor={showWelcomeMessage && 'gray.600'}>
                {showWelcomeMessage ? (
                    <Flex alignItems="center" flexDirection="column">
                        <Flex
                            mt="12vh"
                            fontSize="56px"
                            justifyContent="center"
                            className="gamer-text"
                            color="white"
                        >
                            <Text className="loading">
                                Activating LLAMA MODE . . .
                            </Text>
                        </Flex>

                        <Text
                            mt="12vh"
                            fontSize="36px"
                            justifyContent="center"
                            className="gamer-text"
                            color="gray.700"
                        >
                            {task.name}
                        </Text>
                    </Flex>
                ) : (
                    <>
                        <Input
                            placeholder="task name..."
                            focusBorderColor="white"
                            border="none"
                            type="text"
                            size="lg"
                            fontSize="18px"
                            padding="1px 4px 2px 4px"
                            value={task.name}
                            onChange={(e) => handleSetTaskName(e.target.value)}
                            height="30px"
                            width="100%"
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown}
                            _focus={{
                                boxShadow: 'none',
                                borderWidth: '0px',
                                backgroundColor: 'rgba(118, 61, 225, 0.1)',
                            }}
                        />

                        <ModalCloseButton marginTop="5px" />
                        <ModalBody>
                            <Box>body</Box>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

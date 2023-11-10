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
import Notes from './Notes'
import Checklist from './Checklist'

export default function LlamaModeModal({
    task,
    handleSetTaskName,
    onClose,
    handleBlur,
    handleKeyDown,
    name,
    updateTask,
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
                            paddingLeft="5vw"
                            paddingRight="5vw"
                            paddingTop="5vh"
                            paddingBottom="5vh"
                            textAlign="center"
                        >
                            {name}
                        </Text>
                    </Flex>
                ) : (
                    <Flex
                        flexDirection="column"
                        paddingLeft="5vw"
                        paddingRight="5vw"
                        paddingTop="5vh"
                        paddingBottom="5vh"
                    >
                        <Input
                            placeholder="task name..."
                            focusBorderColor="white"
                            border="none"
                            type="text"
                            size="xl"
                            fontSize="22px"
                            padding="24px 16px"
                            value={name}
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
                            borderRadius="8px"
                        />
                        <Notes task={task} updateTask={updateTask} />
                        <Checklist
                            task={task}
                            checklist={task.checklist}
                            noAutoFocus
                        />
                        <ModalCloseButton marginTop="5px" />
                    </Flex>
                )}
            </ModalContent>
        </Modal>
    )
}

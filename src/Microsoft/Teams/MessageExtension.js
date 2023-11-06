import React, { useState } from 'react'
import { Box, Flex, Input, Checkbox } from '@chakra-ui/react'

export default function MessageExtension() {
    const searchParams = new URLSearchParams(window.location.search)
    const message = searchParams.get('message')
    const link = searchParams.get('link')
    const initialTask = message ? message.replace(/(<([^>]+)>)/gi, '') : ''

    const [taskName, setTaskName] = useState(initialTask)

    const handleSetTaskName = (event) => {
        const newTaskName = event.target.value
        if (newTaskName.length < 80) {
            setTaskName(newTaskName)
        } else {
            alert(
                'Please limit the length of your task name. Use the notes section for more details.'
            )
        }
    }

    console.log(initialTask)
    console.log(link)

    return (
        <Flex padding="24px" height="100vh" width="100%" bg="purpleFaded.100">
            <Input
                autoFocus
                ml="8px"
                size="lg"
                type="text"
                width="100%"
                border="none"
                height="30px"
                fontSize="18px"
                value={taskName}
                padding="1px 4px 2px 4px"
                placeholder="task name..."
                onChange={handleSetTaskName}
                _focus={{
                    boxShadow: 'none',
                    borderWidth: '0px',
                    backgroundColor: 'rgba(118, 61, 225, 0.1)',
                }}
            />
            {/* <Flex
                bg="white"
                width="100%"
                boxShadow="lg"
                cursor="pointer"
                borderRadius="md"
                flexDirection="column"
                padding="16px 16px 12px 16px"
            >
                <Flex>
                    <Flex
                        width="100%"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Flex mr="8px" width="100%" alignItems="center">
                            <Flex alignItems="center">
                                <Checkbox
                                    isDisabled
                                    size="lg"
                                    colorScheme="purple"
                                    borderColor="gray.900"
                                />
                            </Flex>
                            <Input
                                autoFocus
                                ml="8px"
                                size="lg"
                                type="text"
                                width="100%"
                                border="none"
                                height="30px"
                                fontSize="18px"
                                value={taskName}
                                padding="1px 4px 2px 4px"
                                placeholder="task name..."
                                onChange={handleSetTaskName}
                                _focus={{
                                    boxShadow: 'none',
                                    borderWidth: '0px',
                                    backgroundColor: 'rgba(118, 61, 225, 0.1)',
                                }}
                            />
                        </Flex>
                    </Flex>
                </Flex>
                <Box>Noooootes!</Box>
            </Flex> */}
        </Flex>
    )
}

import React, { useState, useContext } from 'react'
import OOModal from '../SharedComponents/OOModal'
import ToastyBoi from '../SharedComponents/ToastyBoi'
import { apiCall } from '../Util/api'
import { UserContext } from '../Contexts/UserContext'
import { CircleCheckIcon } from '../ChakraDesign/Icons'
import {
    Box,
    Flex,
    Text,
    Radio,
    Button,
    useToast,
    RadioGroup,
} from '@chakra-ui/react'

export default function ClearList() {
    const toast = useToast()
    const { user } = useContext(UserContext)

    const [isOpen, setIsOpen] = useState(false)
    const [tasksToClear, setTasksToClear] = useState('incomplete')

    const clearTasks = async () => {
        const response = await apiCall(
            `DELETE`,
            `/users/${user._id}/clearTaskList?tasksToClear=${tasksToClear}`
        )

        if (response.success) {
            toast({
                duration: 3000,
                render: () => (
                    <ToastyBoi
                        message={`Successfully cleared ${tasksToClear} tasks`}
                        icon={<CircleCheckIcon fill="white" />}
                        backgroundColor="purple.500"
                    />
                ),
            })
        }
    }

    const closeModal = () => {
        setIsOpen(false)
        setTasksToClear('incomplete')
    }

    return (
        <Box
            width="100%"
            paddingLeft="8px !important"
            paddingRight="8px !important"
            display={{ base: 'none', md: 'block' }}
        >
            <Button
                onClick={() => setIsOpen(true)}
                size="md"
                mt="8px"
                width="100%"
            >
                clear list
            </Button>
            {isOpen && (
                <OOModal
                    title="Clear Task List"
                    isOpen={isOpen}
                    onClose={closeModal}
                    onSubmit={clearTasks}
                >
                    <Text fontWeight={500}>
                        Which tasks would you like to delete?
                    </Text>
                    <RadioGroup
                        p="16px"
                        onChange={setTasksToClear}
                        value={tasksToClear}
                    >
                        <Flex direction="column">
                            <Radio mb="8px" value="incomplete">
                                incomplete tasks
                            </Radio>
                            <Radio mb="8px" value="complete">
                                complete tasks
                            </Radio>
                            <Radio value="all">all of my tasks</Radio>
                        </Flex>
                    </RadioGroup>
                </OOModal>
            )}
        </Box>
    )
}

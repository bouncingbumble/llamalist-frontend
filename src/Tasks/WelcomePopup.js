import React, { useState } from 'react'
import LLModal from '../SharedComponents/LLModal'
import { Flex, Image, Text, Input, useToast } from '@chakra-ui/react'
import feedLlamaGif from '../animations/feedLlamaGif.gif'
import { useUpdateUserSettings, useUserSettings } from '../Hooks/UserHooks'
import ToastyBoi from '../SharedComponents/ToastyBoi'
import { useTasks } from '../Hooks/TasksHooks'

export default function WelcomePopup() {
    const [name, setName] = useState('')
    const userSettings = useUserSettings()
    const updateUserSettings = useUpdateUserSettings()
    const tasks = useTasks()
    const toast = useToast()
    const onNameEnter = () => {
        try {
            tasks.refetch()
            updateUserSettings.mutate({
                ...userSettings.data,
                llamaName: name,
            })

            toast({
                duration: 3000,
                render: () => (
                    <ToastyBoi
                        message={name + ' is hungry for apples!'}
                        icon={<Text fontSize="18px">🦙</Text>}
                        backgroundColor="purple.500"
                    />
                ),
            })
        } catch (err) {
            alert(err)
        }
    }
    return (
        <LLModal
            title=""
            isOpen={true}
            backgroundColor="greenFaded.100"
            onClose={() => alert('please name the poor lad first')}
        >
            <Flex
                w="100%"
                justifyContent="center"
                alignItems="center"
                mt="32px"
                flexDirection="column"
            >
                <Flex
                    justifyContent="center"
                    alignItems="center"
                    fontSize="48px"
                >
                    Welcome to Llama List
                </Flex>
                <Text>everyday tasks are better with a faithful companion</Text>
                <Image
                    src={feedLlamaGif}
                    alt="loading..."
                    height="420px"
                    borderRadius="16px"
                    mt="24px"
                />
                <Text fontSize="24px" fontWeight="500" mt="24px">
                    Name your llama
                </Text>
                <Input
                    placeholder="Leonard the llama"
                    size="md"
                    width="320px"
                    autoFocus
                    focusBorderColor="purple.500"
                    mt="8px"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && onNameEnter()}
                />
            </Flex>
        </LLModal>
    )
}

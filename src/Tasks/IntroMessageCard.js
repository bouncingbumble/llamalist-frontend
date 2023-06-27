import React from 'react'
import { VStack, Text, Flex, Button } from '@chakra-ui/react'
import { useUpdateUser, useUser } from '../Hooks/UserHooks'

export default function IntroMessageCard({ color, title, lines }) {
    const user = useUser()
    const updateUser = useUpdateUser()
    return (
        <Flex w="100%">
            <Flex
                w="100%"
                p="16px"
                backgroundColor={color}
                borderRadius="16px"
                color="white"
                flexDirection="column"
                shadow="base"
            >
                <Text fontSize="xl" fontWeight="600">
                    {title}
                </Text>

                {lines.map((l) => (
                    <Text fontSize="lg">{l}</Text>
                ))}

                <Button
                    variant="link"
                    mt="16px"
                    color="gray.900"
                    onClick={() =>
                        updateUser.mutate({
                            ...user.data,
                            hideSectionWelcomeMessages: {
                                ...user.data.hideSectionWelcomeMessages,
                                [title.toLowerCase()]: true,
                            },
                        })
                    }
                >
                    don't show again
                </Button>
            </Flex>
        </Flex>
    )
}

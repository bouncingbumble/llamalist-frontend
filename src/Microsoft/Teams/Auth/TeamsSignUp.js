import React, { useEffect } from 'react'
import { Flex } from '@chakra-ui/react'
import { SignUp } from '@clerk/clerk-react'

export default function TeamsSignUp() {
    // make sure llama is not clickable
    useEffect(() => {
        setTimeout(() => {
            const a = document.querySelector('a')
            a.href = ''
            a.style.cursor = 'default'
            a.style.pointerEvents = 'none'
        }, 1000)
    }, [])
    return (
        <Flex h="100vh" w="100vw" align="center" justify="center">
            <SignUp
                routing="path"
                path="/teamsTab/sign-up"
                redirectUrl="/teamsTab/auth"
                appearance={{
                    elements: {
                        footerAction: { display: 'none' },
                    },
                }}
            />
        </Flex>
    )
}

import React, { useEffect } from 'react'
import { Flex } from '@chakra-ui/react'
import { Navigate } from 'react-router-dom'
import { SignIn, SignedIn, SignedOut } from '@clerk/clerk-react'

export default function TeamsSignIn() {
    // make sure llama is not clickable
    useEffect(() => {
        setTimeout(() => {
            const a = document.querySelector('a')
            if (a) {
                a.href = ''
                a.style.cursor = 'default'
                a.style.pointerEvents = 'none'
            }
        }, 1000)
    }, [])

    return (
        <Flex h="100vh" w="100vw" align="center" justify="center">
            <SignedIn>
                <Navigate to="/teamsTab/auth" />
            </SignedIn>
            <SignedOut>
                <SignIn
                    routing="path"
                    path="/teamsTab/sign-in"
                    redirectUrl="/teamsTab/auth"
                    appearance={{
                        elements: {
                            footerAction: { display: 'none' },
                        },
                    }}
                />
            </SignedOut>
        </Flex>
    )
}

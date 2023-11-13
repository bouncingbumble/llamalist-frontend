import React from 'react'
import axios from 'axios'
import { useSignIn } from '@clerk/clerk-react'
import { Flex, Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export default function AutoSignIn() {
    const navigate = useNavigate()
    const { signIn, setActive } = useSignIn()

    // 6a14da7b-eb99-45d1-989a-fe2e636fbc1c
    const handleSignIn = async () => {
        try {
            // check for existing credentials
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_ENDPOINT}/tokenFromMsId/6a14da7b-eb99-45d1-989a-fe2e636fbc1c`
            )

            const auth = await signIn.create({
                strategy: 'ticket',
                ticket: response.data,
            })

            if (auth.status === 'complete') {
                await setActive({ session: auth.createdSessionId })
                navigate('/tasks')
            }
        } catch (error) {
            console.log(error.errors[0].longMessage)
        }
    }

    return (
        <Flex
            width="100%"
            height="100vh"
            bg="purpleFaded.100"
            align="center"
            justify="center"
        >
            <Button onClick={handleSignIn} colorScheme="purple" size="xl">
                Sign In
            </Button>
        </Flex>
    )
}

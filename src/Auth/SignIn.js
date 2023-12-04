import React, { useState } from 'react'
import axios from 'axios'
import ToastyBoi from '../SharedComponents/ToastyBoi'
import Background from './Background'
import { WarningIcon } from '../ChakraDesign/Icons'
import { useNavigate } from 'react-router-dom'
import { setTokenHeader } from '../Util/api'
import { Flex, Text, Input, Button, Spinner, useToast } from '@chakra-ui/react'

export default function SignIn() {
    // hooks
    const toast = useToast()
    const navigate = useNavigate()

    // state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [submitting, setSubmitting] = useState(false)

    // grab redirect info if Teams extension
    const searchParams = new URLSearchParams(window.location.search)
    const isExtension = Boolean(searchParams.get('isExtension') === 'true')

    const signIn = async () => {
        try {
            // check for valid form input
            if (!email || !email.includes('@') || !email.includes('.')) {
                const error = {
                    response: {
                        data: {
                            error: {
                                message: 'Please enter a valid email address',
                            },
                        },
                    },
                }

                throw error
            } else if (!password) {
                const error = {
                    response: {
                        data: {
                            error: {
                                message: 'Please enter a password',
                            },
                        },
                    },
                }

                throw error
            }

            setSubmitting(true)

            // hit the backend with form data
            const payload = await axios['post'](
                `${process.env.REACT_APP_BACKEND_ENDPOINT}/auth/signin`,
                { email, password }
            )

            // set token header and save JWT in storage
            setTokenHeader(payload.data)
            localStorage.setItem('jwtToken', payload.data)

            // go to the app
            if (isExtension) {
                navigate(`/teams/message-extension/${window.location.search}`)
            } else {
                navigate('/tasks/all/All Labels')
            }
        } catch (error) {
            // grab error message
            const message = error.response.data.error.message

            // if the error is regarding the email, clear it
            if (message.includes('user') || message.includes('email')) {
                setEmail('')
            }
            setPassword('')
            setSubmitting(false)

            // toast the error
            toast({
                duration: 5000,
                render: () => (
                    <ToastyBoi
                        backgroundColor="red.300"
                        icon={<WarningIcon fill="white" />}
                        message={error.response.data.error.message}
                    />
                ),
            })
        }
    }

    return (
        <>
            {!isExtension ? (
                <>
                    <Background />
                    <Flex
                        zIndex={1000}
                        width="100vw"
                        height="100vh"
                        align="center"
                        justify="center"
                        position="absolute"
                    >
                        <Flex
                            mb="80px"
                            bg="#fafafa"
                            p="24px 32px"
                            width="600px"
                            direction="column"
                            borderRadius="16px"
                            boxShadow="0 8px 16px 0 rgba(56, 96, 165, 0.15)"
                        >
                            <Text fontSize="2xl" fontWeight="extrabold">
                                llama list
                            </Text>
                            <Text mt="16px" ml="8px" mb="8px" fontWeight="bold">
                                Email
                            </Text>
                            <Input
                                mb="16px"
                                size="lg"
                                id="email"
                                p="10px 16px"
                                value={email}
                                variant="unstyled"
                                borderWidth="2px"
                                borderColor="purple.500"
                                bg="rgba(118, 61, 225, 0.1)"
                                placeholder="kuzco@llamalist.com"
                                onChange={(e) => setEmail(e.target.value)}
                                _focus={{ backgroundColor: 'transparent' }}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        document
                                            .getElementById('password')
                                            .focus()
                                    }
                                }}
                            />
                            <Text ml="8px" mb="8px" fontWeight="bold">
                                Password
                            </Text>
                            <Input
                                mb="24px"
                                size="lg"
                                id="password"
                                p="10px 16px"
                                type="password"
                                value={password}
                                variant="unstyled"
                                borderWidth="2px"
                                borderColor="purple.500"
                                bg="rgba(118, 61, 225, 0.1)"
                                placeholder="ilovellamas123"
                                _focus={{ backgroundColor: 'transparent' }}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        signIn()
                                    }
                                }}
                            />
                            <Button
                                mt="16px"
                                height="56px"
                                fontSize="20px"
                                onClick={signIn}
                                colorScheme="purple"
                            >
                                {submitting ? <Spinner /> : 'Sign In'}
                            </Button>
                            <Flex
                                mt="16px"
                                mb="-4px"
                                w="100%"
                                justify="center"
                                fontWeight="bold"
                            >
                                <Text mr="4px">Don't have an account?</Text>
                                <Text
                                    cursor="pointer"
                                    color="purple.500"
                                    onClick={() =>
                                        navigate(
                                            `/signUp/${window.location.search}`
                                        )
                                    }
                                >
                                    Go to Sign Up
                                </Text>
                            </Flex>
                        </Flex>
                    </Flex>
                </>
            ) : (
                <Flex
                    width="100%"
                    height="100vh"
                    justify="center"
                    direction="column"
                    padding="16px 32px"
                >
                    <Input
                        mb="8px"
                        size="md"
                        p="10px 16px"
                        value={email}
                        variant="unstyled"
                        borderWidth="2px"
                        borderColor="purple.500"
                        bg="rgba(118, 61, 225, 0.1)"
                        placeholder="email..."
                        onChange={(e) => setEmail(e.target.value)}
                        _focus={{ backgroundColor: 'transparent' }}
                    />
                    <Input
                        size="md"
                        p="10px 16px"
                        type="password"
                        value={password}
                        variant="unstyled"
                        borderWidth="2px"
                        borderColor="purple.500"
                        bg="rgba(118, 61, 225, 0.1)"
                        placeholder="password..."
                        _focus={{ backgroundColor: 'transparent' }}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        mt="16px"
                        height="56px"
                        fontSize="20px"
                        onClick={signIn}
                        colorScheme="purple"
                    >
                        {submitting ? <Spinner /> : 'Sign In'}
                    </Button>
                </Flex>
            )}
        </>
    )
}

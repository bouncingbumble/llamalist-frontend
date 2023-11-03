import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Llama from '../../../animations/java-llama-react/Llama'
import { apiCall } from '../../../Util/api'
import { useSignIn } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { useUser, useClerk } from '@clerk/clerk-react'
import { app, authentication } from '@microsoft/teams-js'
import { Flex, Button, Text, Spinner } from '@chakra-ui/react'

export default function TeamsAuth() {
    // hooks
    const navigate = useNavigate()
    const { user } = useUser()
    const { signOut } = useClerk()
    const { signIn, setActive } = useSignIn()

    // state
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [msUserId, setMsUserId] = useState('')
    const [isMessageExtension, setIsMessageExtension] = useState(false)

    // determine if we redirect to tab or message extension
    const searchParams = new URLSearchParams(window.location.search)
    const redirect = searchParams.get('redirect')

    // check if user has already logged in
    const checkCredentials = async () => {
        // init MS and store MS ID
        await app.initialize()
        const frame = app.getFrameContext()
        if (frame === 'content' || frame === 'task') {
            if (frame === 'task') {
                setIsMessageExtension(true)
            }

            const context = await app.getContext()
            setMsUserId(context.user.id)

            // check for existing credentials
            const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_ENDPOINT}/tokenFromMsId/${context.user.id}`
            )

            // sign user in or display auth flow
            if (response.data) {
                signInUser(response.data, context.user.id)
            } else {
                setLoading(false)
            }
        }
    }

    // initiate signin/signup flow
    const initAuthFlow = async (path) => {
        setError(null)
        try {
            const response = await authentication.authenticate({
                width: 600,
                height: 600,
                url: `https://app.llamalist.com/teams/${path}`,
            })

            // if we get a token, sign user in
            if (response.token) {
                signInUser(response.token, msUserId)
            } else if (response.error) {
                setError(path)
            }
        } catch (error) {
            setError('authentication')
            console.log('Error in MS Auth Popup: ' + error)
        }
    }

    const signInUser = async (token, msId) => {
        try {
            const auth = await signIn.create({
                strategy: 'ticket',
                ticket: token,
            })
            if (auth.status === 'complete') {
                // begin session
                await setActive({ session: auth.createdSessionId })

                // save ms user id to llama profile
                apiCall('PUT', '/settings', {
                    microsoftUserId: msId,
                })

                // go to tasks container
                navigate(`/teams/${redirect}`)
            } else {
                throw 'Authorization unable to be completed'
            }
        } catch (error) {
            setLoading(false)
            console.log('Error in Clerk Signin: ' + error.errors[0].longMessage)
        }
    }

    // get clerk sign in token
    const getSignInToken = async () => {
        try {
            return await apiCall('GET', '/signInToken')
        } catch (error) {
            console.log(error)
        }
    }

    // when the user object is updated, check if the app is initialized
    // and check if we are in the auth popup
    const handleUpdatedUser = () => {
        if (!app.getFrameContext()) {
            app.initialize().then(() => {
                if (app.getFrameContext() === 'authentication') {
                    handlePopupResponse()
                }
            })
        } else if (app.getFrameContext() === 'authentication') {
            handlePopupResponse()
        }
    }

    // handle the popup response
    const handlePopupResponse = () => {
        if (user) {
            getSignInToken()
                .then(async (token) => {
                    await signOut()
                    authentication.notifySuccess({ token })
                })
                .catch(async (error) => {
                    await signOut()
                    authentication.notifyFailure({ error: 'server' })
                })
        } else if (user === null) {
            authentication.notifySuccess({ error: 'authentication' })
        }
    }

    useEffect(() => {
        checkCredentials()
    }, [])

    useEffect(() => {
        handleUpdatedUser()
    }, [user])

    return (
        <Flex
            pt="48px"
            width="100%"
            height="100vh"
            align="center"
            direction="column"
            bg="purpleFaded.100"
        >
            {loading ? (
                <Flex
                    width="100%"
                    height="100vh"
                    align="center"
                    justify="center"
                >
                    <Spinner
                        size="xl"
                        color="purple.500"
                        thickness="5px"
                        speed="0.7s"
                    />
                </Flex>
            ) : (
                <>
                    {!isMessageExtension ? (
                        <Flex
                            direction="column"
                            align="center"
                            minHeight="750px"
                        >
                            <Text fontSize="48px" fontWeight="bold">
                                Welcome to Llama List!
                            </Text>
                            <Text fontSize="24px" mb="32px">
                                Your trusty companion awaits
                            </Text>
                            <Llama
                                noAccessories
                                minHeight={window.innerHeight * 0.35}
                                progress={[0, 10]}
                            />
                            <Flex
                                mt="48px"
                                width="100%"
                                justify="space-between"
                                direction="column"
                            >
                                <Flex direction="column" align="center">
                                    <Text mb="8px" fontSize="18px">
                                        Already have a llama?
                                    </Text>
                                    <Button
                                        size="xl"
                                        width="400px"
                                        borderRadius="16px"
                                        colorScheme="purple"
                                        onClick={() => initAuthFlow('sign-in')}
                                    >
                                        Sign In
                                    </Button>
                                </Flex>
                                <Flex
                                    mt="24px"
                                    direction="column"
                                    align="center"
                                >
                                    <Text mb="8px" fontSize="18px">
                                        New to Llama List?
                                    </Text>
                                    <Button
                                        size="xl"
                                        width="400px"
                                        borderRadius="16px"
                                        colorScheme="purpleFaded"
                                        onClick={() => initAuthFlow('sign-up')}
                                    >
                                        Create an Account
                                    </Button>
                                </Flex>
                                {error && (
                                    <Text
                                        mt="16px"
                                        align="center"
                                        color="red.400"
                                    >
                                        *
                                        {error === 'sign-in' &&
                                            'There was an error signing you in, please make sure you already have an account with this email'}
                                        {error === 'sign-up' &&
                                            'There was an error signing you up, please make sure an account with this email does not already exist'}
                                        {error === 'authentication' &&
                                            'There was an error authenticating your account, please try again'}
                                    </Text>
                                )}
                            </Flex>
                        </Flex>
                    ) : (
                        <Flex
                            mt="48px"
                            width="100%"
                            justify="space-between"
                            direction="column"
                        >
                            <Flex direction="column" align="center">
                                <Text mb="8px" fontSize="18px">
                                    Already have a llama?
                                </Text>
                                <Button
                                    size="xl"
                                    width="400px"
                                    borderRadius="16px"
                                    colorScheme="purple"
                                    onClick={() => initAuthFlow('sign-in')}
                                >
                                    Sign In
                                </Button>
                            </Flex>
                            <Flex mt="24px" direction="column" align="center">
                                <Text mb="8px" fontSize="18px">
                                    New to Llama List?
                                </Text>
                                <Button
                                    size="xl"
                                    width="400px"
                                    borderRadius="16px"
                                    colorScheme="purpleFaded"
                                    onClick={() => initAuthFlow('sign-up')}
                                >
                                    Create an Account
                                </Button>
                            </Flex>
                            {error && (
                                <Text mt="16px" align="center" color="red.400">
                                    *
                                    {error === 'sign-in' &&
                                        'There was an error signing you in, please make sure you already have an account with this email'}
                                    {error === 'sign-up' &&
                                        'There was an error signing you up, please make sure an account with this email does not already exist'}
                                    {error === 'authentication' &&
                                        'There was an error authenticating your account, please try again'}
                                </Text>
                            )}
                        </Flex>
                    )}
                </>
            )}
        </Flex>
    )
}

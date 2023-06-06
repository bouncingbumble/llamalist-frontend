import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { apiCall, setTokenHeader } from '../../Util/api'
import {
    Box,
    Text,
    VStack,
    Flex,
    Button,
    CircularProgress,
    Link,
    Input,
    FormHelperText,
    FormControl,
} from '@chakra-ui/react'

export default function TeamsSignIn({ msId, setUser, setIsSignedIn }) {
    const [error, setError] = useState(null)

    const signInUser = async (values) => {
        setError(null)
        const response = await apiCall(
            `POST`,
            `/auth/signin/msteams?isTab=true`,
            { msId, ...values }
        )
        if (response.error) {
            setError(response.error)
        } else {
            localStorage.setItem('msllamaListJwtToken', response.token)
            localStorage.setItem('ooProfilePhoto', response.profilePhotoUrl)
            setTokenHeader(response.token)
            setUser(response)
            setIsSignedIn(true)
        }
    }
    return (
        <>
            <Box
                mt={{ base: '16px', md: '24px' }}
                width="80%"
                maxW="480px"
                mb={{ base: '24px', md: '40px' }}
            >
                <Text
                    color="gray.700"
                    textAlign="center"
                    display={{ base: 'none', md: 'block' }}
                >
                    Welcome to the llama list Add-In for Microsoft Teams,
                    Outlook, and Office. Sign in once and we will remember you!
                </Text>
                <Text
                    textAlign="center"
                    display={{ base: 'block', md: 'none' }}
                >
                    Welcome to the llama list Add-In for Microsoft. Sign in once
                    and we will remember you!
                </Text>
            </Box>
            <VStack
                width="100%"
                maxW="480px"
                shadow="base"
                borderRadius="md"
                bg="white"
                paddingTop="24px"
                paddingBottom="24px"
                paddingLeft="48px"
                paddingRight="48px"
                overflow="visible"
            >
                <Text fontSize="18px" fontWeight="bold" alignSelf="start">
                    Sign In
                </Text>
                <Formik
                    initialValues={{ email: '' }}
                    onSubmit={async (values, actions) => {
                        await signInUser(values)
                    }}
                >
                    {({ values, handleChange, isSubmitting }) => (
                        <Form style={{ width: '100%' }}>
                            <FormControl id="email" isRequired>
                                <Input
                                    type="email"
                                    size="lg"
                                    placeholder="work email"
                                    onChange={handleChange}
                                    value={values.email}
                                    name="email"
                                />
                                {error === 'email' && (
                                    <FormHelperText ml="16px" color="#ff3d71">
                                        *Email not found
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <Input
                                    type="password"
                                    size="lg"
                                    placeholder="password"
                                    onChange={handleChange}
                                    value={values.password}
                                    name="password"
                                />
                                {error === 'password' && (
                                    <FormHelperText ml="16px" color="#ff3d71">
                                        *Incorrect password
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <Button
                                colorScheme="purple"
                                variant="solid"
                                size="lg"
                                width="100%"
                                marginTop="24px !important"
                                marginBottom="24px !important"
                                type="submit"
                            >
                                {isSubmitting ? (
                                    <CircularProgress
                                        isIndeterminate
                                        size="32px"
                                    />
                                ) : (
                                    'Sign in'
                                )}
                            </Button>
                        </Form>
                    )}
                </Formik>
                <Flex>
                    <Text display={{ base: 'none', md: 'block' }}>
                        Don't have an account?{' '}
                    </Text>
                    <Link
                        href={`${process.env.REACT_APP_FRONTEND}/signup`}
                        target="_blank"
                    >
                        <Text
                            color="purple.500"
                            ml="4px"
                            display="flex"
                            alignItems="center"
                        >
                            {' '}
                            <span>Go to sign up</span>
                            <span style={{ height: '10px' }}>
                                <img
                                    src="https://office-otter-production.s3.us-east-2.amazonaws.com/9d88f0b4-187c-456a-89cb-01c09ae0894fpopout.png"
                                    alt="popout icon"
                                    style={{
                                        height: '10px',
                                        width: '10px',
                                        marginLeft: '4px',
                                    }}
                                />
                            </span>
                        </Text>
                    </Link>
                </Flex>
            </VStack>
        </>
    )
}

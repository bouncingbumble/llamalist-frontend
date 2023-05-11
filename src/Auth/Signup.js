import React, { useContext, useEffect, useState } from 'react'
import {
    Text,
    Flex,
    Box,
    Input,
    FormControl,
    Button,
    useToast,
    CircularProgress,
    Link as ChakraLink,
    VStack,
    FormHelperText,
} from '@chakra-ui/react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { apiCall, setTokenHeader } from '../Util/api'
import jwtDecode from 'jwt-decode'
import { UserContext } from '../Contexts/UserContext'
import { Formik, Form } from 'formik'
import PhoneInput from '../UserProfile/UserForms/PhoneInputs/PhoneInputComponent'
import { PhoneErrorMessage } from '../UserProfile/UserForms/YourInfo'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { Logo } from '../Navbar/Logo'

export default function Signup() {
    const { user, setUser } = useContext(UserContext)
    const toast = useToast()
    const navigate = useNavigate()
    const location = useLocation()

    const [phone, setPhone] = useState('')
    const [validPhone, setValidPhone] = useState(true)

    useEffect(() => {
        if (user !== null) {
            navigate('/tasks/all')
        }
    }, [user])

    const signInUser = async (userFormData) => {
        //make sign in call to backend
        try {
            const data = await apiCall('POST', '/auth/signin', userFormData)
            setTokenAndUser(data.token)
        } catch (err) {
            throwAuthError(err)
        }
    }

    const setTokenAndUser = async (token) => {
        localStorage.setItem('llamaListJwtToken', token)
        setTokenHeader(token)
        const decoded = jwtDecode(token)
        const newUserData = await apiCall('GET', `/users/${decoded._id}`)

        console.log(newUserData)
        setUser(newUserData)
    }

    const throwAuthError = (err) => {
        toast({
            title: 'Error',
            description: err.data.error.message,
            status: 'error',
            duration: 4000,
            isClosable: true,
        })
    }

    const signUpUser = async (userFormData) => {
        //make sign up call to backend
        try {
            const data = await apiCall('POST', '/auth/signup', userFormData)

            setTokenAndUser(data.token)
        } catch (err) {
            toast({
                title: 'Error',
                description: 'There was an error creating your account',
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
        }
    }

    return (
        <Flex justifyContent="center" alignItems="start" p="32px">
            <Box minWidth="360px">
                <Logo />
                <Flex mt="16px" flexDir="column">
                    <Text fontSize="18px" color="black" mt="16px">
                        {location.pathname === '/signup' ? (
                            <span>
                                Get started on your <b>free account</b>.
                            </span>
                        ) : (
                            'Sign in'
                        )}
                    </Text>
                </Flex>

                <Flex flexDir="column" mt="16px">
                    {location.pathname === '/signin' && (
                        <>
                            <Formik
                                initialValues={{ email: '' }}
                                onSubmit={async (values, actions) => {
                                    await signInUser(values)
                                }}
                            >
                                {({ values, handleChange, isSubmitting }) => (
                                    <Form style={{ width: '100%' }}>
                                        <FormControl
                                            id="email"
                                            isRequired
                                            mb="16px"
                                        >
                                            <Input
                                                type="email"
                                                size="lg"
                                                placeholder="work email"
                                                onChange={handleChange}
                                                value={values.email}
                                                name="email"
                                            />
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
                                        </FormControl>
                                        <Button
                                            colorScheme="purple"
                                            variant="solid"
                                            size="lg"
                                            width="100%"
                                            marginTop="24px !important"
                                            marginBottom="24px !important"
                                            type="submit"
                                            fontWeight="500"
                                        >
                                            {isSubmitting ? (
                                                <CircularProgress
                                                    isIndeterminate
                                                    size="20px"
                                                    ringColor="lightgray.500"
                                                    color="green.500"
                                                />
                                            ) : (
                                                'Sign in'
                                            )}
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </>
                    )}

                    {location.pathname === '/signup' && (
                        <VStack w="100%" alignContent="center">
                            <Formik
                                initialValues={{
                                    name: '',
                                    email: '',
                                    password: '',
                                    phone: '',
                                    jobTitle: '',
                                    cameFrom: '',
                                }}
                                onSubmit={async (values, actions) => {
                                    if (isValidPhoneNumber(phone)) {
                                        values.phone = phone
                                        setValidPhone(true)
                                        await signUpUser(values)
                                    } else {
                                        setValidPhone(false)
                                    }
                                }}
                            >
                                {({ values, handleChange, isSubmitting }) => (
                                    <Form
                                        style={{
                                            width: '100%',
                                        }}
                                    >
                                        <FormControl
                                            id="name"
                                            isRequired
                                            mb="16px"
                                            mt="8px"
                                        >
                                            <Input
                                                type="text"
                                                size="lg"
                                                placeholder="name"
                                                onChange={handleChange}
                                                value={values.name}
                                                name="name"
                                            />
                                        </FormControl>
                                        <FormControl
                                            id="job-title"
                                            isRequired
                                            mb="16px"
                                        >
                                            <Input
                                                type="text"
                                                size="lg"
                                                placeholder="job title"
                                                onChange={handleChange}
                                                value={values.jobTitle}
                                                name="jobTitle"
                                            />
                                        </FormControl>
                                        <FormControl
                                            id="email"
                                            isRequired
                                            mb="16px"
                                        >
                                            <Input
                                                type="email"
                                                size="lg"
                                                placeholder="work email"
                                                onChange={handleChange}
                                                value={values.email}
                                                name="email"
                                            />
                                        </FormControl>
                                        <FormControl
                                            id="password"
                                            isRequired
                                            mb="16px"
                                        >
                                            <Input
                                                type="password"
                                                size="lg"
                                                placeholder="password"
                                                onChange={handleChange}
                                                value={values.password}
                                                name="password"
                                            />
                                        </FormControl>
                                        <FormControl
                                            id="phone"
                                            isRequired
                                            mb="16px"
                                        >
                                            <PhoneInput
                                                placeholder="phone number"
                                                value={phone}
                                                onChange={(num) =>
                                                    setPhone(num)
                                                }
                                            />
                                            {!validPhone && (
                                                <PhoneErrorMessage
                                                    validPhone={validPhone}
                                                />
                                            )}
                                            <FormHelperText ml="16px">
                                                For our text integration
                                            </FormHelperText>
                                        </FormControl>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                size="lg"
                                                placeholder="how did you hear about us?"
                                                onChange={handleChange}
                                                value={values.cameFrom}
                                                name="cameFrom"
                                                autoFocus
                                            />
                                        </FormControl>

                                        <Button
                                            id="signup-submit"
                                            colorScheme="purple"
                                            variant="solid"
                                            size="lg"
                                            width="100%"
                                            marginTop="16px !important"
                                            marginBottom="16px !important"
                                            type="submit"
                                        >
                                            {isSubmitting ? (
                                                <CircularProgress
                                                    isIndeterminate
                                                    size="20px"
                                                    ringColor="lightgray.500"
                                                    color="green.500"
                                                />
                                            ) : (
                                                `Create Account`
                                            )}
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </VStack>
                    )}
                </Flex>
                {/* )} */}
                <Box>
                    {location.pathname === '/signin' ? (
                        <>
                            <Flex>
                                <Text fontSize="normal">
                                    Don't have an account?{' '}
                                </Text>
                                <Link to="/signup">
                                    <Text
                                        color="purple.500"
                                        ml="2px"
                                        fontWeight="600"
                                    >
                                        {' '}
                                        Go to sign up
                                    </Text>
                                </Link>
                            </Flex>
                            <ChakraLink
                                href={`${process.env.REACT_APP_BACKEND_SERVER}/passwordreset`}
                                color="purple.500"
                            >
                                Forgot Password?
                            </ChakraLink>
                        </>
                    ) : (
                        <>
                            <Flex>
                                <Text fontSize="normal">
                                    Already signed up?{' '}
                                </Text>
                                <Link to="/signin">
                                    <Flex>
                                        <Text
                                            color="purple.500"
                                            ml="4px"
                                            fontWeight="600"
                                        >
                                            {' '}
                                            Go to sign in
                                        </Text>
                                        .
                                    </Flex>
                                </Link>
                            </Flex>
                            <Text fontSize="sm">
                                By signing up, you agree to our{' '}
                                <Button
                                    target="_blank"
                                    href="https://app.officeotter.com/tos"
                                    rel="noopener noreferrer"
                                    variant="link"
                                    color="purple.500"
                                >
                                    terms of service
                                </Button>{' '}
                                and
                                <br />
                                <Button
                                    target="_blank"
                                    href="https://app.officeotter.com/tos"
                                    rel="noopener noreferrer"
                                    variant="link"
                                    color="purple.500"
                                >
                                    privacy policy
                                </Button>
                                .
                            </Text>
                        </>
                    )}
                </Box>
            </Box>
        </Flex>
    )
}

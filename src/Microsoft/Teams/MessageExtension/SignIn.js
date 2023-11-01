import { useState } from 'react'
import { Formik, Form } from 'formik'
import { apiCall, setTokenHeader } from '../../../Util/api'
import {
    Text,
    Input,
    VStack,
    Button,
    FormControl,
    FormHelperText,
    CircularProgress,
} from '@chakra-ui/react'

export default function SignIn({ msUserId, setUserId }) {
    const [error, setError] = useState(null)

    const signIn = async (values) => {
        setError(null)
        const foundUser = await apiCall(
            `POST`,
            `/auth/signin/msteams?isTab=true`,
            { msId: msUserId, ...values }
        )
        if (foundUser.error) {
            setError(foundUser.error)
        } else {
            localStorage.setItem('msllamaListJwtToken', foundUser.token)
            setTokenHeader(foundUser.token)
            setUserId(foundUser._id)
        }
    }

    return (
        <VStack width="100%" padding="24px 48px">
            <Text fontSize="18px" fontWeight="bold" alignSelf="start">
                Sign In
            </Text>
            <Formik initialValues={{ email: '' }} onSubmit={signIn}>
                {({ values, handleChange, isSubmitting }) => (
                    <Form style={{ width: '100%' }}>
                        <FormControl id="email" isRequired>
                            <Input
                                mt="8px"
                                size="lg"
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                placeholder="work email"
                            />
                            {error === 'email' && (
                                <FormHelperText ml="16px" color="#ff3d71">
                                    *Email not found
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <Input
                                mt="8px"
                                size="lg"
                                type="password"
                                name="password"
                                placeholder="password"
                                onChange={handleChange}
                                value={values.password}
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
                                <CircularProgress isIndeterminate size="32px" />
                            ) : (
                                'Sign in'
                            )}
                        </Button>
                    </Form>
                )}
            </Formik>
        </VStack>
    )
}

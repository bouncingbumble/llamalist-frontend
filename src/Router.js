import React, { useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './ChakraDesign/theme'
import Overview from './ChakraDesign/Overview'
import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    RedirectToSignIn,
    SignIn,
    SignUp,
} from '@clerk/clerk-react'

import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import TasksContainer from './Tasks/TasksContainer'
import Auth from './Auth/Auth'

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
    throw new Error('Missing Publishable Key')
}

const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY

function App() {
    const navigate = useNavigate()

    return (
        <ChakraProvider theme={theme}>
            <ClerkProvider
                publishableKey={clerkPubKey}
                navigate={(to) => navigate(to)}
            >
                <Routes>
                    <Route
                        path="/sign-in/*"
                        element={<SignIn routing="path" path="/sign-in" />}
                    />
                    <Route
                        path="/sign-up/*"
                        element={<SignUp routing="path" path="/sign-up" />}
                    />

                    <Route
                        path="/tasks/:section/:selectedLabel"
                        element={
                            <Auth>
                                <SignedIn>
                                    <TasksContainer />
                                </SignedIn>
                                <SignedOut>
                                    <RedirectToSignIn />
                                </SignedOut>
                            </Auth>
                        }
                    />
                    <Route
                        path="/tasks"
                        element={
                            <Auth>
                                <SignedIn>
                                    <Navigate to="/tasks/all/All Labels" />{' '}
                                </SignedIn>
                                <SignedOut>
                                    <RedirectToSignIn />
                                </SignedOut>
                            </Auth>
                        }
                    />
                    <Route
                        path="/tasks/:section"
                        element={
                            <Auth>
                                <SignedIn>
                                    <Navigate to="/tasks/all/All Labels" />{' '}
                                </SignedIn>
                                <SignedOut>
                                    <RedirectToSignIn />
                                </SignedOut>
                            </Auth>
                        }
                    />
                    <Route
                        path="/chakra"
                        element={
                            <Auth>
                                <SignedIn>
                                    <Overview />{' '}
                                </SignedIn>
                                <SignedOut>
                                    <RedirectToSignIn />
                                </SignedOut>
                            </Auth>
                        }
                    />
                    <Route
                        path="*"
                        element={
                            <Auth>
                                <SignedIn>
                                    <Navigate to="/tasks/all/All Labels" />{' '}
                                </SignedIn>
                                <SignedOut>
                                    <RedirectToSignIn />
                                </SignedOut>
                            </Auth>
                        }
                    />
                </Routes>
            </ClerkProvider>
        </ChakraProvider>
    )
}

export default App

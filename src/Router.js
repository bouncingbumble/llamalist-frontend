import React from 'react'
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
import LlamaLand from './animations/java-llama-game/LlamaLand'
import PersonalTab from './Microsoft/Teams/PersonalTab'
import Frenzyfields from './animations/fields/frenzyfields'
import CompletedTasks from './Tasks/CompletedTasks'
import TeamsSignIn from './Microsoft/Teams/TeamsSignIn'

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
                            <>
                                <SignedIn>
                                    <TasksContainer />
                                </SignedIn>
                                <SignedOut>
                                    <RedirectToSignIn />
                                </SignedOut>
                            </>
                        }
                    />
                    <Route
                        path="/tasks"
                        element={
                            <>
                                <SignedIn>
                                    <Navigate to="/tasks/all/All Labels" />{' '}
                                </SignedIn>
                                <SignedOut>
                                    <RedirectToSignIn />
                                </SignedOut>
                            </>
                        }
                    />
                    <Route
                        path="/tasks/:section"
                        element={
                            <>
                                <SignedIn>
                                    <Navigate to="/tasks/all/All Labels" />{' '}
                                </SignedIn>
                                <SignedOut>
                                    <RedirectToSignIn />
                                </SignedOut>
                            </>
                        }
                    />
                    <Route
                        path="/chakra"
                        element={
                            <>
                                <SignedIn>
                                    <Overview />{' '}
                                </SignedIn>
                                <SignedOut>
                                    <RedirectToSignIn />
                                </SignedOut>
                            </>
                        }
                    />
                    <Route
                        path="/llamaLand"
                        element={
                            <>
                                <SignedIn>
                                    <LlamaLand />
                                </SignedIn>
                                <SignedOut>
                                    <RedirectToSignIn />
                                </SignedOut>
                            </>
                        }
                    />
                    <Route
                        path="/frenzyfields"
                        element={
                            <>
                                <SignedIn>
                                    <div className="bigContainer">
                                        <Frenzyfields />
                                    </div>
                                </SignedIn>
                                <SignedOut>
                                    <RedirectToSignIn />
                                </SignedOut>
                            </>
                        }
                    />
                    <Route
                        path="/completed"
                        element={
                            <>
                                <SignedIn>
                                    <CompletedTasks />
                                </SignedIn>
                                <SignedOut>
                                    <RedirectToSignIn />
                                </SignedOut>
                            </>
                        }
                    />
                    <Route
                        path="/teams/:section/:selectedLabel"
                        element={
                            <>
                                <SignedIn>
                                    <PersonalTab />
                                </SignedIn>
                                <SignedOut>
                                    <Navigate to="/teams/sign-in" />
                                </SignedOut>
                            </>
                        }
                    />
                    <Route
                        path="/teams"
                        element={<Navigate to="/teams/all/All Labels" />}
                    />
                    <Route path="/teams/sign-in" element={<TeamsSignIn />} />
                    <Route
                        path="*"
                        element={
                            <>
                                <SignedIn>
                                    <Navigate to="/tasks/all/All Labels" />{' '}
                                </SignedIn>
                                <SignedOut>
                                    <RedirectToSignIn />
                                </SignedOut>
                            </>
                        }
                    />
                </Routes>
            </ClerkProvider>
        </ChakraProvider>
    )
}

export default App

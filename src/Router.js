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
import Frenzyfields from './animations/fields/frenzyfields'
import CompletedTasks from './Tasks/CompletedTasks'
import TeamsAuth from './Microsoft/Teams/Auth/TeamsAuth'
import TeamsSignIn from './Microsoft/Teams/Auth/TeamsSignIn'
import TeamsSignUp from './Microsoft/Teams/Auth/TeamsSignUp'
import MessageExtension from './Microsoft/Teams/MessageExtension'

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
                        path="/teams/tab"
                        element={<Navigate to="/teams/tab/all/All Labels" />}
                    />
                    <Route
                        path="/teams/tab/:section"
                        element={<Navigate to="/teams/tab/all/All Labels" />}
                    />
                    <Route
                        path="/teams/tab/:section/:selectedLabel"
                        element={
                            <>
                                <SignedIn>
                                    <TasksContainer />
                                </SignedIn>
                                <SignedOut>
                                    <Navigate to="/teams/auth?redirect=tab" />
                                </SignedOut>
                            </>
                        }
                    />
                    <Route path="/teams/auth" element={<TeamsAuth />} />
                    <Route path="/teams/sign-in" element={<TeamsSignIn />} />
                    <Route path="/teams/sign-up" element={<TeamsSignUp />} />

                    <Route
                        path="/teams/message-extension"
                        element={
                            <>
                                <SignedIn>
                                    <MessageExtension />
                                </SignedIn>
                                <SignedOut>
                                    <Navigate
                                        to={`/teams/auth?redirect=message-extension${encodeURIComponent(
                                            window.location.search
                                        )}`}
                                    />
                                </SignedOut>
                            </>
                        }
                    />

                    <Route
                        path="*"
                        element={
                            <>
                                <SignedIn>
                                    <Navigate to="/tasks/all/All Labels" />
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

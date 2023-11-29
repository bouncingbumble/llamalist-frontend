import React from 'react'
import theme from './ChakraDesign/theme'
import SignIn from './Auth/SignIn'
import SignUp from './Auth/SignUp'
import Overview from './ChakraDesign/Overview'
import TasksContainer from './Tasks/TasksContainer'
import LlamaLand from './animations/java-llama-game/LlamaLand'
import Frenzyfields from './animations/fields/frenzyfields'
import CompletedTasks from './Tasks/CompletedTasks'
import TeamsAuth from './Microsoft/Teams/Auth/TeamsAuth'
import TeamsSignIn from './Microsoft/Teams/Auth/TeamsSignIn'
import TeamsSignUp from './Microsoft/Teams/Auth/TeamsSignUp'
import UserAuthWrapper from './Auth/UserAuthWrapper'
import MessageExtension from './Microsoft/Teams/MessageExtension'
import { ChakraProvider } from '@chakra-ui/react'
import { setTokenHeader } from './Util/api'
import { Routes, Route, Navigate } from 'react-router-dom'

function App() {
    const token = localStorage.getItem('jwtToken')
    if (token) {
        setTokenHeader(token)
    }

    return (
        <ChakraProvider theme={theme}>
            <Routes>
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/signUp" element={<SignUp />} />

                <Route
                    path="/tasks/:section/:selectedLabel"
                    element={
                        <UserAuthWrapper>
                            <TasksContainer />
                        </UserAuthWrapper>
                    }
                />
                <Route
                    path="/tasks"
                    element={
                        <UserAuthWrapper>
                            <Navigate to="/tasks/all/All Labels" />
                        </UserAuthWrapper>
                    }
                />
                <Route
                    path="/tasks/:section"
                    element={
                        <UserAuthWrapper>
                            <Navigate to="/tasks/all/All Labels" />
                        </UserAuthWrapper>
                    }
                />
                <Route
                    path="/chakra"
                    element={
                        <UserAuthWrapper>
                            <Overview />
                        </UserAuthWrapper>
                    }
                />
                <Route
                    path="/llamaLand"
                    element={
                        <UserAuthWrapper>
                            <LlamaLand />
                        </UserAuthWrapper>
                    }
                />
                <Route
                    path="/frenzyfields"
                    element={
                        <UserAuthWrapper>
                            <div className="bigContainer">
                                <Frenzyfields />
                            </div>
                        </UserAuthWrapper>
                    }
                />
                <Route
                    path="/completed"
                    element={
                        <UserAuthWrapper>
                            <CompletedTasks />
                        </UserAuthWrapper>
                    }
                />

                {/* * * * * * * * * * * * need to update * * * * * * * * * * * */}
                {/* <Route
                    path="/teams/tab"
                    element={<Navigate to="/teams/tab/all/All Labels" />}
                />
                <Route
                    path="/teams/tab/:section"
                    element={<Navigate to="/teams/tab/all/All Labels" />}
                />
                <Route
                    path="/teams/tab/:section/:selectedLabel"
                    element={<div>teams page</div>}
                />
                <Route path="/teams/auth" element={<TeamsAuth />} />
                <Route path="/teams/sign-in" element={<TeamsSignIn />} />
                <Route path="/teams/sign-up" element={<TeamsSignUp />} /> */}

                <Route
                    path="/teams/message-extension"
                    element={<div>teams extension</div>}
                />
                {/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */}

                <Route
                    path="*"
                    element={
                        <UserAuthWrapper>
                            <Navigate to="/tasks/all/All Labels" />
                        </UserAuthWrapper>
                    }
                />
            </Routes>
        </ChakraProvider>
    )
}

export default App

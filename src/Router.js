import React from 'react'
import theme from './ChakraDesign/theme'
import SignIn from './Auth/SignIn'
import SignUp from './Auth/SignUp'
import Overview from './ChakraDesign/Overview'
import TasksContainer from './Tasks/TasksContainer'
import LlamaLand from './animations/java-llama-game/LlamaLand'
import Frenzyfields from './animations/fields/frenzyfields'
import CompletedTasks from './Tasks/CompletedTasks'
import UserAuthWrapper from './Auth/UserAuthWrapper'
import TeamsAuthWrapper from './Microsoft/Teams/TeamsAuthWrapper'
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
                <Route
                    path="/teams/message-extension"
                    element={
                        <TeamsAuthWrapper>
                            <MessageExtension />
                        </TeamsAuthWrapper>
                    }
                />
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

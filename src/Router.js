import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './ChakraDesign/theme'
import Overview from './ChakraDesign/Overview'
import { Routes, Route, Navigate } from 'react-router-dom'
import Signup from './Auth/Signup'
import UserAuthWrapper from './Auth/UserAuthWrapper'
// import UserProfileContainer from './UserProfile/UserProfileContainer'
import TasksContainer from './Tasks/TasksContainer'
// import StaticTabContainer from './Microsoft/StaticTab/StaticTabContainer'
// import MessageExtension from './Microsoft/MessageExtension/ExtensionContainer'
import { PublicClientApplication } from '@azure/msal-browser'

//msft auth stuff
// const configuration = {
//     auth: {
//         clientId: process.env.REACT_APP_MSFT_CLIENT_ID,
//         authority: `https://login.microsoftonline.com/${process.env.REACT_APP_MSFT_TENANT_ID}`,
//     },
// }

// const pca = new PublicClientApplication(configuration)

function App() {
    return (
        // <MsalProvider instance={pca}>
        <ChakraProvider theme={theme}>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signup />} />
                {/* <Route
                    path="/tasks/paymentstatus"
                    element={
                        <UserAuthWrapper>
                            <TasksContainer paymentStatus />
                        </UserAuthWrapper>
                    }
                /> */}
                <Route
                    path="/tasks/:section/:selectedLabel"
                    element={
                        <UserAuthWrapper>
                            <TasksContainer />
                        </UserAuthWrapper>
                    }
                />
                {/* <Route
                    path="/userprofile/:subsection"
                    element={
                        <UserAuthWrapper>
                            <UserProfileContainer />
                        </UserAuthWrapper>
                    }
                /> */}
                <Route path="/chakra" element={<Overview />} />
                {/* <Route path="/microsoftTab" element={<StaticTabContainer />} />
                <Route path="/teamsExtension" element={<MessageExtension />} /> */}
                <Route path="*" element={<Navigate to="/signup" />} />
            </Routes>
        </ChakraProvider>
        // </MsalProvider>
    )
}

export default App

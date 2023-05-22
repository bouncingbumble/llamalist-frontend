import React, { useMemo, useState, useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './ChakraDesign/theme'
import Overview from './ChakraDesign/Overview'
import { Routes, Route, Navigate } from 'react-router-dom'
import Signup from './Auth/Signup'
import { UserContext } from './Contexts/UserContext'
import jwtDecode from 'jwt-decode'
import { apiCall, setTokenHeader } from './Util/api'
import UserAuthWrapper from './Auth/UserAuthWrapper'
import AdminAuthWrapper from './Auth/AdminAuthWrapper'
import AdminPage from './Admin/AdminPage'
import UserProfileContainer from './UserProfile/UserProfileContainer'
import TasksContainer from './Tasks/TasksContainer'
import StripePopUp from './Stripe/StripePopUp'
import { PaidPopUpContext } from './Contexts/PaidPopupContext'
import PaymentStatus from './Stripe/PaymentStatus'
import { TasksProvider } from './Contexts/TasksContext'
import { LabelsProvider } from './Contexts/LabelsContext'
import StaticTabContainer from './Microsoft/StaticTab/StaticTabContainer'
import MessageExtension from './Microsoft/MessageExtension/ExtensionContainer'
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
    const [user, setUser] = useState(null)
    const [paidPopup, setPaidPopup] = useState(false)
    const providerValue = useMemo(() => ({ user, setUser }), [user, setUser])
    const paidPopupProvider = useMemo(
        () => ({ paidPopup, setPaidPopup }),
        [paidPopup, setPaidPopup]
    )
    const [isUserLoading, setIsUserLoading] = useState(true)

    useEffect(() => {
        checkToken()
    }, [])

    const checkToken = async () => {
        setIsUserLoading(true)
        //check for auth token and set user if found
        const token = localStorage.getItem('llamaListJwtToken')
        if (token) {
            setTokenHeader(token)
            const decoded = jwtDecode(token)
            let newUserData = await apiCall('GET', `/users/${decoded._id}`)

            console.log(newUserData)
            if (newUserData !== null && !newUserData.stripeCustomerId) {
                console.log('running stripe custoemr id')
                newUserData = await apiCall('POST', `/stripe/customer`, {
                    userId: newUserData._id,
                })
            }
            setUser(newUserData)
        } else {
            setUser(null)
        }
        setIsUserLoading(false)
    }

    return (
        // <MsalProvider instance={pca}>
        //     <GoogleOAuthProvider clientId="264697661812-5de6bee2s9cl6sh0lt0tmff1crlungq7.apps.googleusercontent.com">
        <ChakraProvider theme={theme}>
            {isUserLoading ? (
                <span></span>
            ) : (
                <>
                    <UserContext.Provider value={providerValue}>
                        <PaidPopUpContext.Provider value={paidPopupProvider}>
                            <Routes>
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/signin" element={<Signup />} />
                                <Route
                                    path="/tasks/paymentstatus"
                                    element={
                                        <UserAuthWrapper>
                                            <TasksProvider>
                                                <LabelsProvider>
                                                    <TasksContainer
                                                        paymentStatus
                                                    />
                                                </LabelsProvider>
                                            </TasksProvider>
                                        </UserAuthWrapper>
                                    }
                                />
                                <Route
                                    path="/paymentstatus"
                                    element={
                                        <UserAuthWrapper>
                                            <PaymentStatus
                                                user={user}
                                                setUser={setUser}
                                            />
                                        </UserAuthWrapper>
                                    }
                                />
                                <Route
                                    path="/tasks/:section"
                                    element={
                                        <UserAuthWrapper>
                                            <TasksProvider>
                                                <LabelsProvider>
                                                    <TasksContainer />
                                                </LabelsProvider>
                                            </TasksProvider>
                                        </UserAuthWrapper>
                                    }
                                />
                                <Route
                                    path="/userprofile/:subsection"
                                    element={
                                        <UserAuthWrapper>
                                            <TasksProvider>
                                                <LabelsProvider>
                                                    <UserProfileContainer />
                                                </LabelsProvider>
                                            </TasksProvider>
                                        </UserAuthWrapper>
                                    }
                                />
                                <Route
                                    path="/admin"
                                    element={
                                        <AdminAuthWrapper>
                                            <AdminPage user={user} />
                                        </AdminAuthWrapper>
                                    }
                                />
                                <Route path="/chakra" element={<Overview />} />
                                {/* <Route path="/tos" element={<Tos />} />
                                        <Route
                                            path="/privacy"
                                            element={<Privacy />}
                                        />
                                        <Route
                                            path="/support"
                                            element={<Support />}
                                        /> */}
                                <Route
                                    path="/microsoftTab"
                                    element={
                                        <TasksProvider>
                                            <LabelsProvider>
                                                <StaticTabContainer />
                                            </LabelsProvider>
                                        </TasksProvider>
                                    }
                                />
                                <Route
                                    path="/teamsExtension"
                                    element={
                                        <TasksProvider>
                                            <LabelsProvider>
                                                <MessageExtension />
                                            </LabelsProvider>
                                        </TasksProvider>
                                    }
                                />
                                <Route
                                    path="*"
                                    element={<Navigate to="/signup" />}
                                />
                            </Routes>
                            {user !== null && paidPopup.show && (
                                <StripePopUp
                                    open={paidPopup.show}
                                    reason={paidPopup.reason}
                                    hideButtons={paidPopup.hideButtons}
                                />
                            )}
                        </PaidPopUpContext.Provider>
                    </UserContext.Provider>
                </>
            )}
        </ChakraProvider>
        //     </GoogleOAuthProvider>
        // </MsalProvider>
    )
}

export default App

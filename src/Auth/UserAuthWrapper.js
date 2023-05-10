import React, { useContext } from 'react'
import { useLocation, Navigate } from 'react-router'
import { UserContext } from '../Contexts/UserContext'

export default function AuthWrapper({ children }) {
    const { user } = useContext(UserContext)
    let location = useLocation()

    if (user === null) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/signin" state={{ from: location }} />
    }

    return children
}

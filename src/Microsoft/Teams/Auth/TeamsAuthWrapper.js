import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUserSettings } from '../../../Hooks/UserHooks'

export default function TeamsAuthWrapper({ children }) {
    const userSettings = useUserSettings()

    if (userSettings.status !== 'loading') {
        if (!userSettings.data) {
            return (
                <Navigate
                    to={`/signIn/${window.location.search}&isExtension=true`}
                />
            )
        }
        return children
    }
}

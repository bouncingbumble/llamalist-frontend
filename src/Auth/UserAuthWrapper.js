import React, { useContext } from 'react'
import { Navigate } from 'react-router'
import { useQueryClient } from '@tanstack/react-query'

export default function AuthWrapper({ children }) {
    const queryClient = useQueryClient()
    const user = queryClient.getQueryData(['user'])

    if (user === null) {
        return <Navigate to="/signin" />
    }

    return children
}

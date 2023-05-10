import React, { useContext } from 'react'
import { Navigate } from 'react-router'
import { UserContext } from '../Contexts/UserContext'
//deploy
export default function AdminAuthWrapper({ children }) {
    const { user } = useContext(UserContext)

    if (!user || !process.env.REACT_APP_ADMIN.split(' ').includes(user._id)) {
        return <Navigate to="/tasks" />
    }

    return children
}

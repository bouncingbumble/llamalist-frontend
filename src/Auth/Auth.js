import React, { useState, useEffect } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { setTokenHeader } from '../Util/api'

function Auth({ children }) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { getToken } = useAuth()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getToken()
                setTokenHeader(token)

                setLoading(false)
            } catch (err) {
                setError(err)
                setLoading(false)
            }
        }

        fetchData()
    }, [getToken])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return <div>{children}</div>
}

export default Auth

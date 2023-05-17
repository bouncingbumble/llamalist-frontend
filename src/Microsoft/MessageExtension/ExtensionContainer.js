// import { app } from '@microsoft/teams-js'
import SignIn from './SignIn'
import TaskCard from './TaskCard'
import jwtDecode from 'jwt-decode'
import { TasksContext } from '../../Contexts/TasksContext'
import { LabelsContext } from '../../Contexts/LabelsContext'
import { apiCall } from '../../Util/api'
import { useState, useEffect, useContext } from 'react'
import { VStack, Button } from '@chakra-ui/react'

export default function ExtensionContainer() {
    // grab URL params
    const params = new URLSearchParams(window.location.search)
    const link = params.get('link')
    const message = params.get('message')
    const msUserId = params.get('msUserId')

    // state variables
    const [userId, setUserId] = useState(null)
    const [loading, setLoading] = useState(true)

    const initializeMsUser = async () => {
        const token = localStorage.getItem('msllamaListJwtToken')

        if (token) {
            const user = jwtDecode(token)
            setUserId(user._id)
        } else {
            const foundUser = await apiCall(`GET`, `/msteams/user/${'1234'}`)
            if (foundUser) {
                setUserId(foundUser._id)
                localStorage.setItem('msllamaListJwtToken', foundUser.token)
            }
        }

        setLoading(false)
    }

    useEffect(() => {
        initializeMsUser()
    }, [])

    return (
        <>
            {loading ? (
                <></>
            ) : (
                <>
                    {!userId ? (
                        <SignIn msUserId={msUserId} setUserId={setUserId} />
                    ) : (
                        <TaskCard
                            link={link}
                            userId={userId}
                            message={message}
                            setUserId={setUserId}
                        />
                    )}
                </>
            )}
        </>
    )
}

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { app, authentication } from '@microsoft/teams-js'

export default function TeamsSignIn({}) {
    const [authed, setAuthed] = useState(false)
    const navigate = useNavigate()
    const url = encodeURI(
        'https://7308-2600-6c52-7900-7b-51d1-aa47-e05c-fa2d.ngrok-free.app/sign-in?redirect_url=https://7308-2600-6c52-7900-7b-51d1-aa47-e05c-fa2d.ngrok-free.app/teams/sign-in?authenticated=true'
    )

    const signIn = async () => {
        try {
            const response = await authentication.authenticate({
                url: url,
                width: 600,
                height: 600,
            })
            localStorage.setItem('clerk-db-jwt', response.token)
            setAuthed(true)
        } catch (error) {
            console.log(error)
        }
    }

    const initializeApp = async () => {
        await app.initialize()
        const searchParams = new URLSearchParams(window.location.search)

        if (searchParams.get('authenticated') === 'true') {
            const token = localStorage.getItem('clerk-db-jwt')
            localStorage.removeItem('clerk-db-jwt')
            authentication.notifySuccess({ token })
        }
    }

    useEffect(() => {
        initializeApp()
    }, [])

    // useEffect(() => {
    //     if (authed) {
    //         console.log('i am authed')
    //         navigate('/teams')
    //     }
    // }, [authed])

    return (
        <>
            {authed ? (
                <>
                    <Navigate to="/teams/all/All Labels" />{' '}
                </>
            ) : (
                <button onClick={signIn}>sign in</button>
            )}
        </>
    )
}

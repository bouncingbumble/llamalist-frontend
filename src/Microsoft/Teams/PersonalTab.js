import React, { useEffect } from 'react'
import TasksContainer from '../../Tasks/TasksContainer'
import { useNavigate } from 'react-router-dom'
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import { app, authentication } from '@microsoft/teams-js'

export default function PersonalTab({}) {
    app.initialize()
    // const navigate = useNavigate()
    // const url = encodeURI(
    //     'https://7308-2600-6c52-7900-7b-51d1-aa47-e05c-fa2d.ngrok-free.app/sign-in?redirect_url=https://7308-2600-6c52-7900-7b-51d1-aa47-e05c-fa2d.ngrok-free.app/teams?authenticated=true'
    // )

    // const signIn = async () => {
    //     try {
    //         const response = await authentication.authenticate({
    //             url: url,
    //             width: 600,
    //             height: 600,
    //         })
    //         console.log(response)
    //         localStorage.setItem('clerk-db-jwt', response.token)
    //         // navigate('/teams')
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // useEffect(async () => {
    //     await app.initialize()
    //     const searchParams = new URLSearchParams(window.location.search)

    //     if (searchParams.get('authenticated') === 'true') {
    //         const token = localStorage.getItem('clerk-db-jwt')
    //         localStorage.removeItem('clerk-db-jwt')
    //         authentication.notifySuccess({ token })
    //     }
    // }, [])

    return <TasksContainer />
}

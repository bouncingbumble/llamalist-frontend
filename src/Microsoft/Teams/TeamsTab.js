import React, { useState, useEffect } from 'react'
import TasksContainer from '../../Tasks/TasksContainer'
import { SignedIn, SignedOut } from '@clerk/clerk-react'
import { app, authentication } from '@microsoft/teams-js'

export default function TeamsTab({}) {
    // init ms and check params
    const initializeApp = async () => {
        await app.initialize()

        // make sure we are routed correctly
        const paths = window.location.pathname.split('/')
        paths.shift()
        if (paths.length < 3) {
            window.location.href = `${window.location.protocol}//${window.location.host}/teamsTab/all/All%20Labels`
        }

        if (app.isInitialized()) {
            // check if it is a redirect from sign in pop up
            const searchParams = new URLSearchParams(window.location.search)
            if (searchParams.get('authenticated') === 'true') {
                const token = localStorage.getItem('clerk-db-jwt')
                localStorage.removeItem('clerk-db-jwt')
                authentication.notifySuccess({ token })
            }
        }
    }

    // sign in redirect
    const signIn = async () => {
        try {
            const response = await authentication.authenticate({
                width: 600,
                height: 600,
                url: `https://app.llamalist.com/sign-in?redirect_url=https://app.llamalist.com/teamsTab?authenticated=true`,
            })

            // store token and refresh page
            localStorage.setItem('clerk-db-jwt', response.token)
            window.location.href = window.location.href
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        initializeApp()
    }, [])

    return (
        <>
            <SignedIn>
                <TasksContainer />
            </SignedIn>
            <SignedOut>
                <button onClick={signIn}>please sign in</button>
            </SignedOut>
        </>
    )
}

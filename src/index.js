import './baseStyles.css'
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import Router from './Router'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// if (process.env.NODE_ENV !== 'development') {
//     console.log = () => {}
// }

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter id="#main-container">
        <QueryClientProvider client={queryClient}>
            <Router />
        </QueryClientProvider>
    </BrowserRouter>
)

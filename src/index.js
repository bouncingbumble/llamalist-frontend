import './baseStyles.css'
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import Router from './Router'
import { BrowserRouter } from 'react-router-dom'
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()
if (process.env.NODE_ENV !== 'development') {
    console.log = () => {}
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    // <StrictMode>
    <BrowserRouter id="#main-container">
        <QueryClientProvider client={queryClient}>
            <Router />
        </QueryClientProvider>
    </BrowserRouter>
    // </StrictMode>
)

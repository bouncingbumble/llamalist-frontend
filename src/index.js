import './baseStyles.css'
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import Router from './Router'
import { BrowserRouter } from 'react-router-dom'

if (process.env.NODE_ENV !== 'development') {
    console.log = () => {}
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <StrictMode>
        <BrowserRouter id="#main-container">
            <Router />
        </BrowserRouter>
    </StrictMode>
)

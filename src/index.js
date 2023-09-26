import './baseStyles.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './ChakraDesign/theme'
import Frenzyfields from './animations/fields/Frenzyfields'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <ChakraProvider theme={theme}>
        <Frenzyfields />
    </ChakraProvider>
)

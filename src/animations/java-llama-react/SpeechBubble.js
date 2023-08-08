import React from 'react'
import { Box } from '@chakra-ui/react'

export default function SpeechBubble({}) {
    // js bullshit
    return (
        <Box className="speech-bubble">
            <Box className="curly-q" bg="orange.200" />
            <Box className="blocky-q" bg="#F9FAFB" />
            <Box className="speech-box" bg="orange.200">
                Did you know that llamas can suck the largest cocks on record?
                Cum back tomorrow for more titilating facts you piece of shit.
            </Box>
        </Box>
    )
}

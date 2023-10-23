import './llama.css'
import React from 'react'
import { Box } from '@chakra-ui/react'
import { TypeAnimation } from 'react-type-animation'

export default function SpeechBubble({ funFact, setShowSpeechBubble }) {
    return (
        <Box
            zIndex={600}
            className="speech-bubble"
            onMouseOver={() => setShowSpeechBubble(true)}
            onMouseLeave={() => setShowSpeechBubble(false)}
        >
            <Box className="curly-q" />
            <Box className="speech-box">
                <TypeAnimation
                    wrapper="span"
                    cursor={false}
                    sequence={funFact.sequence}
                    speed={{ type: 'keyStrokeDelayInMs', value: funFact.speed }}
                    style={{
                        fontSize: 22,
                        fontFamily: 'Delicious Handrawn',
                    }}
                />
            </Box>
        </Box>
    )
}

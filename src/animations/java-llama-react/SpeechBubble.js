import './llama.css'
import React from 'react'
import { Box } from '@chakra-ui/react'
import { TypeAnimation } from 'react-type-animation'

export default function SpeechBubble({ funFact, setShowSpeechBubble }) {
    const sequence = []

    for (let index = 0; index < funFact.length; index++) {
        const character = funFact.charAt(index)

        if (index !== funFact.length - 1) {
            if (
                character === '?' ||
                character === '.' ||
                character === ',' ||
                character === '!'
            ) {
                sequence.push(funFact.substring(0, index + 1))
                sequence.push(500)
            }
        } else {
            sequence.push(funFact.substr(0, funFact.length))
            sequence.push(1000)
        }
    }

    return (
        <Box
            className="speech-bubble"
            onMouseOver={() => setShowSpeechBubble(true)}
            onMouseLeave={() => setShowSpeechBubble(false)}
        >
            <Box className="curly-q" bg="greenFaded.100" />
            <Box className="blocky-q" />
            <Box
                className="speech-box"
                bg="greenFaded.100"
                style={{
                    fontFamily: 'Delicious Handrawn',
                    fontSize: 20,
                }}
            >
                <TypeAnimation
                    sequence={sequence}
                    wrapper="span"
                    speed={60}
                    style={{ fontSize: 18, display: 'inline-block' }}
                    repeat={0}
                />
            </Box>
        </Box>
    )
}

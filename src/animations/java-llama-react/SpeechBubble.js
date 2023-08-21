import './llama.css'
import React, { useEffect } from 'react'
import { Howl } from 'howler'
import { Box } from '@chakra-ui/react'
import { TypeAnimation } from 'react-type-animation'
import scribble from '../../sounds/scribble.mp3'

export default function SpeechBubble({ funFact, setShowSpeechBubble }) {
    const sequence = []
    const scribbleSpeed = 40
    const scribblePause = 500

    for (let index = 0; index < funFact.length; index++) {
        const character = funFact.charAt(index)

        if (
            character === '?' ||
            character === '.' ||
            character === ',' ||
            character === '!' ||
            index === funFact.length - 1
        ) {
            const chunk = funFact.substring(0, index + 1)

            sequence.push(chunk)
            sequence.push(scribblePause)
        }
    }

    const scribbleDuration =
        (scribblePause * sequence.length) / 2 + funFact.length * scribbleSpeed

    const audio = new Howl({
        volume: 0.7,
        src: [scribble],
        sprite: { scribble: [0, scribbleDuration] },
    })

    audio.play('scribble')

    return (
        <Box
            className="speech-bubble"
            onMouseOver={() => setShowSpeechBubble(true)}
            onMouseLeave={() => setShowSpeechBubble(false)}
        >
            <Box className="curly-q" bg="greenFaded.100" />
            <Box className="blocky-q" />
            <Box className="speech-box" bg="greenFaded.100">
                <TypeAnimation
                    wrapper="span"
                    cursor={false}
                    sequence={sequence}
                    speed={{ type: 'keyStrokeDelayInMs', value: scribbleSpeed }}
                    style={{
                        fontSize: 22,
                        fontFamily: 'Delicious Handrawn',
                    }}
                />
            </Box>
        </Box>
    )
}

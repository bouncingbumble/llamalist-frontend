import React from 'react'
import Llama from '../../java-llama-react/Llama'
import { Flex } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import SpeechBubble from '../../java-llama-react/SpeechBubble'

export default function Zen({
    store,
    slide,
    index,
    funFact,
    scribbleSound,
    showSpeechBubble,
    setShowSpeechBubble,
}) {
    const id = uuidv4()
    const navigate = useNavigate()

    const goToLlamaLand = () => {
        if (!store) {
            if (scribbleSound.id) {
                scribbleSound.audio.stop(scribbleSound.id)
            }
            navigate('/llamaLand')
        }
    }

    return (
        <Flex
            p="32px"
            width="300px"
            height="100%"
            justify="end"
            overflow="hidden"
            direction="column"
            position="relative"
            bg="lightPurpleFaded.50"
        >
            <Flex
                ml="8px"
                cursor="pointer"
                onClick={goToLlamaLand}
                onMouseOver={() => !store && setShowSpeechBubble(true)}
                onMouseLeave={() => !store && setShowSpeechBubble(false)}
            >
                <Llama id={id} minHeight={136} progress={[0, 10]} />
            </Flex>
            {showSpeechBubble && slide === index && (
                <div
                    style={{
                        left: '0px',
                        bottom: '5px',
                        position: 'absolute',
                    }}
                >
                    <SpeechBubble
                        funFact={funFact}
                        setShowSpeechBubble={setShowSpeechBubble}
                    />
                </div>
            )}
        </Flex>
    )
}

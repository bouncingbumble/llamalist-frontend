import React from 'react'
import useLocalStorage from '../../Hooks/UseLocalStorage'
import { Button } from '@chakra-ui/react'
import { SoundOnIcon, SoundOffIcon } from '../../ChakraDesign/Icons'

export default function SettingsBar({ muteRef, musicRef, handleClose }) {
    const [mute, setMute] = useLocalStorage(
        'mute-game',
        musicRef.current.audio._muted
    )

    function toggleMute() {
        setMute(!mute)
        muteRef.current = !mute
        musicRef.current.audio.mute(!mute, musicRef.current.id)
    }

    return (
        <div
            style={{
                zIndex: 9999,
                width: '100%',
                display: 'flex',
                padding: '24px',
                position: 'fixed',
                justifyContent: 'space-between',
            }}
        >
            <div
                onClick={toggleMute}
                style={{
                    width: '33.33%',
                    display: 'flex',
                    cursor: 'pointer',
                }}
            >
                {mute ? (
                    <SoundOffIcon
                        width="40px"
                        height="40px"
                        color="purple.500"
                    />
                ) : (
                    <SoundOnIcon
                        width="40px"
                        height="40px"
                        color="purple.500"
                    />
                )}
            </div>
            <div
                id="score-board"
                style={{
                    fontSize: 40,
                    display: 'flex',
                    width: '33.33%',
                    color: '#FEEBC8',
                    justifyContent: 'center',
                    fontFamily: '"Press Start 2P"',
                }}
            />
            <div
                style={{
                    width: '33.33%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                }}
            >
                <Button colorScheme="purple" onClick={handleClose}>
                    Back to Work
                </Button>
            </div>
        </div>
    )
}

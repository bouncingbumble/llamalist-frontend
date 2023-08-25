import './llama-game.css'
import React, { useState, useEffect } from 'react'
import RunningLlama from './RunningLlama'
import { SoundOnIcon, SoundOffIcon } from '../../ChakraDesign/Icons'
import {
    Flex,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
} from '@chakra-ui/react'
import { apiCall } from '../../Util/api'
import { useVisitLlamaLand } from '../../Hooks/GamificationsHooks'

export default function LlamaLand({ music, isOpen, onClose }) {
    const runSpeed = 3
    const llamaHeight = window.innerHeight * 0.25

    const visit = useVisitLlamaLand()

    const [mute, setMute] = useState(music.audio._muted)

    function toggleMute() {
        setMute(!mute)
        music.audio.mute(!mute, music.id)
    }

    return (
        <Modal size="full" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent style={{ overflow: 'hidden' }}>
                <Flex
                    width="100%"
                    zIndex={9999}
                    position="fixed"
                    justify="space-between"
                >
                    <Flex m="20px" cursor="pointer" onClick={toggleMute}>
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
                    </Flex>
                    <Button
                        margin="24px"
                        colorScheme="purple"
                        onClick={onClose}
                    >
                        Back to Work
                    </Button>
                </Flex>
                <div class="llama-land">
                    <div class="clouds-game">
                        <div class="big-cloud">
                            <div class="big-ball" />
                            <div class="medium-ball" />
                            <div class="little-ball" />
                        </div>
                        <div class="little-cloud">
                            <div class="big-ball" />
                            <div class="medium-ball" style={{ right: 0 }} />
                            <div class="little-ball" style={{ left: 0 }} />
                        </div>
                        <div class="medium-cloud">
                            <div class="big-ball" />
                            <div class="medium-ball" />
                            <div class="little-ball" />
                        </div>
                    </div>
                    <RunningLlama llamaHeight={llamaHeight} />
                    <div class="grass" />
                    <Flex justify="space-between">
                        <div
                            class="tuft"
                            style={{
                                left: '5%',
                                animation: `move-grass-left ${runSpeed}s infinite linear`,
                            }}
                        >
                            <div class="blade" />
                            <div class="blade" />
                            <div class="blade" />
                        </div>
                        <div
                            class="tuft"
                            style={{
                                left: '50%',
                                animation: `move-grass-middle ${runSpeed}s infinite linear`,
                            }}
                        >
                            <div class="blade" />
                            <div class="blade" />
                            <div class="blade" />
                        </div>
                        <div
                            class="tuft"
                            style={{
                                left: '95%',
                                animation: `move-grass-right ${runSpeed}s infinite linear`,
                            }}
                        >
                            <div class="blade" />
                            <div class="blade" />
                            <div class="blade" />
                        </div>
                        <div
                            class="tuft"
                            style={{
                                left: '140%',
                                animation: `move-grass-offscreen ${runSpeed}s infinite linear`,
                            }}
                        >
                            <div class="blade" />
                            <div class="blade" />
                            <div class="blade" />
                        </div>
                    </Flex>
                </div>
            </ModalContent>
        </Modal>
    )
}

import './llama-game.css'
import jump from '../../sounds/jump.mp3'
import React, { useState, useEffect, useRef } from 'react'
import RunningLlama from './RunningLlama'

import { Howl } from 'howler'
import { SoundOnIcon, SoundOffIcon } from '../../ChakraDesign/Icons'
import {
    Flex,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
} from '@chakra-ui/react'

export default function LlamaLand({ music, isOpen, onClose }) {
    // config
    const runSpeed = 3
    const hayBailSize = window.innerHeight * 0.2
    const llamaHeight = window.innerHeight * 0.25
    const jumpSound = new Howl({
        src: [jump],
        volume: 0.2,
    })

    // audio
    const [mute, setMute] = useState(music.audio._muted)
    const muteRef = useRef(music.audio._muted)

    function toggleMute() {
        setMute(!mute)
        muteRef.current = !mute
        music.audio.mute(!mute, music.id)
    }

    useEffect(() => {
        const jumper = document.getElementById('jumper')
        const tail = document.querySelector('.tail-game')
        const frontLegDark = document.querySelector('.leg-front-dark')
        const frontLegLight = document.querySelector('.leg-front-light')
        const backLegDark = document.querySelector('.leg-back-dark')
        const backLegLight = document.querySelector('.leg-back-light')

        if (jumper) {
            document.addEventListener('keydown', (event) => {
                if (
                    event.key === 'ArrowUp' &&
                    !jumper.classList.contains('jump')
                ) {
                    if (!muteRef.current) {
                        jumpSound.play()
                    }

                    jumper.classList.add('jump')
                    tail.classList.add('tail-jump')
                    frontLegDark.classList.add('prance-front-dark')
                    frontLegLight.classList.add('prance-front-light')
                    backLegDark.classList.add('prance-back-dark')
                    backLegLight.classList.add('prance-back-light')

                    setTimeout(() => {
                        jumper.classList.remove('jump')
                        tail.classList.remove('tail-jump')
                        frontLegDark.classList.remove('prance-front-dark')
                        frontLegLight.classList.remove('prance-front-light')
                        backLegDark.classList.remove('prance-back-dark')
                        backLegLight.classList.remove('prance-back-light')
                    }, 1200)
                }
            })
        }
    })

    return (
        <Modal isLazy size="full" isOpen={isOpen} onClose={onClose}>
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
                    <Flex>
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
                            class="flower"
                            style={{
                                left: '27.5%',
                                animation: `move-flower-left ${runSpeed}s infinite linear`,
                            }}
                        >
                            <div class="flower-top">
                                <div class="pedal" />
                                <div
                                    class="pedal"
                                    style={{ left: -10, top: 9 }}
                                />
                                <div
                                    class="pedal"
                                    style={{ left: 10, top: 9 }}
                                />
                                <div
                                    class="pedal"
                                    style={{ left: -5, top: 20 }}
                                />
                                <div
                                    class="pedal"
                                    style={{ left: 5, top: 20 }}
                                />
                                <div class="flower-center" />
                            </div>
                            <div class="stem" />
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
                            class="flower"
                            style={{
                                left: '72.5%',
                                animation: `move-flower-right ${runSpeed}s infinite linear`,
                            }}
                        >
                            <div class="flower-top">
                                <div class="pedal" />
                                <div
                                    class="pedal"
                                    style={{ left: -10, top: 9 }}
                                />
                                <div
                                    class="pedal"
                                    style={{ left: 10, top: 9 }}
                                />
                                <div
                                    class="pedal"
                                    style={{ left: -5, top: 20 }}
                                />
                                <div
                                    class="pedal"
                                    style={{ left: 5, top: 20 }}
                                />
                                <div class="flower-center" />
                            </div>
                            <div class="stem" />
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
                            class="flower"
                            style={{
                                left: '117.5%',
                                animation: `move-flower-offscreen ${runSpeed}s infinite linear`,
                            }}
                        >
                            <div class="flower-top">
                                <div class="pedal" />
                                <div
                                    class="pedal"
                                    style={{ left: -10, top: 9 }}
                                />
                                <div
                                    class="pedal"
                                    style={{ left: 10, top: 9 }}
                                />
                                <div
                                    class="pedal"
                                    style={{ left: -5, top: 20 }}
                                />
                                <div
                                    class="pedal"
                                    style={{ left: 5, top: 20 }}
                                />
                                <div class="flower-center" />
                            </div>
                            <div class="stem" />
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
                    <div class="hay-container" style={{ height: hayBailSize }}>
                        <div class="hay-compartment"></div>
                        <div class="hay-compartment">
                            <div
                                class="hay-bail"
                                style={{
                                    height: hayBailSize,
                                    width: hayBailSize,
                                    borderRadius: hayBailSize / 2,
                                }}
                            >
                                <div class="big-swirl" />
                                <div class="medium-swirl" />
                                <div class="little-swirl" />
                                <div class="final-swirl" />
                            </div>
                        </div>
                    </div>
                </div>
            </ModalContent>
        </Modal>
    )
}

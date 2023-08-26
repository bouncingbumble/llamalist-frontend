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
    const hayBailSize = window.innerHeight * 0.2
    const llamaHeight = window.innerHeight * 0.25
    const jumpSound = new Howl({
        src: [jump],
        volume: 0.2,
    })

    // generate random hay bails
    let randomHay = new Array(25).fill(false)
    randomHay = randomHay.map(() => Boolean(Math.round(Math.random())))

    // audio
    const [mute, setMute] = useState(music.audio._muted)
    const muteRef = useRef(music.audio._muted)

    let level = 1

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
        const hayContainer = document.querySelector('.hay-container')
        const shrubberies = document.querySelector('.shrubberies')
        const hayBails = document.getElementsByClassName('hay-bail')

        if (jumper) {
            let timeoutId
            document.addEventListener('keydown', (event) => {
                const jumpLevel = level
                if (
                    event.key === 'ArrowUp' &&
                    !jumper.classList.contains(`jump-${jumpLevel}`)
                ) {
                    const delay = 1400 - jumpLevel * 200
                    if (!muteRef.current) {
                        jumpSound.play()
                    }

                    console.log('adding jump-' + jumpLevel)
                    jumper.classList.add(`jump-${jumpLevel}`)
                    tail.classList.add(`tail-jump-${jumpLevel}`)
                    frontLegDark.classList.add(`prance-front-dark-${jumpLevel}`)
                    frontLegLight.classList.add(
                        `prance-front-light-${jumpLevel}`
                    )
                    backLegDark.classList.add(`prance-back-dark-${jumpLevel}`)
                    backLegLight.classList.add(`prance-back-light-${jumpLevel}`)

                    timeoutId = setTimeout(() => {
                        console.log('removing jump-' + jumpLevel)
                        jumper.classList.remove(`jump-${jumpLevel}`)
                        tail.classList.remove(`tail-jump-${jumpLevel}`)
                        frontLegDark.classList.remove(
                            `prance-front-dark-${jumpLevel}`
                        )
                        frontLegLight.classList.remove(
                            `prance-front-light-${jumpLevel}`
                        )
                        backLegDark.classList.remove(
                            `prance-back-dark-${jumpLevel}`
                        )
                        backLegLight.classList.remove(
                            `prance-back-light-${jumpLevel}`
                        )
                    }, delay)
                }
            })

            hayContainer.classList.add('level-1')
            shrubberies.classList.add('shrubs-level-1')
            hayContainer.addEventListener('animationend', () => {
                const currentClass = hayContainer.classList[1]
                const currentLevel = Number(currentClass?.slice(-1))

                if (currentLevel && currentLevel < 5) {
                    ++level
                    hayContainer.classList.remove(currentClass)
                    shrubberies.classList.remove(`shrubs-${currentClass}`)
                    shrubberies.classList.add(
                        `shrubs-level-${currentLevel + 1}`
                    )
                    setTimeout(() => {
                        hayContainer.classList.add(`level-${currentLevel + 1}`)
                    }, 3000)
                }
            })

            const llamaPositionX = jumper.getBoundingClientRect()
            const hayPositionY = hayContainer.getBoundingClientRect()
            setInterval(() => {
                for (let i = 0; i < hayBails.length; i++) {
                    const hayPositionX = hayBails[i].getBoundingClientRect()
                    if (
                        hayPositionX.left < llamaPositionX.right &&
                        hayPositionX.right > llamaPositionX.left
                    ) {
                        const llamaPositionY = jumper.getBoundingClientRect()
                        const cleared =
                            llamaPositionY.bottom <= hayPositionY.top
                        if (!cleared) {
                            clearTimeout(timeoutId)
                            shrubberies.style.animationPlayState = 'paused'
                            hayContainer.style.animationPlayState = 'paused'
                            jumper.style.animationPlayState = 'paused'
                            tail.style.animationPlayState = 'paused'
                            frontLegDark.style.animationPlayState = 'paused'
                            frontLegLight.style.animationPlayState = 'paused'
                            backLegDark.style.animationPlayState = 'paused'
                            backLegLight.style.animationPlayState = 'paused'
                            hayBails[i].style.animationPlayState = 'paused'
                        }
                    }
                }
            }, 10)
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
                    <div class="shrubberies">
                        <div class="tuft" style={{ left: '5%' }}>
                            <div class="blade" />
                            <div class="blade" />
                            <div class="blade" />
                        </div>
                        <div class="flower" style={{ left: '27.5%' }}>
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
                        <div class="tuft" style={{ left: '50%' }}>
                            <div class="blade" />
                            <div class="blade" />
                            <div class="blade" />
                        </div>
                        <div class="flower" style={{ left: '72.5%' }}>
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
                        <div class="tuft" style={{ left: '95%' }}>
                            <div class="blade" />
                            <div class="blade" />
                            <div class="blade" />
                        </div>
                        <div class="flower" style={{ left: '117.5%' }}>
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
                        <div class="tuft" style={{ left: '140%' }}>
                            <div class="blade" />
                            <div class="blade" />
                            <div class="blade" />
                        </div>
                    </div>
                    <div class="hay-container" style={{ height: hayBailSize }}>
                        {randomHay.map((isFilled) => (
                            <div class="hay-compartment">
                                {isFilled && (
                                    <div
                                        class="hay-bail"
                                        style={{
                                            height: hayBailSize,
                                            width: hayBailSize,
                                            borderRadius: hayBailSize / 2,
                                            animation: `roll-hay 4s infinite linear`,
                                        }}
                                    >
                                        <div class="big-swirl" />
                                        <div class="medium-swirl" />
                                        <div class="little-swirl" />
                                        <div class="final-swirl" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </ModalContent>
        </Modal>
    )
}

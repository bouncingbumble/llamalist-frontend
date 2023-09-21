import './goldenLlama.css'
import React, { useState } from 'react'
import goldenSound from '../../sounds/golden-llama-found.mp3'
import { Howl } from 'howler'
import { useUserStats, useUpdateStats } from '../../Hooks/UserHooks'

export default function GoldenLlama({
    minHeight,
    hidden,
    disabled,
    goldenLlama,
    setGoldenLlama,
}) {
    // styling
    const size = minHeight || 100
    const width = `${size / 1.7}px`
    const height = `${size}px`
    const padding = `0px ${size * 0.01}px`
    const hairThickness = size * 0.0035

    //audio
    const llamaSound = new Howl({ src: [goldenSound] })

    // state
    const [opacity, setOpacity] = useState(hidden ? 0 : 1)
    const [isDisabled, setIsDisabled] = useState(disabled)

    // hooks
    const userStats = useUserStats()
    const updateStats = useUpdateStats()

    const CurlyHair = () => (
        <div
            class="hair-container"
            style={{
                padding,
                width: size * 0.1,
            }}
        >
            <div
                class="curl-gold"
                style={{ borderBottom: `${hairThickness}px solid #9e7402` }}
            />
            <div
                class="curl-gold"
                style={{
                    alignSelf: 'flex-end',
                    borderBottom: `${hairThickness}px solid #9e7402`,
                }}
            />
            <div
                class="curl-gold"
                style={{ borderBottom: `${hairThickness}px solid #9e7402` }}
            />
        </div>
    )

    const foundLlama = () => {
        if (!isDisabled && !goldenLlama.found) {
            setOpacity(1)
            setIsDisabled(true)

            const today = new Date()
            today.setSeconds(0)
            today.setMilliseconds(0)

            const newGoldenLlamas = [
                ...userStats.data.goldenLlamasFound,
                today.toISOString(),
            ]
            const filteredGoldenLlamas = newGoldenLlamas.filter(
                (llama, index) => newGoldenLlamas.indexOf(llama) === index
            )
            updateStats.mutate({
                ...userStats.data,
                goldenLlamasFound: filteredGoldenLlamas,
            })

            const time = hidden ? 1000 : 0
            setTimeout(() => {
                llamaSound.play()
                const animationContainer = document.getElementById(
                    'golden-llama-container'
                )
                setGoldenLlama({ ...goldenLlama, found: true })

                animationContainer.style.display = 'flex'
                setTimeout(() => {
                    animationContainer.style.opacity = 0
                }, 4000)
                setTimeout(() => {
                    animationContainer.style.display = 'none'
                }, 5000)
            }, time)
        }
    }

    return (
        <div onMouseOver={foundLlama} style={{ height, width, opacity }}>
            <div class="alpaca__container">
                <div class="alpaca-gold">
                    <div class="alpaca__top flex">
                        <div class="head flex" style={{ height: '100%' }}>
                            <div class="head__ears-gold flex">
                                <div />
                                <div />
                            </div>
                            <div class="head__face-neck-gold">
                                <div class="face flex">
                                    <div class="eyes flex" id="eyes">
                                        <div class="flex" />
                                        <div class="flex" />
                                    </div>
                                    <div class="sunnies flex">
                                        <div class="frame-left-gold" />
                                        <div class="lens-left-gold" />
                                        <div class="bridge-gold" />
                                        <div class="bridge-lens-gold" />
                                        <div class="frame-right-gold" />
                                        <div class="lens-right-gold" />
                                    </div>
                                    <div class="snout flex">
                                        <div class="nose-gold" />
                                        <div class="mouth-gold" />
                                    </div>
                                </div>
                                <div class="neck__hair">
                                    <div
                                        style={{
                                            height: '33%',
                                            marginTop: '5%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {[...Array(2)].map(() => (
                                            <CurlyHair />
                                        ))}
                                    </div>
                                    <div
                                        style={{
                                            height: '33%',
                                            display: 'flex',
                                            marginTop: '6%',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {[...Array(2)].map(() => (
                                            <CurlyHair />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="alpaca__btm">
                        <div
                            class="tail-gold"
                            style={{
                                width: `calc(${height} * 0.5 * 0.8 * 0.1)`,
                                height: `calc(${height} * 0.5 * 0.8 * 0.25)`,
                            }}
                        ></div>
                        <div class="legs flex">
                            <div class="legs__front-gold">
                                <div />
                                <div />
                            </div>
                            <div class="legs__back-gold">
                                <div />
                                <div />
                            </div>
                        </div>

                        <div class="body-gold flex" />
                        <div class="body_hair">
                            <div
                                style={{
                                    height: '15%',
                                    marginTop: '2%',
                                    display: 'flex',
                                    padding: '0 6% 0 4%',
                                    justifyContent: 'center',
                                }}
                            >
                                {[...Array(5)].map(() => (
                                    <CurlyHair />
                                ))}
                            </div>
                            <div
                                style={{
                                    height: '15%',
                                    display: 'flex',
                                    marginTop: '3%',
                                    padding: '0 12%',
                                    justifyContent: 'center',
                                }}
                            >
                                {[...Array(4)].map(() => (
                                    <CurlyHair />
                                ))}
                            </div>
                            <div
                                style={{
                                    height: '15%',
                                    marginTop: '3%',
                                    display: 'flex',
                                    padding: '0 6% 0 4%',
                                    justifyContent: 'center',
                                }}
                            >
                                {[...Array(5)].map(() => (
                                    <CurlyHair />
                                ))}
                            </div>
                            <div
                                style={{
                                    height: '15%',
                                    display: 'flex',
                                    marginTop: '3%',
                                    marginLeft: '20%',
                                    justifyContent: 'center',
                                }}
                            >
                                {[...Array(4)].map(() => (
                                    <CurlyHair />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

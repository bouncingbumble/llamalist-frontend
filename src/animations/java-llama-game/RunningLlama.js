import './llama-game.css'
import React, { useState, useEffect } from 'react'

export default function Llama({ sunnies, llamaHeight, llamaPosition }) {
    // styling
    const size = llamaHeight || 400
    const width = `${size / 1.7}px`
    const height = `${size}px`
    const padding = `0px ${size * 0.01}px`
    const hairThickness = size * 0.0035

    // state for jumps
    const [jumpHeight, setJumpHeight] = useState('10%')

    const CurlyHair = () => (
        <div
            class="hair-container"
            style={{
                padding,
                width: size * 0.1,
            }}
        >
            <div
                class="curl"
                style={{ borderBottom: `${hairThickness}px solid #522ed6` }}
            />
            <div
                class="curl"
                style={{
                    alignSelf: 'flex-end',
                    borderBottom: `${hairThickness}px solid #522ed6`,
                }}
            />
            <div
                class="curl"
                style={{ borderBottom: `${hairThickness}px solid #522ed6` }}
            />
        </div>
    )

    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp') {
            setJumpHeight('25%')
            setTimeout(() => {
                setJumpHeight('10%')
            }, 500)
        }
    })

    return (
        <div
            id="llama-jump"
            style={{
                width,
                height,
                left: '10%',
                bottom: jumpHeight,
                position: 'absolute',
                transition: '500ms ease all',
            }}
        >
            <div class="alpaca__container">
                <div class="alpaca-game">
                    <div class="alpaca__top flex">
                        <div class="head flex" style={{ height: '100%' }}>
                            <div class="head__ears flex">
                                <div />
                                <div />
                            </div>
                            <div class="head__face-neck">
                                <div class="face flex">
                                    <div class="eyes flex" id="eyes">
                                        <div class="flex" />
                                        <div class="flex" />
                                    </div>
                                    {sunnies && (
                                        <div class="sunnies flex">
                                            <div class="frame-left" />
                                            <div class="lens-left" />
                                            <div class="bridge" />
                                            <div class="bridge-lens" />
                                            <div class="frame-right" />
                                            <div class="lens-right" />
                                        </div>
                                    )}
                                    <div class="snout flex">
                                        <div class="nose" />
                                        <div class="mouth" />
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
                            class="tail"
                            style={{
                                width: `calc(${height} * 0.5 * 0.8 * 0.1)`,
                                height: `calc(${height} * 0.5 * 0.8 * 0.25)`,
                            }}
                        ></div>
                        <div class="legs flex">
                            <div class="legs__front">
                                <div class="leg-front-dark" />
                                <div class="leg-front-light" />
                            </div>
                            <div class="legs__back">
                                <div class="leg-back-dark" />
                                <div class="leg-back-light" />
                            </div>
                        </div>

                        <div class="body flex" />
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
                                {[...Array(4)].map(() => (
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
                                {[...Array(4)].map(() => (
                                    <CurlyHair />
                                ))}
                            </div>
                            <div
                                style={{
                                    height: '15%',
                                    display: 'flex',
                                    marginTop: '3%',
                                    marginLeft: '0%',
                                    justifyContent: 'center',
                                }}
                            >
                                {[...Array(3)].map(() => (
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

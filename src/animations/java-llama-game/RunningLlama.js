import './llama-game.css'
import React from 'react'

export default function Llama({ sunnies, llamaHeight }) {
    // styling
    const size = llamaHeight || 400
    const width = `${size / 1.7}px`
    const height = `${size}px`
    const padding = `0px ${size * 0.01}px`
    const hairThickness = size * 0.0035

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
                key={0}
            />
            <div
                class="curl"
                style={{
                    alignSelf: 'flex-end',
                    borderBottom: `${hairThickness}px solid #522ed6`,
                }}
                key={1}
            />
            <div
                class="curl"
                style={{ borderBottom: `${hairThickness}px solid #522ed6` }}
                key={2}
            />
        </div>
    )

    return (
        <div
            style={{
                width,
                height,
                left: '10%',
                bottom: '10%',
                position: 'absolute',
            }}
        >
            <div class="alpaca__container-game" id="jumper">
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
                            class="tail-game"
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

                        <div class="leg-fill" />
                        <div class="body flex" />
                        <div class="body_hair">
                            <div
                                style={{
                                    height: '15%',
                                    marginTop: '2%',
                                    display: 'flex',
                                    padding: '0 6% 0 4%',
                                    justifyContent: 'flex-start',
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
                                    justifyContent: 'flex-start',
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
                                    padding: '0 6% 0 12%',
                                    justifyContent: 'flex-start',
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

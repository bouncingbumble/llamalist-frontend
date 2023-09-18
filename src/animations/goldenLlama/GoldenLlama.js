import './goldenLlama.css'
import React, { useState } from 'react'

export default function GoldenLlama({ minHeight, hidden }) {
    // styling
    const size = minHeight || 100
    const width = `${size / 1.7}px`
    const height = `${size}px`
    const padding = `0px ${size * 0.01}px`
    const hairThickness = size * 0.0035

    // state
    const [opacity, setOpacity] = useState(hidden ? 0 : 1)

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

    return (
        <div
            style={{ height, width, opacity }}
            onMouseOver={() => {
                setOpacity(1)
                console.log('found golden llama')
            }}
        >
            <div class="alpaca__container">
                <div class="alpaca">
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
                                    <div class="crumb-container">
                                        <div
                                            class="crumb"
                                            style={{ top: 0, left: 0 }}
                                        />
                                        <div
                                            class="crumb"
                                            style={{ top: 0, right: 0 }}
                                        />
                                        <div
                                            class="crumb"
                                            style={{ bottom: 0, left: 0 }}
                                        />
                                        <div
                                            class="crumb"
                                            style={{ bottom: 0, right: 0 }}
                                        />
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

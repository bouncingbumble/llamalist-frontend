import React from 'react'
import './llama.css'

export default function Llama({ h }) {
    // style variables
    const size = h || 400
    const height = `${size}px`
    const width = `${size / 1.7}px`
    const padding = `0px ${size * 0.01}px`
    const hairThickness = size * 0.0035

    const CurlyHair = () => (
        <div
            class="hair-container"
            style={{
                width: size * 0.1,
                padding,
            }}
        >
            <div
                class="curl"
                style={{ borderBottom: `${hairThickness}px solid #7f2ea5` }}
            ></div>
            <div
                class="curl"
                style={{
                    alignSelf: 'flex-end',
                    borderBottom: `${hairThickness}px solid #7f2ea5`,
                }}
            ></div>
            <div
                class="curl"
                style={{ borderBottom: `${hairThickness}px solid #7f2ea5` }}
            ></div>
        </div>
    )

    return (
        <div style={{ height, width }}>
            <div class="alpaca__container">
                <div class="alpaca">
                    <div class="alpaca__top flex">
                        <div class="head flex" style={{ height: '100%' }}>
                            <div class="head__ears flex">
                                <div></div>
                                <div></div>
                            </div>
                            <div class="head__face-neck">
                                <div class="face flex">
                                    <div class="eyes flex" id="eyes">
                                        <div class="flex"></div>
                                        <div class="flex"></div>
                                    </div>
                                    <div class="sunnies" id="sunglasses">
                                        <div class="duct-tape-left"></div>
                                        <div class="duct-tape-right"></div>
                                        <div class="stem-left"></div>
                                        <div class="lens-left"></div>
                                        <div class="bridge"></div>
                                        <div class="lens-right"></div>
                                        <div class="stem-right"></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                    <div class="snout flex">
                                        <div class="nose"></div>
                                        <div class="mouth"></div>
                                    </div>
                                </div>
                                <div class="neck__hair">
                                    <div
                                        style={{
                                            marginTop: '5%',
                                            display: 'flex',
                                            height: '33%',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {[...Array(2)].map(() => (
                                            <CurlyHair />
                                        ))}
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            height: '33%',
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
                    <div class="neck"></div>
                    <div class="alpaca__btm">
                        <div
                            class="tail"
                            style={{
                                height: `calc(${height} * 0.5 * 0.8 * 0.25)`,
                                width: `calc(${height} * 0.5 * 0.8 * 0.1)`,
                            }}
                        ></div>
                        <div class="legs flex">
                            <div class="legs__front">
                                <div></div>
                                <div></div>
                            </div>
                            <div class="legs__back">
                                <div></div>
                                <div></div>
                            </div>
                        </div>

                        <div class="body flex"></div>
                        <div class="body_hair">
                            <div
                                style={{
                                    display: 'flex',
                                    height: '15%',
                                    justifyContent: 'center',
                                    padding: '0 6% 0 4%',
                                    marginTop: '2%',
                                }}
                            >
                                {[...Array(5)].map(() => (
                                    <CurlyHair />
                                ))}
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    height: '15%',
                                    justifyContent: 'center',
                                    padding: '0 12%',
                                    marginTop: '3%',
                                }}
                            >
                                {[...Array(4)].map(() => (
                                    <CurlyHair />
                                ))}
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    height: '15%',
                                    justifyContent: 'center',
                                    padding: '0 6% 0 4%',
                                    marginTop: '3%',
                                }}
                            >
                                {[...Array(5)].map(() => (
                                    <CurlyHair />
                                ))}
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    height: '15%',
                                    justifyContent: 'center',
                                    marginTop: '3%',
                                    marginLeft: '20%',
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

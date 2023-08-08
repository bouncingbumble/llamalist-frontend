import './llama.css'
import React, { useState, useEffect } from 'react'

export default function Llama({
    sunnies,
    progress,
    minHeight,
    maxHeight,
    showFunFact,
    setProgress,
}) {
    // styling
    const size = minHeight || 400
    const width = `${size / 1.7}px`
    const height = `${size}px`
    const padding = `0px ${size * 0.01}px`
    const hairThickness = size * 0.0035
    const growHeight = maxHeight || size

    // constants
    const rowHairHeight = size / 24
    const rowHairMargin = size * 0.012

    // state
    const [neckHeight, setNeckHeight] = useState(
        (progress[0] / [progress[1]]) * (growHeight - size)
    )
    const [rowsOfHair, setRowsOfHair] = useState(
        Math.round(neckHeight / (rowHairHeight + rowHairMargin))
    )

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

    useEffect(() => {
        const newNeckHeight =
            (progress[0] / [progress[1]]) * (growHeight - size)

        setNeckHeight(newNeckHeight)
        setRowsOfHair(
            Math.round(newNeckHeight / (rowHairHeight + rowHairMargin))
        )
    }, [progress])

    return (
        <div
            style={{ height, width }}
            onClick={() => setProgress([progress[0] + 1, progress[1]])}
        >
            <div class="alpaca__container">
                <div
                    class="alpaca"
                    style={{
                        marginBottom: neckHeight,
                        transition: '300ms ease all',
                    }}
                >
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
                    <div
                        class="neck"
                        style={{
                            height: neckHeight,
                            transition: '300ms ease all',
                        }}
                    >
                        <div
                            style={{
                                height: '100%',
                            }}
                        >
                            {[...Array(rowsOfHair)].map(() => (
                                <div
                                    style={{
                                        display: 'flex',
                                        marginBottom: '6%',
                                        height: rowHairHeight,
                                        justifyContent: 'center',
                                    }}
                                >
                                    {[...Array(2)].map(() => (
                                        <CurlyHair />
                                    ))}
                                </div>
                            ))}
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
                                <div />
                                <div />
                            </div>
                            <div class="legs__back">
                                <div />
                                <div />
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

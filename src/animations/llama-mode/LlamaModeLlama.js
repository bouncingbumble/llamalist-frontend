import React, { useState, useEffect } from 'react'
import { getAccessories } from '../../GamificationTab/LlamaStore/Accessories/AccessoriesList'
import BowTie from '../../GamificationTab/LlamaStore/Accessories/BowTie'
import Sunglasses from '../../GamificationTab/LlamaStore/Accessories/Sunglasses'
import { useUserStats } from '../../Hooks/UserHooks'
import './llamaModeLlama.css'

export default function RunningLlama({ llamaHeight, progress, noAccessories }) {
    // styling
    const size = llamaHeight
    const width = `${size / 1.7}px`
    const height = `${size}px`
    const padding = `0px ${size * 0.01}px`
    const hairThickness = size * 0.0035
    const growHeight = size + 30
    const rowHairHeight = size / 24
    const rowHairMargin = size * 0.012
    const userStats = useUserStats()

    // state
    const [neckHeight, setNeckHeight] = useState(
        (progress[0] / [progress[1]]) * (growHeight - size)
    )
    const [rowsOfHair, setRowsOfHair] = useState(
        Math.round(neckHeight / (rowHairHeight + rowHairMargin))
    )
    const accessories = noAccessories
        ? []
        : getAccessories(userStats.data.llamaAccessories)

    const sunnies = noAccessories ? false : accessories[0].wearing
    const bowtie = noAccessories ? false : accessories[1].wearing

    useEffect(() => {
        const newNeckHeight =
            (progress[0] / [progress[1]]) * (growHeight - size)

        setNeckHeight(newNeckHeight)
        setRowsOfHair(
            Math.round(newNeckHeight / (rowHairHeight + rowHairMargin))
        )
    }, [progress])

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
                position: 'absolute',
                bottom: neckHeight,
                transition: '300ms ease all',
            }}
        >
            <div class="alpaca__container-game" id="jumper">
                <div class="alpaca-game bounce-llama">
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
                                        <div
                                            style={{
                                                bottom: '44%',
                                                position: 'absolute',
                                            }}
                                        >
                                            <Sunglasses size={size / 4.1} />
                                        </div>
                                    )}
                                    <div class="snout flex">
                                        <div class="nose" />
                                        <div id={`mouth`} class="mouth" />
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
                        id="neck"
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
                    {bowtie && (
                        <div
                            style={{
                                top: '42%',
                                zIndex: 1000,
                                position: 'absolute',
                            }}
                        >
                            <BowTie size={size / 4.3} />
                        </div>
                    )}
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

import './llama.css'
import React, { useState, useEffect } from 'react'
import BowTie from '../../GamificationTab/LlamaStore/Accessories/BowTie'
import Sunglasses from '../../GamificationTab/LlamaStore/Accessories/Sunglasses'

export default function Llama({
    id,
    space,
    minHeight,
    maxHeight,
    progress,
    openHelmet,
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

    const sunnies = false
    const bowtie = false

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

    useEffect(() => {
        const newNeckHeight =
            (progress[0] / [progress[1]]) * (growHeight - size)

        setNeckHeight(newNeckHeight)
        setRowsOfHair(
            Math.round(newNeckHeight / (rowHairHeight + rowHairMargin))
        )
    }, [progress])

    return (
        <div style={{ height, width }}>
            <div class="alpaca__container">
                <div
                    id={`llama-${id}`}
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
                                        <div id={`mouth-${id}`} class="mouth" />
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
                    <div
                        id={`neck-${id}`}
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
                                top: space ? '39%' : '42%',
                                zIndex: 1000,
                                position: 'absolute',
                            }}
                        >
                            <BowTie size={size / 4.3} />
                        </div>
                    )}
                    {space && (
                        <div
                            style={{
                                height: '55%',
                                width: '92%',
                                borderRadius: '50%',
                                position: 'absolute',
                                top: '-5%',
                                left: '-25%',
                                zIndex: 1000,
                                border: '2px solid #6486CF',
                                transition: '0.3s ease background',
                                background:
                                    'radial-gradient(#e664654d, #9198e5)',
                                backgroundRepeat: 'no-repeat',
                                backgroundPositionY: openHelmet
                                    ? '65px'
                                    : '0px',
                            }}
                        />
                    )}
                    {space && (
                        <div
                            style={{
                                position: 'absolute',
                                top: '44%',
                                left: '-8%',
                                zIndex: 1000,
                                width: '58%',
                                height: '8%',
                                borderRadius: '20px',
                                backgroundColor: '#636DA1',
                            }}
                        />
                    )}
                    <div class="alpaca__btm">
                        <div
                            class="tail"
                            style={{
                                width: `calc(${height} * 0.5 * 0.8 * 0.1)`,
                                height: `calc(${height} * 0.5 * 0.8 * 0.25)`,
                                backgroundColor: space && 'white',
                            }}
                        ></div>
                        <div class="legs flex">
                            <div class="legs__front">
                                <div
                                    style={{
                                        backgroundColor: space && '#CCCFE0',
                                    }}
                                />

                                <div
                                    style={{
                                        backgroundColor: space && 'white',
                                    }}
                                />
                            </div>
                            <div class="legs__back">
                                <div
                                    style={{
                                        backgroundColor: space && '#CCCFE0',
                                    }}
                                />
                                <div
                                    style={{
                                        backgroundColor: space && 'white',
                                    }}
                                />
                            </div>
                        </div>
                        {space && (
                            <div
                                style={{
                                    display: 'flex',
                                    marginTop: '-8%',
                                    width: '100%',
                                    height: '18%',
                                }}
                            >
                                <div
                                    class="space-boot"
                                    style={{ left: '7%', top: '-2%' }}
                                />
                                <div
                                    class="space-boot"
                                    style={{ left: '84%', top: '-2%' }}
                                />
                                <div
                                    class="space-boot"
                                    style={{ left: '58%', top: '-2%' }}
                                />
                                <div
                                    class="space-boot"
                                    style={{ left: '1%', top: '-2%' }}
                                />
                            </div>
                        )}

                        <div
                            class="body flex"
                            style={{ backgroundColor: space && 'white' }}
                        />
                        {!space && (
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
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

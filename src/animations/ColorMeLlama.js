import React from 'react'
import { Box } from '@chakra-ui/react'
import './colorMeLlama.css'
import BowTie from '../GamificationTab/LlamaStore/Accessories/BowTie'

export default function GoldenLlama({ minHeight, sunnies, colors, bowtie }) {
    // styling
    const size = minHeight || 100
    const width = `${size / 1.7}px`
    const height = `${size}px`
    const padding = `0px ${size * 0.01}px`
    const hairThickness = size * 0.0035

    const CurlyHair = () => (
        <Box
            className="hair-container"
            style={{
                padding,
                width: size * 0.1,
            }}
        >
            <Box
                className="curl-colored"
                style={{
                    borderBottom: `${hairThickness}px solid ${colors.dark}`,
                }}
                key={0}
            />
            <Box
                className="curl-colored"
                style={{
                    alignSelf: 'flex-end',
                    borderBottom: `${hairThickness}px solid ${colors.dark}`,
                }}
                key={1}
            />
            <Box
                className="curl-colored"
                style={{
                    borderBottom: `${hairThickness}px solid ${colors.dark}`,
                }}
                key={2}
            />
        </Box>
    )

    return (
        <Box style={{ height, width, opacity: 1 }}>
            <Box className="alpaca__container">
                <Box className="alpaca-colored">
                    <Box className="alpaca__top flex">
                        <Box className="head flex" style={{ height: '100%' }}>
                            <Box className="head__ears-colored flex">
                                <Box
                                    backgroundColor={colors.light}
                                    _after={{ backgroundColor: colors.dark }}
                                />
                                <Box
                                    backgroundColor={colors.light}
                                    _after={{ backgroundColor: colors.dark }}
                                />
                            </Box>
                            <Box
                                className="head__face-neck-colored"
                                backgroundColor={colors.light}
                                _before={{
                                    backgroundColor: colors.medium,
                                }}
                            >
                                <Box className="face flex">
                                    <Box className="eyes flex" id="eyes">
                                        <Box className="flex" />
                                        <Box className="flex" />
                                    </Box>
                                    {sunnies && (
                                        <Box className="sunnies flex">
                                            <Box
                                                className="frame-left-colored"
                                                backgroundColor={colors.dark}
                                            />
                                            <Box
                                                className="lens-left-colored"
                                                background={`linear-gradient(to bottom right, ${colors.light}, ${colors.medium}, ${colors.dark})`}
                                            />
                                            <Box className="bridge-colored" />
                                            <Box className="bridge-lens-colored" />
                                            <Box
                                                className="frame-right-colored"
                                                backgroundColor={colors.dark}
                                            />
                                            <Box
                                                className="lens-right-colored"
                                                background={`linear-gradient(to bottom right, ${colors.light}, ${colors.medium}, ${colors.dark})`}
                                            />
                                        </Box>
                                    )}
                                    <Box
                                        className="snout flex"
                                        _before={{
                                            backgroundColor: colors.medium,
                                        }}
                                    >
                                        <Box
                                            className="nose-colored"
                                            backgroundColor={colors.dark}
                                        />
                                        <Box
                                            className="mouth-colored"
                                            backgroundColor={colors.dark}
                                        />
                                    </Box>
                                </Box>
                                <Box className="neck__hair">
                                    <Box
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
                                    </Box>
                                    <Box
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
                                    </Box>
                                </Box>
                                {bowtie && (
                                    <div
                                        style={{
                                            top: '82%',
                                            zIndex: 1000,
                                            position: 'absolute',
                                        }}
                                    >
                                        <BowTie size={size / 4.3} />
                                    </div>
                                )}
                            </Box>
                        </Box>
                    </Box>
                    <Box className="alpaca__btm">
                        <Box
                            className="tail-colored"
                            style={{
                                width: `calc(${height} * 0.5 * 0.8 * 0.1)`,
                                height: `calc(${height} * 0.5 * 0.8 * 0.25)`,
                            }}
                            backgroundColor={colors.light}
                        ></Box>
                        <Box className="legs flex">
                            <Box className="legs__front-colored">
                                <Box
                                    backgroundColor={colors.medium}
                                    _after={{ backgroundColor: colors.medium }}
                                />
                                <Box
                                    backgroundColor={colors.light}
                                    _after={{ backgroundColor: colors.light }}
                                />
                            </Box>
                            <Box className="legs__back-colored">
                                <Box
                                    backgroundColor={colors.medium}
                                    _after={{ backgroundColor: colors.medium }}
                                />
                                <Box
                                    backgroundColor={colors.light}
                                    _after={{ backgroundColor: colors.light }}
                                />
                            </Box>
                        </Box>

                        <Box
                            className="body-colored flex"
                            backgroundColor={colors.light}
                        />
                        <Box className="body_hair">
                            <Box
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
                            </Box>
                            <Box
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
                            </Box>
                            <Box
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
                            </Box>
                            <Box
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
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

import './llama-game.css'
import jumpSound from '../../sounds/jump.mp3'
import levelUpEffect from '../../sounds/level-up-1.mp3'
import gameover from '../../sounds/gameover.wav'
import gameMusic from '../../sounds/llama-land-music.mp3'
import React, { useState, useEffect, useRef } from 'react'
import RunningLlama from './RunningLlama'
import SettingsBar from './SettingsBar'
import { Howl } from 'howler'
import { useNavigate } from 'react-router-dom'
import { useUserStats, useUpdateStats } from '../../Hooks/UserHooks'
import { apiCall } from '../../Util/api'

window.openIntervals = []

export default function LlamaLand() {
    // config
    const hayBailSize = window.innerHeight * 0.2
    const llamaHeight = window.innerHeight * 0.25

    // init game vars
    let tail
    let score
    let level
    let jumper
    let hayBails
    let scoreBoard
    let backLegDark
    let shrubberies
    let frontLegDark
    let backLegLight
    let hayContainer
    let frontLegLight
    let messageOverlay

    // audio
    const mute = localStorage.getItem('mute-game') === 'true' ? true : false

    const jumpSound1 = new Howl({
        src: [jumpSound],
        volume: 0.1,
    })
    const jumpSound2 = new Howl({
        src: [jumpSound],
        volume: 0.2,
        rate: 1.1,
    })
    const jumpSound3 = new Howl({
        src: [jumpSound],
        volume: 0.2,
        rate: 1.2,
    })
    const jumpSound4 = new Howl({
        src: [jumpSound],
        volume: 0.2,
        rate: 1.3,
    })
    const jumpSound5 = new Howl({
        src: [jumpSound],
        volume: 0.2,
        rate: 1.5,
    })
    const gameOverSound = new Howl({
        src: [gameover],
    })
    const levelUpSound = new Howl({
        src: [levelUpEffect],
        rate: 1.2,
    })
    const llamaLandMusic = new Howl({
        src: [gameMusic],
        loop: true,
        mute: mute,
        volume: 0.7,
    })
    const music = { audio: llamaLandMusic, id: null }
    const jumpSounds = [
        jumpSound1,
        jumpSound2,
        jumpSound3,
        jumpSound4,
        jumpSound5,
    ]

    // game state/hooks/ref
    const muteRef = useRef(mute)
    const navigate = useNavigate()
    const userStats = useUserStats()
    const updateStats = useUpdateStats()
    const [gameOver, setGameOver] = useState(false)
    const [finalScore, setFinalScore] = useState(0)

    // generate random hay bails
    let randomHay = new Array(25).fill(false)
    randomHay = randomHay.map(() => Boolean(Math.round(Math.random())))

    // game functions
    function jump(event) {
        const jumpLevel = level

        if (event.key === 'ArrowUp' && !jumper.classList[1]?.includes('jump')) {
            const delay = 1400 - jumpLevel * 200
            if (!muteRef.current) {
                jumpSounds[jumpLevel - 1].play()
            }

            jumper.classList.add(`jump-${jumpLevel}`)
            tail.classList.add(`tail-jump-${jumpLevel}`)
            frontLegDark.classList.add(`prance-front-dark-${jumpLevel}`)
            frontLegLight.classList.add(`prance-front-light-${jumpLevel}`)
            backLegDark.classList.add(`prance-back-dark-${jumpLevel}`)
            backLegLight.classList.add(`prance-back-light-${jumpLevel}`)

            setTimeout(() => {
                jumper.classList.remove(`jump-${jumpLevel}`)
                tail.classList.remove(`tail-jump-${jumpLevel}`)
                frontLegDark.classList.remove(`prance-front-dark-${jumpLevel}`)
                frontLegLight.classList.remove(
                    `prance-front-light-${jumpLevel}`
                )
                backLegDark.classList.remove(`prance-back-dark-${jumpLevel}`)
                backLegLight.classList.remove(`prance-back-light-${jumpLevel}`)
            }, delay)
        }
    }

    function levelUp() {
        const currentClass = hayContainer.classList[1]
        const currentLevel = Number(currentClass?.slice(-1))

        if (currentLevel && currentLevel < 5) {
            ++level
            let message
            hayContainer.classList.remove(currentClass)
            shrubberies.classList.remove(`shrubs-${currentClass}`)
            shrubberies.classList.add(`shrubs-level-${currentLevel + 1}`)
            for (let i = 0; i < hayBails.length; i++) {
                hayBails[i].classList.remove(`hay-${currentClass}`)
                hayBails[i].classList.add(`hay-level-${currentLevel + 1}`)
            }
            if (level === 2) {
                levelUpSound.play()
                music.audio.pause(music.id)
                music.audio.rate(1.1, music.id)
                message = "Woo! Let's go a little faster"
            } else if (level === 3) {
                levelUpSound.play()
                music.audio.pause(music.id)
                music.audio.rate(1.3, music.id)
                message = 'Things are getting serious...'
            } else if (level === 4) {
                levelUpSound.play()
                music.audio.pause(music.id)
                music.audio.rate(1.5, music.id)
                message = 'Oh boi! This is crazy fast'
            } else if (level === 5) {
                levelUpSound.play()
                music.audio.pause(music.id)
                music.audio.rate(1.8, music.id)
                message = 'HYPERSPEED LLAMA'
            }
            messageOverlay.innerHTML = message

            setTimeout(() => {
                music.id = music.audio.play()
            }, 2000)
            setTimeout(() => {
                messageOverlay.innerHTML = ''
                hayContainer.classList.add(`level-${currentLevel + 1}`)
            }, 3000)
        }
    }

    function initGame() {
        jumper = document.getElementById('jumper')
        tail = document.querySelector('.tail-game')
        scoreBoard = document.getElementById('score-board')
        frontLegDark = document.querySelector('.leg-front-dark')
        frontLegLight = document.querySelector('.leg-front-light')
        backLegDark = document.querySelector('.leg-back-dark')
        backLegLight = document.querySelector('.leg-back-light')
        hayContainer = document.querySelector('.hay-container')
        shrubberies = document.querySelector('.shrubberies')
        messageOverlay = document.getElementById('message-overlay')
        hayBails = document.getElementsByClassName('hay-bail')

        if (jumper) {
            // reset the game
            score = 0
            level = 1

            // start the music
            if (!music.audio.playing(music.id)) {
                music.id = music.audio.play()
            }
            music.audio.rate(1.0, music.id)

            // set initial animation speeds and text
            hayContainer.classList.add('level-1')
            shrubberies.classList.add('shrubs-level-1')
            messageOverlay.innerHTML = "Let's go for a stroll:)"
            setTimeout(() => {
                messageOverlay.innerHTML =
                    'Watch out for giant rogue cinnamon rolls!'
            }, 2000)
            setTimeout(() => {
                messageOverlay.innerHTML = ''
            }, 5000)

            // event listeners
            document.addEventListener('keydown', jump)
            hayContainer.addEventListener('animationend', levelUp)

            // set up collision detection variables
            const llamaPositionX = jumper.getBoundingClientRect()
            const hayPositionY = hayContainer.getBoundingClientRect()
            const llamaLeft = llamaPositionX.left - window.innerWidth * 0.015
            const llamaRight = llamaPositionX.right - window.innerWidth * 0.012
            const interval = (llamaRight - llamaLeft) / 3

            // listen for collision
            let index = 0
            let entered = false
            const intervalId = setInterval(() => {
                const hayPositionX = hayBails[index].getBoundingClientRect()
                const hayLeft = hayPositionX.left + window.innerWidth * 0.012
                const hayRight = hayPositionX.right - 34
                if (hayLeft < llamaRight && hayRight > llamaLeft) {
                    entered = true
                    const llamaPositionY = jumper.getBoundingClientRect()
                    const llamaBottom =
                        llamaPositionY.bottom - window.innerHeight * 0.03
                    let hayTop =
                        hayPositionY.top +
                        window.innerHeight * 0.005 +
                        hayBailSize / 2

                    if (hayLeft < llamaRight - interval * 5) {
                        hayTop -= hayBailSize / 4
                    } else if (hayLeft < llamaRight - interval * 2) {
                        hayTop -= hayBailSize / 2
                    } else if (hayLeft < llamaRight - interval) {
                        hayTop -= hayBailSize / 4
                    }

                    const cleared = llamaBottom <= hayTop
                    if (!cleared) {
                        handleGameOver()
                    }
                } else {
                    if (entered) {
                        entered = false
                        if (index === hayBails.length - 1) {
                            index = 0
                        } else {
                            ++index
                        }
                    }
                }

                ++score
                scoreBoard.innerHTML = score
            }, 1)
            window.openIntervals.push(intervalId)
        }
    }

    const handleClose = () => {
        music.audio.stop(music.id)
        document.body.style.overflow = ''
        document?.removeEventListener('keydown', jump)
        window.openIntervals.forEach((id) => clearInterval(id))
        hayContainer?.removeEventListener('animationend', levelUp)
        apiCall('post', `/gamification`, { didVisitLlamaLand: true })
        navigate('/tasks')
    }

    function playAgain() {
        setGameOver(false)
        setFinalScore(0)
        initGame()
    }

    async function handleGameOver() {
        if (!muteRef.current) {
            gameOverSound.play()
        }
        document.removeEventListener('keydown', jump)
        window.openIntervals.forEach((id) => clearInterval(id))
        hayContainer.removeEventListener('animationend', levelUp)

        const shrubAnimation = shrubberies.classList[1]
        shrubberies.classList.remove(shrubAnimation)
        const hayAnimation = hayContainer.classList[1]
        hayContainer.classList.remove(hayAnimation)

        setGameOver(true)
        setFinalScore(score)
        if (score > userStats.data.llamaLandHighScore) {
            updateStats.mutate({ ...userStats.data, llamaLandHighScore: score })
        }
        music.audio.pause(music.id)
    }

    // handle close logic if back button is hit
    window.onpopstate = () => {
        if (!window.location.href.includes('/llamaLand')) {
            music.audio.stop(music.id)
            document.body.style.overflow = ''
            document?.removeEventListener('keydown', jump)
            window.openIntervals.forEach((id) => clearInterval(id))
            hayContainer?.removeEventListener('animationend', levelUp)
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'
        initGame()
    }, [])

    return (
        <div>
            <SettingsBar
                music={music}
                muteRef={muteRef}
                handleClose={handleClose}
            />
            <div class="llama-land">
                <div id="message-overlay" />
                <div
                    class="game-container"
                    style={{ display: !gameOver ? 'none' : '' }}
                >
                    <div style={{ marginBottom: '40px' }}>Game Over</div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <div style={{ fontSize: '50px' }}>
                            score: {finalScore}
                        </div>
                        <div style={{ fontSize: '50px' }}>
                            high score: {userStats.data.llamaLandHighScore}
                        </div>
                    </div>
                    <div
                        style={{
                            width: '70%',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <div class="game-button" onClick={playAgain}>
                            Play Again
                        </div>
                        <div class="game-button" onClick={handleClose}>
                            Back to Work
                        </div>
                    </div>
                </div>
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
                            <div class="pedal" style={{ left: -10, top: 9 }} />
                            <div class="pedal" style={{ left: 10, top: 9 }} />
                            <div class="pedal" style={{ left: -5, top: 20 }} />
                            <div class="pedal" style={{ left: 5, top: 20 }} />
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
                            <div class="pedal" style={{ left: -10, top: 9 }} />
                            <div class="pedal" style={{ left: 10, top: 9 }} />
                            <div class="pedal" style={{ left: -5, top: 20 }} />
                            <div class="pedal" style={{ left: 5, top: 20 }} />
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
                            <div class="pedal" style={{ left: -10, top: 9 }} />
                            <div class="pedal" style={{ left: 10, top: 9 }} />
                            <div class="pedal" style={{ left: -5, top: 20 }} />
                            <div class="pedal" style={{ left: 5, top: 20 }} />
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
                    {randomHay.map((isFilled, index) => (
                        <div key={index} class="hay-compartment">
                            {isFilled && (
                                <div
                                    class="hay-bail hay-level-1"
                                    style={{
                                        width: hayBailSize,
                                        height: hayBailSize,
                                        borderRadius: hayBailSize / 2,
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
        </div>
    )
}

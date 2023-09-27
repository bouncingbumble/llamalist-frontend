import React from 'react'
import AnimatedNumbers from 'react-animated-numbers'

export default function NumberAnimation({ num }) {
    return (
        <AnimatedNumbers
            includeComma
            animateToNumber={num}
            fontStyle={{ fontSize: '25em' }}
            configs={[{ mass: 1, tension: 220, friction: 100 }]}
        ></AnimatedNumbers>
    )
}

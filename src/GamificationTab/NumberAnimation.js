import { Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import useAnimateNumber from 'react-hook-animate-number'

const DAYS_OF_WEEK = [
    { day: 'M', multiplier: '🍎🍎🍎🍎🍎' },
    { day: 'T', multiplier: '🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎' },
    { day: 'W', multiplier: '🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎' },
    { day: 'Th', multiplier: '🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎' },
    {
        day: 'F',
        multiplier: '🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎',
    },
    {
        day: 'Sa',
        multiplier:
            '🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎',
    },
    {
        day: 'Su',
        multiplier:
            '🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎',
    },
]

export default function NumberAnimation({
    currentStreak,
    highestStreak,
    daysOfWeekCompletedStreak,
}) {
    const current = useAnimateNumber({
        number: currentStreak,
        durationInMs: 2400,
    })
    const highest = useAnimateNumber({
        number: highestStreak,
        durationInMs: 2800,
    })

    return (
        <>
            <Flex flexDirection="column" w="800px">
                <Flex justifyContent="space-between">
                    <Flex>
                        <Text
                            fontSize="20rem"
                            lineHeight="1"
                            width="200px"
                            fontWeight="bold"
                        >
                            {current.number}
                        </Text>
                        <Text fontSize="10rem" alignSelf="flex-end">
                            🔥
                        </Text>
                    </Flex>
                    <Flex flexDirection="column" justifyContent="center">
                        <Flex justifyContent="flex-end">
                            <Flex>
                                <Flex mr="6px">Top Streak</Flex>
                                <Flex fontWeight="bold"> {highest.number}</Flex>
                            </Flex>
                        </Flex>
                        <Text fontSize="4rem" fontWeight="bold">
                            Streak
                        </Text>
                        <Text fontSize="1.8rem">
                            Fill your llama's hunger bar <br />
                            each day to build your streak <br /> and gather the
                            most apples
                        </Text>
                    </Flex>
                </Flex>

                <Flex w="800px" justifyContent="center">
                    {DAYS_OF_WEEK.map((d, i) => (
                        <Flex
                            flexDirection="column"
                            width="114px"
                            alignItems="center"
                        >
                            <Flex
                                fontSize="56px"
                                style={{
                                    color:
                                        !daysOfWeekCompletedStreak[i] &&
                                        'transparent',
                                    textShadow:
                                        !daysOfWeekCompletedStreak[i] &&
                                        '0 0 0 #99A0C2',
                                }}
                            >
                                🔥
                            </Flex>
                            <Flex fontSize="32px" fontWeight="bold">
                                {d.day}
                            </Flex>
                            <Flex
                                alignItems="center"
                                justifyContent="center"
                                width="90px"
                                style={{
                                    fontSize: 28,
                                    color:
                                        !daysOfWeekCompletedStreak[i] &&
                                        'transparent',
                                    textShadow:
                                        !daysOfWeekCompletedStreak[i] &&
                                        '0 0 0 #99A0C2',
                                }}
                            >
                                {d.multiplier}
                            </Flex>
                        </Flex>
                    ))}
                </Flex>
            </Flex>
        </>
    )
}

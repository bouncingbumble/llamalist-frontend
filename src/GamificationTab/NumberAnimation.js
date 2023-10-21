import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import useAnimateNumber from 'react-hook-animate-number'

const STREAKS = [
    { streakNum: 1, multiplier: '🍎🍎🍎🍎🍎' },
    { streakNum: 2, multiplier: '🍎🍎🍎🍎🍎🍎🍎🍎🍎🍎' },
    {
        streakNum: 3,
        multiplier: '\xa0\xa0🍎\xa0\xa0 x20',
    },
    {
        streakNum: 5,
        multiplier: '\xa0\xa0🍎\xa0\xa0 x50',
    },
    {
        streakNum: 10,
        multiplier: '\xa0\xa0🍎\xa0\xa0 x100',
    },
    {
        streakNum: 25,
        multiplier: '\xa0\xa0🍎\xa0\xa0 x500',
    },
    {
        streakNum: 50,
        multiplier: '\xa0\xa0🍎\xa0\xa0 x5,000',
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
                    {STREAKS.map((streak, i) => (
                        <Flex
                            flexDirection="column"
                            width="114px"
                            alignItems="center"
                        >
                            <Flex
                                fontSize="56px"
                                style={{
                                    color:
                                        currentStreak < streak.streakNum &&
                                        'transparent',
                                    textShadow:
                                        currentStreak < streak.streakNum &&
                                        '0 0 0 #99A0C2',
                                }}
                            >
                                🔥
                            </Flex>
                            <Flex
                                fontSize="32px"
                                fontWeight="bold"
                                style={{
                                    color:
                                        currentStreak < streak.streakNum &&
                                        'transparent',
                                    textShadow:
                                        currentStreak < streak.streakNum &&
                                        '0 0 0 #99A0C2',
                                }}
                            >
                                {streak.streakNum}
                            </Flex>
                            <Flex
                                alignItems="center"
                                justifyContent="center"
                                width="90px"
                                flexDirection="column"
                                textAlign="center"
                                style={{
                                    fontSize: 28,
                                    color:
                                        currentStreak < streak.streakNum &&
                                        'transparent',
                                    textShadow:
                                        currentStreak < streak.streakNum &&
                                        '0 0 0 #99A0C2',
                                }}
                            >
                                {streak.multiplier}
                            </Flex>
                        </Flex>
                    ))}
                </Flex>
            </Flex>
        </>
    )
}

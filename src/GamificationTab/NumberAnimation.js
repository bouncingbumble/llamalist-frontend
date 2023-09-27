import { Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import useAnimateNumber from 'react-hook-animate-number'

const DAYS_OF_WEEK = ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su']
export default function NumberAnimation({ currentStreak, highestStreak }) {
    const current = useAnimateNumber({
        number: currentStreak,
        durationInMs: 2400,
    })
    const highest = useAnimateNumber({
        number: currentStreak,
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
                            Complete a task each day <br />
                            to build your apples multipler
                        </Text>
                    </Flex>
                </Flex>

                <Flex w="800px" justifyContent="center">
                    {DAYS_OF_WEEK.map((d) => (
                        <Flex
                            flexDirection="column"
                            width="114px"
                            alignItems="center"
                        >
                            <Flex fontSize="56px">🔥</Flex>
                            <Flex fontSize="32px">{d}</Flex>
                        </Flex>
                    ))}
                </Flex>
            </Flex>
        </>
    )
}

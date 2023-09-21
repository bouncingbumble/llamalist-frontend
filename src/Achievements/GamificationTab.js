import React, { useState, useEffect } from 'react'
import { Flex, Tooltip, Box } from '@chakra-ui/react'
import Goals from './Goals'
import { apiCall } from '../Util/api'
import GoldenLlama from '../animations/goldenLlama/GoldenLlama'

export default function GamificationTab({
    userStats,
    goldenLlama,
    setGoldenLlama,
    shouldAnimateGoals,
    setShouldAnimateGoals,
    setShouldAnimateLevel,
    shouldAnimateLevel,
    shouldAnimateStreak,
}) {
    // state
    const [statsLoaded, setStatsLoaded] = useState(false)
    const [goldenLlamaCount, setGoldenLlamaCount] = useState(0)

    const getCurrentStreak = () => {
        let currentStreak = 1

        //loop through array and increment streak for each consecutive day logged in
        userStats.data.daysLoggedIn.reverse().map((d, i) => {
            //end of array check
            if (i + 1 < userStats.data.daysLoggedIn.length) {
                //date we're on zero'd out minus 1 day compared to zero'd out day 1 spot after
                if (
                    new Date(d).setHours(0, 0, 0, 0) - 24 * 60 * 60 * 1000 ===
                    new Date(userStats.data.daysLoggedIn[i + 1]).setHours(
                        0,
                        0,
                        0,
                        0
                    )
                ) {
                    currentStreak = currentStreak + 1
                }
            }
        })

        apiCall('put', '/gamification/updateHighestStreak', {
            highestStreakCount: currentStreak,
        })

        return currentStreak
    }

    useEffect(() => {
        if (
            statsLoaded &&
            userStats.data?.goldenLlamasFound.length > goldenLlamaCount
        ) {
            const gamificationTab = document.getElementById('gamification-tab')
            setTimeout(() => {
                gamificationTab.style.paddingBottom = '84px'
                setTimeout(() => {
                    setGoldenLlamaCount(userStats.data.goldenLlamasFound.length)
                }, 1000)
                setTimeout(() => {
                    gamificationTab.style.paddingBottom = '0px'
                }, 2000)
            }, 6000)
        }
    }, [userStats.data?.goldenLlamasFound])

    useEffect(() => {
        if (userStats.status === 'success') {
            setStatsLoaded(true)
            setGoldenLlamaCount(userStats.data.goldenLlamasFound.length)
        }
    }, [userStats.status])

    return (
        userStats.data && (
            <Flex
                id="gamification-tab"
                flexDirection="column"
                width="280px"
                bg="#F9FAFB"
                borderBottomRightRadius="16px"
                borderBottomLeftRadius="16px"
                boxShadow="base"
                padding="18px 16px 16px 16px"
                position="absolute"
                right="16px"
                zIndex={500}
                transition="all 0.3s"
                overflow="hidden"
                height={
                    shouldAnimateGoals.some((v) => v === true) ||
                    shouldAnimateLevel ||
                    shouldAnimateStreak
                        ? '100px'
                        : '60px'
                }
                _hover={{ height: '100px' }}
                mt="-24px"
            >
                <Goals
                    goldenLlama={goldenLlama}
                    setGoldenLlama={setGoldenLlama}
                    shouldAnimateGoals={shouldAnimateGoals}
                    setShouldAnmiateGoals={setShouldAnimateGoals}
                    shouldAnimateLevel={shouldAnimateLevel}
                    setShouldAnimateLevel={setShouldAnimateLevel}
                    initialLevel={userStats.data.level}
                />

                <Flex
                    fontSize="20px"
                    justifyContent="space-between"
                    _hover={{ cursor: 'pointer' }}
                    mt="4px"
                >
                    <Tooltip label="Llamas found">
                        <Flex
                            // onClick={() => setIsAchievementsModalOpen(true)}
                            alignItems="center"
                            fontWeight="400"
                        >
                            <Box mr="4px" fontSize="28px" mb="-4px">
                                🦙
                            </Box>
                            <Flex fontSize="16px" alignSelf="flex-end">
                                x <Box fontWeight="500">{goldenLlamaCount}</Box>
                            </Flex>
                        </Flex>
                    </Tooltip>
                    <Tooltip label="Apples acquired">
                        <Flex
                            // onClick={() => setIsAchievementsModalOpen(true)}
                            alignItems="flex-end"
                            fontWeight="400"
                        >
                            <Box mr="4px" fontSize="28px" mb="-4px">
                                🍎
                            </Box>
                            <Flex fontSize="16px" alignSelf="flex-end">
                                x{' '}
                                <Box fontWeight="500">
                                    {userStats.data.applesCount}
                                </Box>
                            </Flex>
                        </Flex>
                    </Tooltip>

                    <Tooltip label="Daily Streak">
                        <Flex alignItems="center">
                            <Box
                                mr="4px"
                                className={shouldAnimateStreak && 'flame'}
                                fontSize="28px"
                                mb="-4px"
                            >
                                🔥
                            </Box>
                            <Flex fontSize="16px" alignSelf="flex-end">
                                x
                                <Box fontWeight="500">{getCurrentStreak()}</Box>
                            </Flex>
                        </Flex>
                    </Tooltip>
                    {!goldenLlama.found && goldenLlama.index === 9 && (
                        <Flex pt="7px">
                            <GoldenLlama
                                minHeight={30}
                                goldenLlama={goldenLlama}
                                setGoldenLlama={setGoldenLlama}
                            />
                        </Flex>
                    )}
                </Flex>
            </Flex>
        )
    )
}

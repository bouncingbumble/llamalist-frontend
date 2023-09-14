import React from 'react'
import { Flex, Tooltip, Box } from '@chakra-ui/react'
import Goals from './Goals'

export default function GamificationTab({
    userStats,
    shouldAnimateGoals,
    setShouldAnimateGoals,
    setShouldAnimateLevel,
    shouldAnimateLevel,
    shouldAnimateStreak,
}) {
    return (
        userStats.data && (
            <Flex
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
                transition="height 0.3s"
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
                                x <Box fontWeight="500">5</Box>
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
                                <Box fontWeight="500">
                                    {userStats.data.currentStreak.length}
                                </Box>
                            </Flex>
                        </Flex>
                    </Tooltip>
                </Flex>
            </Flex>
        )
    )
}
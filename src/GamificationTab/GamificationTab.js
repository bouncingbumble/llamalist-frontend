import React, { useState, useEffect } from 'react'
import { apiCall } from '../Util/api'
import OOModal from '../SharedComponents/OOModal'
import { Flex, Tooltip, useToast, Box } from '@chakra-ui/react'
import levels from './LevelsAndGoals/levels'
import { StarIcon, StarIconFilled } from '../ChakraDesign/Icons'
import goalCompleted from '../sounds/goalCompleted.mp3'
import levelCompleted from '../sounds/levelCompleted.mp3'
import LlamaToastyBoi from './LlamaToastyBoi'
import { Howl } from 'howler'
import UserProfile from '../UserProfile/UserProfile'
import LevelsAndGoalsContainer from './LevelsAndGoals/LevelsAndGoalsContainer'
import LeaderBoardsContainer from './Leaderboards/LeaderBoardsContainer'
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
    const [isGoalsModalOpen, setIsGoalsModalOpen] = useState(false)
    const [currentLevel, setCurrentLevel] = useState(userStats.data.level)
    const [tab, setTab] = useState(0)
    const levelCompletedSound = new Howl({ src: [levelCompleted] })
    const goalCompletedSound = new Howl({ src: [goalCompleted] })
    const toast = useToast()

    const parentCarouselStyle = {
        transition: 'all .5s',
        ml: `-${tab * 100}%`,
    }

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

    useEffect(() => {
        shouldAnimateGoals.map((shouldAnimate, i) => {
            if (shouldAnimate) {
                userStats.refetch()
                if (!shouldAnimateLevel) {
                    goalCompletedSound.play()
                }
                toast({
                    duration: 6000,
                    isClosable: true,
                    position: 'bottom',
                    onCloseComplete: () =>
                        setShouldAnimateGoals([false, false, false]),
                    render: () => (
                        <LlamaToastyBoi
                            title={levels[userStats.data.level][i].title}
                            colorScheme="greenFaded"
                        />
                    ),
                })
            }
        })
        if (shouldAnimateLevel) {
            toast({
                isClosable: true,
                duration: 6000,
                onCloseComplete: () =>
                    setShouldAnimateGoals([false, false, false]),
                render: () => (
                    <LlamaToastyBoi
                        title="Level advanced"
                        colorScheme="purpleFaded"
                    />
                ),
            })
            levelCompletedSound.play()
            setShouldAnimateLevel(false)
        }
    }, [shouldAnimateGoals])

    const handleClick = () => {
        setIsGoalsModalOpen(true)
        setShouldAnimateGoals([false, false, false])
    }

    const handleClose = () => {
        setIsGoalsModalOpen(false)
        setCurrentLevel(userStats.data.level)
    }

    const Stars = () =>
        levels[currentLevel].map((goal, i) =>
            (currentLevel === userStats.data.level &&
                userStats.data.areGoalsCompleted[i]) ||
            userStats.data.level > currentLevel ? (
                <StarIconFilled height="40px" width="40px" key={i} />
            ) : (
                <StarIcon height="40px" width="40px" key={i} />
            )
        )

    return (
        <Flex
            id="gamification-tab"
            flexDirection="column"
            width="280px"
            bg="#F9FAFB"
            borderBottomRightRadius="16px"
            borderBottomLeftRadius="16px"
            boxShadow="base"
            padding="16px 16px 16px 16px"
            position="absolute"
            right="16px"
            zIndex={500}
            transition="all ease 0.3s"
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
            backgroundColor="#DDD5F7"
        >
            {userStats.data && (
                <>
                    <Flex
                        justifyContent="space-between"
                        alignItems="center"
                        _hover={{ cursor: 'pointer' }}
                    >
                        <Tooltip label="See your current goals">
                            <>
                                <Flex alignItems="center">
                                    <UserProfile
                                        stars={<Stars />}
                                        goldenLlama={goldenLlama}
                                        setGoldenLlama={setGoldenLlama}
                                    />
                                    <Flex fontSize="18px" fontWeight="500">
                                        Level {userStats.data.level}
                                    </Flex>
                                </Flex>
                                <Flex
                                    alignItems="center"
                                    fontSize="18px"
                                    fontWeight="500"
                                    onClick={handleClick}
                                >
                                    {userStats.data.areGoalsCompleted.map(
                                        (goal, i) =>
                                            goal ? (
                                                <StarIconFilled
                                                    mr="4px"
                                                    className={
                                                        shouldAnimateGoals[i] &&
                                                        'bouncey-boi'
                                                    }
                                                    style={{
                                                        animationFillMode:
                                                            'both',
                                                        animationDuration: '1s',
                                                        animationIterationCount:
                                                            shouldAnimateGoals &&
                                                            'infinite',
                                                    }}
                                                    key={i}
                                                />
                                            ) : (
                                                <StarIcon
                                                    mr="4px"
                                                    key={i}
                                                    className={
                                                        shouldAnimateLevel &&
                                                        'bouncey-boi'
                                                    }
                                                    style={{
                                                        animationFillMode:
                                                            'both',
                                                        animationDuration: '1s',
                                                        animationIterationCount:
                                                            shouldAnimateGoals &&
                                                            'infinite',
                                                    }}
                                                />
                                            )
                                    )}
                                </Flex>
                            </>
                        </Tooltip>
                    </Flex>
                    {isGoalsModalOpen && (
                        <OOModal
                            title=""
                            isOpen={isGoalsModalOpen}
                            onClose={handleClose}
                            backgroundColor="greenFaded.100"
                        >
                            <Flex
                                w="100%"
                                justifyContent="center"
                                alignItems="center"
                                mt="32px"
                            >
                                <Flex
                                    justifyContent="center"
                                    alignItems="center"
                                    fontSize="48px"
                                    onClick={() => setTab(0)}
                                    ml={tab == 0 ? 96 : -48}
                                    mr={tab == 1 ? 24 : 0}
                                    cursor="pointer"
                                    opacity={tab == 0 ? '1' : '0.4'}
                                    transition="all .5s"
                                >
                                    Goals
                                </Flex>
                                <Flex
                                    justifyContent="center"
                                    alignItems="center"
                                    fontSize="48px"
                                    onClick={() => setTab(1)}
                                    ml={tab == 0 ? 24 : -6}
                                    cursor="pointer"
                                    opacity={tab == 1 ? '1' : '0.4'}
                                    transition="all .5s"
                                >
                                    Leaderboard
                                </Flex>
                            </Flex>
                            <Flex w="full" overflow="default" pos="relative">
                                <Flex w="full" {...parentCarouselStyle}>
                                    <LevelsAndGoalsContainer
                                        tab={tab}
                                        userStats={userStats}
                                        currentLevel={currentLevel}
                                        goldenLlama={goldenLlama}
                                        setGoldenLlama={setGoldenLlama}
                                        setCurrentLevel={setCurrentLevel}
                                    />
                                    <LeaderBoardsContainer
                                        userStats={userStats}
                                        goldenLlama={goldenLlama}
                                        setGoldenLlama={setGoldenLlama}
                                    />
                                </Flex>
                            </Flex>
                        </OOModal>
                    )}
                </>
            )}

            <Flex
                fontSize="20px"
                justifyContent="space-between"
                _hover={{ cursor: 'pointer' }}
                mt="6px"
            >
                <Tooltip label="Llamas found">
                    <Flex alignItems="center" fontWeight="400">
                        <Box mr="4px" fontSize="28px" mb="-4px">
                            🦙
                        </Box>
                        <Flex fontSize="16px" alignSelf="flex-end">
                            x <Box fontWeight="500">{goldenLlamaCount}</Box>
                        </Flex>
                    </Flex>
                </Tooltip>
                <Tooltip label="Apples acquired">
                    <Flex alignItems="flex-end" fontWeight="400">
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
                            x<Box fontWeight="500">{getCurrentStreak()}</Box>
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
}

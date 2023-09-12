import React, { useState, useEffect } from 'react'
import OOModal from '../SharedComponents/OOModal'
import { Flex, IconButton, Tooltip, useToast, Avatar } from '@chakra-ui/react'
import levels from './levels'
import { useUserStats } from '../Hooks/UserHooks'
import {
    LeftArrowIcon,
    RightArrowIcon,
    StarIcon,
    StarIconFilled,
    CheckmarkIcon,
} from '../ChakraDesign/Icons'
import goalCompleted from '../sounds/goalCompleted.mp3'
import levelCompleted from '../sounds/levelCompleted.mp3'
import LlamaToastyBoi from './LlamaToastyBoi'
import { Howl } from 'howler'
import UserProfile from '../UserProfile/UserProfile'

export default function GoalsModal({
    shouldAnimateGoals,
    setShouldAnmiateGoals,
    shouldAnimateLevel,
    setShouldAnimateLevel,
    initialLevel,
}) {
    const levelCompletedSound = new Howl({ src: [levelCompleted] })
    const goalCompletedSound = new Howl({ src: [goalCompleted] })

    const userStats = useUserStats()
    const toast = useToast()
    const [isGoalsModalOpen, setIsGoalsModalOpen] = useState(false)
    const [currentLevel, setCurrentLevel] = useState(initialLevel)
    const [tab, setTab] = useState(0)
    const levelsCount = levels.length

    const prevLevel = () => {
        setCurrentLevel((s) => (s === 0 ? levelsCount - 1 : s - 1))
    }

    const nextLevel = () => {
        setCurrentLevel((s) => (s === levelsCount - 1 ? 0 : s + 1))
    }

    const carouselStyle = {
        transition: 'all .5s',
        ml: `-${currentLevel * 100}%`,
    }

    const parentCarouselStyle = {
        transition: 'all .5s',
        ml: `-${tab * 100}%`,
    }

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
                        setShouldAnmiateGoals([false, false, false]),
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
                    setShouldAnmiateGoals([false, false, false]),
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
        setShouldAnmiateGoals([false, false, false])
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
        userStats.data && (
            <>
                <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    _hover={{ cursor: 'pointer' }}
                >
                    <Tooltip label="See your current goals">
                        <>
                            <Flex alignItems="center">
                                <UserProfile stars={<Stars />} />
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
                                                    animationFillMode: 'both',
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
                                                    animationFillMode: 'both',
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
                                ml={tab == 0 ? 24 : 0}
                                cursor="pointer"
                                opacity={tab == 1 ? '1' : '0.4'}
                                transition="all .5s"
                            >
                                Leaderboard
                            </Flex>
                        </Flex>
                        <Flex w="full" overflow="default" pos="relative">
                            <Flex w="full" {...parentCarouselStyle}>
                                <Flex
                                    key={0}
                                    w="full"
                                    flex="none"
                                    justifyContent="center"
                                    alignItems="center"
                                    flexDirection="column"
                                    fontSize="24px"
                                >
                                    <Flex mt="23px">
                                        <Stars />
                                    </Flex>
                                    <Flex
                                        w="full"
                                        alignItems="center"
                                        justifyContent="center"
                                        mt="48px"
                                        mb="64px"
                                    >
                                        {userStats.data && (
                                            <Flex
                                                w="full"
                                                overflow="hidden"
                                                pos="relative"
                                            >
                                                <Flex
                                                    w="full"
                                                    {...carouselStyle}
                                                >
                                                    {levels.map(
                                                        (level, lid) => (
                                                            <Flex
                                                                key={`level-${lid}`}
                                                                w="full"
                                                                flex="none"
                                                                justifyContent="center"
                                                                alignItems="center"
                                                                flexDirection="column"
                                                                fontSize="24px"
                                                            >
                                                                {level.map(
                                                                    (
                                                                        goal,
                                                                        i
                                                                    ) => (
                                                                        <Flex
                                                                            mt="16px"
                                                                            alignItems="center"
                                                                            key={`goal-${i}`}
                                                                        >
                                                                            <Flex
                                                                                opacity={
                                                                                    ((currentLevel ===
                                                                                        userStats
                                                                                            .data
                                                                                            .level &&
                                                                                        userStats
                                                                                            .data
                                                                                            .areGoalsCompleted[
                                                                                            i
                                                                                        ]) ||
                                                                                        userStats
                                                                                            .data
                                                                                            .level >
                                                                                            currentLevel) &&
                                                                                    '0.6'
                                                                                }
                                                                                textDecoration={
                                                                                    ((currentLevel ===
                                                                                        userStats
                                                                                            .data
                                                                                            .level &&
                                                                                        userStats
                                                                                            .data
                                                                                            .areGoalsCompleted[
                                                                                            i
                                                                                        ]) ||
                                                                                        userStats
                                                                                            .data
                                                                                            .level >
                                                                                            currentLevel) &&
                                                                                    'line-through'
                                                                                }
                                                                            >
                                                                                {
                                                                                    goal.title
                                                                                }
                                                                            </Flex>
                                                                            {((currentLevel ===
                                                                                userStats
                                                                                    .data
                                                                                    .level &&
                                                                                userStats
                                                                                    .data
                                                                                    .areGoalsCompleted[
                                                                                    i
                                                                                ]) ||
                                                                                userStats
                                                                                    .data
                                                                                    .level >
                                                                                    currentLevel) && (
                                                                                <CheckmarkIcon ml="12px" />
                                                                            )}
                                                                        </Flex>
                                                                    )
                                                                )}
                                                            </Flex>
                                                        )
                                                    )}
                                                </Flex>
                                            </Flex>
                                        )}
                                    </Flex>
                                    <Flex
                                        w="400px"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <IconButton
                                            variant="ghost"
                                            colorScheme="gray"
                                            icon={<LeftArrowIcon />}
                                            onClick={prevLevel}
                                        />
                                        <Flex fontSize="22px" fontWeight="500">
                                            Level {currentLevel}
                                        </Flex>
                                        <IconButton
                                            variant="ghost"
                                            colorScheme="gray"
                                            icon={<RightArrowIcon />}
                                            onClick={nextLevel}
                                        />
                                    </Flex>
                                </Flex>
                                <Flex
                                    key={2}
                                    w="full"
                                    flex="none"
                                    justifyContent="center"
                                    alignItems="center"
                                    flexDirection="column"
                                    fontSize="24px"
                                >
                                    <Flex
                                        w="full"
                                        alignItems="center"
                                        justifyContent="center"
                                        mt="48px"
                                        mb="64px"
                                    >
                                        content
                                    </Flex>
                                    <Flex
                                        w="400px"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <IconButton
                                            variant="ghost"
                                            colorScheme="gray"
                                            icon={<LeftArrowIcon />}
                                            onClick={prevLevel}
                                        />
                                        <Flex fontSize="22px" fontWeight="500">
                                            Level {currentLevel}
                                        </Flex>
                                        <IconButton
                                            variant="ghost"
                                            colorScheme="gray"
                                            icon={<RightArrowIcon />}
                                            onClick={nextLevel}
                                        />
                                    </Flex>
                                </Flex>
                            </Flex>
                        </Flex>
                    </OOModal>
                )}
            </>
        )
    )
}

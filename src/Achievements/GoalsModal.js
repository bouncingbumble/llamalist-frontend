import React, { useState, useEffect } from 'react'
import OOModal from '../SharedComponents/OOModal'
import { Flex, IconButton, Tooltip, useToast } from '@chakra-ui/react'
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

export default function GoalsModal({
    shouldAnimateGoals,
    setShouldAnmiateGoals,
}) {
    const userStats = useUserStats()
    const toast = useToast()
    const [isGoalsModalOpen, setIsGoalsModalOpen] = useState(false)
    const [currentLevel, setCurrentLevel] = useState(
        userStats.data ? userStats.data.level : 0
    )

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

    useEffect(() => {
        shouldAnimateGoals.map((shouldAnimate, i) => {
            if (shouldAnimate) {
                userStats.refetch()
                new Audio(goalCompleted).play()
                toast({
                    title: 'Goal Completed!',
                    description: levels[userStats.data.level][i].title,
                    status: 'success',
                    duration: 6000,
                    isClosable: true,
                    position: 'top-right',
                    onCloseComplete: () =>
                        setShouldAnmiateGoals([false, false, false]),
                })
            }
        })
    }, [shouldAnimateGoals])

    const handleClick = () => {
        setIsGoalsModalOpen(true)
        setShouldAnmiateGoals([false, false, false])
    }

    const handleClose = () => {
        setIsGoalsModalOpen(false)
    }

    return (
        userStats.data && (
            <>
                <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    onClick={handleClick}
                    _hover={{ cursor: 'pointer' }}
                >
                    <Tooltip label="See your current goals">
                        <>
                            <Flex fontSize="20px" fontWeight="500">
                                Level {userStats.data.level}
                            </Flex>
                            <Flex
                                alignItems="center"
                                fontSize="18px"
                                fontWeight="500"
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
                                            <StarIcon mr="4px" key={i} />
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
                            justifyContent="center"
                            alignItems="center"
                            flexDirection="column"
                        >
                            <Flex
                                justifyContent="center"
                                alignItems="center"
                                fontSize="48px"
                            >
                                Goals
                            </Flex>
                            <Flex mt="8vh">
                                {levels[currentLevel].map((goal, i) =>
                                    currentLevel === userStats.data.level &&
                                    userStats.data.areGoalsCompleted[i] ? (
                                        <StarIconFilled
                                            height="40px"
                                            width="40px"
                                            key={i}
                                        />
                                    ) : (
                                        <StarIcon
                                            height="40px"
                                            width="40px"
                                            key={i}
                                        />
                                    )
                                )}
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
                                        <Flex w="full" {...carouselStyle}>
                                            {levels.map((level, lid) => (
                                                <Flex
                                                    key={`level-${lid}`}
                                                    w="full"
                                                    flex="none"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                    flexDirection="column"
                                                    fontSize="24px"
                                                >
                                                    {level.map((goal, i) => (
                                                        <Flex
                                                            mt="16px"
                                                            alignItems="center"
                                                            key={`goal-${i}`}
                                                        >
                                                            <Flex
                                                                opacity={
                                                                    currentLevel ===
                                                                        userStats
                                                                            .data
                                                                            .level &&
                                                                    userStats
                                                                        .data
                                                                        .areGoalsCompleted[
                                                                        i
                                                                    ] &&
                                                                    '0.6'
                                                                }
                                                                textDecoration={
                                                                    currentLevel ===
                                                                        userStats
                                                                            .data
                                                                            .level &&
                                                                    userStats
                                                                        .data
                                                                        .areGoalsCompleted[
                                                                        i
                                                                    ] &&
                                                                    'line-through'
                                                                }
                                                            >
                                                                {goal.title}
                                                            </Flex>
                                                            {currentLevel ===
                                                                userStats.data
                                                                    .level &&
                                                                userStats.data
                                                                    .areGoalsCompleted[
                                                                    i
                                                                ] && (
                                                                    <CheckmarkIcon ml="12px" />
                                                                )}
                                                        </Flex>
                                                    ))}
                                                </Flex>
                                            ))}
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
                    </OOModal>
                )}
            </>
        )
    )
}

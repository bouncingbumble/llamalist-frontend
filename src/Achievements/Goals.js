import React, { useState, useEffect } from 'react'
import OOModal from '../SharedComponents/OOModal'
import { Flex, Tooltip, useToast } from '@chakra-ui/react'
import levels from './levels'
import { useUserStats } from '../Hooks/UserHooks'
import { StarIcon, StarIconFilled } from '../ChakraDesign/Icons'
import goalCompleted from '../sounds/goalCompleted.mp3'
import levelCompleted from '../sounds/levelCompleted.mp3'
import LlamaToastyBoi from './LlamaToastyBoi'
import { Howl } from 'howler'
import UserProfile from '../UserProfile/UserProfile'
import GoalsBoard from './GoalsBoard'
import LeaderBoards from './LeaderBoards'

export default function GoalsModal({
    shouldAnimateGoals,
    setShouldAnmiateGoals,
    shouldAnimateLevel,
    setShouldAnimateLevel,
    initialLevel,
    goldenLlama,
}) {
    const levelCompletedSound = new Howl({ src: [levelCompleted] })
    const goalCompletedSound = new Howl({ src: [goalCompleted] })

    const userStats = useUserStats()
    const toast = useToast()
    const [isGoalsModalOpen, setIsGoalsModalOpen] = useState(false)
    const [currentLevel, setCurrentLevel] = useState(initialLevel)
    const [tab, setTab] = useState(0)

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
                                <UserProfile
                                    stars={<Stars />}
                                    goldenLlama={goldenLlama}
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
                                <GoalsBoard
                                    tab={tab}
                                    userStats={userStats}
                                    goldenLlama={goldenLlama}
                                    currentLevel={currentLevel}
                                    setCurrentLevel={setCurrentLevel}
                                />
                                <LeaderBoards
                                    userStats={userStats}
                                    goldenLlama={goldenLlama}
                                />
                            </Flex>
                        </Flex>
                    </OOModal>
                )}
            </>
        )
    )
}

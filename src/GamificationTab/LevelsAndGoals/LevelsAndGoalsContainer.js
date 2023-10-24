import React from 'react'
import { Flex, IconButton } from '@chakra-ui/react'
import GoldenLlama from '../../animations/goldenLlama/GoldenLlama'
import {
    LeftArrowIcon,
    RightArrowIcon,
    StarIcon,
    StarIconFilled,
    CheckmarkIcon,
} from '../../ChakraDesign/Icons'
import levels from './levels'
import { useUserSettings } from '../../Hooks/UserHooks'
export default function GoalsBoard({
    tab,
    userStats,
    goldenLlama,
    setGoldenLlama,
    currentLevel,
    setCurrentLevel,
}) {
    const levelsCount = levels.length
    const userSettings = useUserSettings()

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
            key={0}
            w="full"
            flex="none"
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
                    <Flex w="full" overflow="hidden" pos="relative">
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
                                                    ((currentLevel ===
                                                        userStats.data.level &&
                                                        userStats.data
                                                            .areGoalsCompleted[
                                                            i
                                                        ]) ||
                                                        userStats.data.level >
                                                            currentLevel) &&
                                                    '0.6'
                                                }
                                                textDecoration={
                                                    ((currentLevel ===
                                                        userStats.data.level &&
                                                        userStats.data
                                                            .areGoalsCompleted[
                                                            i
                                                        ]) ||
                                                        userStats.data.level >
                                                            currentLevel) &&
                                                    'line-through'
                                                }
                                            >
                                                {goal.title(
                                                    userSettings.data?.llamaName
                                                )}
                                            </Flex>
                                            {((currentLevel ===
                                                userStats.data.level &&
                                                userStats.data
                                                    .areGoalsCompleted[i]) ||
                                                userStats.data.level >
                                                    currentLevel) && (
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
            <Flex w="400px" justifyContent="space-between" alignItems="center">
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
            {!goldenLlama.found && goldenLlama.index === 14 && (
                <Flex
                    width="10%"
                    left="24px"
                    top="400px"
                    position="absolute"
                    height="100px"
                >
                    <GoldenLlama
                        hidden
                        goldenLlama={goldenLlama}
                        setGoldenLlama={setGoldenLlama}
                    />
                </Flex>
            )}
            {!goldenLlama.found && goldenLlama.index === 15 && (
                <Flex
                    width="10%"
                    right="24px"
                    top="400px"
                    position="absolute"
                    height="100px"
                >
                    <GoldenLlama
                        hidden
                        goldenLlama={goldenLlama}
                        setGoldenLlama={setGoldenLlama}
                    />
                </Flex>
            )}
        </Flex>
    )
}

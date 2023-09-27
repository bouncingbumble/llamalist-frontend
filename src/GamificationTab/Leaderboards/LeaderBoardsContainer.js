import React, { useState, useEffect } from 'react'
import {
    Flex,
    IconButton,
    Stack,
    Table,
    TableCaption,
    TableContainer,
    Skeleton,
} from '@chakra-ui/react'
import { LeftArrowIcon, RightArrowIcon } from '../../ChakraDesign/Icons'
import SevenDayStreakTable from './Tables/SevenDayStreakTable'
import TopStreaksTable from './Tables/TopStreaksTable'
import LlamaLandHighScores from './Tables/LlamaLandHighScores'
import GoldenLlama from '../../animations/goldenLlama/GoldenLlama'
import MostGoldenLlamasFound from './Tables/MostGoldenLlamasFound'
import FoundLlamaThisWeek from './Tables/FoundLlamaThisWeek'
import MostTasksCompleted from './Tables/MostTasksCompleted'
import Completed10Lastweek from './Tables/Completed10LastWeek'

const LEADERBOARDS = [
    'Llama Land High Score',
    "Found This Week's Golden Llama",
    'Most Golden llamas found',
    '7 day streak completed',
    'Longest streak',
    'Most Tasks Completed',
    'Completed 10 tasks last week',
    'Prestiged',
]

export default function LeaderBoards({
    goldenLlama,
    setGoldenLlama,
    leaderBoards,
}) {
    const [currentBoard, setCurrentBoard] = useState(0)
    const prevLeaderBoard = () => {
        setCurrentBoard((s) => (s === 0 ? boardsCount - 1 : s - 1))
    }

    const nextLeaderBoard = () => {
        setCurrentBoard((s) => (s === boardsCount - 1 ? 0 : s + 1))
    }

    const boardCarouselStyle = {
        transition: 'all .5s',
        ml: `-${currentBoard * 100}%`,
    }

    const boardsCount = LEADERBOARDS.length

    return (
        <Flex
            key={1}
            w="full"
            flex="none"
            alignItems="center"
            flexDirection="column"
            fontSize="24px"
        >
            <Flex w="full" overflow="hidden" pos="relative">
                <Flex w="full" {...boardCarouselStyle}>
                    {LEADERBOARDS.map((board, bid) => (
                        <Flex
                            key={`board-${bid}`}
                            w="full"
                            flex="none"
                            justifyContent="center"
                            alignItems="center"
                            flexDirection="column"
                            fontSize="24px"
                            mb="32px"
                        >
                            <TableContainer>
                                <Table
                                    variant="striped"
                                    colorScheme="purpleFaded"
                                >
                                    <TableCaption
                                        placement="top"
                                        fontSize="24px"
                                        color="gray.800"
                                    >
                                        {LEADERBOARDS[
                                            currentBoard
                                        ].toUpperCase()}
                                    </TableCaption>

                                    {leaderBoards.data && (
                                        <>
                                            {currentBoard === 0 && (
                                                <LlamaLandHighScores
                                                    data={
                                                        leaderBoards.data
                                                            .highestLlamaLandScoreWinners
                                                    }
                                                />
                                            )}
                                            {currentBoard === 1 && (
                                                <FoundLlamaThisWeek
                                                    data={
                                                        leaderBoards.data
                                                            .usersWhoFoundLlamaThisWeekWinners
                                                    }
                                                />
                                            )}
                                            {currentBoard === 2 && (
                                                <MostGoldenLlamasFound
                                                    data={
                                                        leaderBoards.data
                                                            .mostLlamasFoundUsers
                                                    }
                                                />
                                            )}
                                            {currentBoard === 3 && (
                                                <SevenDayStreakTable
                                                    data={
                                                        leaderBoards.data
                                                            .sevenDayStreakWinners
                                                    }
                                                />
                                            )}
                                            {currentBoard === 4 && (
                                                <TopStreaksTable
                                                    data={
                                                        leaderBoards.data
                                                            .highestStreakCountWinners
                                                    }
                                                />
                                            )}
                                            {currentBoard === 5 && (
                                                <MostTasksCompleted
                                                    data={
                                                        leaderBoards.data
                                                            .mostTasksUsers
                                                    }
                                                />
                                            )}
                                            {currentBoard === 6 && (
                                                <Completed10Lastweek
                                                    data={
                                                        leaderBoards.data
                                                            .userAccounts2
                                                    }
                                                />
                                            )}
                                        </>
                                    )}
                                    {leaderBoards.isLoading && (
                                        <Stack
                                            w="400px"
                                            padding="0px"
                                            margin="0px"
                                            mt="32px"
                                        >
                                            <Skeleton height="48px" mt="4px" />
                                            <Skeleton height="48px" mt="4px" />
                                            <Skeleton height="48px" mt="4px" />
                                            <Skeleton height="48px" mt="4px" />
                                            <Skeleton height="48px" mt="4px" />
                                            <Skeleton height="48px" mt="4px" />
                                            <Skeleton height="48px" mt="4px" />
                                            <Skeleton height="48px" mt="4px" />
                                            <Skeleton height="48px" mt="4px" />
                                            <Skeleton height="48px" mt="4px" />
                                        </Stack>
                                    )}
                                </Table>
                            </TableContainer>
                        </Flex>
                    ))}
                </Flex>
            </Flex>
            <Flex w="400px" justifyContent="space-between" alignItems="center">
                <IconButton
                    variant="ghost"
                    colorScheme="gray"
                    icon={<LeftArrowIcon />}
                    onClick={prevLeaderBoard}
                />
                <Flex fontSize="22px" fontWeight="500">
                    ({currentBoard + 1}/{boardsCount})
                </Flex>
                <IconButton
                    variant="ghost"
                    colorScheme="gray"
                    icon={<RightArrowIcon />}
                    onClick={nextLeaderBoard}
                />
            </Flex>
            {!goldenLlama.found && goldenLlama.index === 12 && (
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
            {!goldenLlama.found && goldenLlama.index === 13 && (
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

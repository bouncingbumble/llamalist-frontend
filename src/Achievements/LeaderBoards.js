import React, { useState, useEffect } from 'react'
import {
    Flex,
    IconButton,
    Table,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import { LeftArrowIcon, RightArrowIcon } from '../ChakraDesign/Icons'
import { apiCall } from '../Util/api'
import GoldenLlama from '../animations/goldenLlama/GoldenLlama'
import SevenDayStreakTable from './Tables/SevenDayStreakTable'
import TopStreaksTable from './Tables/TopStreaksTable'
import { useLeaderBoards } from '../Hooks/GamificationHooks'
import LlamaLandHighScores from './Tables/LlamaLandHighScores'
const LEADERBOARDS = [
    '7 day streak completed',
    'Longest streak',
    'Llama Land High Score',
    'Golden llamas found',
    'Prestiged',
]

export default function LeaderBoards({ goldenLlama }) {
    const [currentBoard, setCurrentBoard] = useState(0)
    const leaderBoards = useLeaderBoards()
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
                mb="64px"
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
                                            {board.toUpperCase()}
                                        </TableCaption>
                                        {leaderBoards.data && (
                                            <>
                                                {bid === 0 && (
                                                    <SevenDayStreakTable
                                                        data={
                                                            leaderBoards.data
                                                                .sevenDayStreakWinners
                                                        }
                                                    />
                                                )}
                                                {bid === 1 && (
                                                    <TopStreaksTable
                                                        data={
                                                            leaderBoards.data
                                                                .highestStreakCountWinners
                                                        }
                                                    />
                                                )}
                                                {bid === 2 && (
                                                    <LlamaLandHighScores
                                                        data={
                                                            leaderBoards.data
                                                                .highestLlamaLandScoreWinners
                                                        }
                                                    />
                                                )}
                                            </>
                                        )}
                                    </Table>
                                </TableContainer>
                            </Flex>
                        ))}
                    </Flex>
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
                <Flex width="90%" justify="start" position="absolute">
                    <GoldenLlama hidden />
                </Flex>
            )}
            {!goldenLlama.found && goldenLlama.index === 13 && (
                <Flex width="90%" justify="end" position="absolute">
                    <GoldenLlama hidden />
                </Flex>
            )}
        </Flex>
    )
}

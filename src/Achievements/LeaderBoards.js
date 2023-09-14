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
import SevenDayStreakTable from './Tables/SevenDayStreakTable'
import { useLeaderBoards } from '../Hooks/GamificationHooks'
const LEADERBOARDS = [
    '7 day streak completed',
    'Longest streak',
    'Llama game high score',
    'Golden llamas found',
    'Prestiged',
]

export default function LeaderBoards() {
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
                                            {board}
                                        </TableCaption>
                                        {leaderBoards.data && (
                                            <>
                                                {bid === 0 && (
                                                    <SevenDayStreakTable
                                                        data={leaderBoards.data}
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
        </Flex>
    )
}

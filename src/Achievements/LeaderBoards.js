import React, { useState } from 'react'
import {
    Flex,
    IconButton,
    Tooltip,
    useToast,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import {
    LeftArrowIcon,
    RightArrowIcon,
    StarIcon,
    StarIconFilled,
    CheckmarkIcon,
} from '../ChakraDesign/Icons'
import { apiCall } from '../Util/api'
const LEADERBOARDS = [
    '7 day streak completed',
    'Longest streak',
    'Llama game high score',
    'Golden llamas found',
    'Prestiged',
]

export default function LeaderBoards({ userStats }) {
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
    const get7DayStreak = async () => {
        try {
            const data = await apiCall('GET', `/gamification/7dayStreak`)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    get7DayStreak()

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
                                        <Thead>
                                            <Tr>
                                                <Th>user</Th>
                                                <Th isNumeric>score</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            <Tr>
                                                <Td>jordboudreau@gmail.com</Td>
                                                <Td isNumeric>success</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>jordan@llamalist.com</Td>
                                                <Td isNumeric>success</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>nickguido@llamalist.com</Td>
                                                <Td isNumeric>success</Td>
                                            </Tr>
                                        </Tbody>
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

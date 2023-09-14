import React, { useState, useEffect } from 'react'
import OOModal from '../SharedComponents/OOModal'
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

const LEADERBOARDS = [
    '7 day streak completed',
    'Longest streak',
    'Llama game high score',
    'Golden llamas found',
    'Prestiged',
]

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
    const [currentBoard, setCurrentBoard] = useState(0)
    const [tab, setTab] = useState(0)
    const levelsCount = levels.length
    const boardsCount = LEADERBOARDS.length

    const prevLevel = () => {
        setCurrentLevel((s) => (s === 0 ? levelsCount - 1 : s - 1))
    }

    const nextLevel = () => {
        setCurrentLevel((s) => (s === levelsCount - 1 ? 0 : s + 1))
    }

    const prevLeaderBoard = () => {
        setCurrentBoard((s) => (s === 0 ? boardsCount - 1 : s - 1))
    }

    const nextLeaderBoard = () => {
        setCurrentBoard((s) => (s === boardsCount - 1 ? 0 : s + 1))
    }

    const carouselStyle = {
        transition: 'all .5s',
        ml: `-${currentLevel * 100}%`,
    }

    const parentCarouselStyle = {
        transition: 'all .5s',
        ml: `-${tab * 100}%`,
    }

    const boardCarouselStyle = {
        transition: 'all .5s',
        ml: `-${currentBoard * 100}%`,
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
                                        mb="64px"
                                    >
                                        <Flex
                                            w="full"
                                            overflow="hidden"
                                            pos="relative"
                                        >
                                            <Flex
                                                w="full"
                                                {...boardCarouselStyle}
                                            >
                                                {LEADERBOARDS.map(
                                                    (board, bid) => (
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
                                                                            <Th>
                                                                                user
                                                                            </Th>
                                                                            <Th
                                                                                isNumeric
                                                                            >
                                                                                score
                                                                            </Th>
                                                                        </Tr>
                                                                    </Thead>
                                                                    <Tbody>
                                                                        <Tr>
                                                                            <Td>
                                                                                jordboudreau@gmail.com
                                                                            </Td>
                                                                            <Td
                                                                                isNumeric
                                                                            >
                                                                                success
                                                                            </Td>
                                                                        </Tr>
                                                                        <Tr>
                                                                            <Td>
                                                                                jordan@llamalist.com
                                                                            </Td>
                                                                            <Td
                                                                                isNumeric
                                                                            >
                                                                                success
                                                                            </Td>
                                                                        </Tr>
                                                                        <Tr>
                                                                            <Td>
                                                                                nickguido@llamalist.com
                                                                            </Td>
                                                                            <Td
                                                                                isNumeric
                                                                            >
                                                                                success
                                                                            </Td>
                                                                        </Tr>
                                                                    </Tbody>
                                                                </Table>
                                                            </TableContainer>
                                                        </Flex>
                                                    )
                                                )}
                                            </Flex>
                                        </Flex>
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
                            </Flex>
                        </Flex>
                    </OOModal>
                )}
            </>
        )
    )
}

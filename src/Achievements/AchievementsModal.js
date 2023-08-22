import React, { useState } from 'react'
import OOModal from '../SharedComponents/OOModal'
import { Flex, Box } from '@chakra-ui/react'
import AchievmentCard from './AchievmentCard'
import LeaderboardCard from './LeaderboardCard'

export default function AchievementsModal({
    isAchievementsModalOpen,
    setIsAchievementsModalOpen,
}) {
    const [leaderboardStuff, setLeaderboardStuff] = useState({
        emoji: '🦙',
        avatarBg: 'purple.300',
    })
    const number = Array(10).fill(0)

    return (
        <OOModal
            title="Achievements"
            isOpen={isAchievementsModalOpen}
            onClose={() => setIsAchievementsModalOpen(false)}
            backgroundColor="greenFaded.100"
        >
            <Flex flexDirection="column">
                <Flex marginBottom="32px">
                    <AchievmentCard
                        topColor="purple.300"
                        bottomColor="gray.600"
                        emoji="🦙"
                        topText="Llamas found"
                        score="9"
                        bottomText="#3 overall"
                        handleClick={setLeaderboardStuff}
                    />
                    <AchievmentCard
                        topColor="green.500"
                        bottomColor="gray.600"
                        emoji="🍎"
                        topText="Baskets of apples"
                        score="44"
                        bottomText="#9 overall"
                        handleClick={setLeaderboardStuff}
                    />
                    <AchievmentCard
                        topColor="blueFaded.300"
                        bottomColor="gray.600"
                        emoji="✅"
                        topText="Weekly goals"
                        score="1/3"
                        bottomText="#1 overall"
                        handleClick={setLeaderboardStuff}
                    />
                    <AchievmentCard
                        topColor="aqua.300"
                        bottomColor="gray.600"
                        emoji="⚡️"
                        topText="Daily streak"
                        score="99"
                        bottomText="#1 overall"
                        handleClick={setLeaderboardStuff}
                    />
                </Flex>
                <Flex fontSize="lg" fontWeight="bold">
                    About
                </Flex>
                <Flex pr="24px" maxW="800px" mb="12px">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. A,
                    ipsum. Vero amet repudiandae inventore sequi corporis
                    deleniti velit ab, perferendis, rem qui pariatur libero
                    provident quasi, ipsa necessitatibus!
                </Flex>
                <Flex fontSize="lg" fontWeight="bold" mb="12px">
                    Leaderboard
                </Flex>
                <Box
                    maxHeight="420px"
                    style={{ overflow: 'scroll' }}
                    marginLeft="-8px"
                >
                    {number.map((n) => (
                        <LeaderboardCard
                            emoji={leaderboardStuff.emoji}
                            avatarBg={leaderboardStuff.avatarBg}
                            name="firstname lastname"
                            score="44"
                        />
                    ))}
                </Box>
            </Flex>
        </OOModal>
    )
}

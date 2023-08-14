import React from 'react'
import { Flex } from '@chakra-ui/react'

export default function AchievmentCard({
    topColor,
    bottomColor,
    emoji,
    topText,
    score,
    bottomText,
    handleClick,
}) {
    return (
        <Flex
            height="280px"
            width="200px"
            flexDirection="column"
            borderRadius="24px"
            boxShadow="lg"
            marginRight="24px"
            _hover={{
                cursor: 'pointer',
            }}
            onClick={() =>
                handleClick({
                    emoji,
                    avatarBg: topColor,
                })
            }
        >
            <Flex
                height="160px"
                fontSize="96px"
                justifyContent="center"
                alignItems="center"
                padding="16px"
                backgroundColor={topColor}
                borderTopLeftRadius="24px"
                borderTopRightRadius="24px"
            >
                {emoji}
            </Flex>
            <Flex
                height="120px"
                backgroundColor={bottomColor}
                color="white"
                flexDirection="column"
                justifyContent="space-between"
                padding="8px 16px"
                borderBottomLeftRadius="24px"
                borderBottomRightRadius="24px"
            >
                <Flex fontWeight="bold">{topText}</Flex>
                <Flex fontSize="24px" fontWeight="bold">
                    {score}
                </Flex>
                <Flex fontSize="14px">{bottomText}</Flex>
            </Flex>
        </Flex>
    )
}

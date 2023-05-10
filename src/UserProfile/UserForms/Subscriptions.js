import React, { useState, useEffect, useContext } from 'react'
import theme from '../../ChakraDesign/theme'
import {
    Box,
    Button,
    Flex,
    Text,
    FormLabel,
    Progress,
    Avatar,
} from '@chakra-ui/react'
import { apiCall } from '../../Util/api'
import { PaidPopUpContext } from '../../Contexts/PaidPopupContext'

export default function Subscriptions({
    user,
    totalCompleted,
    billingAmount,
    billingInterval,
}) {
    const [subscriptionPortalUrl, setSubscriptionPortalUrl] = useState('')
    const { setPaidPopup } = useContext(PaidPopUpContext)

    const getSubscriptionPortalLink = async () => {
        const data = await apiCall('POST', '/stripe/create-portal-session', {
            stripeCustomerId: user.stripeCustomerId,
        })
        setSubscriptionPortalUrl(data.url)
    }

    useEffect(() => {
        getSubscriptionPortalLink()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const FreeTier = () => (
        <Flex alignItems="center" ml="16px">
            {' '}
            Free Tier
        </Flex>
    )
    const PersonalTier = () => (
        <Flex alignItems="center" ml="16px">
            {' '}
            <Text fontSize="20px" mr="4px">
                👩‍💻
            </Text>
            Personal Tier
            <Text fontSize="20px" ml="4px">
                👩‍💻
            </Text>
        </Flex>
    )
    const ProfessionalTier = () => (
        <Flex alignItems="center" ml="16px">
            {' '}
            <Text fontSize="20px" mr="4px">
                ✨
            </Text>
            Professional Tier
            <Text fontSize="20px" ml="4px">
                ✨
            </Text>
        </Flex>
    )

    return (
        <>
            <Text variant="profile-title">Subscription info</Text>
            <Box pl="16px" w="100%">
                <FormLabel mt="16px">Current Subscription</FormLabel>
                <Flex justify="start" w="100%" mb="8px">
                    {user.stripeProductId === '' && (
                        <Flex direction="column">
                            <FreeTier />
                            {!user.isFromTeamAddition && (
                                <Button
                                    ml="16px"
                                    colorScheme="blue"
                                    onClick={() =>
                                        setPaidPopup({
                                            show: true,
                                            reason: 'Upgrade my llama list subscription.',
                                            hideButtons: false,
                                        })
                                    }
                                    alignSelf="flex-end"
                                    mt="8px"
                                >
                                    upgrade my subscription
                                </Button>
                            )}
                        </Flex>
                    )}
                    {process.env.REACT_APP_PERSONAL_SUBSCRIPTION_IDs.split(
                        ' '
                    ).includes(user.stripeProductId) && (
                        <Flex direction="column">
                            <PersonalTier />
                            {!user.isFromTeamAddition && (
                                <>
                                    <Button
                                        ml="16px"
                                        mt="8px"
                                        onClick={() =>
                                            window
                                                .open(
                                                    subscriptionPortalUrl,
                                                    '_blank'
                                                )
                                                .focus()
                                        }
                                    >
                                        manage my subscription
                                    </Button>
                                    <Button
                                        ml="16px"
                                        mt="8px"
                                        colorScheme="blue"
                                        onClick={() =>
                                            setPaidPopup({
                                                show: true,
                                                reason: 'Upgrade my llama list subscription.',
                                                hideButtons: false,
                                            })
                                        }
                                    >
                                        upgrade my subscription
                                    </Button>
                                </>
                            )}
                        </Flex>
                    )}
                    {process.env.REACT_APP_PROFESSIONAL_SUBSCRIPTION_IDs.split(
                        ' '
                    ).includes(user.stripeProductId) && (
                        <Flex direction="column">
                            <ProfessionalTier />
                            {!user.isFromTeamAddition && (
                                <Button
                                    ml="16px"
                                    mt="8px"
                                    onClick={() =>
                                        window
                                            .open(
                                                subscriptionPortalUrl,
                                                '_blank'
                                            )
                                            .focus()
                                    }
                                >
                                    manage my subscription
                                </Button>
                            )}
                        </Flex>
                    )}
                </Flex>

                {user.stripeProductId === '' && (
                    <>
                        <FormLabel mt="16px">Completion Limit</FormLabel>
                        <Text mb="4px" ml="16px">
                            {totalCompleted} completed{' '}
                            <span style={{ color: theme.colors.grey[900] }}>
                                / 15 per month
                            </span>
                        </Text>
                        <Progress
                            value={(totalCompleted / 15) * 100}
                            borderRadius="16px"
                            height="8px"
                            ml="16px"
                        />
                        <Text fontSize="12px" mt="4px" ml="16px">
                            You will be asked to upgrade when you hit your
                            completion limit
                        </Text>
                    </>
                )}
            </Box>
        </>
    )
}

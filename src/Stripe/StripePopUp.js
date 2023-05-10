import React, { useState, useEffect, useContext } from 'react'
import {
    Button,
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    Text,
    Flex,
    VStack,
    Image,
    Divider,
} from '@chakra-ui/react'
import { apiCall } from '../Util/api'
import { UserContext } from '../Contexts/UserContext'
import { PaidPopUpContext } from '../Contexts/PaidPopupContext'

export default function StripePopUp({ open, reason, hideButtons }) {
    const { user, setUser } = useContext(UserContext)
    const { paidPopUp, setPaidPopup } = useContext(PaidPopUpContext)
    const [subscriptionPortalUrl, setSubscriptionPortalUrl] = React.useState('')

    reason =
        reason?.length < 1
            ? 'Upgrade your subscription to continue using llama list.'
            : reason

    useEffect(() => {
        getSubscriptionPortalLink()
    }, [])

    useEffect(() => {
        if (open === true) {
            if (process.env.REACT_APP_ENVIRONMENT === 'production') {
                if (window.LogRocket) {
                    window.LogRocket.track('Paid Popup Opened', {
                        email: user.email,
                    })
                }
            }
        }
    }, [paidPopUp])

    useEffect(() => {
        if (user !== null && user.stripeCustomerId === '') {
            createStripeCustomer()
        }
    }, [])

    const createStripeCustomer = async () => {
        try {
            const newUserData = await apiCall('POST', `/stripe/customer`, {
                userId: user._id,
            })
            setUser(newUserData)
        } catch (error) {
            alert(error)
        }
    }

    const setOpen = () => {
        setPaidPopup({ show: false, reason: null, hideButtons: false })
    }

    const handleUpgradeClick = async (v) => {
        console.log(v)
        const data = await apiCall('POST', '/stripe/create-checkout-session', {
            lookup_key: v,
            stripeCustomerId: user.stripeCustomerId,
        })
        window.location.href = data.url
    }

    //     STARTER
    // Best for:
    // Professionals interested in simply streamlining their day-to-day tasks.

    // What you get:
    // Complete unlimited tasks
    // Access 30 days of reporting
    // View 30 days of completed tasks
    // Leverage unlimited integrations
    // Organize with unlimited task enhancements
    // Access the llama list community

    const FreeTier = {
        name: 'Free',
        price: '$0',
        featureHeader: 'Best for trying llama list out',
        features: [
            {
                emoji: '✔️',
                text: 'Unlimited inbox integrations',
            },
            {
                emoji: '✔️',
                text: 'Up to 10 completed tasks',
            },
            {
                emoji: '✔️',
                text: '7 days of reporting',
            },
        ],
    }

    const PersonalTier = {
        name: 'Personal',
        price: '$8',
        featureHeader: 'Best for Self-Starter, Busy Bee, Go-Getter',
        features: [
            {
                emoji: '✔️',
                text: 'Unlimited inbox integrations',
            },
            {
                emoji: '✔️',
                text: 'Up to 25 completed tasks',
            },
            {
                emoji: '✔️',
                text: '30 days of reporting',
            },
            {
                emoji: '✔️',
                text: 'Exclusive Access to our Community',
            },
        ],
    }

    const ProfessionalTier = {
        name: 'Professional',
        price: '$16',
        featureHeader: 'Best for the Office-Hero, System & Process BOSS',
        features: [
            {
                emoji: '✔️',
                text: 'Unlimited inbox integrations',
            },

            {
                emoji: '✔️',
                text: 'Unlimited completed tasks',
            },
            {
                emoji: '✔️',
                text: 'Unlimited reporting',
            },
            {
                emoji: '✔️',
                text: 'Exclusive Access to our Community',
            },
            {
                emoji: '✔️',
                text: 'Career Development Resources/Webinars',
            },
        ],
    }

    const ProductBox = ({ name, price, image, featureHeader, features }) => (
        <Box pl="36px" pr="36px" width="100%">
            <VStack
                minHeight={hideButtons ? '480px' : '540px'}
                justifyContent="space-between"
            >
                <Image src={image}></Image>
                <Flex
                    fontWeight="bold"
                    fontSize="26px"
                    w="100%"
                    align="flex-start"
                >
                    {name}
                </Flex>
                <Flex
                    fontWeight="500"
                    fontSize="18px"
                    alignItems="flex-start"
                    w="100%"
                    height="54px"
                >
                    {featureHeader}
                </Flex>

                <Flex
                    fontWeight="bold"
                    w="100%"
                    fontSize="46px"
                    backgroundImage="linear-gradient(90deg,#b16cea,#ff5e69 38%,#ff8a56 73%,#ffa84b)"
                    backgroundClip="text"
                    alignItems="baseline"
                >
                    {price}{' '}
                    <span
                        style={{
                            fontSize: '16px',
                            paddingBottom: -24,
                        }}
                    >
                        /month
                    </span>
                </Flex>
                {price !== '$0' && (
                    <Text
                        fontSize="xs"
                        mt="-20px !important"
                        alignSelf="flex-end"
                    >
                        when billed annually
                    </Text>
                )}
                <Divider borderColor="grey.800"></Divider>
                <Box width="100%" marginBottom="auto !important">
                    {features.map((feature) => (
                        <Flex alignItems="center" mt="8px">
                            <Text fontSize="20px" mr="12px">
                                {feature.emoji}
                            </Text>{' '}
                            {feature.text}
                        </Flex>
                    ))}
                </Box>
                {name === 'Personal' && !hideButtons && (
                    <Button
                        w="100%"
                        mt="88px !important"
                        disabled={
                            process.env.REACT_APP_PERSONAL_SUBSCRIPTION_IDs.split(
                                ' '
                            ).includes(user.stripeProductId)
                                ? true
                                : false
                        }
                        colorScheme="blue"
                        onClick={() =>
                            handleUpgradeClick(
                                process.env.REACT_APP_IND_PRICE_KEY
                            )
                        }
                    >
                        {process.env.REACT_APP_PERSONAL_SUBSCRIPTION_IDs.split(
                            ' '
                        ).includes(user.stripeProductId)
                            ? 'Current Tier'
                            : 'Select'}
                    </Button>
                )}
                {name === 'Professional' && !hideButtons && (
                    <Button
                        w="100%"
                        mt="32px !important"
                        disabled={
                            process.env.REACT_APP_PROFESSIONAL_SUBSCRIPTION_IDs.split(
                                ' '
                            ).includes(user.stripeProductId)
                                ? true
                                : false
                        }
                        colorScheme="blue"
                        onClick={() =>
                            handleUpgradeClick(
                                process.env.REACT_APP_PRO_PRICE_KEY
                            )
                        }
                    >
                        {process.env.REACT_APP_PROFESSIONAL_SUBSCRIPTION_IDs.split(
                            ' '
                        ).includes(user.stripeProductId)
                            ? 'Current Tier'
                            : 'Upgrade'}
                    </Button>
                )}
            </VStack>
        </Box>
    )

    const getSubscriptionPortalLink = async () => {
        if (user.stripeCustomerId.length > 0) {
            try {
                const data = await apiCall(
                    'POST',
                    '/stripe/create-portal-session',
                    {
                        stripeCustomerId: user.stripeCustomerId,
                    }
                )
                setSubscriptionPortalUrl(data.url)
            } catch (error) {
                alert(error)
            }
        }
    }

    return (
        <Modal isOpen={true} size={'6xl'} onClose={() => setOpen(false)}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontSize="lg" mr="16px">
                    {reason}
                </ModalHeader>
                <ModalBody pb="32px">
                    <Flex flexDirection={{ base: 'column', lg: 'row' }}>
                        <ProductBox {...FreeTier} />
                        <ProductBox {...PersonalTier} />
                        <ProductBox {...ProfessionalTier} />
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

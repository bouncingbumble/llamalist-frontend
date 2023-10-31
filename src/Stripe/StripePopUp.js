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
import { useUser } from '@clerk/clerk-react'
import ColorMeLlama from '../animations/ColorMeLlama'

export default function StripePopUp({ open }) {
    const [subscriptionPortalUrl, setSubscriptionPortalUrl] = React.useState('')
    const { user } = useUser()

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
    }, [])

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
        } catch (error) {
            alert(error)
        }
    }

    const handleUpgradeClick = () => {}

    const bronze = {
        name: 'Bronze',
        colors: {
            dark: '#775340',
            medium: '#FCBA64',
            light: '#E5A257',
        },
        price: '$3',
        period: 'month',
        featureHeader: 'Llama friend',
        features: [
            {
                emoji: '✔️',
                text: 'Have a forever llama companion',
            },
        ],
    }

    const silver = {
        name: 'Silver',
        colors: {
            dark: '#7E7E7E',
            medium: '#B5B5B5',
            light: '#CFCFCF',
        },
        price: '$20',
        period: 'year',
        featureHeader: 'Llama Legend',
        features: [
            {
                emoji: '✔️',
                text: 'Buy our 2 person team a beer',
            },
            {
                emoji: '✔️',
                text: 'Request 1 feature',
            },
        ],
    }

    const gold = {
        name: 'Gold',
        colors: {
            dark: '#9e7402',
            medium: '#d2ab37',
            light: '#d2bf37',
        },
        price: '$50',
        period: 'forever',
        featureHeader: 'Llama herder',
        features: [
            {
                emoji: '✔️',
                text: 'Never pay again',
            },

            {
                emoji: '✔️',
                text: 'Early mobile access',
            },
            {
                emoji: '✔️',
                text: 'Request 1 feature/month',
            },
        ],
    }

    const ProductBox = ({
        name,
        price,
        colors,
        featureHeader,
        features,
        period,
    }) => (
        <Box pl="36px" pr="36px" width="100%">
            <VStack height="640px" justifyContent="space-between">
                <ColorMeLlama
                    colors={colors}
                    sunnies={name === 'Gold'}
                    bowtie={name === 'Silver'}
                    minHeight={240}
                />
                <Flex
                    fontWeight="bold"
                    fontSize="26px"
                    w="100%"
                    align="flex-start"
                    mt="16px !important"
                >
                    {name}
                </Flex>
                <Flex
                    fontWeight="500"
                    fontSize="18px"
                    alignItems="flex-start"
                    w="100%"
                    height="36px"
                >
                    {featureHeader}
                </Flex>
                <Flex alignItems="baseline">
                    <Flex
                        fontWeight="bold"
                        w="100%"
                        fontSize="46px"
                        color="purpleFaded.500"
                    >
                        {price}
                    </Flex>
                    <span
                        style={{
                            fontSize: '16px',
                            paddingBottom: -24,
                        }}
                    >
                        /{period}
                    </span>
                </Flex>
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
                <Button
                    w="100%"
                    mt="auto"
                    colorScheme="purple"
                    onClick={() =>
                        handleUpgradeClick(process.env.REACT_APP_IND_PRICE_KEY)
                    }
                >
                    Select
                </Button>
            </VStack>
        </Box>
    )

    const getSubscriptionPortalLink = async () => {
        // if (user.stripeCustomerId.length > 0) {
        //     try {
        //         const data = await apiCall(
        //             'POST',
        //             '/stripe/create-portal-session',
        //             {
        //                 stripeCustomerId: user.stripeCustomerId,
        //             }
        //         )
        //         setSubscriptionPortalUrl(data.url)
        //     } catch (error) {
        //         alert(error)
        //     }
        // }
    }

    return (
        <Modal isOpen={true} size={'6xl'} onClose={() => console.log('close')}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontSize="lg" mr="16px">
                    Please select a tier to keep your llama alive
                </ModalHeader>
                <ModalBody pb="32px">
                    <Flex flexDirection={{ base: 'column', lg: 'row' }}>
                        <ProductBox {...bronze} />
                        <ProductBox {...silver} />
                        <ProductBox {...gold} />
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

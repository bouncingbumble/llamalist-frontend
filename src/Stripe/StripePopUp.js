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
import kronk from '../images/kronk.webp'
import pacha from '../images/pacha.png'
import kuzco from '../images/kuzco.png'

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

    const Kronk = {
        name: 'Kronk',
        image: kronk,
        price: '$3',
        period: 'month',
        featureHeader: "Oh yea, it's all coming together",
        features: [
            {
                emoji: '✔️',
                text: 'Have a forever llama companion',
            },
        ],
    }

    const Pacha = {
        name: 'Pacha',
        image: pacha,
        price: '$20',
        period: 'year',
        featureHeader: "C'mon, nobody's that heartless",
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

    const Kuzco = {
        name: 'Kuzco',
        image: kuzco,
        price: '$100',
        period: 'forever',
        featureHeader: 'BOOM baby, Kuzcotopia',
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
        image,
        featureHeader,
        features,
        period,
    }) => (
        <Box pl="36px" pr="36px" width="100%">
            <VStack height="640px" justifyContent="space-between">
                <Image src={image} height="240px" />
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
                        backgroundImage="linear-gradient(90deg,#b16cea,#ff5e69 38%,#ff8a56 73%,#ffa84b)"
                        backgroundClip="text"
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
                    colorScheme="blue"
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
                        <ProductBox {...Kronk} />
                        <ProductBox {...Pacha} />
                        <ProductBox {...Kuzco} />
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

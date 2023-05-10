import React, { useState, useEffect, useContext } from 'react'
import { Flex, Text, Avatar, Button, Box } from '@chakra-ui/react'
import { apiCall, stripeAPI } from '../../Util/api'
import { UserContext } from '../../Contexts/UserContext'
import { useToast } from '@chakra-ui/react'
import { CircleCheckIcon } from '../../ChakraDesign/Icons'
import ToastyBoi from '../../SharedComponents/ToastyBoi'
import YourInfo from './YourInfo'
import Customization from './Customization'
import Integrations from './Integrations'
import Subscriptions from './Subscriptions'

export default function FormContainer({ section }) {
    const toaster = useToast()
    const { user, setUser } = useContext(UserContext)

    const [totalCompleted, setTotalCompleted] = useState(0)
    const [billingAmount, setBillingAmount] = useState(0)
    const [billingInterval, setBillingInterval] = useState('month')
    const [profilePhoto, setProfilePhoto] = useState(null)
    const [profileText, setProfileText] = useState('')

    const submit = async (newValues) => {
        try {
            const newUserData = await apiCall(
                'PUT',
                `/users/${user._id}`,
                newValues
            )
            toaster({
                status: 'success',
                duration: 3000,
                isClosable: true,
                render: () => (
                    <ToastyBoi
                        message={'Settings successfully saved!'}
                        icon={<CircleCheckIcon fill="white" />}
                        backgroundColor="purple.500"
                    />
                ),
            })
            setUser(newUserData)
        } catch (error) {
            console.log(error)
        }
    }

    const getSubscriptionInfo = async () => {
        try {
            if (user.stripeProductId === '') {
                const numCompletedChecklistsTasks = await apiCall(
                    `GET`,
                    `/users/${user._id}/completed`
                )
                setTotalCompleted(numCompletedChecklistsTasks)
            } else {
                const customer = await stripeAPI(
                    `GET`,
                    `/customers/${user.stripeCustomerId}?expand[]=subscriptions`
                )

                const plan = customer.subscriptions.data[0]?.items.data[0].plan
                setBillingAmount(plan.amount / 100)
                setBillingInterval(plan.interval)
            }
        } catch (error) {}
    }

    useEffect(() => {
        if (user.profilePhotoUrl === '') {
            setProfileText('add')
        } else {
            setProfilePhoto(user.profilePhotoUrl)
            setProfileText('edit')
        }
        getSubscriptionInfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Flex
            direction="column"
            justify="center"
            align="center"
            maxW="400px"
            ml={{ base: 'auto', md: 'auto' }}
            mr={{ base: 'auto', md: 'auto' }}
            pl={{ base: '2px', md: '' }}
            pr={{ base: '2px', md: '' }}
        >
            <Flex>
                <Text ml="16px" fontSize="28px" fontWeight="bold">
                    {user.name}
                </Text>
            </Flex>
            {section === 0 && <YourInfo user={user} submit={submit} />}
            {section === 3 && <Customization user={user} submit={submit} />}
            {section === 4 && <Integrations user={user} submit={submit} />}
            {section === 6 && (
                <Subscriptions
                    user={user}
                    totalCompleted={totalCompleted}
                    billingAmount={billingAmount}
                    billingInterval={billingInterval}
                />
            )}
        </Flex>
    )
}

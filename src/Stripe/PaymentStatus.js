import React, { useState, useEffect, useContext } from 'react'
import { apiCall } from '../Util/api'
import { useToast } from '@chakra-ui/react'
import { useStripe } from '@stripe/react-stripe-js'
import { UserContext } from '../Contexts/UserContext'
import { CircleCheckIcon } from '../ChakraDesign/Icons'
import ToastyBoi from '../SharedComponents/ToastyBoi'

const PaymentStatus = () => {
    // context
    const { user, setUser } = useContext(UserContext)

    const stripe = useStripe()
    const [message, setMessage] = useState(null)
    const toast = useToast()

    useEffect(() => {
        if (!stripe) {
            return
        }

        everything()
    }, [stripe])

    const everything = async () => {
        try {
            // Retrieve the "setup_intent_client_secret" query parameter appended to
            // your return_url by Stripe.js
            const clientSecret = new URLSearchParams(
                window.location.search
            ).get('setup_intent_client_secret')

            // Retrieve the SetupIntent
            const { setupIntent } = await stripe.retrieveSetupIntent(
                clientSecret
            )

            // Inspect the SetupIntent `status` to indicate the status of the payment
            // to your customer.
            //
            // Some payment methods will [immediately succeed or fail][0] upon
            // confirmation, while others will first enter a `processing` state.
            //
            // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
            console.log(setupIntent)
            switch (setupIntent.status) {
                case 'succeeded':
                    await apiCall('POST', '/stripe/attachPaymentMethod', {
                        pm: setupIntent.payment_method,
                        stripeCustomerId: user.stripeCustomerId,
                    })

                    await apiCall('POST', `/stripe/subscription`, {
                        stripeCustomerId: user.stripeCustomerId,
                        priceId: user.priceId,
                    })

                    const newUserData = await apiCall(
                        'PUT',
                        `/users/${user._id}`,
                        {
                            isWalkthroughComplete: true,
                        }
                    )
                    setUser(newUserData)

                    toast({
                        duration: 3000,
                        render: () => (
                            <ToastyBoi
                                message="Thank you for trying llama list"
                                icon={<CircleCheckIcon fill="white" />}
                                backgroundColor="purple.500"
                            />
                        ),
                    })

                    break

                case 'processing':
                    setMessage(
                        "Processing payment details. We'll update you when processing is complete."
                    )
                    break

                case 'requires_payment_method':
                    // Redirect your user back to your payment page to attempt collecting
                    // payment again
                    toast({
                        duration: 3000,
                        render: () => (
                            <ToastyBoi
                                message="Failed to process payment details. Please contact us for more info."
                                icon={<CircleCheckIcon fill="white" />}
                                backgroundColor="red.500"
                            />
                        ),
                    })
                    break
            }
        } catch (error) {
            alert(error)
        }
    }

    return <span></span>
}

export default PaymentStatus

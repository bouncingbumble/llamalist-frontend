import React, { useState, useEffect, useContext, useRef } from 'react'
import TasksList from './TasksList'
import TasksNavLeft from './TasksNavLeft'
import { UserContext } from '../Contexts/UserContext'
import { apiCall } from '../Util/api'
import {
    Flex,
    Button,
    VStack,
    Box,
    Container,
    Grid,
    GridItem,
} from '@chakra-ui/react'
import useLocalStorage from '../Hooks/UseLocalStorage'
import io from 'socket.io-client'
import SearchTasksList from './SearchTasksList'
import SearchInput from '../Navbar/SearchInput'
import { useParams, useNavigate } from 'react-router-dom'
import PaymentStatus from '../Stripe/PaymentStatus'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { TasksContext } from '../Contexts/TasksContext'
import { LabelsContext } from '../Contexts/LabelsContext'
import LabelsFilter from './LabelsFilter'
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

export default function TasksContainer(props) {
    const { user, setUser } = useContext(UserContext)
    const { section } = useParams()
    const navigate = useNavigate()

    const [isSearching, setIsSearching] = useState(false)
    const [isLoading, setIsLoading] = useState(null)
    const [isInitialLoadDone, setIsInitialLoadDone] = useState(false)
    const { getUsersLabels } = useContext(LabelsContext)
    const {
        tasks,
        setTasks,
        tasksRef,
        numCompletedTasks,
        setNumCompletedTasks,
        isSearchActive,
    } = useContext(TasksContext)

    // ref so socket.io can access current state
    const sectionRef = useRef(section)

    //grab all the users tasks on load
    useEffect(() => {
        Promise.all([
            getTasks(),
            getNumCompletedTasks(),
            getUsersLabels(),
        ]).then((d) => {
            setIsInitialLoadDone(true)
        })
    }, [])

    const getTasks = async () => {
        setIsLoading(true)
        let tasks = await apiCall('get', `/users/${user._id}/tasks`)

        // make tasks array be in the proper order for dnd purposes
        tasks = tasks.sort((a, b) => a.position - b.position)

        setTasks(tasks)

        setIsLoading(false)
    }

    const getNumCompletedTasks = async () => {
        const num = await apiCall(
            'get',
            `/users/${user._id}/tasks/numCompleted`
        )

        setNumCompletedTasks(num)
    }

    const getSectionTotals = () => {
        const totals = []

        return totals
    }

    return (
        <Container maxW="100%">
            <Flex>
                <Flex minWidth="160px" mt="48px">
                    <VStack width="100%" filter={isSearchActive && 'blur(3px)'}>
                        <TasksNavLeft
                            sectionTotals={getSectionTotals}
                            numberOfDueDateTasks={
                                tasks.filter((t) => t.due).length
                            }
                            setSection={(section) =>
                                navigate(`/tasks/${section}`)
                            }
                            section={section}
                        />
                    </VStack>
                </Flex>
                <Grid
                    templateRows="repeat(1, 1fr)"
                    templateColumns="repeat(12, 1fr)"
                    width="100%"
                >
                    <GridItem colSpan={12}>
                        <Flex flexDir="column" width="100%">
                            {section !== 4 && !isSearchActive && (
                                <Flex
                                    width="100%"
                                    alignItems="center"
                                    justifyContent={'space-between'}
                                    flexDirection={{
                                        base: 'column',
                                        sm: 'row',
                                    }}
                                >
                                    <LabelsFilter />
                                    <Flex>
                                        <Flex>streaks/achievements/goals</Flex>
                                        <Flex
                                            height="48px"
                                            width="48px"
                                            justifyContent="center"
                                            alignItems="center"
                                            bg="purple.500"
                                            borderRadius="50%"
                                            color="white"
                                        >
                                            JB
                                        </Flex>
                                    </Flex>
                                </Flex>
                            )}
                        </Flex>
                        <Flex>
                            {props.paymentStatus && (
                                <StripeWrapper user={user}>
                                    <PaymentStatus />
                                </StripeWrapper>
                            )}
                            {!isSearchActive && isInitialLoadDone && (
                                <TasksList />
                            )}
                            {isSearchActive && (
                                <SearchTasksList
                                    section={section}
                                    isSearching={isSearching}
                                />
                            )}
                        </Flex>
                    </GridItem>
                </Grid>
            </Flex>
        </Container>
    )
}

const StripeWrapper = (props) => {
    const [stripeIntentSecret, setStripeIntentSecret] = useState(null)

    useEffect(() => {
        if (
            !props.user?.stripeProductId ||
            (props.user.stripeProductId && props.user.isFromTeamAddition)
        ) {
            getIntent()
        }
    }, [])

    const getIntent = async () => {
        try {
            const data = await apiCall('POST', `/stripe/intent`, {
                stripeCustomerId: props.user?.stripeCustomerId,
            })

            setStripeIntentSecret(data.secret)
        } catch (error) {
            alert(error)
        }
    }

    return stripeIntentSecret !== null ? (
        <Elements
            stripe={stripePromise}
            options={{
                clientSecret: stripeIntentSecret,
            }}
        >
            {props.children}
        </Elements>
    ) : (
        props.children
    )
}

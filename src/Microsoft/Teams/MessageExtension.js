import React, { useState } from 'react'
import Llama from '../../animations/java-llama-react/Llama'
import { apiCall } from '../../Util/api'
import { app, tasks } from '@microsoft/teams-js'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { setTokenHeader } from '../../Util/api'
import { useQueryClient } from '@tanstack/react-query'
import { useUserSettings } from '../../Hooks/UserHooks'
import { Text, Flex, Input, Button, Checkbox, Divider } from '@chakra-ui/react'

export default function MessageExtension() {
    // init MS and grab query params
    app.initialize()
    const searchParams = new URLSearchParams(window.location.search)

    // set initial vars
    const link = searchParams.get('link')
    const message = searchParams.get('message')
    const initialTask = message ? message.replace(/(<([^>]+)>)/gi, '') : ''

    // hooks
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const userSettings = useUserSettings()

    // state
    const [success, setSuccess] = useState(false)
    const [failure, setFailure] = useState(false)
    const [taskName, setTaskName] = useState(initialTask)

    // handlers
    const handleSetTaskName = (event) => {
        const newTaskName = event.target.value
        if (newTaskName.length < 80) {
            setTaskName(newTaskName)
        } else {
            alert(
                'Please limit the length of your task name. Use the notes section for more details.'
            )
        }
    }

    const handleSubmit = async () => {
        // setup task object
        const id = uuidv4()
        const htmlNotes = `<p><a href="${link}">${link}</a></p>`

        try {
            // create new task
            await apiCall('POST', '/tasks', {
                key: id,
                isInbox: true,
                name: taskName,
                notes: htmlNotes,
            })

            // notify success or failure
            setSuccess(true)
        } catch (error) {
            setFailure(true)
        }

        // close MS task dialog
        setTimeout(() => {
            tasks.submitTask()
        }, 2000)
    }

    const handleSignOut = async () => {
        // clear user info
        setTokenHeader(null)
        queryClient.removeQueries()
        localStorage.removeItem('jwtToken')
        localStorage.setItem('llamaLocation', 0)

        // go to sign in with search params
        navigate(`/signIn/${window.location.search}&isExtension=true`)
    }

    return (
        <Flex
            width="100%"
            height="100vh"
            direction="column"
            padding="16px 24px"
            bg="purpleFaded.100"
        >
            {userSettings.data && (
                <>
                    {success ? (
                        <Flex
                            width="100%"
                            height="100%"
                            align="center"
                            justify="center"
                            direction="column"
                        >
                            <Llama
                                noAccessories
                                minHeight={150}
                                progress={[0, 10]}
                            />
                            <Text
                                mt="16px"
                                fontSize="22px"
                                fontWeight="bold"
                                color="purple.500"
                            >
                                {userSettings.data.llamaName} got it!
                            </Text>
                        </Flex>
                    ) : failure ? (
                        <Flex
                            width="100%"
                            height="100%"
                            align="center"
                            justify="center"
                            direction="column"
                        >
                            <Text fontWeight="bold" fontSize="20px">
                                Something went wrong :(
                            </Text>
                            <Text>Please try again</Text>
                        </Flex>
                    ) : (
                        <>
                            <Flex p="0px 4px" justify="space-between">
                                <Text fontWeight="bold">
                                    {userSettings.data.email}
                                </Text>
                                <Text
                                    cursor="pointer"
                                    fontWeight="bold"
                                    color="purple.500"
                                    onClick={handleSignOut}
                                >
                                    Sign Out
                                </Text>
                            </Flex>
                            <Divider
                                mt="4px"
                                mb="24px"
                                borderColor="gray.800"
                            />
                            <Flex
                                bg="white"
                                p="20px 16px"
                                boxShadow="lg"
                                align="center"
                                cursor="pointer"
                                borderRadius="md"
                                flexDirection="column"
                            >
                                <Flex width="100%" align="center">
                                    <Flex alignItems="center">
                                        <Checkbox
                                            size="lg"
                                            colorScheme="purple"
                                            borderColor="gray.900"
                                        />
                                    </Flex>
                                    <Input
                                        autoFocus
                                        ml="8px"
                                        size="lg"
                                        type="text"
                                        border="none"
                                        height="30px"
                                        fontSize="18px"
                                        value={taskName}
                                        padding="1px 4px 2px 4px"
                                        placeholder="task name..."
                                        onChange={handleSetTaskName}
                                        _focus={{
                                            boxShadow: 'none',
                                            borderWidth: '0px',
                                            backgroundColor:
                                                'rgba(118, 61, 225, 0.1)',
                                        }}
                                    />
                                </Flex>
                            </Flex>
                            <Flex mt="24px" justify="center">
                                <Button
                                    size="lg"
                                    colorScheme="purple"
                                    onClick={handleSubmit}
                                >
                                    Send to {userSettings.data.llamaName}
                                </Button>
                            </Flex>
                        </>
                    )}
                </>
            )}
        </Flex>
    )
}

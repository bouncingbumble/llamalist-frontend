import React, { useState, useEffect } from 'react'
import { useClerk, useUser } from '@clerk/clerk-react'
import LLModal from '../SharedComponents/LLModal'
import GoldenLlama from '../animations/goldenLlama/GoldenLlama'
import { apiCall } from '../Util/api'
import ToastyBoi from '../SharedComponents/ToastyBoi'
import parsePhoneNumber from 'libphonenumber-js'
import {
    Flex,
    Avatar,
    Accordion,
    AccordionItem,
    AccordionPanel,
    AccordionButton,
    Box,
    AccordionIcon,
    Button,
    Input,
    Text,
    useToast,
    InputGroup,
    InputLeftAddon,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useUpdateUserSettings, useUserSettings } from '../Hooks/UserHooks'

export default function UserProfile({ goldenLlama, setGoldenLlama }) {
    const updateUserSettings = useUpdateUserSettings()
    const userSettings = useUserSettings()

    const [isUserProfileOpen, setIsUserProfileOpen] = useState(false)
    const [isThrowAnAppleFieldOpen, setIsThrowAnAppleFieldOpen] =
        useState(false)
    const [email, setEmail] = useState('')

    const toast = useToast()
    const { signOut } = useClerk()
    const { user } = useUser()
    const [phoneNumber, setPhoneNumber] = useState('')
    const [shouldShowPhoneInput, setShouldShowPhoneInput] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        if (user.phoneNumbers[0]) {
            setShouldShowPhoneInput(false)
            setPhoneNumber(user.phoneNumbers[0].phoneNumber)
        }
    }, [user])

    const handleClose = () => {
        setIsUserProfileOpen(false)
    }

    const handleSignOut = () => {
        localStorage.setItem('llamaLocation', 0)
        signOut()
    }

    const onEmailEnter = async () => {
        await apiCall('POST', `/emails/throwAnApple`, { email })
        setEmail('')
        setIsThrowAnAppleFieldOpen(false)
        toast({
            duration: 3000,
            render: () => (
                <ToastyBoi
                    message="Critical hit! Email sent."
                    icon={<Text fontSize="18px">🍎</Text>}
                    backgroundColor="purple.500"
                />
            ),
        })
    }

    const onPhoneEnter = async () => {
        let phoneNumberFormatted = parsePhoneNumber('+1' + phoneNumber)

        if (phoneNumberFormatted === undefined) {
            alert('Please format your number like so: 805-111-2222')
        } else {
            phoneNumberFormatted = phoneNumberFormatted.format('E.164')
            try {
                updateUserSettings.mutate({
                    ...userSettings.data,
                    phoneNumber: phoneNumberFormatted,
                })
                setShouldShowPhoneInput(false)
                setPhoneNumber(phoneNumberFormatted)
                toast({
                    duration: 3000,
                    render: () => (
                        <ToastyBoi
                            message="Phone number added"
                            icon={<Text fontSize="18px">✅</Text>}
                            backgroundColor="purple.500"
                        />
                    ),
                })
            } catch (err) {
                alert(err)
            }
        }
    }

    return (
        <>
            <Avatar
                name={user.fullName}
                backgroundColor="aquaFaded.500"
                color="gray.800"
                size="sm"
                mr="12px"
                onClick={() => setIsUserProfileOpen(true)}
            />
            {isUserProfileOpen && (
                <LLModal
                    title=""
                    isOpen={isUserProfileOpen}
                    onClose={handleClose}
                    backgroundColor="greenFaded.100"
                >
                    <Flex
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                    >
                        <Avatar
                            name={user.fullName}
                            size="lg"
                            bg="purple.500"
                            onClick={() => user.setProfileImage()}
                        />
                        <Flex fontSize="32px" mt="16px">
                            {user.fullName}
                        </Flex>
                        <Flex>{user.emailAddresses[0].emailAddress}</Flex>
                        {!shouldShowPhoneInput ? (
                            <Flex>{phoneNumber}</Flex>
                        ) : (
                            <InputGroup
                                size="sm"
                                justifyContent="center"
                                mt="8px"
                            >
                                <InputLeftAddon
                                    children="+1"
                                    focusBorderColor="purple.500"
                                />
                                <Input
                                    type="tel"
                                    placeholder="Phone number"
                                    size="sm"
                                    width="160px"
                                    autoFocus
                                    focusBorderColor="purple.500"
                                    value={phoneNumber}
                                    onChange={(e) =>
                                        setPhoneNumber(e.target.value)
                                    }
                                    onKeyDown={(e) =>
                                        e.key === 'Enter' && onPhoneEnter()
                                    }
                                />
                            </InputGroup>
                        )}
                        <Accordion
                            allowToggle
                            border="none"
                            borderRadius="8px"
                            maxW="640px"
                            mt="16px"
                        >
                            <AccordionItem border="none" borderRadius="8px">
                                <AccordionButton
                                    display="flex"
                                    flexDirection="column"
                                >
                                    <Box as="span" flex="1" pl="16px" pt="8px">
                                        The wind whistles through the trees,
                                        carrying the earthy scent of hay. You’re
                                        confronted with a refreshing reminder
                                        that outside the confines of a gray,
                                        cubicle-walled existence, there is a
                                        world pulsing with life. . . .
                                    </Box>

                                    <AccordionPanel pb={4} mt="16px">
                                        A distant relative has passed away,
                                        leaving you a small, run-down llama farm
                                        in the countryside. The farm, once
                                        thriving and full of life, has fallen
                                        into disrepair, and you are the last
                                        hope for survival. The barn needs
                                        repairs, the fences are falling down,
                                        and the llamas, a motley crew of
                                        scruffy, endearing creatures, are in
                                        desperate need of care and attention.{' '}
                                        <br /> <br />
                                        It may seem daunting, but as you roll up
                                        your sleeves and get to work, you feel a
                                        sense of purpose that has been missing.
                                        Each small task, from mending a broken
                                        fence to grooming the llamas, is a step
                                        towards something greater. Running a
                                        llama farm is no small feat, but the
                                        sense of accomplishment at the end of
                                        each day is unlike anything any other
                                        experience. Through small, everyday
                                        tasks, you’ll create something
                                        meaningful and fulfilling. Trade your
                                        suit and tie for work boots and
                                        overalls, and break out of monotony with
                                        playful adventures, one apple at a time!
                                    </AccordionPanel>
                                    <AccordionIcon />
                                </AccordionButton>
                            </AccordionItem>
                        </Accordion>
                        <Flex flexDirection="column" mt="24px">
                            <Button
                                variant="profile"
                                onClick={() => navigate('/completed')}
                            >
                                Completed Tasks
                            </Button>

                            <Button
                                variant="profile"
                                mt="12px"
                                onClick={() =>
                                    setIsThrowAnAppleFieldOpen(
                                        !isThrowAnAppleFieldOpen
                                    )
                                }
                                o
                            >
                                Throw an apple at a friend
                            </Button>
                            {isThrowAnAppleFieldOpen && (
                                <Flex flexDir="column" mt="12px">
                                    <Text
                                        fontSize="sm"
                                        textAlign="center"
                                        mt="8px"
                                    >
                                        Let a friend know about llama list{' '}
                                        <br /> with a friendly bop
                                    </Text>
                                    <Input
                                        placeholder="Your friend's email"
                                        size="md"
                                        width="100%"
                                        autoFocus
                                        focusBorderColor="purple.500"
                                        mt="8px"
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        onKeyDown={(e) =>
                                            e.key === 'Enter' && onEmailEnter()
                                        }
                                    />
                                    <Button
                                        size="lg"
                                        colorScheme="purple"
                                        mt="8px"
                                        onClick={onEmailEnter}
                                    >
                                        throw
                                    </Button>
                                </Flex>
                            )}
                            <Button
                                mt="12px"
                                variant="profile"
                                onClick={handleSignOut}
                            >
                                Sign out
                            </Button>
                        </Flex>
                    </Flex>
                    {!goldenLlama.found && goldenLlama.index === 10 && (
                        <Flex justify="start" position="absolute" width="90%">
                            <GoldenLlama
                                hidden
                                goldenLlama={goldenLlama}
                                setGoldenLlama={setGoldenLlama}
                            />
                        </Flex>
                    )}
                    {!goldenLlama.found && goldenLlama.index === 11 && (
                        <Flex justify="end" position="absolute" width="90%">
                            <GoldenLlama
                                hidden
                                goldenLlama={goldenLlama}
                                setGoldenLlama={setGoldenLlama}
                            />
                        </Flex>
                    )}
                </LLModal>
            )}
        </>
    )
}

import React, { useState } from 'react'
import { useClerk, useUser } from '@clerk/clerk-react'
import OOModal from '../SharedComponents/OOModal'
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
    Spacer,
} from '@chakra-ui/react'

export default function UserProfile() {
    const [isUserProfileOpen, setIsUserProfileOpen] = useState(false)
    const { signOut } = useClerk()
    const { user } = useUser()

    const handleClose = () => {
        setIsUserProfileOpen(false)
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
                <OOModal
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
                            <Button variant="profile">Completed Tasks</Button>

                            <Button variant="profile" mt="12px">
                                Throw an apple at a friend
                            </Button>
                            <Button
                                variant="profile"
                                onClick={() => signOut()}
                                mt="12px"
                            >
                                Sign out
                            </Button>
                        </Flex>
                    </Flex>
                </OOModal>
            )}
        </>
    )
}

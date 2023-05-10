import React, { useContext, useState, useEffect } from 'react'
import {
    Flex,
    Center,
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Text,
    RadioGroup,
    Radio,
    Checkbox,
    Box,
    FormLabel,
    Button,
} from '@chakra-ui/react'
import { Logo } from './Logo'
import {
    TasksIcon,
    ProfileIcon,
    SignOutIcon,
    CreditCardIcon,
    CommunityIcon,
} from '../ChakraDesign/Icons'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { UserContext } from '../Contexts/UserContext'
import { setTokenHeader } from '../Util/api'
import MissedNotifications from './MissedNotifications'
import { sub, add } from 'date-fns'
import DatePicker from '../SharedComponents/DatePicker'
import OOModal from '../SharedComponents/OOModal'
import { PaidPopUpContext } from '../Contexts/PaidPopupContext'

export default function Navbar({
    mobileMenu,
    searchInput,
    setIsTemplatesOpen,
    setIsSetupGuideOpen,
}) {
    const { user, setUser } = useContext(UserContext)
    const location = useLocation()
    const navigate = useNavigate()
    const { setPaidPopup } = useContext(PaidPopUpContext)
    const handleSignOut = () => {
        localStorage.removeItem('llamaListJwtToken')
        localStorage.removeItem('zenMode')
        localStorage.removeItem('hasSeenIntegrations')
        setUser(null)
        setTokenHeader(null)
        navigate(`/signin`)
    }

    useEffect(() => {
        if (window.location.href.indexOf('upgrade') > -1) {
            setPaidPopup({
                show: true,
                reason: 'Upgrade your plan to get the most out of llama list.',
                hideButtons: false,
            })
        }
    }, [])

    return (
        <Flex justifyContent="center" w="100%" mb="16px">
            <Flex
                h="72px"
                w="100%"
                maxW="container.xl"
                justifyContent="space-between"
                pl="4px"
            >
                <Center>
                    <Logo />
                </Center>
                {location.pathname === '/tasks' && (
                    <Center display={{ base: 'none', md: 'flex' }}>
                        {searchInput}
                    </Center>
                )}
                <Center
                    display={{ base: 'flex', md: 'none' }}
                    alignSelf="center"
                >
                    {mobileMenu}
                </Center>
                <Center ml="16px">
                    <Menu>
                        <MenuButton>
                            <Avatar
                                name={user.name}
                                bg="purple.500"
                                fontWeight="normal"
                                color="white"
                                src={user.profilePhotoUrl}
                            />
                        </MenuButton>
                        <MenuList>
                            <Link to="/userprofile/info">
                                <MenuItem icon={<ProfileIcon />}>
                                    Profile
                                </MenuItem>
                            </Link>
                            {!location.pathname.includes('/userprofile') && (
                                <Link to="/userprofile/subscription">
                                    <MenuItem
                                        icon={
                                            <CreditCardIcon
                                                style={{
                                                    marginLeft: 1,
                                                    height: 22,
                                                    width: 22,
                                                }}
                                            />
                                        }
                                    >
                                        Subscription
                                    </MenuItem>
                                </Link>
                            )}
                            <Link to="/tasks">
                                <MenuItem icon={<TasksIcon />}>Tasks</MenuItem>
                            </Link>

                            <MenuItem
                                icon={<SignOutIcon />}
                                onClick={handleSignOut}
                            >
                                Sign Out
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Center>
            </Flex>
        </Flex>
    )
}

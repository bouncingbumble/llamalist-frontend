import React, { useContext } from 'react'
import { apiCall, setTokenHeader } from '../../Util/api'
import { SignOutIcon } from '../../ChakraDesign/Icons'
import { UserContext } from '../../Contexts/UserContext'
import { TasksContext } from '../../Contexts/TasksContext'
import {
    Text,
    Flex,
    Menu,
    VStack,
    Avatar,
    Divider,
    MenuList,
    MenuItem,
    MenuButton,
} from '@chakra-ui/react'
import Logo from '../Logo'

export default function TeamsCreateTask({ hostName, setIsSignedIn }) {
    const { createTask } = useContext(TasksContext)
    const { user, setUser } = useContext(UserContext)

    const signOutUser = async () => {
        localStorage.removeItem('msllamaListJwtToken')
        localStorage.removeItem('ooProfilePhoto')
        const response = await apiCall(`POST`, `/msteams/signout/${user._id}`)
        if (response.message === 'success') {
            setUser(null)
            setIsSignedIn(false)
            setTokenHeader(null)
        }
    }

    const handleCreateTask = async ({ description }) => {
        const label = hostName !== '' ? hostName : 'Microsoft'
        const updatedDescription = `${description} #${label}`

        const taskData = {
            description: updatedDescription,
            requestedBy: `MS-${hostName}-Tab`,
        }
        createTask(taskData, 1)
    }

    return (
        <VStack
            mt="0px"
            bg="white"
            width="80%"
            borderRadius="md"
            overflow="visible"
            paddingTop="24px"
            paddingLeft="48px"
            paddingRight="48px"
            paddingBottom="24px"
        >
            <Flex justify="space-between" w="100%">
                <Logo taskCard={true} />
                <Menu isLazy offset={[-136, 0]}>
                    <MenuButton>
                        <Avatar
                            color="white"
                            bg="purple.500"
                            cursor="pointer"
                            fontWeight="normal"
                            marginBottom="16px"
                            name={user.name}
                            src={user.profilePhotoUrl}
                        />
                    </MenuButton>
                    <MenuList>
                        <Text fontSize="18px">{user.name}</Text>
                        <Text color="gray.500">{user.email}</Text>
                        <Divider mt="8px" mb="8px" color="gray.600" />
                        <MenuItem icon={<SignOutIcon />} onClick={signOutUser}>
                            Sign Out
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
            <Text color="gray.500" alignSelf="start" pl="16px" fontSize="14px">
                *select an urgency by typing '#' and entering a section
            </Text>
        </VStack>
    )
}

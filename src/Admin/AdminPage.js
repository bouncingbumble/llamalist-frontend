import React, { useState, useEffect } from 'react'
import { apiCall } from '../Util/api'
import { Flex, Box, Button } from '@chakra-ui/react'
import EditUser from './EditUser'
import NewFeatureModal from './NewFeatureModal'

export default function AdminPage({ user }) {
    const [users, setUsers] = useState([])
    const [userToEdit, setUserToEdit] = useState(null)
    const [newFeatureModal, setNewFeatureModal] = useState(false)

    const getUsers = async () => {
        const newUsers = await apiCall('GET', `/admin/${user._id}/users`)
        setUsers(newUsers)
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <Flex direction="column" align="center" w="1080px" margin="32px auto">
            <Button
                size="lg"
                colorScheme="blue"
                onClick={() => setNewFeatureModal(true)}
            >
                new feature alert!
            </Button>
            {users.map((user) => (
                <Box
                    w="100%"
                    mt="16px"
                    p="16px"
                    cursor="pointer"
                    borderRadius="8px"
                    boxShadow="0 8px 16px 0 rgba(56, 96, 165, 0.15)"
                >
                    <Flex
                        p="8px"
                        w="100%"
                        align="center"
                        justify="space-between"
                        fontSize="17px"
                    >
                        <Box w="25%" textAlign="left" pl="2%">
                            {user.name}
                        </Box>
                        <Box w="25%" textAlign="left" pl="2%">
                            {user.email}
                        </Box>
                        <Box w="25%" textAlign="left" pl="6.25%">
                            {user.phone}
                        </Box>
                        <Box w="25%" textAlign="left" pl="6.25%">
                            <Button
                                id="edit-user"
                                backgroundColor="purple.500"
                                color="white"
                                w="120px"
                                height="48px"
                                fontSize="14px"
                                _hover={{ backgroundColor: 'blue.600' }}
                                onClick={() => setUserToEdit(user)}
                            >
                                edit user
                            </Button>
                        </Box>
                    </Flex>
                </Box>
            ))}
            {userToEdit && (
                <EditUser
                    admin={user}
                    user={userToEdit}
                    setUser={setUserToEdit}
                    getUsers={getUsers}
                />
            )}
            {newFeatureModal && (
                <NewFeatureModal
                    admin={user}
                    isOpen={newFeatureModal}
                    onClose={() => setNewFeatureModal(false)}
                />
            )}
        </Flex>
    )
}

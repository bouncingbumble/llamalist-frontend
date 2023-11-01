import { VStack, Button } from '@chakra-ui/react'
import { apiCall, setTokenHeader } from '../../../Util/api'

export default function TaskCard({ link, userId, message, setUserId }) {
    const signOut = async () => {
        const response = await apiCall(`POST`, `/msteams/signout/${userId}`)
        if (response.message === 'success') {
            setUserId(null)
            setTokenHeader(null)
            localStorage.removeItem('msllamaListJwtToken')
        }
    }

    return (
        <VStack>
            <Button colorScheme="purple" onClick={signOut}>
                Sign Out
            </Button>
        </VStack>
    )
}

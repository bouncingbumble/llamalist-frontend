import { apiCall, setTokenHeader } from '../Util/api'
import { useQuery } from '@tanstack/react-query'

const getUser = () => {
    const codedToken = localStorage.getItem('llamaListJwtToken')
    if (codedToken) {
        //should move setting header to signup and signin functions only but leaving for now
        setTokenHeader(codedToken)

        return apiCall('get', ``)
    } else {
        window.location = '/signin'
    }
}

const signInUser = async (userData) => {
    const data = await apiCall('post', `/auth/signin`, userData)
    const token = data.token
    localStorage.setItem('llamaListJwtToken', token)
    setTokenHeader(token)
}

export const useUserQuery = ({ userId }) => useQuery(['user', userId], getUser)

export const useUserSignInQuery = ({ userFormData }) =>
    useQuery(['signin', userFormData], signInUser)

export const useUser = () => useQuery({ queryKey: ['user'], queryFn: getUser })

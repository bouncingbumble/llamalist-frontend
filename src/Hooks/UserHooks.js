import jwtDecode from 'jwt-decode'
import { apiCall, setTokenHeader } from '../Util/api'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

const getUser = () => {
    const codedToken = localStorage.getItem('llamaListJwtToken')
    if (codedToken) {
        //should move setting header to signup and signin functions only but leaving for now
        setTokenHeader(codedToken)
        const decoded = jwtDecode(codedToken)

        return apiCall('get', `/users/${decoded._id}`)
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

export function useUserQuery({ userId }) {
    return useQuery(['user', userId], getUser)
}

export function useUserSignInQuery({ userFormData }) {
    return useQuery(['signin', userFormData], signInUser)
}

export const useUser = () => useQuery({ queryKey: ['user'], queryFn: getUser })

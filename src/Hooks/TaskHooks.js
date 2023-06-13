import jwtDecode from 'jwt-decode'
import { apiCall } from '../Util/api'
import { useQuery } from '@tanstack/react-query'

const getTasks = async () => {
    const codedToken = localStorage.getItem('llamaListJwtToken')
    const decoded = jwtDecode(codedToken)
    return await apiCall('get', `/users/${decoded._id}/tasks`)
}

export const useTasks = () =>
    useQuery({ queryKey: ['tasks'], queryFn: getTasks })

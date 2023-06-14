import jwtDecode from 'jwt-decode'
import { apiCall } from '../Util/api'
import { useQuery } from '@tanstack/react-query'

const getLabels = async () => {
    const codedToken = await localStorage.getItem('llamaListJwtToken')
    const decoded = jwtDecode(codedToken)
    return await apiCall('get', `/users/${decoded._id}/labels`)
}

export const useLabels = () =>
    useQuery({ queryKey: ['labels'], queryFn: getLabels })

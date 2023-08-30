import { apiCall } from '../Util/api'
import { useQuery } from '@tanstack/react-query'

const getUserStats = () => {
    return apiCall('GET', `/stats`)
}

export const useUserStats = () =>
    useQuery({ queryKey: ['userStats'], queryFn: getUserStats })

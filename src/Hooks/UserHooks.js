import { apiCall } from '../Util/api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const getUserStats = () => {
    return apiCall('GET', `/stats`)
}

const updateUserStats = (newStats) => {
    return apiCall('PUT', `/stats`, newStats)
}

export const useUserStats = () =>
    useQuery({ queryKey: ['userStats'], queryFn: getUserStats })

export const useUpdateStats = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateUserStats,

        onMutate: async (newStats) => {
            await queryClient.cancelQueries({
                queryKey: ['userStats'],
            })

            const prevStats = queryClient.getQueryData(['userStats'])

            queryClient.setQueryData(['userStats'], newStats)

            return { prevStats, newStats }
        },

        onError: (error, newStats, context) => {
            queryClient.setQueryData(['userStats'], context.prevStats)
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['userStats'] })
        },
    })
}

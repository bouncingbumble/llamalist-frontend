import { apiCall } from '../Util/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const visitLlamaLand = async () =>
    await apiCall('post', `/gamification`, { didVisitLlamaLand: true })

export const useVisitLlamaLand = () =>
    useQuery({ queryKey: ['llamaLand'], queryFn: visitLlamaLand })

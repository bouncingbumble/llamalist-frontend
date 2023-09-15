import { apiCall } from '../Util/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const getLeaderBoards = async () =>
    await apiCall('get', `/gamification/leaderboards`)

export const useLeaderBoards = () =>
    useQuery({ queryKey: ['leaderboards'], queryFn: getLeaderBoards })

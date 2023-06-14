import jwtDecode from 'jwt-decode'
import { apiCall } from '../Util/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const getTasks = async () => {
    const codedToken = await localStorage.getItem('llamaListJwtToken')
    const decoded = jwtDecode(codedToken)
    const userId = decoded._id
    return await apiCall('get', `/users/${userId}/tasks`)
}

const createTask = async (taskData) => {
    const codedToken = await localStorage.getItem('llamaListJwtToken')
    const decoded = jwtDecode(codedToken)
    const userId = decoded._id
    return await apiCall('POST', `/users/${userId}/tasks`, taskData)
}

const updateTask = async (taskData) => {
    const codedToken = await localStorage.getItem('llamaListJwtToken')
    const decoded = jwtDecode(codedToken)
    const userId = decoded._id
    return await apiCall(
        'PUT',
        `/users/${userId}/tasks/${taskData.id}`,
        taskData
    )
}

export const useTasks = () =>
    useQuery({ queryKey: ['tasks'], queryFn: getTasks })

export const useCreateTask = () =>
    useMutation({ mutationFn: (taskData) => createTask(taskData) })

export const useUpdateTask = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (taskData) => updateTask(taskData),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
    })
}

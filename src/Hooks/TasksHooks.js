import { apiCall } from '../Util/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const getTasks = async () => await apiCall('get', `/tasks`)

const createTask = async (taskData) => await apiCall('POST', `/tasks`, taskData)

const updateTask = async (taskData) =>
    await apiCall('PUT', `/tasks/${taskData._id}`, {
        ...taskData,
    })

export const useTasks = () =>
    useQuery({ queryKey: ['tasks'], queryFn: getTasks })

export const useCreateTask = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createTask,
        // When mutate is called:
        onMutate: async (newTask) => {
            console.log(newTask)
            // Cancel any outgoing refetches
            // (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ['tasks'] })

            // Snapshot the previous value
            const previousTasks = queryClient.getQueryData(['tasks'])

            // Optimistically update to the new value
            queryClient.setQueryData(['tasks'], (oldTasks) => [
                newTask,
                ...oldTasks,
            ])

            // Return a context object with the snapshotted value
            return { previousTasks }
        },
        // If the mutation fails,
        // use the context returned from onMutate to roll back
        onError: (err, newTask, context) => {
            queryClient.setQueryData(['tasks'], context.previousTasks)
        },
        // Always refetch after error or success:
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
        },
    })
}

export const useUpdateTask = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateTask,
        // When mutate is called:
        onMutate: async (newTask) => {
            console.log(newTask)
            // Cancel any outgoing refetches
            // (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({
                queryKey: ['tasks', newTask._id],
            })

            // Snapshot the previous value
            const prevTasks = queryClient.getQueryData(['tasks'])

            // Optimistically update to the new value
            queryClient.setQueryData(
                ['tasks'],
                prevTasks.map((t) => (t._id === newTask._id ? newTask : t))
            )

            // Return a context with the previous and new task
            return { prevTasks, newTask }
        },
        // If the mutation fails, use the context we returned above
        onError: (err, newTask, context) => {
            queryClient.setQueryData(
                ['tasks', context.newTask._id],
                context.prevTasks
            )
        },
        // Always refetch after error or success:
        onSettled: (newTask) => {
            queryClient.invalidateQueries({ queryKey: ['tasks', newTask._id] })
        },
    })
}

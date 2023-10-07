import { apiCall } from '../Util/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { v4 as uuidv4 } from 'uuid'

const getTasks = async () => await apiCall('get', `/tasks`)
const getCompletedTasks = async () => await apiCall('get', `/completedTasks`)
const searchTasks = async ({ queryKey }) =>
    await apiCall('get', `/completedTasks/search?q=${queryKey[1]}`)

const createTask = async (taskData) => await apiCall('POST', `/tasks`, taskData)

const updateTask = async (taskData) =>
    await apiCall('PUT', `/tasks/${taskData._id}`, {
        ...taskData,
    })

export const useTasks = () =>
    useQuery({ queryKey: ['tasks'], queryFn: getTasks })

export const useSearchTasks = (q) => {
    const queryClient = useQueryClient()
    return useQuery({
        queryKey: ['searchTasks', q],
        queryFn: searchTasks,
        enabled: Boolean(q.length > 2),
        onSuccess: (data) => {
            console.log(data)
            queryClient.setQueryData(['searchTasks'], data)
        },
    })
}

export const useCompletedTasks = () =>
    useQuery({ queryKey: ['completedTasks'], queryFn: getCompletedTasks })

export const useCreateTask = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createTask,
        // When mutate is called:
        onMutate: async (newTask) => {
            // Cancel any outgoing refetches
            // (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ['tasks'] })

            // Snapshot the previous value
            const previousTasks = queryClient.getQueryData(['tasks'])

            // Optimistically update to the new value
            queryClient.setQueryData(['tasks'], (oldTasks) => [
                { _id: uuidv4(), ...newTask },
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
            // Cancel any outgoing refetches
            // (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({
                queryKey: ['tasks', newTask._id],
            })
            await queryClient.cancelQueries({
                queryKey: ['completedTasks'],
            })
            await queryClient.cancelQueries({
                queryKey: ['searchTasks'],
            })

            if (newTask.completedDate === null) {
                //snapshot prev value
                const prevTasks = queryClient.getQueryData(['tasks'])
                // Optimistically update to the new value
                queryClient.setQueryData(
                    ['tasks'],
                    prevTasks.map((t) => (t._id === newTask._id ? newTask : t))
                )

                // Return a context with the previous and new task
                return { prevTasks, newTask }
            } else {
                //snapshot prev value
                const prevCompletedTasks = queryClient.getQueryData([
                    'completedTasks',
                ])
                const prevTasks = queryClient.getQueryData(['tasks'])
                let prevSearchTasks = queryClient.getQueriesData([
                    'searchTasks',
                ])

                // Optimistically update to the new value
                queryClient.setQueryData(
                    ['tasks'],
                    prevTasks.filter((t) => t._id != newTask._id)
                )

                if (prevCompletedTasks) {
                    // Optimistically update to the new value
                    queryClient.setQueryData(
                        ['completedTasks'],
                        prevCompletedTasks.map((t) =>
                            t._id === newTask._id ? newTask : t
                        )
                    )
                }

                if (prevSearchTasks[1]) {
                    prevSearchTasks =
                        prevSearchTasks[prevSearchTasks.length - 1][1]
                    // Optimistically update to the new value
                    queryClient.setQueriesData(
                        ['searchTasks'],
                        prevSearchTasks.map((t) =>
                            t._id === newTask._id ? newTask : t
                        )
                    )
                }

                // Return a context with the previous and new task
                return {
                    prevCompletedTasks,
                    newTask,
                    prevTasks,
                    prevSearchTasks,
                }
            }
        },
        // If the mutation fails, use the context we returned above
        onError: (err, newTask, context) => {
            console.log(err)
            if (newTask.completedDate === null) {
                queryClient.setQueryData(
                    ['tasks', context.newTask._id],
                    context.prevTasks
                )
            } else {
                queryClient.setQueryData(
                    ['completedTasks', context.newTask._id],
                    context.prevCompletedTasks
                )
            }
        },
        // Always refetch after error or success:
        onSettled: (newTask) => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
            queryClient.invalidateQueries({ queryKey: ['completedTasks'] })
        },
    })
}

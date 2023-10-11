import { apiCall } from '../Util/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { v4 as uuidv4 } from 'uuid'

const getTasks = async () => {
    let queryKey = window.location.href.split('q=')[1]

    //on completed
    if (queryKey !== undefined) {
        return await apiCall('get', `/completedTasks/search?q=${queryKey}`)
    } else if (window.location.href.indexOf('completed') != -1) {
        return await apiCall('get', `/completedTasks`)
    } else {
        //on task list
        return await apiCall('get', `/tasks`)
    }
    //on search
}

const createTask = async (taskData) => await apiCall('POST', `/tasks`, taskData)
const getCompletedTasksNum = async () =>
    await apiCall('GET', `/tasks/numCompleted`)

const updateTask = async (taskData) =>
    await apiCall('PUT', `/tasks/${taskData._id}`, {
        ...taskData,
    })

export const useTasks = () =>
    useQuery({
        queryKey: ['tasks'],
        queryFn: getTasks,
    })
export const useCompletedTasksNum = () =>
    useQuery({
        queryKey: ['completedTasksNum'],
        queryFn: getCompletedTasksNum,
    })

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

            //snapshot prev value
            const prevTasks = queryClient.getQueryData(['tasks'])
            // Optimistically update to the new value
            if (
                newTask.completedDate === null ||
                window.location.href.indexOf('completed') != -1
            ) {
                queryClient.setQueryData(
                    ['tasks'],
                    prevTasks.map((t) => (t._id === newTask._id ? newTask : t))
                )
            } else {
                // Optimistically update to the new value
                queryClient.setQueryData(
                    ['tasks'],
                    prevTasks.filter((t) => t._id != newTask._id)
                )
            }
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
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
        },
    })
}

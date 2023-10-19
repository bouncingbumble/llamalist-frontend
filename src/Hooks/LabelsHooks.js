import { apiCall } from '../Util/api'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { v4 as uuidv4 } from 'uuid'

const getLabels = async () => {
    return await apiCall('GET', `/labels`)
}

const createLabel = async ({ labelName, task }) =>
    await apiCall('POST', `/labels`, {
        name: labelName,
        taskId: task._id,
    })

const updateLabel = async (labelData) =>
    await apiCall('PUT', `/labels/${labelData._id}`, labelData)

export const useLabels = () =>
    useQuery({ queryKey: ['labels'], queryFn: getLabels })

export const useCreateLabel = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createLabel,
        // When mutate is called:
        onMutate: async ({ labelName, task }) => {
            // Cancel any outgoing refetches
            // (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ['tasks'] })
            await queryClient.cancelQueries({ queryKey: ['labels'] })

            // Snapshot the previous value
            const previousLabels = queryClient.getQueryData(['labels'])

            // Optimistically update to the new value
            queryClient.setQueryData(['labels'], (oldLabels) => [
                ...oldLabels,
                { name: labelName, _id: uuidv4() },
            ])

            // Snapshot the previous value
            const prevTasks = queryClient.getQueryData(['tasks'])

            // Optimistically update to the new value
            queryClient.setQueryData(
                ['tasks'],
                prevTasks.map((t) =>
                    t._id === task._id
                        ? {
                              ...task,

                              labels: [
                                  ...task.labels,
                                  { name: labelName, _id: uuidv4() },
                              ],
                          }
                        : t
                )
            )

            // Return a context object with the snapshotted value
            return {
                previousLabels,
                prevTasks,
            }
        },
        // If the mutation fails,
        // use the context returned from onMutate to roll back
        onError: (err, newLabel, context) => {
            queryClient.setQueryData(['labels'], context.previousLabels)
            queryClient.setQueryData(['tasks'], context.prevTasks)
        },
        // Always refetch after error or success:
        onSettled: (data) => {
            queryClient.invalidateQueries({ queryKey: ['labels'] })
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
        },
    })
}

export const useUpdateLabel = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateLabel,
        onMutate: async (newLabel) => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({ queryKey: ['tasks'] })
            await queryClient.cancelQueries({ queryKey: ['labels'] })

            // Snapshot the previous values
            const previousTasks = queryClient.getQueryData(['tasks'])
            const previousLabels = queryClient.getQueryData(['labels'])

            // Optimistically update new tasks
            queryClient.setQueryData(['tasks'], (oldTasks) => {
                const newTasks = oldTasks.map((task) => {
                    const newTaskLabels = task.labels.map((label) => {
                        if (label._id === newLabel._id) {
                            return newLabel
                        } else {
                            return label
                        }
                    })
                    task.labels = newTaskLabels
                    return task
                })
                return newTasks
            })

            // Optimistically update new labels
            queryClient.setQueryData(['labels'], (oldLabels) => {
                const newLabels = oldLabels.map((label) => {
                    if (label._id === newLabel._id) {
                        return newLabel
                    } else {
                        return label
                    }
                })
                return newLabels
            })

            // Return context for handlers
            return {
                previousLabels,
                previousTasks,
            }
        },
        onError: (err, newLabel, context) => {
            queryClient.setQueryData(['labels'], context.previousLabels)
            queryClient.setQueryData(['tasks'], context.previousTasks)
        },
        onSettled: (newLabel) => {
            queryClient.invalidateQueries({ queryKey: ['labels'] })
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
        },
    })
}

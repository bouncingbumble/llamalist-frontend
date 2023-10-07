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
            await queryClient.cancelQueries({
                queryKey: ['completedTasks'],
            })
            await queryClient.cancelQueries({
                queryKey: ['searchTasks'],
            })

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

            const previousCompletedTasks = queryClient.getQueryData([
                'completedTasks',
            ])

            if (previousCompletedTasks) {
                // Optimistically update new tasks
                queryClient.setQueryData(
                    ['completedTasks'],
                    previousCompletedTasks.map((t) =>
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
            }

            let prevSearchTasks = queryClient.getQueriesData(['searchTasks'])

            prevSearchTasks = prevSearchTasks[prevSearchTasks.length - 1][1]

            if (prevSearchTasks) {
                // Optimistically update to the new value
                queryClient.setQueriesData(
                    ['searchTasks'],
                    prevSearchTasks.map((t) =>
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
            }
            // Return a context object with the snapshotted value
            return {
                previousLabels,
                prevTasks,
                prevSearchTasks,
                previousCompletedTasks,
            }
        },
        // If the mutation fails,
        // use the context returned from onMutate to roll back
        onError: (err, newLabel, context) => {
            queryClient.setQueryData(['labels'], context.previousLabels)
            queryClient.setQueryData(['tasks'], context.previousTasks)
            queryClient.setQueryData(['completedTasks'], context.previousTasks)
            queryClient.setQueryData(
                ['prevSearchTasks'],
                context.prevSearchTasks
            )
        },
        // Always refetch after error or success:
        onSettled: (data) => {
            queryClient.invalidateQueries({ queryKey: ['labels'] })
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
            queryClient.invalidateQueries({
                queryKey: ['completedTasks'],
            })
            queryClient.invalidateQueries({
                queryKey: ['prevSearchTasks'],
            })
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
            await queryClient.cancelQueries({
                queryKey: ['completedTasks'],
            })
            await queryClient.cancelQueries({
                queryKey: ['searchTasks'],
            })

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

            const previousCompletedTasks = queryClient.getQueryData([
                'completedTasks',
            ])

            if (previousCompletedTasks) {
                // Optimistically update new tasks
                queryClient.setQueryData(
                    ['completedTasks'],
                    (previousCompletedTasks) => {
                        const newTasks = previousCompletedTasks.map((task) => {
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
                    }
                )
            }

            let prevSearchTasks = queryClient.getQueriesData(['searchTasks'])

            prevSearchTasks = prevSearchTasks[prevSearchTasks.length - 1][1]

            if (prevSearchTasks) {
                // Optimistically update to the new value
                queryClient.setQueriesData(
                    ['searchTasks'],
                    prevSearchTasks.map((task) => {
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
                )
            }

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
            // Return context for handlers
            return {
                previousLabels,
                previousTasks,
                prevSearchTasks,
                previousCompletedTasks,
            }
        },
        onError: (err, newLabel, context) => {
            queryClient.setQueryData(['labels'], context.previousLabels)
            queryClient.setQueryData(['tasks'], context.previousTasks)
            queryClient.setQueryData(['completedTasks'], context.previousTasks)
            queryClient.setQueryData(
                ['prevSearchTasks'],
                context.prevSearchTasks
            )
        },
        onSettled: (newLabel) => {
            queryClient.invalidateQueries({ queryKey: ['labels'] })
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
            queryClient.invalidateQueries({
                queryKey: ['completedTasks'],
            })
            queryClient.invalidateQueries({
                queryKey: ['prevSearchTasks'],
            })
        },
    })
}

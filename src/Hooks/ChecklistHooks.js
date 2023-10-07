import { apiCall } from '../Util/api'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { v4 as uuidv4 } from 'uuid'

const createChecklistItem = async ({ item, task }) => {
    await apiCall(`POST`, `/checklist/${task._id}`, item)
}

const updateChecklistItem = async ({ item, task, updates }) => {
    await apiCall(`PUT`, `/checklist/${task._id}/${item._id}`, updates)
}

const deleteChecklistItem = async ({ item, task }) => {
    apiCall(`DELETE`, `/checklist/${task._id}/${item._id}`)
}

export const useCreateChecklistItem = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createChecklistItem,

        onMutate: async ({ item, task }) => {
            if (task.completedDate === null) {
                await queryClient.cancelQueries({ queryKey: ['tasks'] })

                const previousTasks = queryClient.getQueryData(['tasks'])

                queryClient.setQueryData(
                    ['tasks'],
                    previousTasks.map((t) => {
                        if (t._id !== task._id) {
                            return t
                        } else {
                            return {
                                ...task,
                                checklist: [
                                    ...task.checklist,
                                    { ...item, _id: uuidv4() },
                                ],
                            }
                        }
                    })
                )

                return { previousTasks }
            } else {
                //COMPLETED
                await queryClient.cancelQueries({
                    queryKey: ['completedTasks'],
                })
                const completedTasks = queryClient.getQueryData([
                    'completedTasks',
                ])

                queryClient.setQueryData(
                    ['completedTasks'],
                    completedTasks.map((t) => {
                        if (t._id !== task._id) {
                            return t
                        } else {
                            return {
                                ...task,
                                checklist: [
                                    ...task.checklist,
                                    { ...item, _id: uuidv4() },
                                ],
                            }
                        }
                    })
                )

                //SEARCH
                await queryClient.cancelQueries({
                    queryKey: ['searchTasks'],
                })
                let prevSearchTasks = queryClient.getQueriesData([
                    'searchTasks',
                ])

                prevSearchTasks = prevSearchTasks[prevSearchTasks.length - 1][1]

                if (prevSearchTasks) {
                    // Optimistically update to the new value
                    queryClient.setQueriesData(
                        ['searchTasks'],
                        prevSearchTasks.map((t) => {
                            if (t._id !== task._id) {
                                return t
                            } else {
                                return {
                                    ...task,
                                    checklist: [
                                        ...task.checklist,
                                        { ...item, _id: uuidv4() },
                                    ],
                                }
                            }
                        })
                    )
                }

                return { completedTasks, prevSearchTasks }
            }
        },

        onError: (error, newItem, context) => {
            queryClient.setQueryData(['tasks'], context.previousTasks)
            queryClient.setQueryData(['completedTasks'], context.completedTasks)
            queryClient.setQueryData(['searchTasks'], context.prevSearchTasks)
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
            queryClient.invalidateQueries({ queryKey: ['completedTasks'] })
            queryClient.invalidateQueries({ queryKey: ['searchTasks'] })
        },
    })
}

export const useUpdateChecklistItem = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateChecklistItem,

        onMutate: async ({ item, task, updates }) => {
            if (task.completedDate === null) {
                await queryClient.cancelQueries({ queryKey: ['tasks'] })
                const previousTasks = queryClient.getQueryData(['tasks'])
                let newChecklist = [...task.checklist]
                newChecklist = newChecklist.map((i) => {
                    if (i._id !== item._id) {
                        return i
                    } else {
                        return { ...i, ...updates }
                    }
                })
                const newTask = { ...task, checklist: newChecklist }
                queryClient.setQueryData(
                    ['tasks'],
                    previousTasks.map((t) => {
                        if (t._id !== task._id) {
                            return t
                        } else {
                            return newTask
                        }
                    })
                )
                return { previousTasks, newTask }
            } else {
                await queryClient.cancelQueries({
                    queryKey: ['completedTasks'],
                })
                const completedTasks = queryClient.getQueryData([
                    'completedTasks',
                ])
                let newChecklist = [...task.checklist]
                newChecklist = newChecklist.map((i) => {
                    if (i._id !== item._id) {
                        return i
                    } else {
                        return { ...i, ...updates }
                    }
                })
                const newTask = { ...task, checklist: newChecklist }
                queryClient.setQueryData(
                    ['completedTasks'],
                    completedTasks.map((t) => {
                        if (t._id !== task._id) {
                            return t
                        } else {
                            return newTask
                        }
                    })
                )

                await queryClient.cancelQueries({ queryKey: ['searchTasks'] })
                let prevSearchTasks = queryClient.getQueriesData([
                    'searchTasks',
                ])

                prevSearchTasks = prevSearchTasks[prevSearchTasks.length - 1][1]

                if (prevSearchTasks) {
                    // Optimistically update to the new value
                    queryClient.setQueriesData(
                        ['searchTasks'],
                        prevSearchTasks.map((t) => {
                            if (t._id !== task._id) {
                                return t
                            } else {
                                return newTask
                            }
                        })
                    )
                }

                return { completedTasks, newTask, prevSearchTasks }
            }
        },

        onError: (error, newTask, context) => {
            queryClient.setQueryData(['tasks'], context.previousTasks)
            queryClient.setQueryData(['completedTasks'], context.completedTasks)
            queryClient.setQueryData(['searchTasks'], context.prevSearchTasks)
        },

        onSettled: (settled, newTask, context) => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
            queryClient.invalidateQueries({ queryKey: ['completedTasks'] })
            queryClient.invalidateQueries({ queryKey: ['searchTasks'] })
        },
    })
}

export const useDeleteChecklistItem = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteChecklistItem,

        onMutate: async ({ item, task }) => {
            if (task.completedDate === null) {
                await queryClient.cancelQueries({ queryKey: ['tasks'] })
                const previousTasks = queryClient.getQueryData(['tasks'])

                let newChecklist = [...task.checklist]
                newChecklist = newChecklist.filter((i) => i._id !== item._id)
                const newTask = { ...task, checklist: newChecklist }

                queryClient.setQueryData(
                    ['tasks'],
                    previousTasks.map((t) => {
                        if (t._id !== task._id) {
                            return t
                        } else {
                            return newTask
                        }
                    })
                )

                return { previousTasks, newTask }
            } else {
                await queryClient.cancelQueries({
                    queryKey: ['completedTasks'],
                })
                const previousTasks = queryClient.getQueryData([
                    'completedTasks',
                ])

                let newChecklist = [...task.checklist]
                newChecklist = newChecklist.filter((i) => i._id !== item._id)
                const newTask = { ...task, checklist: newChecklist }

                queryClient.setQueryData(
                    ['completedTasks'],
                    previousTasks.map((t) => {
                        if (t._id !== task._id) {
                            return t
                        } else {
                            return newTask
                        }
                    })
                )

                await queryClient.cancelQueries({
                    queryKey: ['searchTasks'],
                })
                let prevSearchTasks = queryClient.getQueriesData([
                    'searchTasks',
                ])

                prevSearchTasks = prevSearchTasks[prevSearchTasks.length - 1][1]

                if (prevSearchTasks) {
                    // Optimistically update to the new value
                    queryClient.setQueriesData(
                        ['searchTasks'],
                        prevSearchTasks.map((t) => {
                            if (t._id !== task._id) {
                                return t
                            } else {
                                return newTask
                            }
                        })
                    )
                }

                return { previousTasks, newTask, prevSearchTasks }
            }
        },

        onError: (error, newTask, context) => {
            queryClient.setQueryData(['tasks'], context.previousTasks)
            queryClient.setQueryData(['completedTasks'], context.previousTasks)
            queryClient.setQueryData(
                ['prevSearchTasks'],
                context.prevSearchTasks
            )
        },

        onSettled: (settled, newTask, context) => {
            queryClient.invalidateQueries({
                queryKey: ['tasks'],
            })
            queryClient.invalidateQueries({
                queryKey: ['completedTasks'],
            })
            queryClient.invalidateQueries({
                queryKey: ['prevSearchTasks'],
            })
        },
    })
}

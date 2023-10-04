import { apiCall } from '../Util/api'
import { useQueryClient, useMutation } from '@tanstack/react-query'

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
                                    { ...item, _id: 9999 },
                                ],
                            }
                        }
                    })
                )

                return { previousTasks }
            } else {
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
                                    { ...item, _id: 9999 },
                                ],
                            }
                        }
                    })
                )

                return { completedTasks }
            }
        },

        onError: (error, newItem, context) => {
            queryClient.setQueryData(['tasks'], context.previousTasks)
            queryClient.setQueryData(['tasks'], context.completedTasks)
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
            queryClient.invalidateQueries({ queryKey: ['completedTasks'] })
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
                return { completedTasks, newTask }
            }
        },

        onError: (error, newTask, context) => {
            queryClient.setQueryData(['tasks'], context.previousTasks)
            queryClient.setQueryData(['tasks'], context.completedTasks)
        },

        onSettled: (settled, newTask, context) => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
            queryClient.invalidateQueries({ queryKey: ['completedTasks'] })
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

                return { previousTasks, newTask }
            }
        },

        onError: (error, newTask, context) => {
            if (newTask.completedDate === null) {
                queryClient.setQueryData(['tasks'], context.previousTasks)
            } else {
                queryClient.setQueryData(
                    ['completedTasks'],
                    context.previousTasks
                )
            }
        },

        onSettled: (settled, newTask, context) => {
            queryClient.invalidateQueries({
                queryKey: ['tasks'],
            })

            queryClient.invalidateQueries({
                queryKey: ['completedTasks'],
            })
        },
    })
}

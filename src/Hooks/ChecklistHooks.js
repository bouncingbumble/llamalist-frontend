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
        },

        onError: (error, newItem, context) => {
            queryClient.setQueryData(['tasks'], context.previousTasks)
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
        },
    })
}

export const useUpdateChecklistItem = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateChecklistItem,

        onMutate: async ({ item, task, updates }) => {
            await queryClient.cancelQueries({ queryKey: ['tasks', task._id] })
            const previousTask = queryClient.getQueryData(['tasks', task._id])
            let newChecklist = [...task.checklist]
            newChecklist = newChecklist.map((i) => {
                if (i._id !== item._id) {
                    return i
                } else {
                    return { ...i, ...updates }
                }
            })
            const newTask = { ...task, checklist: newChecklist }
            queryClient.setQueryData(['tasks', task._id], newTask)
            return { previousTask, newTask }
        },

        onError: (error, newTask, context) => {
            queryClient.setQueryData(
                ['tasks', context.newTask._id],
                context.previousTask
            )
        },

        onSettled: (settled, newTask, context) => {
            queryClient.invalidateQueries({
                queryKey: ['tasks', context.task._id],
            })
        },
    })
}

export const useDeleteChecklistItem = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteChecklistItem,

        onMutate: async ({ item, task }) => {
            await queryClient.cancelQueries({ queryKey: ['tasks', task._id] })

            const previousTask = queryClient.getQueryData(['tasks', task._id])
            let newChecklist = [...task.checklist]
            newChecklist = newChecklist.filter((i) => i._id !== item._id)
            const newTask = { ...task, checklist: newChecklist }
            queryClient.setQueryData(['tasks', task._id], newTask)

            return { previousTask, newTask }
        },

        onError: (error, newTask, context) => {
            queryClient.setQueryData(
                ['tasks', context.newTask._id],
                context.previousTask
            )
        },

        onSettled: (settled, newTask, context) => {
            // queryClient.invalidateQueries({
            //     queryKey: ['tasks', context.task._id],
            // })
        },
    })
}

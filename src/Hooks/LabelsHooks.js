import jwtDecode from 'jwt-decode'
import { apiCall } from '../Util/api'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

const getLabels = async () => {
    const codedToken = await localStorage.getItem('llamaListJwtToken')
    const decoded = jwtDecode(codedToken)
    return await apiCall('GET', `/users/${decoded._id}/labels`)
}

const createLabel = async (labelData) => {
    const codedToken = await localStorage.getItem('llamaListJwtToken')
    const decoded = jwtDecode(codedToken)
    const userId = decoded._id
    return await apiCall('POST', `/users/${userId}/labels`, labelData)
}

const updateLabel = async (labelData) => {
    const codedToken = await localStorage.getItem('llamaListJwtToken')
    const decoded = jwtDecode(codedToken)
    const userId = decoded._id
    return await apiCall('PUT', `/users/${userId}/labels`, labelData)
}

export const useLabels = () =>
    useQuery({ queryKey: ['labels'], queryFn: getLabels })

export const useCreateLabel = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createLabel,
        // When mutate is called:
        onMutate: async (newLabel) => {
            // Cancel any outgoing refetches
            // (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ['labels'] })

            // Snapshot the previous value
            const previousLabels = queryClient.getQueryData(['labels'])

            // Optimistically update to the new value
            queryClient.setQueryData(['labels'], (oldLabels) => [
                newLabel,
                ...oldLabels,
            ])

            // Return a context object with the snapshotted value
            return { previousLabels }
        },
        // If the mutation fails,
        // use the context returned from onMutate to roll back
        onError: (err, newLabel, context) => {
            queryClient.setQueryData(['labels'], context.previousLabels)
        },
        // Always refetch after error or success:
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['labels'] })
        },
    })
}

export const useUpdateLabel = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateLabel,
        // When mutate is called:
        onMutate: async (newLabel) => {
            // Cancel any outgoing refetches
            // (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({
                queryKey: ['labels', newLabel._id],
            })

            // Snapshot the previous value
            const previouslabel = queryClient.getQueryData([
                'labels',
                newLabel._id,
            ])

            // Optimistically update to the new value

            queryClient.setQueryData(['labels', newLabel._id], newLabel)

            // Return a context with the previous and new label
            return { previouslabel, newLabel }
        },
        // If the mutation fails, use the context we returned above
        onError: (err, newLabel, context) => {
            queryClient.setQueryData(
                ['labels', context.newLabel._id],
                context.previouslabel
            )
        },
        // Always refetch after error or success:
        onSettled: (newLabel) => {
            queryClient.invalidateQueries({
                queryKey: ['labels', newLabel._id],
            })
        },
    })
}

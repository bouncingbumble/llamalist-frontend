import { apiCall, setTokenHeader } from '../Util/api'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

const getUser = () => {
    const codedToken = localStorage.getItem('llamaListJwtToken')
    if (codedToken) {
        //should move setting header to signup and signin functions only but leaving for now
        setTokenHeader(codedToken)

        return apiCall('get', ``)
    } else {
        window.location = '/signin'
    }
}

const getUserStats = () => {
    return apiCall('GET', `/stats`)
}

const updateUser = async (userData) =>
    await apiCall('PUT', ``, {
        ...userData,
    })

const signInUser = async (userData) => {
    const data = await apiCall('post', `/auth/signin`, userData)
    const token = data.token
    localStorage.setItem('llamaListJwtToken', token)
    setTokenHeader(token)
}

export const useUserQuery = ({ userId }) => useQuery(['user', userId], getUser)

export const useUserSignInQuery = ({ userFormData }) =>
    useQuery(['signin', userFormData], signInUser)

export const useUser = () => useQuery({ queryKey: ['user'], queryFn: getUser })
export const useUserStats = () =>
    useQuery({ queryKey: ['userStats'], queryFn: getUserStats })

export const useUpdateUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateUser,
        // When mutate is called:
        onMutate: async (updatedUser) => {
            // Cancel any outgoing refetches
            // (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({
                queryKey: ['user'],
            })

            // Snapshot the previous value
            const prevUser = queryClient.getQueryData(['user'])

            // Optimistically update to the new value
            queryClient.setQueryData(['user'], updatedUser)

            // Return a context with the previous and new task
            return { prevUser, updatedUser }
        },
        // If the mutation fails, use the context we returned above
        onError: (err, updatedUser, context) => {
            queryClient.setQueryData(['user'], context.prevUser)
        },
        // Always refetch after error or success:
        onSettled: (user) => {
            queryClient.invalidateQueries({ queryKey: ['user'] })
        },
    })
}

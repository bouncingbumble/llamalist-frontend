import { apiCall } from '../Util/api'
import { useQuery } from '@tanstack/react-query'

export function useLabelsQuery({ userId }) {
    function getLabels() {
        return apiCall('GET', `/users/${userId}/labels`)
    }

    return useQuery(['labels', userId], getLabels)
}

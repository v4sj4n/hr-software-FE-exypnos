import AxiosInstance from '@/Helpers/Axios'
import { useQuery } from '@tanstack/react-query'

export const useGetProject = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const response = await AxiosInstance.get('/project/structure')
            return response.data
        },
    })
    return { data, isLoading, error }
}

import AxiosInstance from '@/Helpers/Axios'
import { useQuery } from '@tanstack/react-query'
import { UserProfileData } from '../interfaces/Employe'

export const useGetAllUsers = () => {
    return useQuery<UserProfileData[], Error>({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await AxiosInstance.get<UserProfileData[]>('/user')
            return response.data
        },
    })
}

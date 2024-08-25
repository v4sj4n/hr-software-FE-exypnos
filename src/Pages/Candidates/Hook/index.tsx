import { useQuery } from '@tanstack/react-query'
import AxiosInstance from '@/Helpers/Axios'
import { applicantsData } from '../Interfaces/Candidate'

export const useGetAllApplicants = () => {
    return useQuery<applicantsData[], Error>({
        queryKey: ['applicants'],
        queryFn: async () => {
            const response =
                await AxiosInstance.get<applicantsData[]>('/applicant')
            return response.data
        },
    })
}

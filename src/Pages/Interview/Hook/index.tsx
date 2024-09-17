import { useMutation } from '@tanstack/react-query'
import AxiosInstance from '@/Helpers/Axios'
import { applicantsData } from '../interface/interface'

import { useQuery } from '@tanstack/react-query'

export const useGetAllInterviews = () => {
    const fetchApplicants = async () => {
        const response = await AxiosInstance.get('/applicant')
        return response.data
    }

    const { data, error, isLoading } = useQuery({
        queryKey: ['applicant'],
        queryFn: fetchApplicants,
    })

    return { data, error, loading: isLoading }
}

export const useHandleReject = () => {
    const mutation = useMutation({
        mutationFn: async (interviewId: string) => {
            const response = await AxiosInstance.patch(
                `/applicant/${interviewId}`,
                {
                    status: 'rejected',
                },
            )
            return response.data
        },
        onError: (error) => {
            console.error('Failed to reject interview:', error)
        },
    })

    return {
        handleReject: mutation.mutate,
        loading: mutation.isPending,
        error: mutation.error,
    }
}

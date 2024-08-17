import { useState, useEffect } from 'react'
import AxiosInstance from '../../../Helpers/Axios'
import { applicantsData } from '../Interfaces/Candidate'

export const useGetAllApplicants = () => {
    const [applicants, setApplicants] = useState<applicantsData[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        AxiosInstance.get<applicantsData[]>('/applicant')
            .then((response) => {
                setApplicants(response.data)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
                setError('Failed to fetch users. Please try again later.')
            })
    }, [])

    return { applicants, error }
}

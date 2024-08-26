// import AxiosInstance from '@/Helpers/Axios';
// import { useFetch } from '@/Hooks/useFetch';
// import { debounce } from 'lodash';
// import { ChangeEvent, useEffect } from 'react';
// import { useSearchParams } from 'react-router-dom';

// export interface applicantsData {
//     forEach(arg0: (applicant: applicantsData) => void): unknown;
//     firstName: string;
//     lastName: string;
//     phoneNumber: string;
//     email: string;
//     positionApplied: string;
//     status: string;
//     _id: string;
//     firstInterviewDate?:string;
//     secondInterviewDate?: string;
//     notes: string;
//     message: string;
//     currentPhase: string;
//     isDeleted?: boolean;
// }

// export const useGetAllInterviews = () => {
//    const {data,error,loading} = useFetch<applicantsData>("applicant")
//      const [searchParams, setSearchParams] = useSearchParams();

//     const debouncedSetSearchParams = debounce((value: string) => {
//         setSearchParams((prev) => {
//             const newParams = new URLSearchParams(prev);
//             if (value) {
//                 newParams.set('search', value);
//             } else {
//                 newParams.delete('search');
//             }
//             return newParams;
//         });
//     }, 500);

//     const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
//         debouncedSetSearchParams(e.target.value);
//         fetchApplicantsData();
//     };

//     const fetchApplicantsData = () => {
//         setIsLoading(true);
//         const currentSearch = searchParams.get('search') || '';
//         AxiosInstance.get<applicantsData[]>(`/applicant?search=${currentSearch}`)
//             .then(response => {
//                 console.log('Fetched events:', response.data);

//                 setIsLoading(false);

//                 (response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//                 setIsLoading(false);
//             });
//     };

//     useEffect(() => {
//         fetchApplicantsData();
//     }, [searchParams]);

//    return {data, error, loading,onSearchChange}
// }

import AxiosInstance from '@/Helpers/Axios'
import { useFetch } from '@/Hooks/useFetch'
import { useState } from 'react'

export interface applicantsData {
    customMessage: string
    customSubject: string
    forEach(arg0: (applicant: applicantsData) => void): unknown
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    positionApplied: string
    status: string
    _id: string
    firstInterviewDate?: string
    secondInterviewDate?: string
    notes: string
    message: string
    currentPhase: string
    isDeleted?: boolean
}

export const useGetAllInterviews = () => {
    const { data, error, loading } = useFetch<applicantsData>('applicant')

    return { data, error, loading }
}

export const useHandleReject = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleReject = async (interviewId: string) => {
        setLoading(true)
        setError(null)

        try {
            const response = await AxiosInstance.patch(
                `/applicant/${interviewId}`,
                {
                    status: 'rejected',
                },
            )

            if (response.status === 200) {
            }
        } catch (err) {
            console.error('Failed to reject interview:', err)
            setError('Failed to reject interview')
        } finally {
            setLoading(false)
        }
    }

    return { handleReject, loading, error }
}

import { useState, useEffect } from 'react';
import AxiosInstance from '../../../Helpers/Axios';
import { applicantsData } from '../Interfaces/Candidate';

export const useGetAllApplicants = () => {
    const [applicants, setApplicants] = useState<applicantsData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        AxiosInstance.get<applicantsData[]>('/applicant')
            .then(response => {
                setApplicants(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError("Failed to fetch users. Please try again later.");
            });
    }, [API_URL]);

    return { applicants, error };
}
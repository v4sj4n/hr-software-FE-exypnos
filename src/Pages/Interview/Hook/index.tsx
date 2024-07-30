
import { useEffect, useState } from 'react';

import AxiosInstance from '../../../Helpers/Axios';

export interface InterviewData {
    auth: {
        email: string;
    };
    fullName: string;
    phone: string;
    position: string;
    cvAttachment: string;
    _id: number;
    date: string;
    time: string;
}

export const useGetAllInterviews = () => {
    const [interviews, setInterviews] = useState<InterviewData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        AxiosInstance.get<InterviewData[]>('/interview')
            .then(response => {
                setInterviews(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError("Failed to fetch interviewers. Please try again later.");
            });
    }, [API_URL]);

    return { interviews, error };
}


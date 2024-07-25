import { useState, useEffect } from 'react';
import AxiosInstance from '../../../Helpers/Axios';

export interface UserProfileData {
    auth: {
        email: string;
    };
    lastName: string;
    phone: string;
    pob: string;
    dob: string;
    gender: string;
    role: string;
    firstName: string;
    imageUrl: string;
    file: string;
    _id: number;
}

export const useGetAllUsers = () => {
    const [users, setUsers] = useState<UserProfileData[]>([]);
    const [error, setError] = useState<string | null>(null);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        AxiosInstance.get<UserProfileData[]>('/user')
            .then(response => {
                setUsers(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError("Failed to fetch users. Please try again later.");
            });
    }, [API_URL]);

    return { users, error };
}



import { useEffect, useState } from "react"
import AxiosInstance from "../../../Helpers/Axios";

import { useParams } from "react-router-dom";


interface CandidateView {
    id: number;
    originalId: string | number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    experience: string;
    applicationMethod: string;
    age: string;
    positionApplied: string;
    technologiesUsed: string[];
    salaryExpectations: string;
    status: string;
    cvAttachment: string;
}


export const useApplicantById = () => {
    const [applicant, setApplicant] = useState<CandidateView | null>(null)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {

        setIsLoading(true);
        AxiosInstance.get<CandidateView>(`/applicants/${id}`)
          .then(response => {
            setApplicant(response.data);
            console.log('Applicant fetched:', response.data);
            setError(null);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            setError('Failed to fetch applicant data');
            setApplicant(null);
          })
          .finally(() => setIsLoading(false));
    }, [id]);

    return { applicant, isLoading, error };
}
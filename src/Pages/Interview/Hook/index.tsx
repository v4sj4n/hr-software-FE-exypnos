import { useFetch } from '@/Hooks/useFetch';

export interface applicantsData {
    forEach(arg0: (applicant: applicantsData) => void): unknown;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    positionApplied: string;
    status: string;
    _id: number;
    
}

export const useGetAllInterviews = () => {
   const {data,error,loading} = useFetch<applicantsData>("applicant?status=accepted")

   return {data, error, loading}
}


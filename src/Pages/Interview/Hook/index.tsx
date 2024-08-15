import { useFetch } from '@/Hooks/useFetch';

export interface applicantsData {
    forEach(arg0: (applicant: applicantsData) => void): unknown;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    positionApplied: string;
    status: string;
    _id: string;
    firstInterviewDate?: Date;
    secondInterviewDate?: Date;
    notes: string;
    isDeleted: boolean;
    currentPhase:string;
    messages:string;

}

export const useGetAllInterviews = () => {
   const {data,error,loading} = useFetch<applicantsData>("applicant")

   return {data, error, loading}
}


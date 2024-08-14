import { useFetch } from '@/Hooks/useFetch';

export interface applicantsData {
        _id: number;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        email: string;
        positionApplied: string;
        status: string;
        currentPhase: string;
        firstInterviewDate?: string;
        secondInterviewDate?: string;
        notes?: string;
        
      }
    

    
export const useGetAllInterviews = () => {
   const {data,error,loading} = useFetch<applicantsData>("applicant")

   return {data, error, loading}
}


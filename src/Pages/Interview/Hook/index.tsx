import { useFetch } from '@/Hooks/useFetch';
import axios from 'axios';
export interface ApplicantsData {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    positionApplied: string;
    status: string;
    _id: number;
    interviewDate: string;
    startDate: string;
    endDate: string;
}
const apiClient = axios.create({
    baseURL: 'http://192.168.4.172:3000',
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const useGetAllInterviews = () => {
   const {data,error,loading} = useFetch<ApplicantsData>("applicant?status=accepted")

   return {data, error, loading}
}

export const updateApplicant = async (id: string, updateData: any) => {
    try {
      const response = await apiClient.patch(`/applicant/${id}`, updateData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const deleteApplicant = async (id: string) => {
    try {
      const response = await apiClient.delete(`/applicant/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const scheduleInterview = async (id: string, scheduleData: any) => {
    try {
      const response = await apiClient.patch(`/applicant/${id}/interview/schedule`, scheduleData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const rescheduleInterview = async (id: string, rescheduleData: any) => {
    try {
      const response = await apiClient.patch(`/applicant/${id}/interview/reschedule`, rescheduleData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const addInterviewNote = async (id: string, noteData: any) => {
    try {
      const response = await apiClient.patch(`/applicant/${id}/interview/note`, noteData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const updateInterviewStatus = async (id: string, statusData: any) => {
    try {
      const response = await apiClient.patch(`/applicant/${id}/interview/status`, statusData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const updateEmploymentStatus = async (id: string, statusData: any) => {
    try {
      const response = await apiClient.patch(`/applicant/${id}/employment-status`, statusData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const sendCustomEmail = async (id: string, emailData: any) => {
    try {
      const response = await apiClient.post(`/applicant/${id}/send-email`, emailData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
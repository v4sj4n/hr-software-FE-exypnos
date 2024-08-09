import AxiosInstance from '@/Helpers/Axios';
import { useFetch } from '@/Hooks/useFetch';
import { useState } from 'react';

export interface applicantsData {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    positionApplied: string;
    status: string;
    _id: number;
    notes:string;
    
}

export interface InterviewData {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    positionApplied: string;
    status: string;
    _id: number;
    notes:string;
    interviewDate: string;

}

export const useGetAllInterviews = () => {
   const {data,error,loading} = useFetch<applicantsData>("applicant?status=accepted")
   return {data, error, loading}
}



export const updateInterview = (setInterview: React.Dispatch<React.SetStateAction<InterviewData[]>>) => {
    const [isReschedule, setIsReschedule] = useState<InterviewData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRescheduleTime, setIsRescheduleTime] = useState<string>('');
    const [notes, setNotes] = useState('');


    const handleRescheduleClick = (interviewToSchedule: InterviewData) => {
        setIsReschedule(interviewToSchedule);
        setIsModalOpen(true);
    };

    const handleRescheduleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setIsReschedule(prevInterview => {
            if (!prevInterview) return null;
            if (name === 'interviewDate') {
                return { ...prevInterview, interviewDate: value };
            } else if (name === 'notes') {
                setNotes(value);
                return { ...prevInterview, notes: value };
            } else if (name === 'status') {
                return { ...prevInterview, status: value };
            }
            return prevInterview;
        });
    };

    const setInterviewForSchedule = (interview: InterviewData) => {
        const interviewDate = new Date(interview.interviewDate);
        const formattedDate = interviewDate.toISOString().split('T')[0];
        const formattedTime = interviewDate.toTimeString().slice(0, 5);
        setIsReschedule({ ...interview, interviewDate: formattedDate });
        setIsRescheduleTime(formattedTime);
    };

    const handleUpdateInterview = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isReschedule) return;

        const combinedDateTime = new Date(`${isReschedule.interviewDate}T${isRescheduleTime}`);
        const fieldsToUpdate = {
            interviewDate: combinedDateTime,
            notes: notes,
        };


       


        AxiosInstance.patch(`/applicant/${isReschedule._id}`, fieldsToUpdate)
        .then((response) => {
            console.log('Interview updated successfully');
            setInterview(prev => prev.map(interview => 
                interview._id === isReschedule._id ? response.data : interview
            ));
            setIsReschedule(null);
            setIsModalOpen(true)
        })
        .catch((error) => {
            console.error('Error updating interview:', error);
        });
       
    };
    return{
        isModalOpen,
        handleRescheduleClick,
        handleRescheduleChange,
        setInterviewForSchedule,
        handleUpdateInterview,
        setIsReschedule,
        isRescheduleTime,
        notes,
        setNotes,
        setIsModalOpen
    }}
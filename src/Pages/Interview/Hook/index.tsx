import AxiosInstance from '@/Helpers/Axios';
import { useState, useEffect, useCallback } from 'react';
import { applicantsData  } from '../../Interview/Interface/Interview';
import { RescheduleInterview } from '../../Interview/Interface/Interview';

export const useGetAllInterviews = () => {
    const [interviews, setInterviews] = useState<applicantsData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchInterviews = useCallback(() => {
        setIsLoading(true);
        AxiosInstance.get<applicantsData[]>(`/applicant?status=accepted`)
            .then(response => {
                console.log('Fetched interviews:', response.data);
                setInterviews(response.data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error('Error fetching data:', err);
                if (err.response) {
                    console.error('Response error:', err.response.data);
                    setError(`Failed to fetch interviews: ${err.response.data.message}`);
                } else if (err.request) {
                    console.error('Request error:', err.request);
                    setError('Failed to fetch interviews: No response from server');
                } else {
                    console.error('General error:', err.message);
                    setError(`Failed to fetch interviews: ${err.message}`);
                }
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        fetchInterviews();
    }, [fetchInterviews]);

    return { interviews, setInterviews, fetchInterviews, isLoading, error };
};


export const useRescheduleInterview = (
    setInterviews: React.Dispatch<React.SetStateAction<RescheduleInterview[]>>,
    handleReschedule: (interviewDate: string, notes: string, phase: string) => Promise<void>
) => {
    const [interviewDate, setInterviewDate] = useState<string>('');
    const [notes, setNotes] = useState<string>('');
    const [phase, setPhase] = useState<string>('');

    const handleEditClick = (interviewToEdit: RescheduleInterview) => {
        const interviewDateObj = new Date(interviewToEdit.interviewDate);
        setInterviewDate(interviewDateObj.toISOString().split('T')[0]);
        setNotes(interviewToEdit.notes);
        setPhase(interviewToEdit.phase);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        switch (name) {
            case 'interviewDate':
                setInterviewDate(value);
                break;
            case 'notes':
                setNotes(value);
                break;
            case 'phase':
                setPhase(value);
                break;
        }
    };
    const rescheduleInterview = async (id: string) => {
        try {
            await handleReschedule(interviewDate, notes, phase);
            setInterviews(prevInterviews =>
                prevInterviews.map(interview =>
                    interview._id === id
                        ? {
                            ...interview,
                            interviewDate: interview.interviewDate.includes('T')
                                ? `${interviewDate}T${interview.interviewDate.split('T')[1]}`
                                : interviewDate,
                            notes,
                            phase
                        }
                        : interview
                )
            );
        } catch (error) {
            console.error('Error rescheduling interview:', error);
        }
    };
    
    return {
        interviewDate,
        setInterviewDate,
        notes,
        setNotes,
        phase,
        setPhase,
        handleEditChange,
        rescheduleInterview,
        handleEditClick,
    };
};

// export const useRescheduleInterview = (_p0: string, _p1: { interviewDate: string; notes: string; phase: string; }, setInterviews: React.Dispatch<React.SetStateAction<applicantsData[]>>) => {
//     const [reschedulingInterview, setReschedulingInterview] = useState<applicantsData | null>(null);
//     const [reschedulingDate, setReschedulingDate] = useState('');
//     const [reschedulingTime, setReschedulingTime] = useState('');

//     const handleRescheduleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         if (name === 'date') {
//             setReschedulingDate(value);
//         } else if (name === 'time') {
//             setReschedulingTime(value);
//         } else if (reschedulingInterview) {
//             setReschedulingInterview({
//                 ...reschedulingInterview,
//                 [name]: value
//             });
//         }
//     };

//     const rescheduleInterview = (_p0: string, _p1: { interviewDate: string; notes: string; phase: string; }, e: React.FormEvent<HTMLButtonElement>) => {
//         e.preventDefault();
//         if (!reschedulingInterview) return;

//         const combinedDateTime = new Date(`${reschedulingDate}T${reschedulingTime}`);

//         const updatedInterview = {
//             ...reschedulingInterview,
//             interviewDate: combinedDateTime
//         };

//         AxiosInstance.patch(':id/interview/reschedule' , updatedInterview)
//             .then((response) => {
//                 console.log('Interview rescheduled successfully');
//                 setInterviews(prevInterviews =>
//                     prevInterviews.map(interview =>
//                         interview._id === reschedulingInterview._id ? response.data : interview
//                     )
//                 );
//                 setReschedulingInterview(null);
//                 setReschedulingDate('');
//                 setReschedulingTime('');
//             })
//             .catch(error => {
//                 console.error('Error rescheduling interview:', error);
//             });
//     };

//     return {
//         reschedulingInterview,
//         setReschedulingInterview,
//         reschedulingDate,
//         reschedulingTime,
//         handleRescheduleChange,
//         rescheduleInterview
//     };
// };

export const useUpdateInterviewStatus = (setInterviews: React.Dispatch<React.SetStateAction<applicantsData[]>>) => {
    const updateStatus = (interviewId: string | number, newStatus: string) => {
        AxiosInstance.patch(`/interview/${interviewId}/status`, { status: newStatus })
            .then((response) => {
                console.log('Interview status updated successfully');
                setInterviews(prevInterviews =>
                    prevInterviews.map(interview =>
                        interview._id === interviewId ? { ...interview, status: newStatus } : interview
                    )
                );
            })
            .catch(error => {
                console.error('Error updating interview status:', error);
            });
    };

    return { updateStatus };
};

export const useDeleteInterview = (setInterviews: React.Dispatch<React.SetStateAction<applicantsData[]>>) => {
    const [showModal, setShowModal] = useState(false);
    const [interviewToDeleteId, setInterviewToDeleteId] = useState<string | number>('');

    const handleDeleteInterviewModal = (interviewId: string | number) => {
        setInterviewToDeleteId(interviewId);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setInterviewToDeleteId('');
    };

    const handleDelete = (id: string | number) => {
        AxiosInstance.delete(`/interview/${id}`)
            .then(() => {
                console.log('Interview deleted successfully');
                setInterviews(prevInterviews => prevInterviews.filter(interview => interview._id !== id));
                closeModal();
            })
            .catch(error => {
                console.error('Error deleting interview:', error);
            });
    };

    return { handleDelete, closeModal, showModal, handleDeleteInterviewModal, interviewToDeleteId };
};

    

// export interface ApplicantsData {
//     firstName: string;
//     lastName: string;
//     phoneNumber: string;
//     email: string;
//     positionApplied: string;
//     status: string;
//     _id: number;
//     interviewDate: string;
//     startDate: string;
//     endDate: string;
// }
// const apiClient = axios.create({
//     baseURL: 'http://192.168.4.172:3000',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

// export const useGetAllInterviews = () => {
//    const {data,error,loading} = useFetch<ApplicantsData>("applicant?status=accepted")

//    return {data, error, loading}
// }

// export const updateApplicant = async (id: string, updateData: any) => {
//     try {
//       const response = await apiClient.patch(`/applicant/${id}`, updateData);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   };
  
//   export const deleteApplicant = async (id: string) => {
//     try {
//       const response = await apiClient.delete(`/applicant/${id}`);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   };
  
//   export const scheduleInterview = async (id: string, scheduleData: any) => {
//     try {
//       const response = await apiClient.patch(`/applicant/${id}/interview/schedule`, scheduleData);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   };
  
//   export const rescheduleInterview = async (id: string, rescheduleData: any) => {
//     try {
//       const response = await apiClient.patch(`/applicant/${id}/interview/reschedule`, rescheduleData);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   };
  
//   export const addInterviewNote = async (id: string, noteData: any) => {
//     try {
//       const response = await apiClient.patch(`/applicant/${id}/interview/notes`, noteData);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   };
  
//   export const updateInterviewStatus = async (id: string, statusData: any) => {
//     try {
//       const response = await apiClient.patch(`/applicant/${id}/interview/status`, statusData);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   };
  
//   export const updateEmploymentStatus = async (id: string, statusData: any) => {
//     try {
//       const response = await apiClient.patch(`/applicant/${id}/employment-status`, statusData);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   };
  
//   export const sendCustomEmail = async (id: string, emailData: any) => {
//     try {
//       const response = await apiClient.post(`/applicant/${id}/send-email`, emailData);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   };
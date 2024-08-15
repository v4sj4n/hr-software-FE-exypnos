
// import React, { createContext, useState, useEffect, useContext } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { DropResult } from 'react-beautiful-dnd';
// import { useGetAllInterviews, applicantsData } from '.';
// import { formatDate, getInterviewsByPhase } from './utils';
// import AxiosInstance from '@/Helpers/Axios';

// export interface Interview extends applicantsData {
//   fullName: string;
//   auth: { email: string };
//   secondInterviewDate?: Date;
//   firstInterviewDate?: Date;
//   notes: string;
//   currentPhase?:string;
//     message: string;
//   _id:number
// }

// interface InterviewContextType {
//   interviews: Interview[];
//   loading: boolean;
//   error: string | null;
//   selectedInterview: Interview | null;
//   isModalOpen: boolean;
//   isReschedule: boolean;
//   allPhasesPassed: boolean;
//   handleOpenModal: (interview: Interview, isReschedule: boolean) => void;
//   handleCloseModal: () => void;
//   handleReschedule: (interviewDate: string, notes: string) => void;
//   handleCancel: (interview: Interview) => void;
//   handleSchedule: (interviewDate: string, phase: string, notes: string) => void;
//   handleAccept: (interview: Interview) => void;
//   onDragEnd: (result: DropResult) => void;
//   handleNavigateToProfile: (CandidateViewId: string) => void;
//   getInterviewsByPhase: (phase: string) => Interview[];
//   formatDate: (dateString: string | number | Date) => string;
//   phases: string[];
// }

// const InterviewContext = createContext<InterviewContextType | undefined>(undefined);

// export const useInterviewContext = () => {
//   const context = useContext(InterviewContext);
//   if (!context) {
//     throw new Error('useInterviewContext must be used within an InterviewProvider');
//   }
//   return context;
// };

// export const InterviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { data: interviewsData, error, loading } = useGetAllInterviews();
//   const [interviews, setInterviews] = useState<Interview[]>([]);
//   const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isReschedule, setIsReschedule] = useState(false);
//   const [allPhasesPassed, setAllPhasesPassed] = useState(false);
//   const navigate = useNavigate();

//   const phases = ['applicant' , 'first', 'second'];


//   useEffect(() => {
//     if (interviewsData && Array.isArray(interviewsData)) {
//       const mappedInterviews: Interview[] = interviewsData
//         .map((applicant) => ({
//           fullName: `${applicant.firstName} ${applicant.lastName}`,
//           auth: { email: applicant.email },
//           phone: applicant.phoneNumber,
//           position: applicant.positionApplied,
//           firstInterviewDate: applicant.firstInterview || '',
//           notes: applicant.notes || '',
//           phase: applicant.status === 'accepted' ? 'first' : 'applicant',
//           ...applicant,
//         }))
//         .sort((a, b) => new Date(a.interviewDate).getTime() - new Date(b.interviewDate).getTime());
//       setInterviews(mappedInterviews);
//     }
//   }, [interviewsData]);

//   const handleOpenModal = (interview: Interview, isReschedule: boolean = false) => {
//     setSelectedInterview({
//       ...interview,
//       interviewDate: interview.interviewDate || '',
//     });
//     setIsModalOpen(true);
//     setIsReschedule(isReschedule);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedInterview(null);
//   };

//   const handleReschedule = async (firstInterviewDate: string, phase: string) => {
//     if (!selectedInterview) {
//       console.error('No interview selected for rescheduling');
//       return;
//     }
//     try {
//       const response = await AxiosInstance.patch(`/applicant/${selectedInterview._id}/interview/reschedule`, {
//         newFirstInterviewDate: firstInterviewDate,
//          notes,
//         phase 
//       });
  
//       if (response.status === 200) {
//         setInterviews(prevInterviews => 
//           prevInterviews.map(interview => 
//             interview._id === selectedInterview._id 
//               ? response.data  
//               : interview
//           )
//         );
//         setIsModalOpen(false);
//       }
//     } catch (error) {
//       console.error('Failed to reschedule interview:', error);
//     }
//   };
//   const handleCancel = (interview: Interview) => {
//     const isConfirmed = window.confirm(
//       `Are you sure you want to cancel the interview with ${interview.fullName}?`,
//     );
//     if (isConfirmed) {
//       const updatedInterviews = interviews.filter(
//         (i) => i._id !== interview._id,
//       );
//       setInterviews(updatedInterviews);
//       handleCloseModal();
//     }
//   };



  
//   const handleSchedule = async (interviewDate: string, phase: string, notes:string) => {
//     if (!selectedInterview) {
      
//       console.error('No interview selected for scheduling'); 

//       return;
//     }
//     try {
//       const response = await AxiosInstance.patch(`/applicant/${selectedInterview._id}/interview/schedule`, {
//         newInterviewDate: interviewDate,
//          notes,
//         phase 
//       });
  
//       if (response.status === 200) {
//         setInterviews(prevInterviews => 
//           prevInterviews.map(interview => 
//             interview._id === selectedInterview._id 
//               ? response.data 
//               : interview
//           )
//         );
//         setIsModalOpen(false);
//       }
//     } catch (error) {
//       console.error('Failed to schedule interview:', error);
//     }
//   };

//   const handleAccept = async (interview: Interview) => {
//     if (!interview) {
//       console.error('No interview selected');
//       return;
//     }
//     const nextPhase = interview.phase === 'applicant' ? 'first' : 'second';
//     setIsReschedule(false); 
//     try {
//       const response = await AxiosInstance.patch(`/applicant/${interview._id}/interview/status`, {
//         phase: nextPhase,
//         newInterviewDate: interview.interviewDate,
//         status: 'accepted'
//       });
  
//       if (response.status === 200) {
//         setInterviews(prevInterviews =>
//           prevInterviews.map(i =>
//             i._id === interview._id
//               ? { ...i, phase: nextPhase, status: 'accepted' }
//               : i
//           )
//         );
  
//         handleOpenModal({ ...interview, phase: nextPhase }, false); 
//       }
//     } catch (error) {
//       console.error('Failed to update interview phase:', error);
//     }
//   };
  

//   const onDragEnd = (result: DropResult) => {
//     if (!result.destination) return;

//     const newInterviews = Array.from(interviews);
//     const [reorderedItem] = newInterviews.splice(result.source.index, 1);
//     reorderedItem.phase = result.destination.droppableId;
//     newInterviews.splice(result.destination.index, 0, reorderedItem);

//     setInterviews(newInterviews);
//   };

//   const handleNavigateToProfile = (CandidateViewId: string) => {
//     navigate(`/view/${CandidateViewId}`);
//   };

//   return (
//     <InterviewContext.Provider
//       value={{
//         interviews,
//         loading,
//         error,
//         selectedInterview,
//         isModalOpen,
//         isReschedule,
//         allPhasesPassed,
//         handleOpenModal,
//         handleCloseModal,
//         handleReschedule,
//         handleSchedule,
//         handleCancel,
//         handleAccept,
//         onDragEnd,
//         handleNavigateToProfile,
//         getInterviewsByPhase: (phase: string) => getInterviewsByPhase(interviews, phase),
//         formatDate,
//         phases,
//       }}
//     >
//       {children}
//     </InterviewContext.Provider>
//   );
// };
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DropResult } from 'react-beautiful-dnd';
import { useGetAllInterviews, applicantsData } from '.';
import { formatDate, getInterviewsByPhase } from './utils';
import AxiosInstance from '@/Helpers/Axios';

export interface Interview extends applicantsData {
  fullName: string;
  auth: { email: string };
  secondInterviewDate?: Date;
  firstInterviewDate?: Date;
  notes: string;
  currentPhase: string;
  message: string;
  _id: number; // Ensure this matches the type from your backend
}

interface InterviewContextType {
  interviews: Interview[];
  loading: boolean;
  error: string | null;
  selectedInterview: Interview | null;
  isModalOpen: boolean;
  isReschedule: boolean;
  allPhasesPassed: boolean;
  handleOpenModal: (interview: Interview, isReschedule: boolean) => void;
  handleCloseModal: () => void;
  handleReschedule: (firstInterviewDate: Date, notes: string, currentPhase: string) => void;
  handleSchedule: (firstInterviewDate: Date, currentPhase: string, notes: string) => void;
  handleCancel: (interview: Interview) => void;
  handleAccept: (interview: Interview) => void;
  onDragEnd: (result: DropResult) => void;
  handleNavigateToProfile: (CandidateViewId: string) => void;
  getInterviewsByPhase: (currentPhase: string) => Interview[];
  formatDate: (dateString: string | number | Date) => string;
  currentPhases: string[];
}

const InterviewContext = createContext<InterviewContextType | undefined>(undefined);

export const useInterviewContext = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error('useInterviewContext must be used within an InterviewProvider');
  }
  return context;
};

export const InterviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: interviewsData, error, loading } = useGetAllInterviews();
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReschedule, setIsReschedule] = useState(false);
  const [allPhasesPassed, setAllPhasesPassed] = useState(false);
  const navigate = useNavigate();
  const currentPhases = ['applicant', 'first', 'second'];

  useEffect(() => {
    if (interviewsData && Array.isArray(interviewsData)) {
      const mappedInterviews: Interview[] = interviewsData.map((applicant) => {
        const phase = applicant.status === 'accepted' ? 'first' : 'applicant';
        return {
          ...applicant,
          fullName: `${applicant.firstName} ${applicant.lastName}`,
          auth: { email: applicant.email },
          secondInterviewDate: applicant.secondInterviewDate ? new Date(applicant.secondInterviewDate) : undefined,
          firstInterviewDate: applicant.firstInterviewDate ? new Date(applicant.firstInterviewDate) : undefined,
          notes: applicant.notes || '',
          currentPhase: phase,
          message: applicant.message || '',
          _id: applicant._id, 
        };
      });
      setInterviews(mappedInterviews);
    }
  }, [interviewsData]);
  

  const handleOpenModal = (interview: Interview, isReschedule: boolean = false) => {
    setSelectedInterview(interview);
    setIsModalOpen(true);
    setIsReschedule(isReschedule);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInterview(null);
  };

  const handleReschedule = async (firstInterviewDate: Date, notes: string, currentPhase: string) => {
    if (!selectedInterview) {
        console.error('No interview selected for rescheduling');
        return;
    }
    try {
        const response = await AxiosInstance.patch(`/applicant/${selectedInterview._id}/reschedule/interview`, {
            firstInterviewDate,
            notes,
            currentPhase,
        });
        if (response.status === 200) {
            setInterviews((prevInterviews) =>
                prevInterviews.map((interview) =>
                    interview._id === selectedInterview._id ? { ...response.data, currentPhase } : interview
                )
            );
            handleCloseModal();
        }
    } catch (error) {
        console.error('Failed to reschedule interview:', error);
    }
};

const handleSchedule = async (firstInterviewDate: Date, currentPhase: string, notes: string) => {
    if (!selectedInterview) {
        console.error('No interview selected for scheduling');
        return;
    }
    try {
        const response = await AxiosInstance.patch(`/applicant/${selectedInterview._id}/interview/schedule`, {
            firstInterviewDate,
            notes,
            currentPhase,
        });

        if (response.status === 200) {
            setInterviews((prevInterviews) =>
                prevInterviews.map((interview) =>
                    interview._id === selectedInterview._id ? { ...response.data, currentPhase } : interview
                )
            );
            handleCloseModal();
        }
    } catch (error) {
        console.error('Failed to schedule interview:', error);
    }
};

const handleCancel = async (interview: Interview) => {
    const isConfirmed = window.confirm(`Are you sure you want to cancel the interview with ${interview.fullName}?`);
    if (!isConfirmed) return;

    try {
        const response = await AxiosInstance.delete(`/applicant/${interview._id}/interview`);
        if (response.status === 200) {
            setInterviews((prevInterviews) => prevInterviews.filter((i) => i._id !== interview._id));
            handleCloseModal();
        }
    } catch (error) {
        console.error('Failed to cancel interview:', error);
    }
};



  const handleAccept = async (interview: Interview) => {
    if (!interview) {
      console.error('No interview selected');
      return;
    }
    const nextPhase = interview.currentPhase === 'applicant' ? 'first' : 'second';
    const interviewDateKey = nextPhase === 'first' ? 'firstInterviewDate' : 'secondInterviewDate';
    setIsReschedule(false);
    try {
      const response = await AxiosInstance.patch(`/applicant/${interview._id}/interview/status`, {
        currentPhase: nextPhase,
        status: 'accepted',
        [interviewDateKey]: new Date(), 
      });

      if (response.status === 200) {
        setInterviews((prevInterviews) =>
          prevInterviews.map((i) =>
            i._id === interview._id
              ? {
                  ...i,
                  currentPhase: nextPhase,
                  status: 'accepted',
                  [interviewDateKey]: new Date(),
                }
              : i
          )
        );

        handleOpenModal({ ...interview, currentPhase: nextPhase }, false);
      }
    } catch (error) {
      console.error('Failed to update interview phase:', error);
    }
  };

  

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const newInterviews = Array.from(interviews);
    const [reorderedItem] = newInterviews.splice(result.source.index, 1);
    reorderedItem.currentPhase = result.destination.droppableId;
    newInterviews.splice(result.destination.index, 0, reorderedItem);

    setInterviews(newInterviews);

    try {
      await AxiosInstance.patch(`/applicant/${reorderedItem._id}/interview/phase`, {
        currentPhase: reorderedItem.currentPhase,
      });
    } catch (error) {
      console.error('Failed to update interview phase after drag-and-drop:', error);
    }
  };

  const handleNavigateToProfile = (CandidateViewId: string) => {
    navigate(`/view/${CandidateViewId}`);
  };

  return (
    <InterviewContext.Provider
      value={{
        interviews,
        loading,
        error,
        selectedInterview,
        isModalOpen,
        isReschedule,
        allPhasesPassed,
        handleOpenModal,
        handleCloseModal,
        handleReschedule,
        handleSchedule,
        handleCancel,
        handleAccept,
        onDragEnd,
        handleNavigateToProfile,
        getInterviewsByPhase: (currentPhase: string) => getInterviewsByPhase(interviews, currentPhase),
        formatDate,
        currentPhases,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

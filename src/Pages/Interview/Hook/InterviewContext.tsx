import React, { createContext, useState, useEffect, useContext  } from 'react';
import { useNavigate } from 'react-router-dom';
import { DropResult } from 'react-beautiful-dnd';
import { useGetAllInterviews, applicantsData } from '.';
import { formatDate, getInterviewsByPhase } from './utils';
import AxiosInstance from '@/Helpers/Axios';



export interface Interview extends applicantsData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  positionApplied: string;
  status: string;
  _id: string;
  firstInterviewDate?: string;
  secondInterviewDate?: string;
  notes: string;
  customMessage: string;
  currentPhase: string;
  isDeleted?: boolean;
  fullName: string;
  customSubject:string;

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
  handleReschedule: (interviewDate: string, notes: string,customMessage:string, customSubject:string) => void;
  handleCancel: (interview: Interview) => void;
  handleSchedule: (interviewDate: string, notes: string,customMessage:string, customSubject:string) => void;
  onDragEnd: (result: DropResult) => void;
  handleNavigateToProfile: (CandidateViewId: string) => void;
  getInterviewsByPhase: (currentPhase: string) => Interview[];
  formatDate: (dateString: string | number | Date | undefined) => string;
  handleAccept: (interview: Interview) => void;
  phases: string[];

}

const InterviewContext = createContext<InterviewContextType | undefined>(
    undefined,
)

export const useInterviewContext = () => {
    const context = useContext(InterviewContext)
    if (!context) {
        throw new Error(
            'useInterviewContext must be used within an InterviewProvider',
        )
    }
    return context
}

export const InterviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: interviewsData, error, loading } = useGetAllInterviews();
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReschedule, setIsReschedule] = useState(false);
  const [allPhasesPassed] = useState(false);
  const navigate = useNavigate();
  const phases = ['applicant', 'first_interview', 'second_interview'];
 

  useEffect(() => {
    if (interviewsData && Array.isArray(interviewsData)) {
      const mappedInterviews: Interview[] = interviewsData.map((applicant) => {
        let currentPhase = 'applicant';
  
        if (applicant.status === 'accepted') {
          currentPhase = applicant.secondInterviewDate ? 'second_interview' : 'first_interview';
        }
  
        return {
          ...applicant,
          fullName: `${applicant.firstName} ${applicant.lastName}`,
          auth: { email: applicant.email },
          secondInterviewDate: applicant.secondInterviewDate ? new Date(applicant.secondInterviewDate).toISOString() : undefined,
          firstInterviewDate: applicant.firstInterviewDate ? new Date(applicant.firstInterviewDate).toISOString() : undefined,
          notes: applicant.notes || '',
          currentPhase: currentPhase,  
          _id: applicant._id,
          customMessage: applicant.customMessage || '',
          customSubject: applicant.customSubject || '',
        };
      });
  
      setInterviews(mappedInterviews);
    }
  }, [interviewsData]);


const handleOpenModal = (interview: Interview, isReschedule = false) => {
    console.log('Before setting modal open:', isModalOpen);
    setSelectedInterview(interview);  
    setIsModalOpen(true);
    setIsReschedule(isReschedule);
    console.log('After setting modal open:', isModalOpen);

  };
  

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedInterview(null)
    }


 

const handleCancel = async (interview: Interview) => {
  const isConfirmed = window.confirm(
    `Are you sure you want to cancel the interview with ${interview.fullName}?`
  );
  
  if (isConfirmed) {
    try {
      const response = await AxiosInstance.delete(`/applicant/${interview._id}`);
      
      if (response.status === 200) {
        setInterviews(prevInterviews => 
          prevInterviews.filter(i => i._id !== interview._id)
        );
        
        window.alert(`Interview with ${interview.fullName} has been cancelled.`);
        handleCloseModal();
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('Error cancelling interview:', error);
      window.alert('Failed to cancel interview. Please try again later.');
    }
  }
};



// Modify the handleReschedule function
const handleReschedule = async (interviewDate: string, notes: string, customMessage: string, customSubject: string) => {
  if (!selectedInterview) {
    console.error('No interview selected for rescheduling');
    return;
  }

  let dateField: 'firstInterviewDate' | 'secondInterviewDate';
  let updatedPhase = selectedInterview.currentPhase; 

  if (selectedInterview.currentPhase === 'first_interview') {
    dateField = 'firstInterviewDate';
  } else if (selectedInterview.currentPhase === 'second_interview') {
    dateField = 'secondInterviewDate';
  } else {
    console.error('Invalid phase for rescheduling');
    return;
  }

  try {
    const response = await AxiosInstance.patch(`/applicant/${selectedInterview._id}/reschedule-interview`, {
      [dateField]: interviewDate,
      notes,
      customMessage,
      customSubject,
      currentPhase: updatedPhase,
    });

    if (response.status === 200) {
      setInterviews(prevInterviews =>
        prevInterviews.map(interview =>
          interview._id === selectedInterview._id
            ? {
                ...interview,
                [dateField]: interviewDate,
                notes,
                customMessage,
                customSubject,
                currentPhase: updatedPhase, 
              }
            : interview
        )
      );
      setIsModalOpen(false);
      handleCloseModal();
    }
  } catch (error) {
    console.error('Failed to reschedule interview:', error);
  }
};

// Modify the handleSchedule function
const handleSchedule = async (interviewDate: string, notes: string, customMessage: string, customSubject: string) => {
  if (!selectedInterview) {
    console.error('No interview selected for scheduling');
    return;
  }

  const isNewAcceptance = selectedInterview.status !== 'accepted';
  const isMovingToSecondInterview = selectedInterview.status === 'accepted' && selectedInterview.currentPhase === 'first_interview';
  
  let dateField: 'firstInterviewDate' | 'secondInterviewDate';
  let newPhase: 'first_interview' | 'second_interview';

  if (isNewAcceptance) {
    dateField = 'firstInterviewDate';
    newPhase = 'first_interview';
  } else if (isMovingToSecondInterview) {
    dateField = 'secondInterviewDate';
    newPhase = 'second_interview';
  } else {
    dateField = selectedInterview.currentPhase === 'first_interview' ? 'firstInterviewDate' : 'secondInterviewDate';
    newPhase = selectedInterview.currentPhase as 'first_interview' | 'second_interview';
  }

  try {
    const response = await AxiosInstance.patch(`/applicant/${selectedInterview._id}`, {
      [dateField]: interviewDate,
      notes,
      customMessage,
      customSubject,
      status: 'accepted',
      currentPhase: newPhase
    });

    if (response.status === 200) {
      setInterviews(prevInterviews => 
        prevInterviews.map(interview => 
          interview._id === selectedInterview._id 
            ? { 
                ...interview, 
                [dateField]: new Date(interviewDate), 
                notes, 
                customMessage, 
                customSubject,
                status: 'accepted',
                currentPhase: newPhase
              }
            : interview
        )
      );
      handleCloseModal();
    }
  } catch (error) {
    console.error('Failed to schedule interview:', error);
    // Handle error
  }
};

// Modify the handleAccept function
const handleAccept = async (interview: Interview) => {
    setSelectedInterview(interview);
    setIsReschedule(false);
    setIsModalOpen(true);
    try {
    const response = await AxiosInstance.patch(`/applicant/${interview._id}`, {
      status: 'accepted'
    });

    if (response.status === 200) {
      setInterviews(prevInterviews =>
        prevInterviews.map(i =>
          i._id === interview._id
            ? { ...i, status: 'accepted', currentPhase: 'applicant' }
            : i
        )
      );
    }
  } catch (error) {
    console.error('Failed to update interview status:', error);
  }
};



  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newInterviews = Array.from(interviews);
    const [reorderedItem] = newInterviews.splice(result.source.index, 1);
    reorderedItem.currentPhase = result.destination.droppableId;
    newInterviews.splice(result.destination.index, 0, reorderedItem);

    setInterviews(newInterviews);
  };

    const handleNavigateToProfile = (CandidateViewId: string) => {
        navigate(`/view/${CandidateViewId}`)
    }

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
        onDragEnd,
        handleNavigateToProfile,
        handleAccept,
       
        getInterviewsByPhase: (phase: string) => getInterviewsByPhase(interviews, phase),
        formatDate: (dateString: string | number | Date | undefined) => formatDate(dateString ?? ""),
        phases,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};



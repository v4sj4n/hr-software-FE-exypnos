
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DropResult } from 'react-beautiful-dnd';
import { useGetAllInterviews, applicantsData } from '.';
import { formatDate, getInterviewsByPhase } from './utils';
import AxiosInstance from '@/Helpers/Axios';

export interface Interview extends applicantsData {
  fullName: string;
  auth: { email: string };
  interviewDate: string;
  notes: string;
  currentPhase: string;
  message: string;
  _id: number;
}
interface Applicant {
  name: string;
  position: string;
  status: string;
  email: string;
}

// Update the applicant phase handling
const handleApplicantPhase = (applicant: Applicant) => {
  // Display name and position only
  console.log(`Applicant: ${applicant.name}, Position: ${applicant.position}`);
  // No rescheduling button in this phase
}

// Logic for accepting an applicant from the applicant phase to the first interview phase
const acceptApplicantForFirstPhase = (applicant: Applicant) => {
  applicant.status = 'first_phase';
  sendEmail(applicant.email, EmailType.FIRST_INTERVIEW);
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
  handleReschedule: (interviewDate: string, notes: string) => void;
  handleCancel: (interview: Interview) => void;
  handleSchedule: (interviewDate: string, phase: string, notes: string) => void;
  handleAccept: (interview: Interview) => void;
  onDragEnd: (result: DropResult) => void;
  handleNavigateToProfile: (CandidateViewId: string) => void;
  getInterviewsByPhase: (phase: string) => Interview[];
  formatDate: (dateString: string | number | Date) => string;
  phases: string[];
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
  const [allPhasesPassed] = useState(false);
  const navigate = useNavigate();

  const phases = ['applicant' , 'first', 'second'];
  
  
  useEffect(() => {
    if (interviewsData && Array.isArray(interviewsData)) {
      const mappedInterviews: Interview[] = interviewsData
        .map((applicant) => ({
          fullName: `${applicant.firstName} ${applicant.lastName}`,
          auth: { email: applicant.email },
          phone: applicant.phoneNumber,
          position: applicant.positionApplied,
          interviewDate: applicant.firstInterviewDate || applicant.secondInterviewDate || '',
          notes: applicant.notes || '',
          currentPhase: applicant.currentPhase || 'applicant',
          status: applicant.status || 'pending',
          ...applicant,
        }))
        .sort((a, b) => new Date(a.interviewDate).getTime() - new Date(b.interviewDate).getTime());
      
      setInterviews(mappedInterviews);
    }
  }, [interviewsData]);

  function sort(arg0: (a: any, b: any) => number) {
    throw new Error('Function not implemented.');
  }
  
  
 const getInterviewsByPhase = (phase: string) => {
  if (phase === 'first') {
    return interviews.filter(interview => interview.currentPhase === 'first' && interview.status === 'accepted');
  }
  return interviews.filter(interview => interview.currentPhase === phase)
 .sort((a, b) => new Date(a.interviewDate).getTime() - new Date(b.interviewDate).getTime());

};

  const handleOpenModal = (interview: Interview, isReschedule: boolean = false) => {
    setSelectedInterview({
      ...interview,
      interviewDate: interview.interviewDate || '',
    });
    setIsModalOpen(true);
    setIsReschedule(isReschedule);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInterview(null);
  };

  const handleReschedule = async (interviewDate: string, phase: string) => {
    if (!selectedInterview) {
      console.error('No interview selected for rescheduling');
      return;
    }
    try {
      const response = await AxiosInstance.patch(`/applicant/${selectedInterview._id}/reschedule-interview`, {
        [phase === 'first' ? 'firstInterviewDate' : 'secondInterviewDate']: interviewDate,
        currentPhase: phase
      });
  
      if (response.status === 200) {
        setInterviews(prevInterviews => 
          prevInterviews.map(interview => 
            interview._id === selectedInterview._id 
              ? { ...interview, ...response.data.applicant }
              : interview
          )
        );
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Failed to reschedule interview:', error);
    }
  };

  
  
  const handleCancel = (interview: Interview) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to cancel the interview with ${interview.fullName}?`,
    );
    if (isConfirmed) {
      const updatedInterviews = interviews.filter(
        (i) => i._id !== interview._id,
      );
      setInterviews(updatedInterviews);
      handleCloseModal();
    }
  };

  // const handleAccept = (interview: Interview) => {
  //   const nextPhase = interview.phase === 'first' ? 'second' : 'applicant';
    
  //   const updatedInterviews = interviews.map(i =>
  //     i._id === interview._id ? { ...i, phase: nextPhase } : i
  //   );
  
  //   setInterviews(updatedInterviews);
  //   const response = await AxiosInstance.patch(`/applicant/${interview._id}/status`, { status: 'accepted' });
  
    // if (nextPhase === 'Employed') {
    //   setAllPhasesPassed(true);
    // } else {
    //   handleOpenModal(interview, false);
    // }
  // };


  
  const handleSchedule = async (interviewDate: string, phase: string, notes: string) => {
    if (!selectedInterview) {
      console.error('No interview selected for scheduling');
      return;
    }
    try {
      const response = await AxiosInstance.patch(`/applicant/${selectedInterview._id}`, {
        [phase === 'first' ? 'firstInterviewDate' : 'secondInterviewDate']: interviewDate,
        notes,
        currentPhase: phase
      });
  
      if (response.status === 200) {
        setInterviews(prevInterviews => 
          prevInterviews.map(interview => 
            interview._id === selectedInterview._id 
              ? { ...interview, ...response.data }
              : interview
          )
        );
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Failed to schedule interview:', error);
    }
  };
  
  const handleAccept = async (interview: Interview) => {
    if (!interview) {
      console.error('No interview selected');
      return;
    }
    const nextPhase = interview.currentPhase === 'applicant' ? 'first' : 'second';
    try {
      setInterviews(prevInterviews =>
        prevInterviews.map(i =>
          i._id === interview._id
            ? { ...i, currentPhase: nextPhase, status: 'accepted' }
            : i
        )
      );
      const response = await AxiosInstance.patch(`/applicant/${interview._id}/status`, {
        currentPhase: nextPhase,
        status: 'accepted'
      });
  
      if (response.status === 200) {
        handleOpenModal({ ...interview, currentPhase: nextPhase }, false);
      } else {
        // Rollback the UI update if the API call fails
        setInterviews(prevInterviews =>
          prevInterviews.map(i =>
            i._id === interview._id
              ? { ...i, currentPhase: interview.currentPhase, status: interview.status }
              : i
          )
        );
        console.error('Failed to update applicant status');
      }
    } catch (error) {
      // Rollback UI changes on error
      setInterviews(prevInterviews =>
        prevInterviews.map(i =>
          i._id === interview._id
            ? { ...i, currentPhase: interview.currentPhase, status: interview.status }
            : i
        )
      );
      console.error('Failed to update applicant:', error);
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
      const response = await AxiosInstance.patch(`/applicant/${reorderedItem._id}/update-phase`, {
        currentPhase: reorderedItem.currentPhase,
      });
      if (response.status !== 200) {
        console.error('Failed to update interview phase');
      }
    } catch (error) {
      console.error('Failed to update interview phase:', error);
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
    getInterviewsByPhase,
    formatDate,
    phases,
  }}
>
  {children}
</InterviewContext.Provider>

  );
};



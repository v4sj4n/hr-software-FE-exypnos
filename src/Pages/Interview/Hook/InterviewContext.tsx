import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DropResult } from 'react-beautiful-dnd';
import { useGetAllInterviews, updateInterview,applicantsData } from '.';
import { formatDate, getInterviewsByPhase } from './utils';
import axios from 'axios';

export interface Interview extends applicantsData {
  fullName: string;
  auth: { email: string };
  interviewDate: string;
  notes: string;
  phase: string;
  message: string;
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
  handleCancel: (interview: Interview) => void;
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
  const [allPhasesPassed, setAllPhasesPassed] = useState(false);
  const navigate = useNavigate();

  const phases = ['First Interview', 'Second Interview', 'Employed'];

  const {
    handleRescheduleClick,
    handleRescheduleChange,
    handleUpdateInterview,
  } = updateInterview(setInterviews as React.Dispatch<React.SetStateAction<any>>);

  useEffect(() => {
    if (interviewsData && Array.isArray(interviewsData)) {
      const mappedInterviews: Interview[] = interviewsData
        .filter(applicant => applicant.status === 'accepted')
        .map((applicant) => ({
          fullName: `${applicant.firstName} ${applicant.lastName}`,
          auth: { email: applicant.email },
          phone: applicant.phoneNumber,
          position: applicant.positionApplied,
          interviewDate: applicant.interviewDate || '',
          notes: applicant.notes || '',
          phase: 'First Interview',
          ...applicant,
        }))
        .sort((a, b) => new Date(a.interviewDate).getTime() - new Date(b.interviewDate).getTime());
      setInterviews(mappedInterviews);
    }
  }, [interviewsData]);

  const handleOpenModal = (interview: Interview, isReschedule: boolean = false) => {
    setSelectedInterview({
      ...interview,
      interviewDate: interview.interviewDate || '',
    });
    setIsModalOpen(true);
    setIsReschedule(isReschedule);

    if (isReschedule) {
      handleRescheduleClick(interview);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInterview(null);
  };

  const handleCancel = async (interview: Interview) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to cancel the interview with ${interview.fullName}?`,
    );
    if (isConfirmed) {
      try {
        await axios.delete(`/api/applicant/${interview._id}`);
  
        const updatedInterviews = interviews.filter(
          (i) => i._id !== interview._id,
        );
        setInterviews(updatedInterviews);
        handleCloseModal();
      } catch (error) {
        console.error('Error deleting interview:', error);
      }
    }
  };
  
  const handleAccept = async (interview: Interview) => {
    const nextPhase = interview.phase === 'First Interview' ? 'Second Interview' : 'Employed';
    
    try {
      await axios.patch(`/api/applicant/${interview._id}/status`, {
        status: nextPhase
      });
  
      const updatedInterviews = interviews.map(i =>
        i._id === interview._id ? { ...i, phase: nextPhase } : i
      );
      setInterviews(updatedInterviews);
  
      if (nextPhase === 'Employed') {
        setAllPhasesPassed(true);
      } else {
        handleOpenModal(interview, false);
      }
    } catch (error) {
      console.error('Error accepting interview:', error);
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newInterviews = Array.from(interviews);
    const [reorderedItem] = newInterviews.splice(result.source.index, 1);
    reorderedItem.phase = result.destination.droppableId;
    newInterviews.splice(result.destination.index, 0, reorderedItem);

    setInterviews(newInterviews);
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
        handleCancel,
        handleAccept,
        onDragEnd,
        handleNavigateToProfile,
        getInterviewsByPhase: (phase: string) => getInterviewsByPhase(interviews, phase),
        formatDate,
        phases,
        handleReschedule: handleUpdateInterview,
        handleRescheduleChange, 
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};


import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DropResult } from 'react-beautiful-dnd';
import { useGetAllInterviews, applicantsData } from '.';
import { formatDate, getInterviewsByPhase } from './utils';

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
  handleReschedule: (interviewDate: string, notes: string) => void;
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
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInterview(null);
  };

  const handleReschedule = (interviewDate: string, notes: string) => {
    if (selectedInterview) {
      const updatedInterviews = interviews.map(interview =>
        interview._id === selectedInterview._id
          ? {
              ...interview,
              interviewDate: allPhasesPassed ? interview.interviewDate : interviewDate,
              notes,
              phase: isReschedule ? interview.phase : 'Second Interview'
            }
          : interview
      );
      setInterviews(updatedInterviews);
    }
    handleCloseModal();
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

  const handleAccept = (interview: Interview) => {
    const nextPhase = interview.phase === 'First Interview' ? 'Second Interview' : 'Employed';
    
    const updatedInterviews = interviews.map(i =>
      i._id === interview._id ? { ...i, phase: nextPhase } : i
    );
  
    setInterviews(updatedInterviews);
  
    if (nextPhase === 'Employed') {
      setAllPhasesPassed(true);
    } else {
      handleOpenModal(interview, false);
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
        handleReschedule,
        handleCancel,
        handleAccept,
        onDragEnd,
        handleNavigateToProfile,
        getInterviewsByPhase: (phase: string) => getInterviewsByPhase(interviews, phase),
        formatDate,
        phases,
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DropResult } from 'react-beautiful-dnd';
import { useGetAllInterviews, applicantsData } from '.';
import {  getInterviewsByPhase } from './utils';
import AxiosInstance from '@/Helpers/Axios';
import AcceptModal from '../Component/AcceptModal';
import DeleteConfirmationModal from '../Component/DeleteConfirmationModal';
import ScheduleForm from '../Component/ScheduleForm';

export interface Interview extends applicantsData {
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
  currentPhase: string;
  date?: Date; 
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
  handleReschedule: (date: Date, currentPhase: 'first' | 'second', notes: string) => void;
  handleCancel: (interview: Interview) => void;
  handleSchedule: (date: Date, currentPhase: 'first' | 'second', notes: string) => void;
  handleAccept: (interview: Interview) => void;
  onDragEnd: (result: DropResult) => void;
  handleNavigateToProfile: (CandidateViewId: string) => void;
  getInterviewsByPhase: (currentPhase: string) => Interview[];
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  const phases = ['applicant', 'first', 'second', 'employed'];

  useEffect(() => {
    if (interviewsData && Array.isArray(interviewsData)) {
      const mappedInterviews: Interview[] = interviewsData.map((applicant) => {
        const currentPhase = applicant.status === 'accepted' ? 'first' : 'applicant';
        const date = currentPhase === 'first' ? applicant.firstInterviewDate : '';

        return {
          fullName: `${applicant.firstName} ${applicant.lastName}`,
          auth: { email: applicant.email },
          phone: applicant.phoneNumber,
          position: applicant.positionApplied,
          notes: applicant.notes || '',
          date,
          phase: currentPhase,
          ...applicant,
        };
      }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      setInterviews(mappedInterviews);
    }
  }, [interviewsData]);

  const handleOpenModal = (interview: Interview, isReschedule: boolean = false) => {
    const date = interview.currentPhase === 'first'
      ? (interview.firstInterviewDate ? new Date(interview.firstInterviewDate) : null)
      : (interview.secondInterviewDate ? new Date(interview.secondInterviewDate) : null);

    setSelectedInterview({ ...interview, date });
    setIsModalOpen(true);
    setIsReschedule(isReschedule);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInterview(null);
  };

  const handleReschedule = async (date: Date, currentPhase: string, notes: string) => {
    if (!selectedInterview) {
      console.error('No interview selected for rescheduling');
      return;
    }

    const newInterviewDateField = currentPhase === 'first' ? 'firstInterviewDate' : 'secondInterviewDate';

    try {
      const response = await AxiosInstance.patch(`/applicant/${selectedInterview._id}/reschedule/interview`, {
        [newInterviewDateField]: date,
        notes,
        currentPhase,
      });

      if (response.status === 200) {
        setInterviews(prevInterviews =>
          prevInterviews.map(interview =>
            interview._id === selectedInterview._id
              ? response.data
              : interview
          )
        );
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Failed to reschedule interview:', error);
    }
  };

  const handleSchedule = async (date: Date, currentPhase: string, notes: string) => {
    if (!selectedInterview) {
      console.error('No interview selected for scheduling');
      return;
    }

    const newInterviewDateField = currentPhase === 'first' ? 'secondInterviewDate' : 'firstInterviewDate';

    try {
      const response = await AxiosInstance.patch(`/applicant/${selectedInterview._id}/reschedule/interview`, {
        [newInterviewDateField]: date,
        notes,
        currentPhase,
      });

      if (response.status === 200) {
        setInterviews(prevInterviews =>
          prevInterviews.map(interview =>
            interview._id === selectedInterview._id
              ? response.data
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
    if (!selectedInterview) {
      console.error('No interview selected');
      return;
    }

    const nextPhase = interview.currentPhase === 'first' ? 'second' : 'applicant';
    const secondInterviewDate = interview.firstInterviewDate;

    setIsReschedule(false);
    try {
      const response = await AxiosInstance.patch(`/applicant/${selectedInterview._id}/reschedule/interview`, {
        phase: nextPhase,
        secondInterviewDate,
      });

      if (response.status === 200) {
        setInterviews(prevInterviews =>
          prevInterviews.map(i =>
            i._id === interview._id
              ? {
                  ...i,
                  currentPhase: nextPhase,
                  secondInterviewDate: secondInterviewDate,
                }
              : i
          )
        );

        if (nextPhase === 'second') {
          handleOpenModal({ ...interview, currentPhase: nextPhase, secondInterviewDate }, false);
        }
      }
    } catch (error) {
      console.error('Failed to update interview phase:', error);
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newInterviews = Array.from(interviews);
    const [reorderedItem] = newInterviews.splice(result.source.index, 1);
    reorderedItem.currentPhase = result.destination.droppableId;

    newInterviews.splice(result.destination.index, 0, reorderedItem);
    setInterviews(newInterviews);

    updateInterviewPhase(reorderedItem);
  };

  const updateInterviewPhase = async (interview: Interview) => {
    try {
      const response = await AxiosInstance.patch(`/applicant/${interview._id}/interview/status`, {
        phase: interview.currentPhase,
      });

      if (response.status !== 200) {
        console.error('Failed to update interview phase in the backend');
      }
    } catch (error) {
      console.error('Error updating interview phase:', error);
    }
  };

  const handleCancel = (interview: Interview) => {
    setSelectedInterview(interview);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (!selectedInterview) {
      return;
    }

    try {
      const response = await AxiosInstance.delete(`/applicant/${selectedInterview._id}/interview/status`);
      if (response.status === 200) {
        setInterviews(interviews.filter(i => i._id !== selectedInterview._id));
      }
    } catch (error) {
      console.error('Error deleting interview:', error);
    }

    setIsDeleteModalOpen(false);
    setSelectedInterview(null);
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
        handleSchedule,
        handleAccept,
        onDragEnd,
        handleNavigateToProfile,
        getInterviewsByPhase,
        
        phases,
      }}
    >
      {children}
      {isModalOpen && (
        <ScheduleForm
          interview={selectedInterview!}
          isReschedule={isReschedule}
          onClose={handleCloseModal}
          onSubmit={isReschedule ? handleReschedule : handleSchedule}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          interview={selectedInterview!}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmCancel}
        />
      )}
      {selectedInterview && selectedInterview.currentPhase === 'first' && (
        <AcceptModal
          interview={selectedInterview}
          onClose={handleCloseModal}
          onAccept={handleAccept}
        />
      )}
    </InterviewContext.Provider>
  );
};

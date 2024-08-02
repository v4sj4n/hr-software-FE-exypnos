import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';

import Button from '../../Components/Button/Button';
import { ButtonTypes } from '../../Components/Button/ButtonTypes';
import RescheduleModal from './Component/ScheduleForm';
import { applicantsData, useGetAllInterviews } from './Hook';
import style from './styles/Interview.module.css';

interface Interview extends applicantsData {
  fullName: string;
  auth: { email: string };
  interviewDate: string;
  notes: string;
  phase: string;
  message:string,
}

const phases = [
  'First Interview',
  'Second Interview',
  'Employed'
];
const formatDate = (dateString: string | number | Date) => {
  if (!dateString) {
    return "No Date Provided";
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }
  const formattedDate = date.toLocaleDateString('en-GB'); 
  const formattedTime = date.toLocaleTimeString('en-GB'); 
  return `${formattedDate} ${formattedTime}`;
};



export default function InterviewKanban() {
  const { data: interviewsData, error, loading } = useGetAllInterviews();
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null); 
  const [isReschedule, setIsReschedule] = useState(false);
  const navigate = useNavigate();
  const [allPhasesPassed, setAllPhasesPassed] = useState(false);





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
        setInterviews(mappedInterviews);    }
  }, [interviewsData]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newInterviews = Array.from(interviews);
    const [reorderedItem] = newInterviews.splice(result.source.index, 1);
    reorderedItem.phase = result.destination.droppableId;
    newInterviews.splice(result.destination.index, 0, reorderedItem);

    setInterviews(newInterviews);
  };

  const getInterviewsByPhase = (phase: string) => {
    return interviews.filter(interview => interview.phase === phase)
    .sort((a, b) => new Date(a.interviewDate).getTime() - new Date(b.interviewDate).getTime());

  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInterview(null);
  };

  const handleOpenModal = (
    interview: Interview,
    isReschedule: boolean = false,
  ) => {
    setSelectedInterview({
      ...interview,
      interviewDate: interview.interviewDate || '', 
    });
    setIsModalOpen(true);
    setIsReschedule(isReschedule);
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
      // handleOpenModal(interview, false);
      setAllPhasesPassed(true);
    
    } else {
      handleOpenModal(interview, false);
    }
  };

  const handleNavigateToProfile = (CandidateViewId: string) => {
    navigate(`/view/${CandidateViewId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading interviews: {error || 'Unknown error'}</div>;
  }

  return (
    <div className={style.kanbanBoard}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={style.kanbanColumns}>
          {phases.map(phase => (
            <div key={phase} className={style.kanbanColumn}>
              <h2>{phase}
              <span className={style.applicantCount}>
                ({getInterviewsByPhase(phase).length})
              </span>
              </h2>
              <Droppable droppableId={phase}>
                
                {(provided) => (
                  
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={style.kanbanList}
                  >
                    {getInterviewsByPhase(phase).map((interview, index) => (
                      <Draggable key={interview._id.toString()} draggableId={interview._id.toString()} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={style.kanbanItem}
                          >
                            <h6
                              onClick={() => handleNavigateToProfile(interview._id.toString())}
                              className={style.candidateName}
                            >
                              {interview.fullName}
                            </h6>
                            <p>{interview.positionApplied}</p>
                            {phase !== 'Employed' && (
  <p>Interview Date: {formatDate(interview.interviewDate)}</p>
)}
                             <p>Email: {interview.email}</p>
                            <p>Phone: {interview.phoneNumber}</p>
                            <p>Notes: {interview.notes}</p>
                            <div className={style.buttonContainer}>
                            <Tooltip title="Edit" placement="top">
    <span> 
      <Button
        type={ButtonTypes.SECONDARY}
        btnText=""
        width="40px"
        height="30px"
        display='flex'
        justifyContent='center'
        alignItems='center'
        color='#2457A3'
        borderColor='#2457A3'
        icon={<EditIcon />}
        onClick={() => handleOpenModal(interview, true)}
      />
    </span>
  </Tooltip>

  <div style={{display:"flex", justifyContent:"flex-end", gap:'10px'}}>    
    <Tooltip title="Delete" placement="top">
      <span>
        <Button
          btnText=" " 
          type={ButtonTypes.SECONDARY}
          width="35px"
          height="30px"
          color="#C70039"
          borderColor="#C70039"
          display="flex"
          justifyContent="center"
          alignItems="center"
          icon={<DeleteIcon />}
          onClick={() => handleCancel(interview)}
        />
      </span>
    </Tooltip>
    
    {phase !== 'Employed' && (
      
      <Tooltip title="Accept" placement="top">
        <span>
          <Button
            btnText=''
            type={ButtonTypes.SECONDARY}
            width="35px"
            height="30px"
            color='rgb(2, 167, 0)'
            borderColor='rgb(2, 167, 0)'
            display='flex'
            justifyContent='center'
            alignItems='center'
            icon={<CheckIcon />}
            onClick={() => handleAccept(interview)}
          />
        </span>
      </Tooltip>
    )}
                               </div>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
   {isModalOpen && selectedInterview && (
  <RescheduleModal
          open={isModalOpen}
          handleClose={handleCloseModal}
          handleReschedule={handleReschedule}
          selectedInterview={selectedInterview}
          allPhasesPassed={allPhasesPassed} message={''}  />
)}
    </div>
  );
}
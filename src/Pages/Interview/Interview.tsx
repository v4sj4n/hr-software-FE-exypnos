import CheckIcon from '@mui/icons-material/Check';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import  { useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
// import HistoryIcon from '@mui/icons-material/History';
import { useNavigate } from 'react-router-dom';

import Button from '../../Components/Button/Button';
import { ButtonTypes } from '../../Components/Button/ButtonTypes';
import RescheduleModal from './Component/ScheduleForm';
import style from './styles/Interview.module.css';

interface Interview {
  fullName: string;
  auth: { email: string };
  phone: string;
  position: string;
  date: string;
  time: string;
  cvAttachment: string;
  notes: string;
  phase: string;
}

const dummyInterviews: Interview[] = [
  {
    fullName: "Artemisa Nuri",
    auth: { email: "artemisa.nuri@example.com" },
    phone: "123-456-7890",
    position: "Software Engineer",
    date: "2024-07-25",
    time: "14:00",
    cvAttachment: "artemisa_nuri_cv.pdf",
    notes: "interview scheduled",
    phase: "Employeed",
  },
  {
    fullName: "Gerti Kadiu",
    auth: { email: "gerti.kadiu@example.com" },
    phone: "987-654-3210",
    position: "Project Manager",
    date: "2024-07-26",
    time: "10:30",
    cvAttachment: "gerti_kadiu_cv.pdf",
    notes: "interview scheduled",
    phase: "First Interview",
  },
  {
    fullName: "Redi Balla",
    auth: { email: "redi.balla@example.com" },
    phone: "456-789-0123",
    position: "UX Designer",
    date: "2024-07-27",
    time: "11:00",
    cvAttachment: "redi_balla_cv.pdf",
    notes: "interview scheduled",
    phase: "First Interview",
  },
  {
    fullName: "Vasjan Cupri",
    auth: { email: "vasjan.cupri@example.com" },
    phone: "789-012-3456",
    position: "Data Scientist",
    date: "2024-07-28",
    time: "15:30",
    cvAttachment: "vasjan_cupri_cv.pdf",
    notes: "interview scheduled",
    phase: "First Interview",
  },
  {
    fullName: "Selma Bakiu",
    auth: { email: "selma.bakiu@example.com" },
    phone: "234-567-8901",
    position: "Game Developer",
    date: "2024-07-29",
    time: "13:00",
    cvAttachment: "selma_bakiu_cv.pdf",
    notes: "interview scheduled",
    phase: "First Interview",
  },
  {
    fullName: "Gerald Bane",
    auth: { email: "bane.gerald@example.com" },
    phone: "234-567-8901",
    position: " Fullstack Developer",
    date: "2024-07-29",
    time: "13:00",
    cvAttachment: "gerald_bane_cv.pdf",
    notes: " Great skills ",
    phase: "Second Interview",
  },
];

const phases = [
  'First Interview',
  'Second Interview',
  'Employed'
];

export default function InterviewKanban() {
  const [interviews, setInterviews] = useState<Interview[]>(dummyInterviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(null);
  const [isReschedule, setIsReschedule] = useState(false);
  const navigate = useNavigate();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newInterviews = Array.from(interviews);
    const [reorderedItem] = newInterviews.splice(result.source.index, 1);
    reorderedItem.phase = result.destination.droppableId;
    newInterviews.splice(result.destination.index, 0, reorderedItem);

    setInterviews(newInterviews);
  };

  const getInterviewsByPhase = (phase: string) => {
    return interviews.filter(interview => interview.phase === phase);
  };

  const handleOpenModal = (
    interview: Interview,
    isReschedule: boolean = false,
  ) => {
    setSelectedInterview(interview);
    setIsModalOpen(true);
    setIsReschedule(isReschedule);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInterview(null);
  };

  const handleReschedule = (date: string, time: string) => {
    if (selectedInterview) {
      const updatedInterviews = interviews.map(interview =>
        interview.fullName === selectedInterview.fullName
          ? { ...interview, date, time, phase: isReschedule ? interview.phase : 'Second Interview' }
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
        (i) => i.fullName !== interview.fullName,
      );
      setInterviews(updatedInterviews);
      handleCloseModal();
    }
  };

  const handleAccept = (interview: Interview) => {
    handleOpenModal(interview, false);

    const nextPhase = interview.phase === 'First Interview' ? 'Second Interview' : 'Employed';
    const updatedInterviews = interviews.map(i =>
      i.fullName === interview.fullName ? { ...i, phase: 
        nextPhase } : i
    );
    setInterviews(updatedInterviews);
    // if (nextPhase === 'Employed'){
    //   setInterviews(updatedInterviews);
    // }
  };

  const handleNavigateToProfile = (candidateId: string) => {
    navigate(`/candidate/${candidateId}`);
  };

  return (
    <div className={style.kanbanBoard}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={style.kanbanColumns}>
          {phases.map(phase => (
            <div key={phase} className={style.kanbanColumn}>
              <h2>{phase}</h2>
              <Droppable droppableId={phase}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={style.kanbanList}
                  >
                    {getInterviewsByPhase(phase).map((interview, index) => (
                      <Draggable key={interview.fullName} draggableId={interview.fullName} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={style.kanbanItem}
                          >
                            <h4
                              onClick={() => handleNavigateToProfile(interview.fullName)}
                              className={style.candidateName}
                            >
                              {interview.fullName}
                            </h4>
                            <p>{interview.position}</p>
                            <p>{interview.date} at {interview.time}</p>
                            <p>Email: {interview.auth.email}</p>
                            <p>Phone: {interview.phone}</p>
                            <p>Notes: {interview.notes}</p>
                            <div className={style.buttonContainer}>

                              <Button
                                type={ButtonTypes.PRIMARY}
                                btnText=""
                                width="40px"
                                height="30px"
                                display='flex'
                                justifyContent='center'
                                alignItems='center'
                                icon={<EditIcon />}
                                onClick={() => handleOpenModal(interview, true)}
                              />
                              <div style={{display:"flex", justifyContent:"flex-end", gap:'10px'}}>                             

                               <Button
                                btnText=""
                                type={ButtonTypes.PRIMARY}
                                width="40px"
                                height="30px"
                                backgroundColor="#C70039"
                                borderColor="#C70039"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                icon={<DeleteForeverIcon />}
                                onClick={() => handleCancel(interview)}                              />
                              {phase !== 'Employed' && (
                                <Button
                                  btnText=''
                                  type={ButtonTypes.PRIMARY}
                                  width="40px"
                                  height="30px"
                                  backgroundColor='rgb(2, 167, 0)'
                                  borderColor='rgb(2, 167, 0)'
                                  display='flex'
                                  justifyContent='center'
                                  alignItems='center'
                                  icon={<CheckIcon />}
                                  onClick={() => handleAccept(interview)}
                                />
                               
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
      {selectedInterview && (
        <RescheduleModal
          open={isModalOpen}
          handleClose={handleCloseModal}
          handleReschedule={handleReschedule}
          selectedInterview={selectedInterview}
          // handleCancel={() => selectedInterview && handleCancel(selectedInterview)}
        />
      )}
    </div>
  );
}

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import CheckIcon from '@mui/icons-material/Check'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Tooltip } from '@mui/material'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import { useInterviewContext, InterviewProvider } from './Hook/InterviewContext'
import style from './styles/Interview.module.css'
import Button from '@/Components/Button/Button'
import RescheduleModal from './Component/ScheduleForm'

function InterviewKanbanContent() {
    const {
        loading,
        error,
        selectedInterview,
        isModalOpen,
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
    } = useInterviewContext()

    if (loading) return <div>Loading...</div>
    if (error)
        return <div>Error loading interviews: {error || 'Unknown error'}</div>

    return (
        <div className={style.kanbanBoard}>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className={style.kanbanColumns}>
                    {phases.map((phase) => (
                        <div key={phase} className={style.kanbanColumn}>
                            <h2>
                                {phase}
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
                                        {getInterviewsByPhase(phase).map(
                                            (interview, index) => (
                                                <Draggable
                                                    key={interview._id.toString()}
                                                    draggableId={interview._id.toString()}
                                                    index={index}
                                                >
                                                    {(provided) => (
                                                        <div
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={
                                                                style.kanbanItem
                                                            }
                                                        >
                                                            <h6
                                                                onClick={() =>
                                                                    handleNavigateToProfile(
                                                                        interview._id.toString(),
                                                                    )
                                                                }
                                                                className={
                                                                    style.candidateName
                                                                }
                                                            >
                                                                {
                                                                    interview.fullName
                                                                }
                                                            </h6>
                                                            <p>
                                                                {
                                                                    interview.positionApplied
                                                                }
                                                            </p>
                                                            {phase !==
                                                                'Employed' && (
                                                                <p>
                                                                    Interview
                                                                    Date:{' '}
                                                                    {formatDate(
                                                                        interview.interviewDate,
                                                                    )}
                                                                </p>
                                                            )}
                                                            <p>
                                                                Email:{' '}
                                                                {
                                                                    interview.email
                                                                }
                                                            </p>
                                                            <p>
                                                                Phone:{' '}
                                                                {
                                                                    interview.phoneNumber
                                                                }
                                                            </p>
                                                            <p>
                                                                Notes:{' '}
                                                                {
                                                                    interview.notes
                                                                }
                                                            </p>
                                                            <div
                                                                className={
                                                                    style.buttonContainer
                                                                }
                                                            >
                                                                <Tooltip
                                                                    title="Edit"
                                                                    placement="top"
                                                                >
                                                                    <span>
                                                                        <Button
                                                                            type={
                                                                                ButtonTypes.SECONDARY
                                                                            }
                                                                            btnText=""
                                                                            width="40px"
                                                                            height="30px"
                                                                            display="flex"
                                                                            justifyContent="center"
                                                                            alignItems="center"
                                                                            color="#2457A3"
                                                                            borderColor="#2457A3"
                                                                            icon={
                                                                                <EditIcon />
                                                                            }
                                                                            onClick={() =>
                                                                                handleOpenModal(
                                                                                    interview,
                                                                                    true,
                                                                                )
                                                                            }
                                                                        />
                                                                    </span>
                                                                </Tooltip>
                                                                <div
                                                                    style={{
                                                                        display:
                                                                            'flex',
                                                                        justifyContent:
                                                                            'flex-end',
                                                                        gap: '10px',
                                                                    }}
                                                                >
                                                                    <Tooltip
                                                                        title="Delete"
                                                                        placement="top"
                                                                    >
                                                                        <span>
                                                                            <Button
                                                                                btnText=" "
                                                                                type={
                                                                                    ButtonTypes.SECONDARY
                                                                                }
                                                                                width="35px"
                                                                                height="30px"
                                                                                color="#C70039"
                                                                                borderColor="#C70039"
                                                                                display="flex"
                                                                                justifyContent="center"
                                                                                alignItems="center"
                                                                                icon={
                                                                                    <DeleteIcon />
                                                                                }
                                                                                onClick={() =>
                                                                                    handleCancel(
                                                                                        interview,
                                                                                    )
                                                                                }
                                                                            />
                                                                        </span>
                                                                    </Tooltip>
                                                                    {phase !==
                                                                        'Employed' && (
                                                                        <Tooltip
                                                                            title="Accept"
                                                                            placement="top"
                                                                        >
                                                                            <span>
                                                                                <Button
                                                                                    btnText=""
                                                                                    type={
                                                                                        ButtonTypes.SECONDARY
                                                                                    }
                                                                                    width="35px"
                                                                                    height="30px"
                                                                                    color="rgb(2, 167, 0)"
                                                                                    borderColor="rgb(2, 167, 0)"
                                                                                    display="flex"
                                                                                    justifyContent="center"
                                                                                    alignItems="center"
                                                                                    icon={
                                                                                        <CheckIcon />
                                                                                    }
                                                                                    onClick={() =>
                                                                                        handleAccept(
                                                                                            interview,
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </span>
                                                                        </Tooltip>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ),
                                        )}
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
                    allPhasesPassed={allPhasesPassed}
                    handleSchedule={handleSchedule}
                    // message={''}
                />
            )}
        </div>
    )
}

export default function InterviewKanban() {
    return (
        <InterviewProvider>
            <InterviewKanbanContent />
        </InterviewProvider>
    )
}

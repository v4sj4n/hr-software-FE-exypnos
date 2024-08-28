import { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import CheckIcon from '@mui/icons-material/Check'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Tooltip, Tabs, Tab } from '@mui/material'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import { InterviewProvider, useInterviewContext } from './Hook/InterviewContext'
import style from './styles/Interview.module.css'
import Button from '@/Components/Button/Button'
import RescheduleModal from './Component/ScheduleForm'
import Input from '@/Components/Input/Index'
import Selecter from '@/Components/Input/components/Select/Selecter'


function InterviewKanbanContent() {
    const {
        loading,
        error,
        fetchFilteredInterviews,
        isReschedule,
        selectedInterview,
        isModalOpen,
        handleOpenModal,
        handleCloseModal,
        handleSchedule,
        handleCancel,
        onDragEnd,
        handleNavigateToProfile,
        formatDate,
        phases,
        handleAccept,
        interviews,
    } = useInterviewContext()

    const [currentPhase, setCurrentPhase] = useState<string>('first_interview')
    const [startDate, setStartDate] = useState<string | null>(null)
    const [endDate, setEndDate] = useState<string | null>(null)
    const [currentTab, setCurrentTab] = useState<string>('first_interview')
    useEffect(() => {
        console.log('Fetching interviews with default/current parameters:');
        console.log('Current Phase:', currentPhase);
        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);
    
        fetchFilteredInterviews(
            currentPhase,
            startDate ? new Date(startDate) : undefined,
            endDate ? new Date(endDate) : undefined
        )
            .then(() => {
                console.log('Interviews fetched successfully on mount');
            })
            .catch((err) => {
                console.error('Error fetching interviews:', err);
            });
    }, [currentPhase, startDate, endDate]);

    useEffect(() => {
        setCurrentTab(currentPhase)
    }, [currentPhase])

    if (loading) return <div>Loading...</div>
    if (error)
        return <div>Error loading interviews: {error || 'Unknown error'}</div>

    const filteredInterviews = interviews.filter((interview) => {
        if (
            currentTab === 'first_interview' &&
            interview.currentPhase === 'first_interview'
        ) {
            return true
        }
        if (
            currentTab === 'second_interview' &&
            interview.currentPhase === 'second_interview'
        ) {
            return true
        }
        if (currentTab === 'rejected' && interview.status === 'rejected') {
            return true
        }
        if (currentTab === 'employed' && interview.status === 'employed') {
            return true
        }
        return false
    })

    console.log('Filtered Interviews:', filteredInterviews)

    return (
        <div className={style.kanbanBoard}>
            <div className={style.filterContainer}>
                <Selecter
                    name="currentPhase"
                    label="Current Phase"
                    multiple={false}
                    value={currentPhase}
                    options={phases}
                    onChange={(newValue) => setCurrentPhase(newValue)}
                />

                <Input
                    IsUsername
                    name=""
                    shrink
                    label="Start Date"
                    type="date"
                    value={startDate || ''}
                    width="250px"
                    onChange={(e) => setStartDate(e.target.value)}
                    className={style.filterField}
                />

                <Input
                    IsUsername
                    name=""
                    label="End Date"
                    type="date"
                    shrink
                    value={endDate || ''}
                    width="250px"
                    onChange={(e) => setEndDate(e.target.value)}
                    className={style.filterField}
                />

                <Button
                    type={ButtonTypes.PRIMARY}
                    width="170px"
                    btnText="Apply Filter"
                    onClick={() => {
                        console.log('Applying filter with:', {
                            currentPhase,
                            startDate,
                            endDate,
                        })
                        fetchFilteredInterviews(
                            currentPhase,
                            startDate ? new Date(startDate) : undefined,
                            endDate ? new Date(endDate) : undefined,
                        )
                    }}
                />
            </div>

            <Tabs
                value={currentTab}
                onChange={(_event, newValue) => setCurrentTab(newValue)}
                aria-label="Kanban board tabs"
                className={style.tabs}
            >
                {phases.map((phase) => (
                    <Tab
                        key={phase}
                        value={phase}
                        label={phase.toUpperCase()}
                    />
                ))}
            </Tabs>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className={style.kanbanColumns}>
                    <div key={currentTab} className={style.kanbanColumn}>
                        <h2>
                            {currentTab.toUpperCase()}
                            <span className={style.applicantCount}>
                                ({filteredInterviews.length})
                            </span>
                        </h2>
                        <Droppable droppableId={currentTab}>
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className={style.kanbanList}
                                >
                                    {filteredInterviews.map(
                                        (interview, index) => (
                                            <Draggable
                                                key={interview._id.toString()}
                                                draggableId={interview._id.toString()}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={
                                                            style.kanbanItem
                                                        }
                                                    ><h3
                                                    onClick={() => handleNavigateToProfile(interview._id.toString())}
                                                    className={style.candidateName}
                                                >
                                                    <b>{`${interview.firstName} ${interview.lastName}`}</b> {interview.positionApplied}
                                                </h3>
                                                        {currentTab !==
                                                            'employed' &&
                                                            currentTab !==
                                                                'applicant' && (
                                                                <>
                                                                    <p>
                                                                        Interview
                                                                        Date:{' '}
                                                                        {interview.currentPhase ===
                                                                        'second_interview'
                                                                            ? formatDate(
                                                                                  interview.secondInterviewDate,
                                                                              )
                                                                            : formatDate(
                                                                                  interview.firstInterviewDate,
                                                                              )}
                                                                    </p>
                                                                    <p>
                                                                        <b>
                                                                            Email
                                                                        </b>
                                                                        :{' '}
                                                                        {
                                                                            interview.email
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        <b>
                                                                            Phone
                                                                        </b>
                                                                        :{' '}
                                                                        {
                                                                            interview.phoneNumber
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        <b>
                                                                            Notes
                                                                        </b>
                                                                        :{' '}
                                                                        {
                                                                            interview.notes
                                                                        }
                                                                    </p>
                                                                </>
                                                            )}
                                                        {currentTab !==
                                                            'employed' &&
                                                            currentTab !==
                                                                'applicant' && (
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
                                                                                {currentTab !==
                                                                                    'rejected' && (
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
                                                                                )}
                                                                            </span>
                                                                        </Tooltip>
                                                                        {currentTab !==
                                                                            'applicant' && (
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
                                                            )}
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
                </div>
            </DragDropContext>

            {isModalOpen && selectedInterview && (
                <RescheduleModal
                    open={isModalOpen}
                    handleClose={handleCloseModal}
                    handleSchedule={handleSchedule}
                    selectedInterview={selectedInterview}
                    isReschedule={isReschedule}
                />
            )}
        </div>
    )
}

const InterviewKanban = () => (
    <InterviewProvider>
        <InterviewKanbanContent />
    </InterviewProvider>
)

export default InterviewKanban

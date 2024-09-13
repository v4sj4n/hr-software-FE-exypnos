import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import CheckIcon from '@mui/icons-material/Check'
import DeleteIcon from '@mui/icons-material/Delete'
import EditCalendarIcon from '@mui/icons-material/EditCalendar'
import { Tooltip, Tabs, Tab, useTheme } from '@mui/material'
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
        handleApplyFilter,
        handleClearFilter,
        handleTabChange,
        currentTab,
        currentPhase,
        startDate,
        endDate,
        setCurrentPhase,
        setStartDate,
        setEndDate,
        filteredInterviews,
        isFiltered
    } = useInterviewContext()

    if (loading) return <div>Loading...</div>
    if (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        return <div>Error loading interviews: {errorMessage}</div>
    }

    const theme = useTheme()
    const applicantCountStyle = {
        color: theme.palette.text.primary,
    }

    return (
        <div className={style.kanbanBoard}>
            <div className={style.filterContainer}>
                <Selecter
                    name="currentPhase"
                    label="Current Phase"
                    multiple={false}
                    value={currentPhase}
                    width='250px'
                    options={phases}
                    onChange={(newValue) =>
                        setCurrentPhase(Array.isArray(newValue) ? newValue[0] : newValue)
                    }
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
                    onClick={handleApplyFilter}
                />
                {isFiltered && (
                    <Button
                        type={ButtonTypes.SECONDARY}
                        width="170px"
                        btnText="Clear Filter"
                        onClick={handleClearFilter}
                    />
                )}
            </div>

            <Tabs
                value={currentTab}
                onChange={handleTabChange}
                aria-label="Kanban board tabs"
                className={style.tabs}
            >
                {phases.map((phase) => (
                    <Tab key={phase} value={phase} label={phase.toUpperCase()} />
                ))}
            </Tabs>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className={style.kanbanColumns}>
                    <div key={currentTab} className={style.kanbanColumn}>
                        <h2>
                            {currentTab.toUpperCase()}
                            <span className={style.applicantCount} style={applicantCountStyle}>
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
                                    {filteredInterviews.length === 0 ? (
                                        <p>Sorry, there is nothing to show here.</p>
                                    ) : (
                                        filteredInterviews.map((interview, index) => (
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
                                                        className={style.kanbanItem}
                                                    >
                                                        <h3
                                                            style={applicantCountStyle}
                                                            onClick={() =>
                                                                handleNavigateToProfile(interview._id.toString())
                                                            }
                                                            className={style.candidateName}
                                                        >
                                                            {`${interview.firstName} ${interview.lastName}`} {interview.positionApplied}
                                                        </h3>
                                                        {currentTab !== 'employed' && currentTab !== 'applicant' && (
                                                            <>
                                                                <p>
                                                                    <b>Interview Date:</b>{' '}
                                                                    {interview.currentPhase === 'second_interview'
                                                                        ? formatDate(interview.secondInterviewDate)
                                                                        : formatDate(interview.firstInterviewDate)}
                                                                </p>
                                                                <p><b>Email:</b> {interview.email}</p>
                                                                <p><b>Phone:</b> {interview.phoneNumber}</p>
                                                                <p><b>Notes:</b> {interview.notes}</p>
                                                            </>
                                                        )}
                                                        {currentTab !== 'employed' && currentTab !== 'applicant' && (
                                                            <div className={style.buttonContainer}>
                                                                <Tooltip title="Edit" placement="top">
                                                                    <span>
                                                                        <Button
                                                                            type={ButtonTypes.SECONDARY}
                                                                            btnText=""
                                                                            width="40px"
                                                                            height="30px"
                                                                            display="flex"
                                                                            justifyContent="center"
                                                                            alignItems="center"
                                                                            color="#2457A3"
                                                                            borderColor="#2457A3"
                                                                            icon={<EditCalendarIcon />}
                                                                            onClick={() =>
                                                                                handleOpenModal(interview, true)
                                                                            }
                                                                        />
                                                                    </span>
                                                                </Tooltip>
                                                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                                                    <Tooltip title="Delete" placement="top">
                                                                        <span>
                                                                            {currentTab !== 'rejected' && (
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
                                                                            )}
                                                                        </span>
                                                                    </Tooltip>
                                                                    {currentTab !== 'applicant' && (
                                                                        <Tooltip title="Accept" placement="top">
                                                                            <span>
                                                                                <Button
                                                                                    btnText=""
                                                                                    type={ButtonTypes.SECONDARY}
                                                                                    width="35px"
                                                                                    height="30px"
                                                                                    color="rgb(2, 167, 0)"
                                                                                    borderColor="rgb(2, 167, 0)"
                                                                                    display="flex"
                                                                                    justifyContent="center"
                                                                                    alignItems="center"
                                                                                    icon={<CheckIcon />}
                                                                                    onClick={() => handleAccept(interview)}
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
                                        ))
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

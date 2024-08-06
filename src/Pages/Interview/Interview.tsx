
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Tooltip } from '@mui/material';
import { ButtonTypes } from '@/Components/Button/ButtonTypes';
import { useInterviewContext, InterviewProvider } from './Hook/InterviewContext';
import style from './styles/Interview.module.css';
import Button from '@/Components/Button/Button';
import RescheduleModal from './Component/ScheduleForm';
// import FilterAltIcon from '@mui/icons-material/FilterAlt';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css';
import { DateFilterType } from './Hook/utils';

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
    handleCancel,
    handleAccept,
    onDragEnd,
    handleNavigateToProfile,
    getInterviewsByPhase,
    formatDate,
    phases,
    filter,
    handleFilterChange,
    startDate,
    endDate,
    handleDateChange,
    dateFilterType,

  } = useInterviewContext();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading interviews: {error || 'Unknown error'}</div>;

  return (
    <div className={style.kanbanBoard}>
      
      <div className={style.filterContainer}>
        <input
          type="text"
          placeholder="Filter interviews..."
          value={filter}
          onChange={handleFilterChange}
          className={style.filterInput}
        />
        <select
          value={dateFilterType}
          onChange={(e) => handleDateChange(null, e.target.value as DateFilterType)}
          className={style.dateFilterSelect}
        >
          <option value="custom">Custom Range</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
        {dateFilterType === 'custom' && (
          <DatePicker
            selectsRange={true}
            startDate={startDate || undefined}
            endDate={endDate || undefined}
            onChange={(dates) => handleDateChange(dates, 'custom')}
            placeholderText="Select date range"
            className={style.datePicker}
          />
        )}
        {dateFilterType === 'monthly' && (
          <DatePicker
            selected={startDate}
            onChange={(date) => handleDateChange(date, 'monthly')}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            placeholderText="Select month"
            className={style.datePicker}
          />
        )}
        {dateFilterType === 'yearly' && (
          <DatePicker
            selected={startDate}
            onChange={(date) => handleDateChange(date, 'yearly')}
            dateFormat="yyyy"
            showYearPicker
            placeholderText="Select year"
            className={style.datePicker}
          />
        )}
      </div>

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
                            <b>    {interview.fullName}  </b>{interview.positionApplied}

                            </h6>
                            {phase !== 'Employed' && (
                              <p> <b>Interview Date: </b> {formatDate(interview.interviewDate)} </p>
                            )}
                            <p> <b>Email</b>: {interview.email}</p>
                            <p><b> Phone</b>: {interview.phoneNumber}</p>
                            <p><b>Notes</b>: {interview.notes}</p>
                            <div className={style.buttonContainer}>
                              <Tooltip title="Edit" placement="top">
                                <span>
                                  <Button
                                    type={ButtonTypes.SECONDARY}
                                    btnText=""
                                    width="30px"
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
                                      width="30px"
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
                                        width="30px"
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
       handleReschedule={async (interviewDate, notes) => {
         try {
           await handleReschedule(interviewDate, notes);
         } catch (error) {
           console.error('Failed to reschedule interview:', error);
         }
       }}
       selectedInterview={selectedInterview}
       allPhasesPassed={allPhasesPassed}
    
        />
      )}
    </div>
  );
}

export default function InterviewKanban() {
  return (
    <InterviewProvider>
      <InterviewKanbanContent />
    </InterviewProvider>
  );
}

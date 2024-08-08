import Card from '@/Components/Card/Card';
import style from './styles/Events.module.css';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import EditIcon from '@mui/icons-material/Edit';
import { useCreateEvent, useDeleteEvent, useGetAllEvents, useUpdateEvent } from './Hook';
import Input from '@/Components/Input/Index';
import Button from '@/Components/Button/Button';
import { ButtonTypes } from '@/Components/Button/ButtonTypes';
import { EventsContent } from '@/Components/Content/ContentLoader';
import DeleteIcon from '@mui/icons-material/Delete';
import { ModalComponent } from '@/Components/Modal/Modal';
import LongMenu from '@/Components/Menu/Menu';
import Switch from '@mui/material/Switch';
import { useState } from 'react';
import SelectedEventCard from './Components/EventList/EventList';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useAuth } from '@/Context/AuthProvider';

export default function Events() {
  const { events, setEvents, isLoading } = useGetAllEvents();
  const { handleChange, event, creatingTime, createEvent, pollQuestion, pollOptions, isMultipleChoice, handleOptionChange, handleAddOption, includesPoll } = useCreateEvent(setEvents);
  const { editingEvent,
    editingTime,
    showForm,
    includePollInEdit,
    editPollQuestion,
    editPollOptions,
    editIsMultipleChoice,
    handleEditChange,
    handleEditOptionChange,
    handleAddEditOption,
    updateEvent,
    toggleForm,
    handleEditClick } = useUpdateEvent(setEvents);
  const { handleDelete, closeModal, showModal, handleDeleteEventModal, eventToDeleteId } = useDeleteEvent(setEvents);
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const [selectedEvent, setSelectedEvent] = useState<null | typeof events[0]>(null);
  const { currentUser } = useAuth();
  const [showEventModal, setShowEventModal] = useState(false);

  const handleSeeVoters = (event: typeof events[0]) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleToggleForm = () => {
    toggleForm();
    setSelectedEvent(null);
  };

  const isAdmin = currentUser?.role === 'admin';

  return (
    <>
      <div className={style.firstContainer}>
        <div className={style.account}>Upcoming Events</div>
        <div style={{ display: 'flex', alignItems: "center", gap: "10px" }}>
          <Input IsUsername type='text' label='search' name='Search' width={220} iconPosition="end" icon={<SearchOutlinedIcon />} />
          {isAdmin ? <Button btnText='Create Event' type={ButtonTypes.PRIMARY} onClick={handleToggleForm} /> : ''}
        </div>
      </div>
      <div className={style.contanier}>
        <div className={`${style.grid} ${showForm ? style.twoColumn : ''}`}>
          {isLoading ? events.map((event) => <EventsContent key={event._id} />) :
            events.map((event) => (
              <Card key={event._id} backgroundColor='#FFFFFF' borderRadius='5px' border='1px solid #ebebeb' padding='20px' flex='1' position='relative' height='auto' >
                <div className={style.titleContainer}>
                  <div className={style.title}>{event.title}</div>
                  {isAdmin && <LongMenu
                    onClickEdit={() => handleEditClick(event)}
                    onClickDelete={() => handleDeleteEventModal(event._id)}
                    EditIcon={EditIcon}
                    Delete={DeleteIcon}
                    name="Edit"
                    name2="Delete"
                    style={{ color: '#6b7280' }}
                  />}
                </div>
                <div className={style.description}>{event.description}</div>
                <div className={style.dataContainer}>
                  <div className={style.dateContainer}>
                    <div className={style.data}>
                      <AccessTimeIcon sx={{ height: 20, width: 20, color: "#6b7280" }} />
                      {new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className={style.data}>
                      <CalendarTodayIcon sx={{ height: 20, width: 20, color: "#6b7280" }} />
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                  <div className={style.data}>
                    <LocationSearchingIcon sx={{ height: 20, width: 20, color: "#6b7280" }} />
                    <div>{event.location}</div>
                  </div>
                  <Button
                    btnText={isAdmin ? "See voters" : 'Vote'}
                    type={ButtonTypes.SECONDARY}
                    onClick={() => handleSeeVoters(event)}
                  />
                </div>
              </Card>
            ))}
        </div>

        {(showForm) && (
          <Card padding='20px' alignSelf='flex-end' gap='10px' borderRadius='5px' flex='2' border='2px solid #D3D3D3' height='100%' position='sticky' className={style.formCard} >
            <>
              <div className={style.create}>{editingEvent ? 'Edit Event' : 'Create New Event'}</div>
              <Input IsUsername label='Event Title' name='title' onChange={editingEvent ? handleEditChange : handleChange}
                value={editingEvent ? editingEvent.title : event.title} />
              <div style={{ display: "flex", width: "100%", gap: "10px" }}>
                <Input IsUsername label='Date' shrink={true} name='date' type="date"
                  onChange={editingEvent ? handleEditChange : handleChange}
                  value={editingEvent ? editingEvent.date : event.date}
                />
                <div style={{ width: "100%" }}>
                  <Input IsUsername label='Time' shrink={true} name='time' type="time"
                    onChange={editingEvent ? handleEditChange : handleChange}
                    value={editingEvent ? editingTime : creatingTime}
                  />
                </div>
              </div>
              <Input IsUsername width="100%" label='Location' name='location' onChange={editingEvent ? handleEditChange : handleChange} value={editingEvent ? editingEvent.location : event.location} />
              <Input IsUsername label="Description" type="textarea" name='description' multiline rows={4}
                onChange={editingEvent ? handleEditChange : handleChange}
                value={editingEvent ? editingEvent.description : event.description}
              />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Switch
                  checked={editingEvent ? includePollInEdit : includesPoll}
                  onChange={(e) => editingEvent ? handleEditChange(e) : handleChange(e)}
                  name="includesPoll"
                  sx={{ color: "#2469FF" }}
                  {...label}
                />
                <div>{editingEvent ? 'Include poll in event' : 'Add poll to event'}</div>
              </div>

              {(editingEvent ? includePollInEdit : includesPoll) && (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <Input label='Poll Question' name='pollQuestion' IsUsername
                    value={editingEvent ? editPollQuestion : pollQuestion}
                    onChange={editingEvent ? handleEditChange : handleChange} />
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                    Options
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Switch
                        checked={editingEvent ? editIsMultipleChoice : isMultipleChoice}
                        onChange={(e) => editingEvent ? handleEditChange(e) : handleChange(e)}
                        name="isMultipleChoice"
                        {...label}
                      />
                      <div>Multiple choice</div>
                    </div>
                  </div>
                  {(editingEvent ? editPollOptions : pollOptions).map((option, index) => (
                    <Input
                      key={index}
                      IsUsername
                      label={`Option ${index + 1}`}
                      name={`option${index + 1}`}
                      value={option}
                      onChange={(e) => editingEvent
                        ? handleEditOptionChange(index, e.target.value)
                        : handleOptionChange(index, e.target.value)
                      }
                    />
                  ))}
                  <Button
                    onClick={editingEvent ? handleAddEditOption : handleAddOption}
                    btnText='Add new option'
                    type={ButtonTypes.SECONDARY}
                    color='#2469FF'
                    borderColor='#2469FF'
                    disabled={(editingEvent ? editPollOptions : pollOptions).length >= 3}
                  />
                  {(editingEvent ? editPollOptions : pollOptions).length >= 3 && (
                    <div style={{ color: 'red', fontSize: '14px' }}>
                      Maximum of 3 options allowed.
                    </div>
                  )}
                </div>
              )}

              <div className={style.border}></div>
              <Button btnText={editingEvent ? 'Update' : 'Save event'} type={ButtonTypes.PRIMARY} backgroundColor='#2469FF' border='none' onClick={editingEvent ? updateEvent : createEvent} />
            </>
          </Card>
        )}
        {showModal && (
          <ModalComponent open={showModal} handleClose={closeModal}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: "15px" }}>
              <div className={style.title}>Confirm Action.</div>
              <div>Are you sure you want to delete this event?</div>
              <div style={{ display: 'flex', gap: "10px", marginTop: "20px" }}>
                <Button
                  type={ButtonTypes.PRIMARY}
                  backgroundColor='#d32f2f'
                  borderColor='#d32f2f'
                  btnText='Confirm'
                  width='100%'
                  onClick={() => {
                    handleDelete(eventToDeleteId);
                    closeModal();
                  }}
                />
                <Button
                  type={ButtonTypes.SECONDARY}
                  btnText='Cancel'
                  width='100%'
                  onClick={closeModal}
                />
              </div>
            </div>
          </ModalComponent>
        )}
        {showEventModal && selectedEvent && (
          <ModalComponent height='100%' width='400px' padding='0' open={showEventModal} handleClose={() => setShowEventModal(false)}>
            <SelectedEventCard
              event={selectedEvent}
              onClose={() => setSelectedEvent(null)}
            />
          </ModalComponent>
        )}
      </div>
    </>
  );
}

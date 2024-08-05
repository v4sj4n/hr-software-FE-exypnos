import Card from '@/Components/Card/Card'
import style from './styles/Events.module.css'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import EditIcon from '@mui/icons-material/Edit';
import { useCreateEvent, useDeleteEvent, useGetAllEvents, useUpdateEvent } from './Hook';
import Input from '@/Components/Input/Index';
import Button from '@/Components/Button/Button';
import { ButtonTypes } from '@/Components/Button/ButtonTypes';
import Fab from '../../Components/Fab/Fab'
import { EventsContent } from '@/Components/Content/ContentLoader';
import DeleteIcon from '@mui/icons-material/Delete';
import { ModalComponent } from '@/Components/Modal/Modal';
import LongMenu from '@/Components/Menu/Menu';
import Switch from '@mui/material/Switch';
import { useState } from 'react';
import EventPoll from './Components/EventPoll/EventsPoll';
import { useAuth } from '@/Context/AuthProvider';

export default function Events() {
  const { events, setEvents, isLoading } = useGetAllEvents();
  const { handleChange, event, creatingTime, createEvent, pollQuestion, pollOptions, isMultipleChoice, handleOptionChange, handleAddOption } = useCreateEvent(setEvents);
  const { editingEvent, editingTime, handleEditChange, updateEvent, showForm, toggleForm, handleEditClick } = useUpdateEvent(setEvents);
  const { handleDelete, closeModal, showModal, handleDeleteEventModal, eventToDeleteId } = useDeleteEvent(setEvents);
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const [showCreatePoll, setShowCreatePoll] = useState<boolean>(false);
  const {currentUser} = useAuth()

  const handleCreatePollToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowCreatePoll(event.target.checked);
  };

  console.log(currentUser?._id)

  return (
    <>
      <div className={style.account}>Upcoming  Events</div>
      <div className={style.contanier}>
        <div className={`${style.grid} ${showForm ? style.twoColumn : ''}`}>
          {isLoading ? events.map((event) => <EventsContent key={event._id} />) :
            events.map((event) => (
              <Card key={event._id} backgroundColor='#FFFFFF' borderRadius='8px' border='1px solid #ebebeb' padding='20px' flex='1' position='relative' width='100%' >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
                  <div className={style.title}>{event.title}</div>
                  <LongMenu
                    onClickEdit={() => handleEditClick(event)}
                    onClickDelete={() => handleDeleteEventModal(event._id)}
                    EditIcon={EditIcon}
                    Delete={DeleteIcon}
                    name="Edit"
                    name2="Delete"
                    style={{ color: '#6b7280' }}
                  />
                </div>
                <div className={style.description}>{event.description}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div className={style.data}>
                    <AccessTimeIcon sx={{ height: 20, width: 20, color: "#6b7280" }} />
                    {new Date(event.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className={style.data}>
                    <CalendarTodayIcon sx={{ height: 20, width: 20, color: "#6b7280" }} />
                    {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className={style.data}>
                    <LocationSearchingIcon sx={{ height: 20, width: 20, color: "#6b7280" }} />
                    <div>{event.location}</div>
                  </div>
                  {event.poll && (
                    <EventPoll
                      poll={event.poll}
                      eventId={event._id}
                      userId={currentUser?._id}
                      onVote={(optionIndex) => {
                        console.log(`Voted for option ${optionIndex} in event ${event._id}`);
                      }}
                    />
                  )}
                </div>
              </Card>
            ))}
        </div>

        {showForm && (
          <Card padding='20px 20px 80px 20px' alignSelf='flex-end' gap='20px' borderRadius='8px' flex='2' border='1px solid #ebebeb' height='100%' position='sticky' className={style.formCard} >
            <div className={style.create}>{editingEvent ? 'Edit Event' : 'Create New Event'}</div>
            <Input IsUsername label='Event Title' name='title' onChange={editingEvent ? handleEditChange : handleChange}
              value={editingEvent ? editingEvent.title : event.title} />
            <div style={{ display: "flex", width: "100%", gap: "10px" }}>
              <Input IsUsername label='Date' name='date' type="date"
                onChange={editingEvent ? handleEditChange : handleChange}
                value={editingEvent ? editingEvent.date : event.date}
              />
              <div style={{ width: "100%" }}>
                <Input IsUsername label='Time' name='time' type="time"
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

            {!editingEvent && (
              <>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Switch checked={showCreatePoll}
                    onChange={handleCreatePollToggle}
                    sx={{ color: "#2469FF" }} {...label} />
                  <div>Add poll to event</div>
                </div>

                {showCreatePoll && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <Input label='Poll Question' name='pollQuestion' IsUsername value={pollQuestion} onChange={handleChange} />
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
                      Options
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Switch checked={isMultipleChoice} onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)} name="isMultipleChoice" {...label} />
                        <div>Multiple choice</div>
                      </div>
                    </div>
                    {pollOptions.map((option, index) => (
                      <Input
                        key={index}
                        IsUsername
                        label={`Option ${index + 1}`}
                        name={`option${index + 1}`}
                        value={option}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                      />
                    ))}
                    <Button onClick={handleAddOption} btnText='Add new option' type={ButtonTypes.SECONDARY} color='#2469FF' borderColor='#2469FF' />
                  </div>
                )}
              </>
            )}

            <div className={style.border}></div>
            <Button btnText={editingEvent ? 'Edit' : 'Save event'} type={ButtonTypes.PRIMARY} backgroundColor='#2469FF' border='none' onClick={editingEvent ? updateEvent : createEvent} />
          </Card>
        )}
        <Fab onClick={toggleForm} />
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
      </div>
    </>
  )
}






import Card from '@/Components/Card/Card'
import style from './styles/Events.module.css'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import EditIcon from '@mui/icons-material/Edit';
import { useCreateEvent, useGetAllEvents, useUpdateEvent } from './Hook';
import Input from '@/Components/Input/Index';
import Button from '@/Components/Button/Button';
import { ButtonTypes } from '@/Components/Button/ButtonTypes';
import { useState } from 'react';
import Fab from '../../Components/Fab/Fab'
import { EventsData } from './Interface/Events';
import { EventsContent } from '@/Components/Content/ContentLoader';

export default function Events() {
  const { events, setEvents, } = useGetAllEvents();
  const { handleChange, event, creatingTime, createEvent } = useCreateEvent(setEvents);
  const { editingEvent, editingTime, setEditingEvent, handleEditChange, updateEvent, setEventForEditing } = useUpdateEvent(setEvents);
  const [isLoading, setIsLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
    setEditingEvent(null);
  };

  const handleEditClick = (eventToEdit: EventsData) => {
    setEventForEditing(eventToEdit);
    setShowForm(true);
  };


  return (
    <>
      <div className={style.account}>Upcoming  Events</div>
      <div className={style.contanier}>
        <div className={`${style.grid} ${showForm ? style.twoColumn : ''}`}>
          { isLoading ? events.map((event) => <EventsContent key={event._id} />) :
              events.map((event) => (
                <Card key={event._id} backgroundColor='#FFFFFF' borderRadius='8px' border='1px solid #ebebeb' padding='20px' flex='1' position='relative'>
                  <div className={style.title}>{event.title}</div>
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
                      <div>Tirane,  Albania</div>
                    </div>
                  </div>
                  <div onClick={() => handleEditClick(event)} style={{ display: "flex", alignSelf: "flex-end", cursor: "pointer", padding: "6px", width: "80px", backgroundColor: "#FFFFFF", marginTop: "30px", borderRadius: "12px", gap: "5px", alignItems: "center", border: "1px solid rgb(44, 56, 68)" }} ><EditIcon sx={{ height: 20, width: 20, color: "#6b7280" }} />Edit</div>
                </Card>
              ))}
        </div>

        {showForm && (
          <Card padding='20px 20px 80px 20px' alignSelf='flex-end' gap='30px' borderRadius='8px' flex='2' border='1px solid #ebebeb' height='550px' position='sticky' className={style.formCard} >
            <div className={style.create}>{editingEvent ? 'Edit Event' : 'Create New Event'}</div>
            <Input IsUsername label='Event Title' name='title' onChange={editingEvent ? handleEditChange : handleChange}
              value={editingEvent ? editingEvent.title : event.title} />
            <div style={{ display: "flex", width: "100%", gap: "10px" }}>
                <Input IsUsername label='New Date' name='date' type="date" 
                  onChange={editingEvent ? handleEditChange : handleChange}
                  value={editingEvent ? editingEvent.date : event.date}
                />
              <div style={{ width: "100%" }}>
                <Input IsUsername label='New Time' name='time' type="time" 
                  onChange={editingEvent ? handleEditChange : handleChange}
                  value={editingEvent ? editingTime : creatingTime}
                />
              </div>
            </div>
            <Input IsUsername width="100%" label='Location' name='Location' />
            <Input IsUsername label="Description" type="textarea" name='description' multiline rows={4}
              onChange={editingEvent ? handleEditChange : handleChange}
              value={editingEvent ? editingEvent.description : event.description}
            />
            <Button btnText={editingEvent ? 'Update event' : 'Create event'} type={ButtonTypes.PRIMARY} backgroundColor='black' border='none' onClick={editingEvent ? updateEvent : createEvent} />
          </Card>
        )}
        <Fab onClick={toggleForm} />
      </div>
    </>
  )
}






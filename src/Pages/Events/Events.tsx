// import Card from '@/Components/Card/Card';
// import style from './styles/Events.module.css';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
// import EditIcon from '@mui/icons-material/Edit';
// import { useCreateEvent, useDeleteEvent, useGetAllEvents, useUpdateEvent } from './Hook';
// import Input from '@/Components/Input/Index';
// import Button from '@/Components/Button/Button';
// import { ButtonTypes } from '@/Components/Button/ButtonTypes';
// import { EventsContent } from '@/Components/Content/ContentLoader';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { ModalComponent } from '@/Components/Modal/Modal';
// import LongMenu from '@/Components/Menu/Menu';
// import Switch from '@mui/material/Switch';
// import SelectedEventCard from './Components/EventList/EventList';
// import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
// import Selecter from '@/Components/Input/components/Select/Selecter';
// import Toast from '@/Components/Toast/Toast';

// export default function Events() {
//   const { events, onSearchChange, setEvents, label, isLoading, isAdmin, handleSeeVoters, selectedEvent, showEventModal, setShowEventModal, setSelectedEvent } = useGetAllEvents();
//   const { handleChange, typesofEvent, event, allEmails, type, endDate, createEvent, pollQuestion, pollOptions, participants, isMultipleChoice, handleOptionChange, handleAddOption, includesPoll, setParticipants, toastOpen,
//     toastMessage,
//     handleToastClose, toastSeverity, } = useCreateEvent(setEvents);
//   const { editingEvent, showForm, includePollInEdit, editPollQuestion, editPollOptions, editIsMultipleChoice, handleEditChange, handleEditOptionChange, handleAddEditOption, updateEvent, handleToggleForm, handleEditClick, handleUpdateToastClose,
//     updateToastMessage,
//     updateToastOpen, updateToastSeverity } = useUpdateEvent(setEvents);
//   const { handleDelete, closeModal, showModal, handleDeleteEventModal, eventToDeleteId } = useDeleteEvent(setEvents);

//   return (
//     <>
//       <div className={style.firstContainer}>
//         <Toast severity={toastOpen ? toastSeverity : updateToastSeverity}
//           open={toastOpen || updateToastOpen}
//           message={toastOpen ? toastMessage : updateToastMessage}
//           onClose={toastOpen ? handleToastClose : handleUpdateToastClose}
//         />

//         <div className={style.account}>Upcoming Events</div>
//         <div style={{ display: 'flex', alignItems: "center", gap: "10px" }}>
//           <Input IsUsername type='text' label='search' name='Search' width={220} iconPosition="end" icon={<SearchOutlinedIcon />} onChange={onSearchChange} />
//           {isAdmin ? <Button btnText='Create Event' type={ButtonTypes.PRIMARY} onClick={handleToggleForm} /> : ''}
//         </div>
//       </div>
//       <div className={style.contanier}>
//         <div className={`${style.grid} ${showForm ? style.twoColumn : ''}`}>
//           {isLoading ? events.map((event) => <EventsContent key={event._id} />) :
//             events.map((event) => (
//               <Card key={event._id} backgroundColor='#FFFFFF' borderRadius='5px' border='1px solid #ebebeb' padding='20px' flex='1' position='relative' height='auto' >
//                 <div className={style.titleContainer}>
//                   <div className={style.title}>{event.title}</div>
//                   {isAdmin && <LongMenu
//                     onClickEdit={() => handleEditClick(event)}
//                     onClickDelete={() => handleDeleteEventModal(event._id)}
//                     EditIcon={EditIcon}
//                     Delete={DeleteIcon}
//                     name="Edit"
//                     name2="Delete"
//                     style={{ color: '#6b7280' }}
//                   />}
//                 </div>
//                 <div className={style.description}>{event.description}</div>
//                 <div className={style.dataContainer}>
//                   <div className={style.dateContainer}>
//                     <div className={style.data}>
//                       <CalendarTodayIcon sx={{ height: 20, width: 20, color: "#6b7280" }} />
//                       {new Date(event.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
//                     </div>
//                     <div className={style.data}>
//                       <CalendarTodayIcon sx={{ height: 20, width: 20, color: "#6b7280" }} />
//                       {new Date(event.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
//                     </div>
//                   </div>
//                   <div className={style.data}>
//                     <LocationSearchingIcon sx={{ height: 20, width: 20, color: "#6b7280" }} />
//                     <div>{event.location}</div>
//                   </div>
//                   <Button
//                     btnText={isAdmin ? "See voters" : 'Vote'}
//                     type={ButtonTypes.SECONDARY}
//                     onClick={() => handleSeeVoters(event)}
//                   />
//                 </div>
//               </Card>
//             ))}
//         </div>
//         {(showForm) && (
//           <Card padding='20px' alignSelf='flex-end' gap='10px' borderRadius='5px' flex='2' border='2px solid #D3D3D3' height='100%' position='sticky' className={style.formCard} >
//             <>
//               <div className={style.create}>{editingEvent ? 'Edit Event' : 'Create New Event'}</div>
//               <Input IsUsername label='Event Title' name='title' onChange={editingEvent ? handleEditChange : handleChange}
//                 value={editingEvent ? editingEvent.title : event.title} />

//               <Input
//                 IsUsername
//                 label='Start Date and Time'
//                 shrink={true}
//                 name='startDate'
//                 type="datetime-local"
//                 onChange={editingEvent ? handleEditChange : handleChange}
//                 value={editingEvent ? editingEvent.startDate.slice(0, 16) : event.startDate}
//               />

//               <Input
//                 IsUsername
//                 label='End Date and Time'
//                 shrink={true}
//                 name='endDate'
//                 type="datetime-local"
//                 onChange={editingEvent ? handleEditChange : handleChange}
//                 value={editingEvent ? editingEvent.endDate.slice(0, 16) : endDate}
//               />
//               <Input IsUsername width="100%" label='Location' name='location' onChange={editingEvent ? handleEditChange : handleChange} value={editingEvent ? editingEvent.location : event.location} />
//               <Input IsUsername label="Description" type="textarea" name='description' multiline rows={4}
//                 onChange={editingEvent ? handleEditChange : handleChange}
//                 value={editingEvent ? editingEvent.description : event.description}
//               />
//               <Selecter
//                 value={participants}
//                 onChange={(newValue) => setParticipants(Array.isArray(newValue) ? newValue : [newValue])}
//                 options={allEmails}
//                 multiple={true}
//                 name='participants'
//                 label='Participants'
//               />

//               <Selecter
//                 value={type}
//                 onChange={(newValue) => handleChange({ target: { name: 'type', value: newValue } } as React.ChangeEvent<HTMLInputElement>)}
//                 options={typesofEvent}
//                 multiple={false}
//                 name="type"
//                 label='Event Type'
//               />
//               <div style={{ display: 'flex', alignItems: 'center' }}>
//                 <Switch
//                   checked={editingEvent ? includePollInEdit : includesPoll}
//                   onChange={(e) => editingEvent ? handleEditChange(e) : handleChange(e)}
//                   name="includesPoll"
//                   sx={{ color: "#2469FF" }}
//                   {...label}
//                 />
//                 <div>{editingEvent ? 'Include poll in event' : 'Add poll to event'}</div>
//               </div>

//               {(editingEvent ? includePollInEdit : includesPoll) && (
//                 <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
//                   <Input label='Poll Question' name='pollQuestion' IsUsername
//                     value={editingEvent ? editPollQuestion : pollQuestion}
//                     onChange={editingEvent ? handleEditChange : handleChange} />
//                   <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
//                     Options
//                     <div style={{ display: 'flex', alignItems: 'center' }}>
//                       <Switch
//                         checked={editingEvent ? editIsMultipleChoice : isMultipleChoice}
//                         onChange={(e) => editingEvent ? handleEditChange(e) : handleChange(e)}
//                         name="isMultipleChoice"
//                         {...label}
//                       />
//                       <div>Multiple choice</div>
//                     </div>
//                   </div>
//                   {(editingEvent ? editPollOptions : pollOptions).map((option, index) => (
//                     <Input
//                       key={index}
//                       IsUsername
//                       label={`Option ${index + 1}`}
//                       name={`option${index + 1}`}
//                       value={option}
//                       onChange={(e) => editingEvent
//                         ? handleEditOptionChange(index, e.target.value)
//                         : handleOptionChange(index, e.target.value)
//                       }
//                     />
//                   ))}
//                   <Button
//                     onClick={editingEvent ? handleAddEditOption : handleAddOption}
//                     btnText='Add new option'
//                     type={ButtonTypes.SECONDARY}
//                     color='#2469FF'
//                     borderColor='#2469FF'
//                     disabled={(editingEvent ? editPollOptions : pollOptions).length >= 3}
//                   />
//                   {(editingEvent ? editPollOptions : pollOptions).length >= 3 && (
//                     <div style={{ color: 'red', fontSize: '14px' }}>
//                       Maximum of 3 options allowed.
//                     </div>
//                   )}
//                 </div>
//               )}

//               <div className={style.border}></div>
//               <Button btnText={editingEvent ? 'Update' : 'Save event'} type={ButtonTypes.PRIMARY} backgroundColor='#2469FF' border='none' onClick={editingEvent ? updateEvent : createEvent} />
//             </>
//           </Card>
//         )}
//         {showModal && (
//           <ModalComponent open={showModal} handleClose={closeModal}>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: "15px" }}>
//               <div className={style.title}>Confirm Action.</div>
//               <div>Are you sure you want to delete this event?</div>
//               <div style={{ display: 'flex', gap: "10px", marginTop: "20px" }}>
//                 <Button
//                   type={ButtonTypes.PRIMARY}
//                   backgroundColor='#d32f2f'
//                   borderColor='#d32f2f'
//                   btnText='Confirm'
//                   width='100%'
//                   onClick={() => {
//                     handleDelete(eventToDeleteId);
//                     closeModal();
//                   }}
//                 />
//                 <Button
//                   type={ButtonTypes.SECONDARY}
//                   btnText='Cancel'
//                   width='100%'
//                   onClick={closeModal}
//                 />
//               </div>
//             </div>
//           </ModalComponent>
//         )}
//         {showEventModal && selectedEvent && (
//           <ModalComponent height='100%' width='400px' padding='0' open={showEventModal} handleClose={() => setShowEventModal(false)}>
//             <SelectedEventCard
//               event={selectedEvent}
//               onClose={() => setSelectedEvent(null)}
//             />
//           </ModalComponent>
//         )}
//       </div>
//     </>
//   );
// }






import React from 'react';
import Card from '@/Components/Card/Card';
import style from './styles/Events.module.css';
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
import SelectedEventCard from './Components/EventList/EventList';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Toast from '@/Components/Toast/Toast';
import DrawerComponent from '@/Components/Drawer/Drawer';
import { EventsData } from './Interface/Events';

export default function Events() {
  const { events, onSearchChange, setEvents, isLoading, isAdmin, handleSeeVoters, selectedEvent, showEventModal, setShowEventModal, setSelectedEvent } = useGetAllEvents();
  const { handleChange, typesofEvent, event, allEmails, type, endDate, createEvent, pollQuestion, pollOptions, participants, isMultipleChoice, handleOptionChange, handleAddOption, includesPoll, setParticipants, toastOpen, toastMessage, handleToastClose, toastSeverity } = useCreateEvent(setEvents);
  const { editingEvent, includePollInEdit, editPollQuestion, editPollOptions, editIsMultipleChoice, handleEditChange, handleEditOptionChange, handleAddEditOption, updateEvent, handleToggleForm, handleEditClick, handleUpdateToastClose, updateToastMessage, updateToastOpen, updateToastSeverity } = useUpdateEvent(setEvents);
  const { handleDelete, closeModal, showModal, handleDeleteEventModal, eventToDeleteId } = useDeleteEvent(setEvents);
  const [drawerOpen, setDrawerOpen] = React.useState(false);


  const [drawerAction, setDrawerAction] = React.useState('create');

  const handleOpenDrawer = (action: 'create' | 'edit', event: EventsData) => {
    setDrawerAction(action);
    if (action === 'edit' && event) {
      handleEditClick(event);
    } 
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    if (drawerAction === 'edit') {
      handleToggleForm();
    }
  };

  return (
    <>
      <div className={style.firstContainer}>
        <Toast
          severity={toastOpen ? toastSeverity : updateToastSeverity}
          open={toastOpen || updateToastOpen}
          message={toastOpen ? toastMessage : updateToastMessage}
          onClose={toastOpen ? handleToastClose : handleUpdateToastClose}
        />
        <DrawerComponent
          open={drawerOpen}
          onClose={handleCloseDrawer}
          editingEvent={editingEvent}
          handleChange={handleChange}
          handleEditChange={handleEditChange}
          event={event}
          endDate={endDate}
          participants={participants}
          setParticipants={setParticipants}
          allEmails={allEmails}
          type={type}
          typesofEvent={typesofEvent}
          includesPoll={includesPoll}
          includePollInEdit={includePollInEdit}
          pollQuestion={pollQuestion}
          editPollQuestion={editPollQuestion}
          isMultipleChoice={isMultipleChoice}
          editIsMultipleChoice={editIsMultipleChoice}
          pollOptions={pollOptions}
          editPollOptions={editPollOptions}
          handleOptionChange={handleOptionChange}
          handleEditOptionChange={handleEditOptionChange}
          handleAddOption={handleAddOption}
          handleAddEditOption={handleAddEditOption}
          createEvent={createEvent}
          updateEvent={updateEvent}
        />
        <div className={style.account}>Upcoming Events</div>
        <div style={{ display: 'flex', alignItems: "center", gap: "10px" }}>
          <Input IsUsername type='text' label='search' name='Search' width={220} iconPosition="end" icon={<SearchOutlinedIcon />} onChange={onSearchChange} />
          {isAdmin ? <Button btnText='Create Event' type={ButtonTypes.PRIMARY} onClick={() => handleOpenDrawer('create')} /> : ''}
        </div>
      </div>
      <div className={style.contanier}>
        <div className={style.grid}>
          {isLoading ? events.map((event) => <EventsContent key={event._id} />) :
            events.map((event) => (
              <Card key={event._id} backgroundColor='#FFFFFF' borderRadius='5px' border='1px solid #ebebeb' padding='20px' flex='1' position='relative' height='auto' >
                <div className={style.titleContainer}>
                  <div className={style.title}>{event.title}</div>
                  {isAdmin && <LongMenu
                    onClickEdit={() => handleOpenDrawer('edit', event)}
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
                      <CalendarTodayIcon sx={{ height: 20, width: 20, color: "#6b7280" }} />
                      {new Date(event.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className={style.data}>
                      <CalendarTodayIcon sx={{ height: 20, width: 20, color: "#6b7280" }} />
                      {new Date(event.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
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
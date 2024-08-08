// // CreateEvent.tsx
// import React from 'react';
// import Input from '@/Components/Input/Index';
// import Button from '@/Components/Button/Button';
// import { ButtonTypes } from '@/Components/Button/ButtonTypes';
// import Switch from '@mui/material/Switch';
// import style from '../../styles/Events.module.css'


// interface Event {
//   title: string;
//   date: string;
//   location: string;
//   description: string;
// }

// // Define the type for the component's props
// interface CreateEventProps {
//   event: Event;
//   handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   creatingTime: string;
//   createEvent: (e: React.FormEvent<HTMLButtonElement>) => void;
//   pollQuestion: string;
//   pollOptions: string[];
//   isMultipleChoice: boolean;
//   handleOptionChange: (index: number, value: string) => void;
//   handleAddOption: () => void;
//   showCreatePoll: boolean;
//   handleCreatePollToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   editingEvent?: Event;
//   handleEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   editingTime: string;
//   includePollInEdit: boolean;
//   includesPoll: boolean;
//   editPollQuestion: string;
//   editIsMultipleChoice: boolean;
//   editPollOptions: string[];
//   handleAddEditOption: () => void;
//   handleEditOptionChange: (index: number, value: string) => void;
//   option: string;
// }

// export default function CreateEvent({
//   event,
//   handleChange,
//   creatingTime,
//   createEvent,
//   pollQuestion,
//   pollOptions,
//   isMultipleChoice,
//   handleOptionChange,
//   handleAddOption,
//   editingEvent,
//   handleEditChange,
//   editingTime,
//   includePollInEdit,
//   includesPoll,
//   editPollQuestion,
//   editIsMultipleChoice,
//   editPollOptions,
//   handleAddEditOption,
//   handleEditOptionChange,
//   updateEvent,
// }: CreateEventProps) {
//   const label = { inputProps: { 'aria-label': 'Switch demo' } };

//   return (
//     <>
//       <div className={style.create}>{editingEvent ? 'Edit Event' : 'Create New Event'}</div>
//                 <Input IsUsername label='Event Title' name='title' onChange={editingEvent ? handleEditChange : handleChange}
//                   value={editingEvent ? editingEvent.title : event.title} />
//                 <div style={{ display: "flex", width: "100%", gap: "10px" }}>
//                   <Input IsUsername label='Date' shrink={true} name='date' type="date"
//                     onChange={editingEvent ? handleEditChange : handleChange}
//                     value={editingEvent ? editingEvent.date : event.date}
//                   />
//                   <div style={{ width: "100%" }}>
//                     <Input IsUsername label='Time' shrink={true} name='time' type="time"
//                       onChange={editingEvent ? handleEditChange : handleChange}
//                       value={editingEvent ? editingTime : creatingTime}
//                     />
//                   </div>
//                 </div>
//                 <Input IsUsername width="100%" label='Location' name='location' onChange={editingEvent ? handleEditChange : handleChange} value={editingEvent ? editingEvent.location : event.location} />
//                 <Input IsUsername label="Description" type="textarea" name='description' multiline rows={4}
//                   onChange={editingEvent ? handleEditChange : handleChange}
//                   value={editingEvent ? editingEvent.description : event.description}
//                 />
//                 <div style={{ display: 'flex', alignItems: 'center' }}>
//                   <Switch
//                     checked={editingEvent ? includePollInEdit : includesPoll}
//                     onChange={(e) => editingEvent ? handleEditChange(e) : handleChange(e)}
//                     name="includesPoll"
//                     sx={{ color: "#2469FF" }}
//                     {...label}
//                   />
//                   <div>{editingEvent ? 'Include poll in event' : 'Add poll to event'}</div>
//                 </div>

//                 {(editingEvent ? includePollInEdit : includesPoll) && (
//                   <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
//                     <Input label='Poll Question' name='pollQuestion' IsUsername
//                       value={editingEvent ? editPollQuestion : pollQuestion}
//                       onChange={editingEvent ? handleEditChange : handleChange} />
//                     <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
//                       Options
//                       <div style={{ display: 'flex', alignItems: 'center' }}>
//                         <Switch
//                           checked={editingEvent ? editIsMultipleChoice : isMultipleChoice}
//                           onChange={(e) => editingEvent ? handleEditChange(e) : handleChange(e)}
//                           name="isMultipleChoice"
//                           {...label}
//                         />
//                         <div>Multiple choice</div>
//                       </div>
//                     </div>
//                     {(editingEvent ? editPollOptions : pollOptions).map((option, index) => (
//                       <Input
//                         key={index}
//                         IsUsername
//                         label={`Option ${index + 1}`}
//                         name={`option${index + 1}`}
//                         value={option}
//                         onChange={(e) => editingEvent
//                           ? handleEditOptionChange(index, e.target.value)
//                           : handleOptionChange(index, e.target.value)
//                         }
//                       />
//                     ))}
//                     <Button
//                       onClick={editingEvent ? handleAddEditOption : handleAddOption}
//                       btnText='Add new option'
//                       type={ButtonTypes.SECONDARY}
//                       color='#2469FF'
//                       borderColor='#2469FF'
//                       disabled={(editingEvent ? editPollOptions : pollOptions).length >= 3}
//                     />
//                     {(editingEvent ? editPollOptions : pollOptions).length >= 3 && (
//                       <div style={{ color: 'red', fontSize: '14px' }}>
//                         Maximum of 3 options allowed.
//                       </div>
//                     )}
//                   </div>
//                 )}
//                 <div className={style.border}></div>
//                 <Button btnText={editingEvent ? 'Update' : 'Save event'} type={ButtonTypes.PRIMARY} backgroundColor='#2469FF' border='none' onClick={editingEvent ? updateEvent : createEvent} />
//     </>
//   );
// }
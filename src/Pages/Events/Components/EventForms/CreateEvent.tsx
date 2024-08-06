// CreateEvent.tsx
import React from 'react';
import Input from '@/Components/Input/Index';
import Button from '@/Components/Button/Button';
import { ButtonTypes } from '@/Components/Button/ButtonTypes';
import Switch from '@mui/material/Switch';
import style from '../../styles/Events.module.css'


interface Event {
  title: string;
  date: string;
  location: string;
  description: string;
}

// Define the type for the component's props
interface CreateEventProps {
  event: Event;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  creatingTime: string;
  createEvent: (e: React.FormEvent<HTMLButtonElement>) => void;
  pollQuestion: string;
  pollOptions: string[];
  isMultipleChoice: boolean;
  handleOptionChange: (index: number, value: string) => void;
  handleAddOption: () => void;
  showCreatePoll: boolean;
  handleCreatePollToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CreateEvent({
  event,
  handleChange,
  creatingTime,
  createEvent,
  pollQuestion,
  pollOptions,
  isMultipleChoice,
  handleOptionChange,
  handleAddOption,
  showCreatePoll,
  handleCreatePollToggle
}: CreateEventProps) {
  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  return (
    <>
      <div className={style.create}>Create New Event</div>
      <Input IsUsername label='Event Title' name='title' onChange={handleChange} value={event.title} />
      <div style={{ display: "flex", width: "100%", gap: "10px" }}>
        <Input IsUsername label='Date' name='date' type="date" onChange={handleChange} value={event.date} />
        <div style={{ width: "100%" }}>
          <Input IsUsername label='Time' name='time' type="time" onChange={handleChange} value={creatingTime} />
        </div>
      </div>
      <Input IsUsername width="100%" label='Location' name='location' onChange={handleChange} value={event.location} />
      <Input IsUsername label="Description" type="textarea" name='description' multiline rows={4} onChange={handleChange} value={event.description} />
      
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Switch checked={showCreatePoll} onChange={handleCreatePollToggle} sx={{ color: "#2469FF" }} {...label} />
        <div>Add poll to event</div>
      </div>

      {showCreatePoll && (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Input label='Poll Question' name='pollQuestion' IsUsername value={pollQuestion} onChange={handleChange} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
            Options
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Switch checked={isMultipleChoice} onChange={(e) => handleChange(e)} name="isMultipleChoice" {...label} />
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

      <div className={style.border}></div>
      <Button btnText='Save event' type={ButtonTypes.PRIMARY} backgroundColor='#2469FF' border='none' onClick={createEvent} />
    </>
  );
}
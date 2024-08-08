import Input from '@/Components/Input/Index';
import Button from '@/Components/Button/Button';
import { ButtonTypes } from '@/Components/Button/ButtonTypes';
import style from '../../styles/Events.module.css'

interface EditingEvent {
    title: string;
    date: string;
    location: string;
    description: string;
  }
interface UpdateEventProps {
    editingEvent: EditingEvent;
    handleEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    editingTime: string;
    updateEvent: (e: React.FormEvent<HTMLButtonElement>) => void;
  }

  export default function UpdateEvent({
    editingEvent,
    handleEditChange,
    editingTime,
    updateEvent
  }: UpdateEventProps) {

   
  return (
    <>
      <div className={style.create}>Edit Event</div>
      <Input IsUsername label='Event Title' name='title' onChange={handleEditChange} value={editingEvent.title} />
      <div style={{ display: "flex", width: "100%", gap: "10px" }}>
        <Input IsUsername label='Date' name='date' type="date" onChange={handleEditChange} value={editingEvent.date} />
        <div style={{ width: "100%" }}>
          <Input IsUsername label='Time' name='time' type="time" onChange={handleEditChange} value={editingTime} />
        </div>
      </div>
      <Input IsUsername width="100%" label='Location' name='location' onChange={handleEditChange} value={editingEvent.location} />
      <Input IsUsername label="Description" type="textarea" name='description' multiline rows={4} onChange={handleEditChange} value={editingEvent.description} />
      
      <div className={style.border}></div>
      <Button btnText='Edit' type={ButtonTypes.PRIMARY} backgroundColor='#2469FF' border='none' onClick={updateEvent} />
    </>
  );
}
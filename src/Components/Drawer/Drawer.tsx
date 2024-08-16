import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button1 from '../Button/Button';
import { Box } from '@mui/material';
import Input from '../Input/Index';
import { ButtonTypes } from '../Button/ButtonTypes';
import Switch from '@mui/material/Switch';
import style from '../../../src/Pages/Events/styles/Events.module.css'
import Selecter from '../Input/components/Select/Selecter';
import { useEvents } from '@/Pages/Events/Context/EventsContext';
import Dropzone from '@/Dropzone/Dropzone';
import CloseIcon from '@mui/icons-material/Close';

interface AnchorTemporaryDrawerProps {
  open: boolean;
  onClose: () => void;
  endDate: string;
}

function DrawerComponent({
  open,
  onClose,
  endDate,
}: AnchorTemporaryDrawerProps) {

  const { editingEvent, editPollQuestion,
    editPollOptions, handleOptionChange,
    handleEditOptionChange,
    handleAddOption,
    handleAddEditOption,
    createEvent,
    updateEvent, pollQuestion,
    pollOptions,
    isMultipleChoice, includePollInEdit, includesPoll, editIsMultipleChoice, handleChange,
    handleEditChange, event, setParticipants,
    participants, allEmails,
    typesofEvent,  editParticipants, setEditParticipants, editType, setEditType } = useEvents()

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
    >
      <Box sx={{ width: 400, display: "flex", flexDirection: "column", gap: 2, padding: 2 }}>
        <div className={style.create}>{editingEvent ? 'Edit Event' : 'Create New Event'}<CloseIcon onClick={onClose} style={{cursor:"pointer"}}/></div>
        <Input IsUsername label='Event Title' name='title' onChange={editingEvent ? handleEditChange : handleChange}
          value={editingEvent ? editingEvent.title : event.title} />
        <div style={{ display: 'flex', width: "100%", gap: 15 }}>
          <Input
            IsUsername
            label='Start Date and Time'
            shrink={true}
            name='startDate'
            type="datetime-local"
            onChange={editingEvent ? handleEditChange : handleChange}
            value={editingEvent ? editingEvent.startDate.slice(0, 16) : event.startDate}
            width={178}
          />

          <Input
            IsUsername
            label='End Date and Time'
            shrink={true}
            name='endDate'
            type="datetime-local"
            width={173}
            onChange={editingEvent ? handleEditChange : handleChange}
            value={editingEvent ? editingEvent.endDate.slice(0, 16) : endDate}
          />
        </div>

        <Input IsUsername width="100%" label='Location' name='location' onChange={editingEvent ? handleEditChange : handleChange} value={editingEvent ? editingEvent.location : event.location} />
        <Input IsUsername label="Description" type="textarea" name='description' multiline rows={4}
          onChange={editingEvent ? handleEditChange : handleChange}
          value={editingEvent ? editingEvent.description : event.description}
        />
        <Selecter
        value={editingEvent ? editParticipants : participants}
        onChange={(newValue) => {
          if (editingEvent) {
            setEditParticipants(Array.isArray(newValue) ? newValue : [newValue]);
          } else {
            setParticipants(Array.isArray(newValue) ? newValue : [newValue]);
          }
        }}
          options={allEmails}
          multiple={true}
          name='participants'
          label='Participants'
        />

        <Selecter
          value={editingEvent ? editType : event.type}
          onChange={(newValue) => {
              if (editingEvent) {
                  setEditType(Array.isArray(newValue) ? newValue[0] : newValue);
              } else {
                  handleChange({
                      target: { name: 'type', value: Array.isArray(newValue) ? newValue[0] : newValue }
                  } as React.ChangeEvent<HTMLInputElement>);
              }
          }}
          options={typesofEvent}
          multiple={false}
          name="type"
          label='Event Type'
        />
        <div > Add Event Images</div>
        <Dropzone/>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Switch
            checked={editingEvent ? includePollInEdit : includesPoll}
            onChange={(e) => editingEvent ? handleEditChange(e) : handleChange(e)}
            name="includesPoll"
            sx={{ color: "#2469FF" }}
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
            <Button1
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
        <Button1 btnText={editingEvent ? 'Update' : 'Save event'} type={ButtonTypes.PRIMARY} backgroundColor='#2469FF' border='none' onClick={editingEvent ? updateEvent : createEvent} />
      </Box>
    </Drawer>
  );
}



export default DrawerComponent;
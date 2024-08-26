import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import Selecter from '@/Components/Input/components/Select/Selecter'
import Dropzone from '@/Dropzone/Dropzone'
import { Switch } from '@mui/material'
import DrawerComponent from '@/Components/Drawer/Drawer'
import Input from '@/Components/Input/Index'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import { useEvents } from '../Context/EventsContext'
import style from '../styles/Events.module.css'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { EventFormFields, EventSchema } from '@/Schemas/Events/Event.schema'
import { ErrorText } from '@/Components/Error/ErrorTextForm'

import MapPicker from '../Components/GoogleMap/MapPicker'

export default function Forms() {
    const {
        editingEvent,
        editPollQuestion,
        editPollOptions,
        handleOptionChange,
        handleEditOptionChange,
        handleAddOption,
        handleAddEditOption,
        createEvent,
        updateEvent,
        pollQuestion,
        pollOptions,
        isMultipleChoice,
        includePollInEdit,
        includesPoll,
        editIsMultipleChoice,
        handleChange,
        handleEditChange,
        event,
        setParticipants,
        participants,
        allEmails,
        typesofEvent,
        editParticipants,
        setEditParticipants,
        editType,
        setEditType,
        endDate,
        handleCloseDrawer,
        drawerOpen,
        handleLocationChange, 
    } = useEvents()

    const [location, setLocation] = useState<{ latitude: number; longitude: number }>({ latitude: 0, longitude: 0 })
    const [address, setAddress] = useState('')

    const defaultValues: EventFormFields = {
        title: editingEvent ? editingEvent.title : '',
        description: editingEvent ? editingEvent.description : '',
        startDate: editingEvent ? editingEvent.startDate : '',
        endDate: editingEvent ? editingEvent.endDate : '',
        location: editingEvent ? editingEvent.location : { latitude: 0, longitude: 0 }, 
        participants: editingEvent ? editingEvent.participants : [],
        type: editingEvent ? editingEvent.type : 'other',
    }

    console.log(editingEvent)

    const {
        register,
        control,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<EventFormFields>({
        defaultValues,
        resolver: valibotResolver(EventSchema),
    })

    const handleLocationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value)
    }

    const handleMapLocationChange = (lat: number, lng: number) => {
        setLocation({ latitude: lat, longitude: lng })
        setAddress('') 
    }

    const onSubmit: SubmitHandler<EventFormFields> = async (
        data: EventFormFields,
    ) => {
        console.log('data', data) 
        if (editingEvent) {
            await updateEvent(data)
        } else {
            await createEvent(data)
        }
    }

    return (
        <div>
            <DrawerComponent open={drawerOpen} onClose={handleCloseDrawer}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.create}>
                        {editingEvent ? 'Edit Event' : 'Create New Event'}
                        <CloseIcon
                            onClick={handleCloseDrawer}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                    <div>
                        <Input
                            IsUsername
                            label="Event Title"
                            name="title"
                            {...register('title')}
                        />
                        {errors.title && (
                            <ErrorText>{errors.title.message}</ErrorText>
                        )}
                    </div>
                    <div style={{ display: 'flex', width: '100%', gap: 15 }}>
                        <div>
                            <Input
                                IsUsername
                                label="Start Date and Time"
                                shrink={true}
                                name="startDate"
                                type="datetime-local"
                                {...register('startDate')}
                                width={178}
                            />
                            {errors.startDate && (
                                <ErrorText>
                                    {errors.startDate.message}
                                </ErrorText>
                            )}
                        </div>

                        <div>
                            <Input
                                IsUsername
                                label="End Date and Time"
                                shrink={true}
                                name="endDate"
                                type="datetime-local"
                                {...register('endDate')}
                                width={173}
                            />
                            {errors.endDate && (
                                <ErrorText>{errors.endDate.message}</ErrorText>
                            )}
                        </div>
                    </div>

                    <div>
                        <Input
                            IsUsername
                            width="100%"
                            label="Location"
                            name="location"
                            value={address}
                            onChange={handleLocationInputChange}
                        />
                        {errors.location && (
                            <ErrorText>{errors.location.message}</ErrorText>
                        )}
                    </div>
                    <MapPicker
                        location={location}
                        onLocationChange={handleMapLocationChange}
                    />
                    
                    <div>
                        <Input
                            IsUsername
                            label="Description"
                            type="textarea"
                            name="description"
                            multiline
                            rows={4}
                            {...register('description')}
                        />
                        {errors.description && (
                            <ErrorText>{errors.description.message}</ErrorText>
                        )}
                    </div>
                    <div>
                        <Controller
                            control={control}
                            name="participants"
                            render={({ field }) => (
                                <Selecter
                                    {...field}
                                    value={field.value || []}
                                    onChange={(newValue) => {
                                        const updatedValue = Array.isArray(
                                            newValue,
                                        )
                                            ? newValue
                                            : [newValue]
                                        field.onChange(updatedValue)
                                        if (editingEvent) {
                                            setEditParticipants(updatedValue)
                                        } else {
                                            setParticipants(updatedValue)
                                        }
                                    }}
                                    options={allEmails}
                                    multiple={true}
                                    label="Participants"
                                />
                            )}
                        />
                    </div>

                    <Selecter
                        value={editingEvent ? editType : event.type}
                        onChange={(newValue) => {
                            if (editingEvent) {
                                setEditType(
                                    Array.isArray(newValue)
                                        ? newValue[0]
                                        : newValue,
                                )
                            } else {
                                handleChange({
                                    target: {
                                        name: 'type',
                                        value: Array.isArray(newValue)
                                            ? newValue[0]
                                            : newValue,
                                    },
                                } as React.ChangeEvent<HTMLInputElement>)
                            }
                        }}
                        options={typesofEvent}
                        multiple={false}
                        name="type"
                        label="Event Type"
                    />
                    <div> Add Event Images</div>
                    <Dropzone />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Switch
                            checked={
                                editingEvent ? includePollInEdit : includesPoll
                            }
                            onChange={(e) =>
                                editingEvent
                                    ? handleEditChange(e)
                                    : handleChange(e)
                            }
                            name="includesPoll"
                            sx={{ color: '#2469FF' }}
                        />
                        <div>
                            {editingEvent
                                ? 'Include poll in event'
                                : 'Add poll to event'}
                        </div>
                    </div>

                    {(editingEvent ? includePollInEdit : includesPoll) && (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px',
                            }}
                        >
                            <Input
                                label="Poll Question"
                                name="pollQuestion"
                                IsUsername
                                value={
                                    editingEvent
                                        ? editPollQuestion
                                        : pollQuestion
                                }
                                onChange={
                                    editingEvent
                                        ? handleEditChange
                                        : handleChange
                                }
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                Options
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Switch
                                        checked={
                                            editingEvent
                                                ? editIsMultipleChoice
                                                : isMultipleChoice
                                        }
                                        onChange={(e) =>
                                            editingEvent
                                                ? handleEditChange(e)
                                                : handleChange(e)
                                        }
                                        name="isMultipleChoice"
                                    />
                                    <div>Multiple choice</div>
                                </div>
                            </div>
                            {(editingEvent ? editPollOptions : pollOptions).map(
                                (option, index) => (
                                    <Input
                                        key={index}
                                        IsUsername
                                        label={`Option ${index + 1}`}
                                        name={`option${index + 1}`}
                                        value={option}
                                        onChange={(e) =>
                                            editingEvent
                                                ? handleEditOptionChange(
                                                      index,
                                                      e.target.value,
                                                  )
                                                : handleOptionChange(
                                                      index,
                                                      e.target.value,
                                                  )
                                        }
                                    />
                                ),
                            )}
                            <Button
                                onClick={
                                    editingEvent
                                        ? handleAddEditOption
                                        : handleAddOption
                                }
                                btnText="Add new option"
                                type={ButtonTypes.SECONDARY}
                                color="#2469FF"
                                borderColor="#2469FF"
                                disabled={
                                    (editingEvent
                                        ? editPollOptions
                                        : pollOptions
                                    ).length >= 3
                                }
                            />
                            {(editingEvent ? editPollOptions : pollOptions)
                                .length >= 3 && (
                                <div style={{ color: 'red', fontSize: '14px' }}>
                                    Maximum of 3 options allowed.
                                </div>
                            )}
                        </div>
                    )}
                    <div className={style.border}></div>
                    <Button
                        btnText={editingEvent ? 'Update' : 'Save event'}
                        type={ButtonTypes.PRIMARY}
                        backgroundColor="#2469FF"
                        border="none"
                        isSubmit
                    />
                </form>
            </DrawerComponent>
        </div>
    )
}

import React, { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import Badge from '@mui/material/Badge'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton'
import { ModalComponent } from '@/Components/Modal/Modal'
import Input from '@/Components/Input/Index'
import Card1 from '@/Components/Card/Card'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import { useAuth } from '@/ProtectedRoute/Context/AuthContext'
import style from '../style/dashboard.module.css'
import { useHandleNoteCreation, useGetNotes } from '../Hook'
import { Checkbox } from '@mui/material'

export type Note = {
    _id: string
    title: string
    description: string
    willBeReminded: boolean
    date: string
}

function ServerDay(
    props: PickersDayProps<Dayjs> & { highlightedDays?: string[] },
) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props

    const isSelected =
        !outsideCurrentMonth &&
        highlightedDays.includes(day.format('YYYY-MM-DD'))

    return (
        <Badge
            key={day.toString()}
            overlap="circular"
            badgeContent={isSelected ? '📋' : undefined}
        >
            <PickersDay
                {...other}
                outsideCurrentMonth={outsideCurrentMonth}
                day={day}
            />
        </Badge>
    )
}

export const Notes = () => {
    const { mutate } = useHandleNoteCreation()
    const { currentUser } = useAuth()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs())
    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false)
    const [newNote, setNewNote] = useState<Omit<Note, '_id'>>({
        title: '',
        description: '',
        willBeReminded: false,
        date: '',
    })

    const {
        data: notesData,
        isLoading,
        error,
    } = useGetNotes(currentUser!._id as unknown as string)

    const notes: Note[] = Array.isArray(notesData) ? notesData : []

    const handleModalOpen = () => {
        setIsModalOpen(true)
    }

    const handleNoteModalOpen = () => {
        setIsNoteModalOpen(true)
    }

    const handleNoteModalClose = () => {
        setIsNoteModalOpen(false)
        setNewNote({
            title: '',
            description: '',
            willBeReminded: false,
            date: '',
        })
    }

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value, type } = e.target
        setNewNote((prev) => ({
            ...prev,
            [name]:
                type === 'checkbox'
                    ? (e.target as HTMLInputElement).checked
                    : value,
        }))
    }

    const handleAddNote = async () => {
        if (newNote.title && newNote.description) {
            mutate({
                ...newNote,
                date: selectedDate.format('YYYY-MM-DD'),
                userId: currentUser!._id as unknown as string,
            })
            handleNoteModalClose()
        }
    }

    const highlightedDays = notes.map((note) => note.date)

    if (error) {
        return <div>Error loading notes: {error.message}</div>
    }


    return (
        <Card1
            padding="20px"
            borderRadius="15px"
            flex="1"
            backgroundColor="rgba(255, 255, 255, 0.7)"
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <h2>Notes</h2>
                <Button
                    btnText="Show all notes"
                    type={ButtonTypes.SECONDARY}
                    border={'none'}
                    onClick={handleModalOpen}
                />
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    value={selectedDate}
                    loading={isLoading}
                    onChange={(newDate) => {
                        if (newDate) {
                            setSelectedDate(newDate)
                            handleNoteModalOpen()
                        }
                    }}
                    renderLoading={() => <DayCalendarSkeleton />}
                    slots={{
                        day: ServerDay,
                    }}
                    slotProps={{
                        day: {
                            highlightedDays,
                        } as any,
                    }}
                />
            </LocalizationProvider>

            <ModalComponent
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                    }}
                >
                    <h3>All notes</h3>
                    {notes.length > 0 ? (
                        notes.map((note) => (
                            <div key={note._id} className={style.note}>
                                <h4>Title: {note.title}</h4>
                                <p>Description: {note.description}</p>
                                <p>Date: {note.date}</p>
                            </div>
                        ))
                    ) : (
                        <p>No notes available.</p>
                    )}
                </div>
            </ModalComponent>

            <ModalComponent
                open={isNoteModalOpen}
                handleClose={handleNoteModalClose}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                    }}
                >
                    <h3>
                        Add a note for {selectedDate.format('MMMM D, YYYY')}
                    </h3>
                    <div>
                        <div>Title</div>
                        <Input
                            IsUsername
                            type="input"
                            name="title"
                            label="Title"
                            shrink={true}
                            value={newNote.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <div>Description</div>
                        <Input
                            rows={4}
                            multiline={true}
                            IsUsername
                            type="input"
                            name="description"
                            label="Description"
                            shrink={true}
                            value={newNote.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <div>Will be reminded</div>
                        <Checkbox
                            checked={false}
                            onChange={() => {
                                console.log('checked')
                            }}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </div>
                    <Button
                        btnText="Add Note"
                        type={ButtonTypes.PRIMARY}
                        onClick={handleAddNote}
                    />
                </div>
            </ModalComponent>
        </Card1>
    )
}

export default Notes

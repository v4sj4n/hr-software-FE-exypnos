import { useState } from 'react'
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
import { useForm } from '@tanstack/react-form'
import { valibotValidator } from '@tanstack/valibot-form-adapter'
import { minLength, nonEmpty, pipe, string } from 'valibot'
import { ErrorText } from '@/Components/Error/ErrorTextForm'

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

    const form = useForm({
        defaultValues: {
            title: '',
            description: '',
            willBeReminded: false,
            date: '',
        },
        validatorAdapter: valibotValidator(),
        onSubmit: async ({ value, formApi }) => {
            console.log('Submitting form:', value)
            if (currentUser && currentUser._id) {
                mutate({
                    ...value,
                    userId: currentUser._id as unknown as string,
                })
                formApi.reset()
                handleNoteModalClose()
            } else {
                console.error('User is not authenticated')
            }
        },
    })

    const {
        data: notesData,
        isLoading,
        error,
    } = useGetNotes(currentUser?._id as unknown as string || '')


    const notes: Note[] = Array.isArray(notesData) ? notesData : []
    console.log(...notes)

    const handleNoteModalOpen = () => {
        setIsNoteModalOpen(true)
    }

    const handleNoteModalClose = () => {
        setIsNoteModalOpen(false)
    }

    const highlightedDays = notes.map((note) => dayjs(note.date).format('YYYY-MM-DD'))

    if (!currentUser) {
        return <div>Please log in to view your notes.</div>
    }

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
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    value={selectedDate}
                    loading={isLoading}
                    onChange={(newDate) => {
                        form.setFieldValue('date', dayjs(newDate).toISOString())
                        handleNoteModalOpen()
                    }}
                    renderLoading={() => <DayCalendarSkeleton />}
                    slots={{
                        day: ServerDay,
                    }}
                    slotProps={{
                        day: {
                            highlightedDays: [...new Set(highlightedDays)],
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
                        <form.Field
                            name="title"
                            validators={{
                                onChange: pipe(
                                    string('Title is required'),
                                    nonEmpty(
                                        'Please dont leave the title empty',
                                    ),
                                    minLength(
                                        3,
                                        'Title should be at least 3 characters long',
                                    ),
                                ),
                            }}
                            children={(field) => (
                                <>
                                <Input
                                    IsUsername
                                    type="input"
                                    name="title"
                                    label="Title"
                                    shrink={true}
                                    value={field.state.value}
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                />
                                {field.state.meta.errors ? (
                                <ErrorText>
                                    {field.state.meta.errors.join(', ')}
                                </ErrorText>
                            ) : null}
                                </>
                            )}
                        />
                    </div>
                    <div>
                        <div>Description</div>
                        <form.Field
                            name="description"
                            validators={{
                                onChange: pipe(
                                    string('Description is required'),
                                    nonEmpty(
                                        'Please dont leave the description empty',
                                    ),
                                    minLength(
                                        10,
                                        'Description should be at least 10 characters long',
                                    ),
                                ),
                            }}
                            children={(field) => (
                                <>
                                <Input
                                    rows={4}
                                    multiline={true}
                                    IsUsername
                                    type="input"
                                    name="description"
                                    label="Description"
                                    shrink={true}
                                    value={field.state.value}
                                    onChange={(e) =>
                                        field.handleChange(e.target.value)
                                    }
                                />
                                {field.state.meta.errors ? (
                                    <ErrorText>
                                        {field.state.meta.errors.join(', ')}
                                    </ErrorText>
                                ) : null}
                                    </>
                            )}
                        />
                    </div>
                    <div>
                        <div>Will be reminded</div>
                        <form.Field
                            name="willBeReminded"
                            children={(field) => (
                                <Checkbox
                                    checked={field.state.value}
                                    onChange={(e) =>
                                        field.handleChange(e.target.checked)
                                    }
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            )}
                        />
                    </div>
                    <Button
                        btnText="Add Note"
                        type={ButtonTypes.PRIMARY}
                        onClick={form.handleSubmit}
                    />
                </div>
            </ModalComponent>
        </Card1>
    )
}

export default Notes
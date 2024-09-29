import { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import Badge from '@mui/material/Badge'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton'
import { ModalComponent } from '@/Components/Modal/Modal'
import Button from '@/Components/Button/Button'
import { ButtonTypes } from '@/Components/Button/ButtonTypes'
import { useAuth } from '@/ProtectedRoute/Context/AuthContext'
import { useNoteCreation, useGetNotes } from '../Hook'
import { Collapse } from '@mui/material'
import { useForm } from '@tanstack/react-form'
import { valibotValidator } from '@tanstack/valibot-form-adapter'
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import { NoteCreateSchema } from '@/Schemas/Notes/NoteCreate.schema'
import {
    Checkbox,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Textarea,
    Typography,
} from '@mui/joy'
import { NoteBlank } from '@phosphor-icons/react'
import { Note } from './note'

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
            badgeContent={isSelected ? <NoteBlank /> : undefined}
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
    const { mutate } = useNoteCreation()
    const { currentUser } = useAuth()
    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false)
    const [expandCreateNote, setExpandCreateNote] = useState(false)

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
    } = useGetNotes((currentUser?._id as unknown as string) || '')

    const notes: Note[] = Array.isArray(notesData) ? notesData : []
    console.log(...notes)

    const handleCollapseToggle = () => {
        if (expandCreateNote) {
            const date = form.state.values.date
            form.reset()
            form.setFieldValue('date', date)
        }
        setExpandCreateNote((prev) => !prev)
    }

    const handleNoteModalOpen = () => {
        setIsNoteModalOpen(true)
    }

    const handleNoteModalClose = () => {
        if (expandCreateNote) {
            const date = form.state.values.date
            form.reset()
            form.setFieldValue('date', date)
            setExpandCreateNote(false)
        }
        setIsNoteModalOpen(false)
    }

    const highlightedDays = notes.map((note) =>
        dayjs(note.date).format('YYYY-MM-DD'),
    )

    if (!currentUser) {
        return <div>Please log in to view your notes.</div>
    }

    if (error) {
        return <div>Error loading notes: {error.message}</div>
    }

    return (
        <div>
            <div className="flex justify-between">
                <Typography level="h3" color="primary" gutterBottom>
                    Employee Status
                </Typography>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    value={dayjs()}
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
                            highlightedDays,
                        } as any,
                    }}
                />
            </LocalizationProvider>

            <ModalComponent
                open={isNoteModalOpen}
                handleClose={handleNoteModalClose}
            >
                <div className="flex justify-between items-center mb-4">
                    <Typography level="h3" color="primary">
                        Notes
                    </Typography>
                    <Typography level="body-sm" color="neutral">
                        {dayjs(form.state.values.date).format('Do MMMM YY')}
                    </Typography>
                </div>
                {notes.filter(
                    (note) =>
                        dayjs(note.date).format('YYYY-MM-DD') ===
                        dayjs(form.state.values.date).format('YYYY-MM-DD'),
                ).length > 0 ? (
                    notes
                        .filter(
                            (note) =>
                                dayjs(note.date).format('YYYY-MM-DD') ===
                                dayjs(form.state.values.date).format(
                                    'YYYY-MM-DD',
                                ),
                        )
                        .map((note) => (
                            <Note
                                title={note.title}
                                description={note.description}
                                noteId={note._id}
                                key={note._id}
                            />
                        ))
                ) : (
                    <p>No notes created for this date</p>
                )}

                <Collapse in={expandCreateNote} timeout="auto" unmountOnExit>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            marginTop: '20px',
                        }}
                    >
                        <h3>
                            Add a note for{' '}
                            {dayjs(form.state.values.date).format(
                                'dddd, MMMM Do YYYY',
                            )}
                        </h3>

                        <form.Field
                            name="title"
                            validators={{
                                onChange: NoteCreateSchema.entries.title,
                            }}
                            children={(field) => (
                                <>
                                    <FormControl
                                        error={
                                            field.state.meta.errors.length > 0
                                        }
                                    >
                                        <FormLabel>Note Title</FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="Enter your Note Title"
                                            value={field.state.value}
                                            fullWidth
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <FormHelperText>
                                            {field.state.meta.errors}
                                        </FormHelperText>
                                    </FormControl>
                                </>
                            )}
                        />

                        <form.Field
                            name="description"
                            validators={{
                                onChange: NoteCreateSchema.entries.description,
                            }}
                            children={(field) => (
                                <>
                                    <FormControl
                                        error={
                                            field.state.meta.errors.length > 0
                                        }
                                    >
                                        <FormLabel>Note Description</FormLabel>
                                        <Textarea
                                            placeholder="Enter your Note Description"
                                            value={field.state.value}
                                            minRows={3}
                                            onChange={(e) =>
                                                field.handleChange(
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <FormHelperText>
                                            {field.state.meta.errors}
                                        </FormHelperText>
                                    </FormControl>
                                </>
                            )}
                        />
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <form.Field
                                name="willBeReminded"
                                children={(field) => (
                                    <Checkbox
                                        variant="soft"
                                        label="Will be reminded"
                                        checked={field.state.value}
                                        onChange={(e) =>
                                            field.handleChange(e.target.checked)
                                        }
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
                </Collapse>
                <Button
                    type={ButtonTypes.SECONDARY}
                    border="none"
                    onClick={handleCollapseToggle}
                    btnText={
                        expandCreateNote
                            ? 'Collapse Create Note'
                            : 'Create Note'
                    }
                    marginTop="1rem"
                    marginLeft="auto"
                    marginRight="auto"
                    display="flex"
                    alignItems="center"
                    icon={
                        expandCreateNote ? <ArrowDropUp /> : <ArrowDropDown />
                    }
                />
            </ModalComponent>
        </div>
    )
}

export default Notes

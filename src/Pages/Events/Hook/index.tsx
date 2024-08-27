import { useState, useEffect, ChangeEvent } from 'react'
import AxiosInstance from '@/Helpers/Axios'
import { EventsCreationData, EventsData } from '../Interface/Events'
import { useSearchParams } from 'react-router-dom'
import { debounce } from '@/Helpers/debounce.ts'

export const useGetAllEvents = () => {
    const [events, setEvents] = useState<EventsData[]>([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [isLoading, setIsLoading] = useState(false)

    const debouncedSetSearchParams = debounce((value: string) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev)
            if (value) {
                newParams.set('search', value)
            } else {
                newParams.delete('search')
            }
            return newParams
        })
    }, 500)

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        debouncedSetSearchParams(e.target.value)
        fetchEvents()
    }

    const fetchEvents = () => {
        setIsLoading(true)
        const currentSearch = searchParams.get('search') || ''
        AxiosInstance.get<EventsData[]>(`/event?search=${currentSearch}`)
            .then((response) => {
                console.log('Fetched events:', response.data)
                console.log('Event data: ', events)
                setIsLoading(false)
                setEvents(response.data)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        fetchEvents()
    }, [searchParams])

    return {
        events,
        setEvents,
        isLoading,
        onSearchChange,
    }
}


export const useCreateEvent = (
    setEvents: React.Dispatch<React.SetStateAction<EventsData[]>>,
) => {
    const [toastOpen, setToastOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [toastSeverity, setToastSeverity] = useState<'success' | 'error'>(
        'success',
    )
    const [eventPhotos, setEventPhotos] = useState<File[]>([])
    const [event, setEvent] = useState<EventsCreationData>({
        title: '',
        description: '',
        endDate: '',
        startDate: '',
        location: '' , 
        photo: [],
        participants: [],
        type: '',
        poll: {
            question: '',
            options: [],
            isMultipleVote: false,
        },
    })

    const [pollQuestion, setPollQuestion] = useState('')
    const [pollOptions, setPollOptions] = useState<string[]>(['', ''])
    const [isMultipleChoice, setIsMultipleChoice] = useState(false)
    const [includesPoll, setIncludesPoll] = useState(false)
    const [participants, setParticipants] = useState<string[]>([])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        if (name === 'participants') {
            setParticipants(value.split(',').map((_id) => _id.trim()))
        } else if (name === 'includesPoll') {
            setIncludesPoll(e.target.checked)
        } else if (name === 'pollQuestion') {
            setPollQuestion(value)
        }  else if (name === 'location') {
            const location = value
            setEvent((prevEvent) => ({
                ...prevEvent,
                location,
            }))
        } 
        else if (name === 'isMultipleChoice') {
            setIsMultipleChoice(e.target.checked)
        } else {
            setEvent((prevEvent) => ({
                ...prevEvent,
                [name]: value,
            }))
        }
    }

    const handleLocationChange = (address: string) => {
        console.log('Selected address:', address);
      
         {
          setEvent(prevEvent => ({
            ...prevEvent,
            location: address
          }));
        }
      };
      
      
    const handleFileUpload = (photo: File[]) => {
        setEventPhotos(photo)
    }

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...pollOptions]
        newOptions[index] = value
        setPollOptions(newOptions)
    }

    const handleAddOption = () => {
        if (pollOptions.length < 3) {
            setPollOptions([...pollOptions, ''])
        }
    }

    const createEvent = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('title', event.title)
        formData.append('description', event.description)
        formData.append('startDate', event.startDate)
        formData.append('endDate', event.endDate)
        formData.append('location', event.location);
        formData.append('type', event.type)
        participants.forEach((participant, index) => {
            formData.append(`participants[${index}]`, participant)
        })

        if (includesPoll) {
            formData.append(
                'poll',
                JSON.stringify({
                    question: pollQuestion,
                    options: pollOptions
                        .filter((option) => option.trim() !== '')
                        .map((option) => ({ option, votes: 0, voters: [] })),
                    isMultipleVote: isMultipleChoice,
                }),
            )
        }

        eventPhotos.forEach((photo) => {
            formData.append('photo', photo)
        })

        console.log('Form data:', JSON.stringify(formData))
        try {
            const response = await AxiosInstance.post('/event', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            
            setToastMessage('Event created successfully')
            setToastOpen(true)
            setToastSeverity('success')
            setEvents((prevEvents) => [...prevEvents, response.data])
            setEvent({
                title: '',
                description: '',
                startDate: '',
                endDate: '',
                location: '' , 

                type: '',
                photo: [],
                participants: [],
                poll: { question: '', options: [], isMultipleVote: false },
            })
            setPollQuestion('')
            setPollOptions(['', ''])
            setIsMultipleChoice(false)
            setParticipants([])
            setEventPhotos([])
            setEventPhotos([])
        } catch (error) {
            console.error('Error creating event:', error)
            setToastMessage('Error creating event')
            setToastSeverity('error')
            setToastOpen(true)
        }
    }

    const handleToastClose = () => {
        setToastOpen(false)
    }

    return {
        createEvent,
        handleChange,
        event,
        endDate: event.endDate,
        pollQuestion,
        pollOptions,
        isMultipleChoice,
        handleOptionChange,
        handleAddOption,
        includesPoll,
        participants,
        setParticipants,
        type: event.type,
        toastOpen,
        toastMessage,
        handleToastClose,
        toastSeverity,
        handleFileUpload,
        eventPhotos,
        handleLocationChange
    }
}

export const useUpdateEvent = (
    setEvents: React.Dispatch<React.SetStateAction<EventsData[]>>,
) => {
    const [editingEvent, setEditingEvent] = useState<EventsData | null>(null)
    const [showEditDrawer, setEditDrawer] = useState(false)
    const [includePollInEdit, setIncludePollInEdit] = useState(false)
    const [editPollQuestion, setEditPollQuestion] = useState('')
    const [editPollOptions, setEditPollOptions] = useState<string[]>(['', ''])
    const [editIsMultipleChoice, setEditIsMultipleChoice] = useState(false)
    const [updateToastOpen, setUpdateToastOpen] = useState(false)
    const [updateToastMessage, setUpdateToastMessage] = useState('')
    const [updateToastSeverity, setUpdateToastSeverity] = useState<
        'success' | 'error'
    >('success')
    const [editParticipants, setEditParticipants] = useState<string[]>([])
    const [editType, setEditType] = useState<string>('')

    const toggleForm = () => {
        setEditDrawer(!showEditDrawer)
        setEditingEvent(null)
        resetEditPollState()
    }

    const resetEditPollState = () => {
        setIncludePollInEdit(false)
        setEditPollQuestion('')
        setEditPollOptions(['', ''])
        setEditIsMultipleChoice(false)
    }

    const handleEditClick = (eventToEdit: EventsData['_id']) => {
        AxiosInstance.get(`/event/${eventToEdit}`).then((response) => {
            setEditingEvent(response.data)
            setEditParticipants(response.data.participants)
            setEditType(response.data.type)
            setIncludePollInEdit(!!response.data.poll)
            if (response.data.poll) {
                setEditPollQuestion(response.data.poll.question)
                setEditPollOptions(
                    response.data.poll.options.map(
                        (opt: { option: string[] }) => opt.option,
                    ),
                )
                setEditIsMultipleChoice(response.data.poll.isMultipleVote)
            } else {
                resetEditPollState()
            }
            setEditDrawer(true)
        })
    }

    const handleToggleForm = () => {
        toggleForm()
    }

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target

        if (name === 'startDate' || name === 'endDate') {
            setEditingEvent((prevEvent) => ({
                ...prevEvent!,
                [name]: value,
            }))
        } else if (name === 'includesPoll') {
            setIncludePollInEdit(checked)
        } else if (name === 'pollQuestion') {
            setEditPollQuestion(value)
        } else if (name === 'isMultipleChoice') {
            setEditIsMultipleChoice(checked)
        } else if (name === 'participants') {
            setEditParticipants(value.split(',').map((_id) => _id.trim()))
        } else if (name === 'type') {
            setEditType(value)
        } else {
            setEditingEvent((prevEvent) => ({
                ...prevEvent!,
                [name]: type === 'checkbox' ? checked : value,
            }))
        }
    }

    const handleEditOptionChange = (index: number, value: string) => {
        const newOptions = [...editPollOptions]
        newOptions[index] = value
        setEditPollOptions(newOptions)
    }

    const handleAddEditOption = () => {
        if (editPollOptions.length < 3) {
            setEditPollOptions([...editPollOptions, ''])
        }
    }

    const setEventForEditing = (event: EventsData) => {
        setEditingEvent({
            ...event,
            startDate: new Date(event.startDate).toISOString().slice(0, 16),
            endDate: new Date(event.endDate).toISOString().slice(0, 16),
        })
        setEditParticipants(event.participants)
        setEditType(event.type)
    }

    const updateEvent = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!editingEvent) return

        const fieldsToUpdate = {
            title: editingEvent.title,
            description: editingEvent.description,
            startDate: editingEvent.startDate,
            endDate: editingEvent.endDate,
            location: editingEvent.location, 
            participants: editParticipants,
            type: editType,
            poll: includePollInEdit
                ? {
                      question: editPollQuestion,
                      options: editPollOptions
                          .filter((option) => option.trim() !== '')
                          .map((option) => ({ option, votes: 0, voters: [] })),
                      isMultipleVote: editIsMultipleChoice,
                  }
                : null,
        }
        console.log(fieldsToUpdate, 'iuegfyugwegf')
        AxiosInstance.patch(`/event/${editingEvent._id}`, fieldsToUpdate)

            .then((response) => {
                setUpdateToastMessage('Event updated successfully')
                setUpdateToastOpen(true)
                setUpdateToastSeverity('success')
                setEvents((prevEvents) =>
                    prevEvents.map((event) =>
                        event._id === editingEvent._id ? response.data : event,
                    ),
                )
                setEditingEvent(null)
                resetEditPollState()
                setEditDrawer(false)
            })
            .catch((error) => {
                console.error('Error updating event:', error)
                setUpdateToastMessage('Error updating event')
                setUpdateToastOpen(true)
                setUpdateToastSeverity('error')
            })
    }

    const handleUpdateToastClose = () => {
        setUpdateToastOpen(false)
    }

    return {
        editingEvent,
        setEditDrawer,
        includePollInEdit,
        editPollQuestion,
        editPollOptions,
        editIsMultipleChoice,
        setEditingEvent,
        handleEditChange,
        handleEditOptionChange,
        handleAddEditOption,
        updateEvent,
        setEventForEditing,
        toggleForm,
        handleEditClick,
        handleToggleForm,
        handleUpdateToastClose,
        updateToastMessage,
        updateToastOpen,
        updateToastSeverity,
        editParticipants,
        setEditParticipants,
        editType,
        setEditType,
    }
}

export const useDeleteEvent = (
    setEvents: React.Dispatch<React.SetStateAction<EventsData[]>>,
) => {
    const [showModal, setShowModal] = useState(false)
    const [eventToDeleteId, setEventToDeleteId] = useState<string | number>('')
    const handleDeleteEventModal = (eventToDeleteId: string | number) => {
        setEventToDeleteId(eventToDeleteId)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
        setEventToDeleteId('')
    }

    const handleDelete = (id: string | number) => {
        AxiosInstance.delete(`/event/${id}`)
            .then(() => {
                console.log('Event deleted successfully')
                setEvents((prevEvents) =>
                    prevEvents.filter((event) => event._id !== id),
                )
            })
            .catch((error) => {
                console.error('Error deleting event:', error)
            })
    }

    return {
        handleDelete,
        closeModal,
        showModal,
        handleDeleteEventModal,
        eventToDeleteId,
    }
}

import { useState, useEffect, ChangeEvent } from 'react'
import AxiosInstance from '@/Helpers/Axios'
import { EventsCreationData, EventsData, Geolocation } from '../Interface/Events'
import { useSearchParams } from 'react-router-dom'
import { debounce } from 'lodash'

// Hook to fetch all events
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

// Hook to create a new event
export const useCreateEvent = (
    setEvents: React.Dispatch<React.SetStateAction<EventsData[]>>,
) => {
    const [toastOpen, setToastOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [toastSeverity, setToastSeverity] = useState<'success' | 'error'>('success')
    const [eventPhotos, setEventPhotos] = useState<File[]>([])
    const [event, setEvent] = useState<EventsCreationData>({
        title: '',
        description: '',
        endDate: '',
        startDate: '',
        location: { latitude: 0, longitude: 0 }, 
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
        } else if (name === 'isMultipleChoice') {
            setIsMultipleChoice(e.target.checked)
        } else if (name === 'latitude' || name === 'longitude') {
            setEvent((prevEvent) => ({
                ...prevEvent,
                location: {
                    ...prevEvent.location,
                    [name]: parseFloat(value),
                },
            }))
        } else {
            setEvent((prevEvent) => ({
                ...prevEvent,
                [name]: value,
            }))
        }
    }

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
        formData.append('location', JSON.stringify(event.location)) // Updated to Geolocation
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

        console.log('Form data:', formData)
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
                location: { latitude: 0, longitude: 0, }, // Resetting to default Geolocation
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
    }
}

// Hook to update an event
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
    const [updateToastSeverity, setUpdateToastSeverity] = useState<'success' | 'error'>('success')
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
        const { name, value } = e.target

        if (name === 'participants') {
            setEditParticipants(value.split(',').map((_id) => _id.trim()))
        } else if (name === 'includesPoll') {
            setIncludePollInEdit(e.target.checked)
        } else if (name === 'pollQuestion') {
            setEditPollQuestion(value)
        } else if (name === 'isMultipleChoice') {
            setEditIsMultipleChoice(e.target.checked)
        } else if (name === 'latitude' || name === 'longitude') {
            setEditingEvent((prevEvent) =>
                prevEvent
                    ? {
                          ...prevEvent,
                          location: {
                              ...prevEvent.location,
                              [name]: parseFloat(value),
                          },
                      }
                    : null,
            )
        } else {
            setEditingEvent((prevEvent) =>
                prevEvent ? { ...prevEvent, [name]: value } : null,
            )
        }
    }

    const handleEditFileUpload = async (photoFiles: File[]) => {
        if (editingEvent) {
          const photoStrings: string[] = await Promise.all(photoFiles.map(file => {
            return new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.onerror = reject;
              reader.readAsDataURL(file); // Convert to base64 string
            });
          }));
      
          setEditingEvent((prevEvent) =>
            prevEvent ? { ...prevEvent, photo: photoStrings } : null,
          );
        }
      };
      

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

    const updateEvent = async (eventToUpdate: EventsData['_id']) => {
        if (!editingEvent) return

        const formData = new FormData()
        formData.append('title', editingEvent.title)
        formData.append('description', editingEvent.description)
        formData.append('startDate', editingEvent.startDate)
        formData.append('endDate', editingEvent.endDate)
        formData.append('location', JSON.stringify(editingEvent.location)) // Updated to Geolocation
        formData.append('type', editingEvent.type)
        editParticipants.forEach((participant, index) => {
            formData.append(`participants[${index}]`, participant)
        })

        if (includePollInEdit) {
            formData.append(
                'poll',
                JSON.stringify({
                    question: editPollQuestion,
                    options: editPollOptions
                        .filter((option) => option.trim() !== '')
                        .map((option) => ({ option, votes: 0, voters: [] })),
                    isMultipleVote: editIsMultipleChoice,
                }),
            )
        }

        editingEvent.photo.forEach((photo) => {
            formData.append('photo', photo)
        })

        try {
            const response = await AxiosInstance.put(
                `/event/${eventToUpdate}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            )
            setUpdateToastMessage('Event updated successfully')
            setUpdateToastSeverity('success')
            setUpdateToastOpen(true)
            setEvents((prevEvents) =>
                prevEvents.map((event) =>
                    event._id === eventToUpdate ? response.data : event,
                ),
            )
            toggleForm()
        } catch (error) {
            console.error('Error updating event:', error)
            setUpdateToastMessage('Error updating event')
            setUpdateToastSeverity('error')
            setUpdateToastOpen(true)
        }
    }

    const handleUpdateToastClose = () => {
        setUpdateToastOpen(false)
    }

    return {
        handleEditClick,
        handleToggleForm,
        updateEvent,
        handleEditChange,
        handleEditFileUpload,
        handleEditOptionChange,
        handleAddEditOption,
        editingEvent,
        editParticipants,
        editPollQuestion,
        editPollOptions,
        editIsMultipleChoice,
        updateToastOpen,
        updateToastMessage,
        handleUpdateToastClose,
        updateToastSeverity,
        editType,
        includePollInEdit,
        showEditDrawer,
    }
}

// Hook to delete an event
export const useDeleteEvent = (
    setEvents: React.Dispatch<React.SetStateAction<EventsData[]>>,
) => {
    const [toastOpen, setToastOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [toastSeverity, setToastSeverity] = useState<'success' | 'error'>('success')

    const deleteEvent = async (eventToDelete: EventsData['_id']) => {
        try {
            await AxiosInstance.delete(`/event/${eventToDelete}`)
            setToastMessage('Event deleted successfully')
            setToastOpen(true)
            setToastSeverity('success')
            setEvents((prevEvents) =>
                prevEvents.filter((event) => event._id !== eventToDelete),
            )
        } catch (error) {
            console.error('Error deleting event:', error)
            setToastMessage('Error deleting event')
            setToastSeverity('error')
            setToastOpen(true)
        }
    }

    const handleToastClose = () => {
        setToastOpen(false)
    }

    return {
        deleteEvent,
        toastOpen,
        toastMessage,
        handleToastClose,
        toastSeverity,
    }
}

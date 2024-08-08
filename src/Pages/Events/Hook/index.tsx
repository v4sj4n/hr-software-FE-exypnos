import { useState, useEffect } from 'react';
import AxiosInstance from '@/Helpers/Axios';
import { EventsCreationData, EventsData } from '../Interface/Events';

export const useGetAllEvents = () => {
    const [events, setEvents] = useState<EventsData[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchEvents = () => {
        setIsLoading(true);
        AxiosInstance.get<EventsData[]>('/event')
            .then(response => {
                console.log('Fetched events:', response.data);
                setTimeout(() => {
                    setIsLoading(false);
                }, 500)
                setEvents(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return { events, setEvents, fetchEvents, isLoading };
}



export const useCreateEvent = (setEvents: React.Dispatch<React.SetStateAction<EventsData[]>>) => {
    const [creatingTime, setCreatingTime] = useState<string>('');
    const [event, setEvent] = useState<EventsCreationData>({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        poll: {
            question: '',
            options: [],
            isMultipleVote: false
        }
    });

    const [pollQuestion, setPollQuestion] = useState('');
    const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
    const [isMultipleChoice, setIsMultipleChoice] = useState(false);
    const [includesPoll, setIncludesPoll] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'includesPoll') {
            setIncludesPoll(e.target.checked);
        }
        if (name === 'time') {
            setCreatingTime(value);
        } else if (name === 'date') {
            setEvent(prevEvent => ({
                ...prevEvent,
                date: value
            }));
        } else if (name === 'pollQuestion') {
            setPollQuestion(value);
        } else if (name === 'isMultipleChoice') {
            setIsMultipleChoice(e.target.checked);
        } else {
            setEvent(prevEvent => ({
                ...prevEvent,
                [name]: value
            }));
        }
    };

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...pollOptions];
        newOptions[index] = value;
        setPollOptions(newOptions);
    };

    const handleAddOption = () => {
        if (pollOptions.length < 3) {
          setPollOptions([...pollOptions, '']);
        }
      };

    const createEvent = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const combinedDateTime = new Date(`${event.date}T${creatingTime}`);

        const newEvent = {
            title: event.title,
            description: event.description,
            date: combinedDateTime,
            location: event.location,
            poll: includesPoll ? {
                question: pollQuestion,
                options: pollOptions.filter(option => option.trim() !== '').map(option => ({ option, votes: 0, voters: [] })),
                isMultipleVote: isMultipleChoice
            } : null
        };

        AxiosInstance.post('/event', newEvent)
            .then((response) => {
                console.log('Event created successfully');
                setEvents(prevEvents => [...prevEvents, response.data]);
                setEvent({ title: '', description: '', date: '', time: '', location: '', poll: { question: '', options: [], isMultipleVote: false } });
                setPollQuestion('');
                setPollOptions(['', '']);
                setIsMultipleChoice(false);
            })
            .catch(error => {
                console.error('Error creating event:', error);
            });
    }

    return {
        createEvent,
        handleChange,
        event,
        creatingTime,
        pollQuestion,
        pollOptions,
        isMultipleChoice,
        handleOptionChange,
        handleAddOption,
        includesPoll
    };
}

export const useUpdateEvent = (setEvents: React.Dispatch<React.SetStateAction<EventsData[]>>) => {
    const [editingEvent, setEditingEvent] = useState<EventsData | null>(null);
    const [editingTime, setEditingTime] = useState<string>('');
    const [showForm, setShowForm] = useState(false);
    const [includePollInEdit, setIncludePollInEdit] = useState(false);
    const [editPollQuestion, setEditPollQuestion] = useState('');
    const [editPollOptions, setEditPollOptions] = useState<string[]>(['', '']);
    const [editIsMultipleChoice, setEditIsMultipleChoice] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
        setEditingEvent(null);
        resetEditPollState();
    };

    const resetEditPollState = () => {
        setIncludePollInEdit(false);
        setEditPollQuestion('');
        setEditPollOptions(['', '']);
        setEditIsMultipleChoice(false);
    };

    const handleEditClick = (eventToEdit: EventsData) => {
        setEventForEditing(eventToEdit);
        setIncludePollInEdit(!!eventToEdit.poll);
        if (eventToEdit.poll) {
            setEditPollQuestion(eventToEdit.poll.question);
            setEditPollOptions(eventToEdit.poll.options.map(opt => opt.option));
            setEditIsMultipleChoice(eventToEdit.poll.isMultipleVote);
        } else {
            resetEditPollState();
        }
        setShowForm(true);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        
        if (name === 'time') {
            setEditingTime(value);
        } else if (name === 'date') {
            setEditingEvent(prevEvent => ({
                ...prevEvent!,
                date: value
            }));
        } else if (name === 'includesPoll') {
            setIncludePollInEdit(checked);
        } else if (name === 'pollQuestion') {
            setEditPollQuestion(value);
        } else if (name === 'isMultipleChoice') {
            setEditIsMultipleChoice(checked);
        } else {
            setEditingEvent(prevEvent => ({
                ...prevEvent!,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleEditOptionChange = (index: number, value: string) => {
        const newOptions = [...editPollOptions];
        newOptions[index] = value;
        setEditPollOptions(newOptions);
    };

    const handleAddEditOption = () => {
        if (editPollOptions.length < 3) {
            setEditPollOptions([...editPollOptions, '']);
        }
    };

    const setEventForEditing = (event: EventsData) => {
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toISOString().split('T')[0];
        const formattedTime = eventDate.toTimeString().slice(0, 5);
        setEditingEvent({
            ...event,
            date: formattedDate,
        });
        setEditingTime(formattedTime);
    };

    const updateEvent = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!editingEvent) return;

        const combinedDateTime = new Date(`${editingEvent.date}T${editingTime}`);

        const fieldsToUpdate = {
            title: editingEvent.title,
            description: editingEvent.description,
            date: combinedDateTime,
            location: editingEvent.location,
            poll: includePollInEdit ? {
                question: editPollQuestion,
                options: editPollOptions.filter(option => option.trim() !== '').map(option => ({ option, votes: 0, voters: [] })),
                isMultipleVote: editIsMultipleChoice
            } : null
        };

        AxiosInstance.patch(`/event/${editingEvent._id}`, fieldsToUpdate)
            .then((response) => {
                console.log('Event updated successfully');
                setEvents(prevEvents =>
                    prevEvents.map(event =>
                        event._id === editingEvent._id ? response.data : event
                    )
                );
                setEditingEvent(null);
                setEditingTime('');
                resetEditPollState();
                setShowForm(false);
            })
            .catch(error => {
                console.error('Error updating event:', error);
            });
    }

    return {
        editingEvent,
        editingTime,
        showForm,
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
        handleEditClick
    };
}


export const useDeleteEvent = (setEvents: React.Dispatch<React.SetStateAction<EventsData[]>>) => {

    const [showModal, setShowModal] = useState(false);
    const [eventToDeleteId, setEventToDeleteId] = useState<string | number>('');
    const handleDeleteEventModal = (eventToDeleteId: string | number) => {
        setEventToDeleteId(eventToDeleteId);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEventToDeleteId('');
    };

    const handleDelete = (id: string | number) => {
        AxiosInstance.delete(`/event/${id}`)
            .then(() => {
                console.log('Event deleted successfully');
                setEvents(prevEvents => prevEvents.filter(event => event._id !== id));
            })
            .catch(error => {
                console.error('Error deleting event:', error);
            });
    };

    return { handleDelete, closeModal, showModal, handleDeleteEventModal, eventToDeleteId };
};

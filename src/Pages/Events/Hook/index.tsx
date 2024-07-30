import { useState, useEffect } from 'react';
import AxiosInstance from '@/Helpers/Axios';
import { EventsData } from '../Interface/Events';

export const useGetAllEvents = () => {
    const [events, setEvents] = useState<EventsData[]>([]);

    const fetchEvents = () => {
        AxiosInstance.get<EventsData[]>('/event')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return { events, setEvents, fetchEvents };
}

export interface EventsCreationData {
    title: string;
    description: string;
    date: string;
    time: string;
}

export const useCreateEvent = (setEvents: React.Dispatch<React.SetStateAction<EventsData[]>>) => {
    const [event, setEvent] = useState<EventsCreationData>({
        title: '',
        description: '',
        date: '',
        time: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEvent(prevEvent => ({
            ...prevEvent,
            [name]: value
        }));
    };

    const createEvent = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const combinedDateTime = new Date(`${event.date}T${event.time}`);
        const newEvent = {
            ...event,
            date: combinedDateTime.toISOString(),
        };

        AxiosInstance.post('/event', newEvent)
            .then((response) => {
                console.log('Event created successfully');
                setEvents(prevEvents => [...prevEvents, response.data]);
                setEvent({ title: '', description: '', date: '', time: '' });
            })
            .catch(error => {
                console.error('Error creating event:', error);
            });
    }

    return { createEvent, handleChange, event };
}

export const useUpdateEvent = (setEvents: React.Dispatch<React.SetStateAction<EventsData[]>>) => {
    const [editingEvent, setEditingEvent] = useState<EventsData | null>(null);
    const [editingTime, setEditingTime] = useState<string>('');

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'time') {
            setEditingTime(value);
        } else if (name === 'date') {
            setEditingEvent(prevEvent => ({
                ...prevEvent!,
                date: value
            }));
        } else {
            setEditingEvent(prevEvent => ({
                ...prevEvent!,
                [name]: value
            }));
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
            })
            .catch(error => {
                console.error('Error updating event:', error);
            });
    }

    return { editingEvent, editingTime, setEditingEvent, handleEditChange, updateEvent, setEventForEditing };
}
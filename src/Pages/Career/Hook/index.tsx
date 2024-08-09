import { useState, useEffect } from 'react';
import AxiosInstance from '@/Helpers/Axios';
import { CareerCreationData, CareerData } from '../Interface/Career';

export const useGetAllEvents = () => {
    const [events, setEvents] = useState<CareerData[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchEvents = () => {
        setIsLoading(true);
        AxiosInstance.get<CareerData[]>('/event')
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

    return { events, setEvents, fetchEvents, isLoading }
    ;
}



export const useCreateCareer = (setEvents: React.Dispatch<React.SetStateAction<CareerData[]>>) => {
    const [creatingTime, setCreatingTime] = useState<string>('');

    const [career, setCareer] = useState<CareerCreationData>({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
       
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'time') {
            setCreatingTime(value);
        } else if (name === 'date') {
            setCareer(prevCareer => ({
                ...prevCareer,
                date: value
            }));
       
        } else {
            setCareer(prevCareer => ({
                ...prevCareer,
                [name]: value
            }));
        }
    };

   

   

    const createCareer = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const combinedDateTime = new Date(`${career.date}T${creatingTime}`);

        const newCareer = {
            title: career.title,
            description: career.description,
            date: combinedDateTime,
            location: career.location,
            
        };

        AxiosInstance.post('/event', newCareer)
            .then((response) => {
                console.log('Event created successfully');
                setEvents(prevEvents => [...prevEvents, response.data]);
                setCareer({ title: '', description: '', date: '', time: '', location: '' });
              
            })
            .catch(error => {
                console.error('Error creating event:', error);
            });
    }

    return {
        createCareer,
        handleChange,
        career,
        creatingTime,
    
        
    };
}

export const useUpdateCareer = (setCareers: React.Dispatch<React.SetStateAction<CareerData[]>>) => {
    const [editingCareer, setEditingCareer] = useState<CareerData | null>(null);
    const [editingTime, setEditingTime] = useState<string>('');
    const [showForm, setShowForm] = useState(false);

    const toggleForm = () => {
        setShowForm(!showForm);
        setEditingCareer(null);
    };

    const handleEditClick = (careerToEdit: CareerData) => {
        setCareerForEditing(careerToEdit);
        setShowForm(true);
    };


    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'time') {
            setEditingTime(value);
        } else if (name === 'date') {
            setEditingCareer(prevCareer => ({
                ...prevCareer!,
                date: value
            }));
        } else {
            setEditingCareer(prevCareer => ({
                ...prevCareer!,
                [name]: value
            }));
        }
    };

    const setCareerForEditing = (event: CareerData) => {
        const careerDate = new Date(event.date);
        const formattedDate = careerDate.toISOString().split('T')[0];
        const formattedTime = careerDate.toTimeString().slice(0, 5);
        setEditingCareer({
            ...event,
            date: formattedDate,
        });
        setEditingTime(formattedTime);
    };

    const updateEvent = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!editingCareer) return;

        const combinedDateTime = new Date(`${editingCareer.date}T${editingTime}`);

        const fieldsToUpdate = {
            title: editingCareer.title,
            description: editingCareer.description,
            date: combinedDateTime,
        };

        AxiosInstance.patch(`/event/${editingCareer._id}`, fieldsToUpdate)
            .then((response) => {
                console.log('Event updated successfully');
                setCareers(prevCareers =>
                    prevCareers.map(event =>
                        event._id === editingCareer._id ? response.data : event
                    )
                );
                setEditingCareer(null);
                setEditingTime('');
            })
            .catch(error => {
                console.error('Error updating event:', error);
            });
    }

    return { editingCareer, editingTime, setEditingCareer, handleEditChange, updateEvent, setCareerForEditing, showForm, toggleForm, handleEditClick };
}


export const useDeleteCareer = (setCareers: React.Dispatch<React.SetStateAction<CareerData[]>>) => {

    const [showModal, setShowModal] = useState(false);
    const [careerToDeleteId, setCareerToDeleteId] = useState<string | number>('');
    const handleDeleteEventModal = (eventToDeleteId: string | number) => {
        setCareerToDeleteId(eventToDeleteId);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setCareerToDeleteId('');
    };

    const handleDelete = (id: string | number) => {
        AxiosInstance.delete(`/event/${id}`)
            .then(() => {
                console.log('Event deleted successfully');
                setCareers(prevEvents => prevEvents.filter(event => event._id !== id));
            })
            .catch(error => {
                console.error('Error deleting event:', error);
            });
    };

    return { handleDelete, closeModal, showModal, handleDeleteEventModal, careerToDeleteId };
};



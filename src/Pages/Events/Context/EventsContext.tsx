import React, { createContext, useContext, useEffect, useState } from 'react'
import { EventsData, EventsContextProps } from '../Interface/Events'
import { useCreateEvent, useUpdateEvent, useDeleteEvent } from '../Hook/index'
import { useAuth } from '@/Context/AuthProvider'
import { useGetAllUsers } from '@/Pages/Employees/Hook'
import { useSearchParams } from 'react-router-dom'
import AxiosInstance from '@/Helpers/Axios'

const EventsContext = createContext<EventsContextProps | undefined>(undefined)

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [showEventModal, setShowEventModal] = useState<boolean>(false)
    const [selectedEvent, setSelectedEvent] = useState<EventsData| null>(null)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [drawerAction, setDrawerAction] = useState<'create' | 'edit'>('create')

    const { currentUser } = useAuth()
    const isAdmin = currentUser?.role === 'admin'
    const typesofEvent = ['sports', 'teambuilding', 'training', 'other']
    const { data: users = [] } = useGetAllUsers()
    console.log('gertiiiiiiiiiiiiiiiiiiiiii', users)
    const allEmails = users.map((user) => user.auth.email)

    const handleSeeEventDetails = async (event: EventsData) => {
        try{
            const res = await AxiosInstance.get(`/event/${event._id}`)
            console.log('res', res)
            setSelectedEvent(res.data)
            console.log('handleSeeEventDetails', event)
            setShowEventModal(true)
        }
        catch(err){
            console.log(err)
        }
      
    }

    const [searchParams] = useSearchParams();
    const eventId = searchParams.get('event');

   useEffect(() => {
    if (eventId) {
        handleSeeEventDetails({ _id: eventId } as unknown as EventsData);
        console.log('eventId', eventId)
    }
    }, [eventId]);

    const handleOpenDrawer = (
        action: 'create' | 'edit',
        event?: EventsData,
    ) => {
        setDrawerAction(action)
        if (action === 'edit' && event) {
            handleEditClick(event._id)
        }
        setDrawerOpen(true)
    }

    const handleCloseDrawer = () => {
        setDrawerOpen(false)
        if (drawerAction === 'edit') {
            handleToggleForm()
        }
    }

    const {
        handleChange,
        event,
        createEvent,
        pollQuestion,
        pollOptions,
        participants,
        handleOptionChange,
        handleAddOption,
        includesPoll,
        setParticipants,
        toastOpen,
        toastMessage,
        handleToastClose,
        toastSeverity,
        handleFileUpload,
        eventPhotos,
        handleLocationChange,

        createdEvents,
    } = useCreateEvent(handleCloseDrawer)

    const {
        editingEvent,
        includePollInEdit,
        editPollQuestion,
        editPollOptions,
        handleEditChange,
        handleEditOptionChange,
        handleAddEditOption,
        updateEvent,
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
    } = useUpdateEvent(handleCloseDrawer)

    const {
        handleDelete,
        closeModal,
        showModal,
        handleDeleteEventModal,
        eventToDeleteId,
    } = useDeleteEvent()


    return (
        <EventsContext.Provider
            value={{
                handleLocationChange,
                createEvent,
                updateEvent,
                handleDelete,
                handleEditChange,
                handleOptionChange,
                handleAddOption,
                handleAddEditOption,
                setParticipants,
                participants,
                event,
                editingEvent,
                includesPoll,
                includePollInEdit,
                handleChange,
                handleEditClick,
                handleEditOptionChange,
                toggleForm,
                handleToggleForm,
                handleToastClose,
                handleUpdateToastClose,
                showModal,
                closeModal,
                handleDeleteEventModal,
                showEventModal,
                setShowEventModal,
                selectedEvent,
                setSelectedEvent,
                updateToastMessage,
                updateToastOpen,
                updateToastSeverity,
                editPollQuestion,
                editPollOptions,
                type: event.type,
                pollQuestion,
                pollOptions,
                toastOpen,
                toastMessage,
                toastSeverity,
                endDate: event.endDate,
                isAdmin,
                allEmails,
                typesofEvent,
                eventToDeleteId,
                handleSeeEventDetails,
                drawerOpen,
                handleOpenDrawer,
                handleCloseDrawer,
                editParticipants,
                setEditParticipants,
                editType,
                setEditType,
                handleFileUpload,
                eventPhotos,
                createdEvents,
            }}
        >
            {children}
        </EventsContext.Provider>
    )
}

export const useEvents = () => {
    const context = useContext(EventsContext)
    if (context === undefined) {
        throw new Error('useEvents must be used within an EventsProvider')
    }
    return context
}

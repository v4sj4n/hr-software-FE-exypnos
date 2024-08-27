import React, { createContext, useContext, useState } from 'react'
import { EventsData, EventsContextProps } from '../Interface/Events'
import {
    useGetAllEvents,
    useCreateEvent,
    useUpdateEvent,
    useDeleteEvent,
} from '../Hook/index'
import { useAuth } from '@/Context/AuthProvider'
import { useGetAllUsers } from '@/Pages/Employees/Hook'

const EventsContext = createContext<EventsContextProps | undefined>(undefined)

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { events, setEvents, isLoading, onSearchChange } = useGetAllEvents()
    const {
        handleChange,
        event,
        createEvent,
        pollQuestion,
        pollOptions,
        participants,
        isMultipleChoice,
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
    } = useCreateEvent(setEvents)

    const {
        editingEvent,
        includePollInEdit,
        editPollQuestion,
        editPollOptions,
        editIsMultipleChoice,
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
        
    } = useUpdateEvent(setEvents)

    const {
        handleDelete,
        closeModal,
        showModal,
        handleDeleteEventModal,
        eventToDeleteId,
    } = useDeleteEvent(setEvents)
    const [showEventModal, setShowEventModal] = useState<boolean>(false)
    const [selectedEvent, setSelectedEvent] = useState<EventsData | null>(null)
    const { currentUser } = useAuth()
    const isAdmin = currentUser?.role === 'admin'
    const typesofEvent = [
        'sports',
        'carier',
        'teambuilding',
        'training',
        'other',
    ]
    const { data: users = [] } = useGetAllUsers()
    const allEmails = users.map((user) => user.auth.email)

    const handleSeeVoters = (event: EventsData) => {
        setSelectedEvent(event)
        setShowEventModal(true)
    }

    const [drawerOpen, setDrawerOpen] = useState(false)
    const [drawerAction, setDrawerAction] = useState<'create' | 'edit'>(
        'create',
    )

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

    return (
        <EventsContext.Provider
            value={{
                handleLocationChange,
                events,
                isLoading,
                onSearchChange,
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
                editIsMultipleChoice,
                type: event.type,
                pollQuestion,
                pollOptions,
                isMultipleChoice,
                toastOpen,
                toastMessage,
                toastSeverity,
                endDate: event.endDate,
                isAdmin,
                allEmails,
                typesofEvent,
                eventToDeleteId,
                handleSeeVoters,
                drawerOpen,
                handleOpenDrawer,
                handleCloseDrawer,
                editParticipants,
                setEditParticipants,
                editType,
                setEditType,
                handleFileUpload,
                eventPhotos,
                
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

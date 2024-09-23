import React, { useCallback, useEffect, useState } from 'react'
import { EventsData } from '../Interface/Events'
import { useCreateEvent, useUpdateEvent, useDeleteEvent } from '../Hook/index'
import { useGetAllUsers } from '@/Pages/Employees/Hook'
import { useSearchParams } from 'react-router-dom'
import AxiosInstance from '@/Helpers/Axios'
import { useAuth } from '@/ProtectedRoute/Context/AuthContext'
import { EventsContext } from '../Interface/Events'

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [showEventModal, setShowEventModal] = useState<boolean>(false)
    const [selectedEvent, setSelectedEvent] = useState<EventsData | null>(null)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [drawerAction, setDrawerAction] = useState<'create' | 'edit'>(
        'create',
    )
    const { data: users = [] } = useGetAllUsers()
    const { currentUser } = useAuth()
    const isAdmin = currentUser?.role === 'hr'
    const typesofEvent = ['sports', 'teambuilding', 'training', 'other']
    const allEmails = users.map((user) => user.auth?.email)

    const formatDate = (date: string): string => {
        return date.split('T')[0].replace(/-/g, '/')
    }

    const handleSeeEventDetails = useCallback(async (event: EventsData) => {
        try {
            const res = await AxiosInstance.get(`/event/${event._id}`)
            setSelectedEvent(res.data)
            setShowEventModal(true)
        } catch (err) {
            console.log(err)
        }
    }, [])

    const [searchParams] = useSearchParams()

    const eventId = searchParams.get('event')

    useEffect(() => {
        if (eventId) {
            handleSeeEventDetails({ _id: eventId } as unknown as EventsData)
        }
    }, [eventId, handleSeeEventDetails])

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
        createEvent: createEventMutation,
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
        updateEvent: updateEventMutation,
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

    const severityB = toastOpen ? toastSeverity : updateToastSeverity
    const openToastB = toastOpen || updateToastOpen
    const toastMessageB = toastOpen ? toastMessage : updateToastMessage
    const closeToastB = toastOpen ? handleToastClose : handleUpdateToastClose

    const handleMapChange = (address: string) => {
        if (editingEvent) {
            handleEditChange({
                target: {
                    name: 'location',
                    value: address,
                },
            } as React.ChangeEvent<HTMLInputElement>)
        } else {
            handleChange({
                target: {
                    name: 'location',
                    value: address,
                },
            } as React.ChangeEvent<HTMLInputElement>)
        }
    }

    const createEvent = () => {
        createEventMutation()
    }

    const updateEvent = () => {
        updateEventMutation()
    }

    return (
        <EventsContext.Provider
            value={{
                handleMapChange,
                handleLocationChange,
                severityB,
                openToastB,
                toastMessageB,
                closeToastB,
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
                showModal,
                closeModal,
                handleDeleteEventModal,
                showEventModal,
                setShowEventModal,
                selectedEvent,
                setSelectedEvent,
                editPollQuestion,
                editPollOptions,
                type: event.type,
                pollQuestion,
                pollOptions,
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
                formatDate,
            }}
        >
            {children}
        </EventsContext.Provider>
    )
}

import React from 'react'

export interface EventsData {
    _id: number | number
    title: string
    description: string
    startDate: string
    endDate: string
    email: string[]
    time: string
    creatingTime: string
    file: string
    location: string
    type: string
    photo: string[]
    participants: string[]
    totalPages: number
    poll: {
        question: string
        options: {
            option: string
            votes: number
            voters: { _id: string; firstName: string; lastName: string }[]
        }[]
        isMultipleVote: boolean
    }
    onClose: () => void
}

export interface EventsCreationData {
    title: string
    description: string
    startDate: string
    endDate: string
    location: string
    participants: string[]
    photo: File[]
    type: string
    poll: {
        question: string
        options: {
            option: string
            votes: number
            voters: { _id: string; firstName: string; lastName: string }[]
        }[]
    }
}

export interface EventsContextProps {
    createEvent: () => void
    updateEvent: () => void
    handleDelete: (id: string | number) => void
    handleEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleOptionChange: (index: number, value: string) => void
    handleAddOption: () => void
    handleAddEditOption: () => void
    setParticipants: React.Dispatch<React.SetStateAction<string[]>>
    participants: string[]
    event: EventsCreationData
    editingEvent: EventsData | null
    includesPoll: boolean
    includePollInEdit: boolean
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleEditClick: (event: EventsData['_id']) => void
    handleEditOptionChange: (index: number, value: string) => void
    toggleForm: () => void
    handleToggleForm: () => void
    showModal: boolean
    closeModal: () => void
    handleDeleteEventModal: (eventToDeleteId: string | number) => void
    showEventModal: boolean
    setShowEventModal: React.Dispatch<React.SetStateAction<boolean>>
    selectedEvent: EventsData | null
    setSelectedEvent: React.Dispatch<React.SetStateAction<EventsData | null>>
    editPollQuestion: string
    setEditParticipants: React.Dispatch<React.SetStateAction<string[]>>
    editPollOptions: string[]
    type: string
    pollQuestion: string
    pollOptions: string[]
    endDate: string
    isAdmin: boolean
    typesofEvent: string[]
    allEmails: string[]
    eventToDeleteId: string | number
    handleSeeEventDetails: (event: EventsData) => void
    drawerOpen: boolean
    handleOpenDrawer: (action: 'create' | 'edit', event?: EventsData) => void
    editParticipants: string[]
    handleCloseDrawer: () => void
    setEditType: React.Dispatch<React.SetStateAction<string>>
    editType: string
    handleFileUpload: (files: File[]) => void
    eventPhotos: File[]
    handleLocationChange: (address: string) => void
    handleMapChange: (address: string) => void
    hideToast?: () => void
    createdEvents: EventsData[]
    formatDate: (date: string) => string
    severityB: 'success' | 'error' 
    openToastB: boolean
    toastMessageB: string
    closeToastB: () => void
}


export const EventsContext = React.createContext<EventsContextProps | undefined>(undefined)
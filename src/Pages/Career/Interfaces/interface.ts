export interface EventsData {
    _id: number
    title: string
    description: string
    location: string
    type: string
}

export interface EventsCreationData {
    title: string
    description: string
    location: string
    type: string
}

export enum EventType {
    SPORTS = 'sports',
    CAREER = 'career',
    TRAINING = 'training',
    TEAMBUILDING = 'teambuilding',
    OTHER = 'other',
}



export interface EventsContextProps {
    createEvent: () => void
    updateEvent:  () => void

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
    handleToastClose: () => void
    handleUpdateToastClose: () => void
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
    handleDelete: () => void,
}

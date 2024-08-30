export interface EventsData {
    _id: number
    title: string
    description: string
    startDate: string
    endDate: string
    email: string[]
    time: string
    creatingTime: string
    data: EventsData[]
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
        isMultipleVote: boolean
    }
}

export interface EventsContextProps {
    events: EventsData[]
    isLoading: boolean
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    createEvent: (e: React.FormEvent<HTMLButtonElement>) => void
    updateEvent: (e: React.FormEvent<HTMLButtonElement>) => void
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
    handleToastClose: () => void
    handleUpdateToastClose: () => void
    showModal: boolean
    closeModal: () => void
    handleDeleteEventModal: (eventToDeleteId: string | number) => void
    showEventModal: boolean
    setShowEventModal: React.Dispatch<React.SetStateAction<boolean>>
    selectedEvent: EventsData | null
    setSelectedEvent: React.Dispatch<React.SetStateAction<EventsData | null>>
    updateToastMessage: string
    updateToastOpen: boolean
    updateToastSeverity: 'success' | 'error'
    editPollQuestion: string
    setEditParticipants: React.Dispatch<React.SetStateAction<string[]>>
    editPollOptions: string[]
    editIsMultipleChoice: boolean
    type: string
    pollQuestion: string
    pollOptions: string[]
    isMultipleChoice: boolean
    toastOpen: boolean
    toastMessage: string
    toastSeverity: 'success' | 'error'
    endDate: string
    isAdmin: boolean
    typesofEvent: string[]
    allEmails: string[]
    eventToDeleteId: string | number
    handleSeeVoters: (event: EventsData) => void
    drawerOpen: boolean
    handleOpenDrawer: (action: 'create' | 'edit', event?: EventsData) => void
    editParticipants: string[]
    handleCloseDrawer: () => void
    setEditType: React.Dispatch<React.SetStateAction<string>>
    editType: string
    handleFileUpload: (files: File[]) => void
    eventPhotos: File[]
    handleLocationChange: (address: string) => void;
    hideToast?: () => void
    showToast: boolean
    toast: string
    createdEvents: EventsData[]
    
}

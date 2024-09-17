import { createContext, useContext } from 'react'
import { EventsData } from './../Interfaces/interface'

interface CareerContextType {
    events: EventsData[]
    setEvents: React.Dispatch<React.SetStateAction<EventsData[]>>
    isLoading: boolean
    createEvent: () => void
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    event: EventsData
    createEventError: string | null
    editingEvent: EventsData | null
    handleEditChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    updateEvent: () => void
    setEditingEvent: React.Dispatch<React.SetStateAction<EventsData | null>>
    handleDelete: (id: string) => void
    closeModal: () => void
    showModal: boolean
    handleDeleteEventModal: (id: string) => void
    eventToDeleteId: string 
}

export const CareerContext = createContext<CareerContextType | undefined>(undefined)

export const useCareer = () => {
    const context = useContext(CareerContext)
    if (!context) {
        throw new Error('useCareer must be used within a CareerProvider')
    }
    return context
}
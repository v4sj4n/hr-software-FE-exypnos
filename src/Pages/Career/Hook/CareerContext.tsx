// import { createContext, useContext, useState } from 'react'
// import { useGetAllEvents, useCreateEvent, useUpdateEvent, useDeleteEvent } from './../Hook'
// import { useAuth } from '@/Context/AuthProvider'
// import { EventsData } from './../Interfaces/interface'

// interface CareerContextProps {
//     events: EventsData[]
//     isLoading: boolean
//     createEvent: (e: React.FormEvent) => void
//     updateEvent: (e: React.FormEvent) => void
//     handleDelete: (id: string) => void
//     setFilter: React.Dispatch<React.SetStateAction<string>>
//     filter: string
//     handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void
//     isAdmin: boolean
//     toggleForm: () => void
//     showForm: boolean
//     setEditingEvent: React.Dispatch<React.SetStateAction<EventsData | null>>
//     editingEvent: EventsData | null
//     setEvents: React.Dispatch<React.SetStateAction<EventsData[]>>
//     openDropdown: string | number | null
//     toggleDropdown: (id: string) => void
//     handleDeleteEventModal: (id: string) => void
//     eventToDeleteId: string
//     closeModal: () => void
//     showModal: boolean
// }

// const CareerContext = createContext<CareerContextProps | undefined>(undefined)

// export const useCareerContext = () => {
//     const context = useContext(CareerContext)
//     if (!context) {
//         throw new Error('useCareerContext must be used within a CareerProvider')
//     }
//     return context
// }

// export const CareerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     const { events, setEvents, isLoading } = useGetAllEvents()
//     const { createEvent, handleChange, event, createEventError } = useCreateEvent(setEvents)
//     const { editingEvent, handleEditChange, updateEvent, setEditingEvent } = useUpdateEvent(setEvents)
//     const { handleDelete, closeModal, showModal, handleDeleteEventModal, eventToDeleteId } = useDeleteEvent(setEvents)
//     const { currentUser } = useAuth()

//     const [showForm, setShowForm] = useState(false)
//     const [filter, setFilter] = useState<string>('')
//     const [openDropdown, setOpenDropdown] = useState<string | number | null>(null)

//     const toggleForm = () => setShowForm(!showForm)
//     const isAdmin = currentUser?.role === 'hr'

//     const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFilter(e.target.value)
//     }

//     const toggleDropdown = (eventId: string) => {
//         setOpenDropdown((prev) => (prev === eventId ? null : eventId))
//     }

//     return (
//         <CareerContext.Provider
//             value={{
//                 events,
//                 isLoading,
//                 createEvent,
//                 updateEvent,
//                 handleDelete,
//                 setFilter,
//                 filter,
//                 handleFilterChange,
//                 isAdmin,
//                 toggleForm,
//                 showForm,
//                 setEditingEvent,
//                 editingEvent,
//                 setEvents,
//                 openDropdown,
//                 toggleDropdown,
//                 handleDeleteEventModal,
//                 eventToDeleteId,
//                 closeModal,
//                 showModal,
//             }}
//         >
//             {children}
//         </CareerContext.Provider>
//     )
// }

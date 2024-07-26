import {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  FC,
} from 'react'
import { Vacation } from './TVacation'

interface VacationContextType {
  vacations: Vacation[]
  setVacations: Dispatch<SetStateAction<Vacation[]>>
  modalOpen: boolean
  handleCloseModal: () => void
  handleOpenModal: () => void
}

const defaultContextValue: VacationContextType = {
  vacations: [],
  setVacations: () => {},
  modalOpen: false,
  handleCloseModal: () => {},
  handleOpenModal: () => {},
}

export const VacationContext =
  createContext<VacationContextType>(defaultContextValue)

const VacationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [vacations, setVacations] = useState<Vacation[]>([])
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const handleCloseModal = () => setModalOpen(false)
  const handleOpenModal = () => setModalOpen(true)

  return (
    <VacationContext.Provider
      value={{
        vacations,
        setVacations,
        modalOpen,
        handleCloseModal,
        handleOpenModal,
      }}
    >
      {children}
    </VacationContext.Provider>
  )
}

export default VacationProvider

import {
    createContext,
    ReactNode,
    Dispatch,
    SetStateAction,
    FC,
    useState,
} from 'react'
import { useSearchParams } from 'react-router-dom'

interface VacationContextType {
    searchParams: URLSearchParams
    setSearchParams: Dispatch<SetStateAction<URLSearchParams>>
    viewVacationModalOpen: boolean
    handleOpenViewVacationModalOpen: () => void
    handleCloseVacationModalOpen: () => void
}

const defaultContextValue: VacationContextType = {
    searchParams: new URLSearchParams(),
    setSearchParams: () => {},
    viewVacationModalOpen: false,
    handleOpenViewVacationModalOpen: () => {},
    handleCloseVacationModalOpen: () => {},
}

export const VacationContext =
    createContext<VacationContextType>(defaultContextValue)

const VacationProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [searchParams, setSearchParams] = useSearchParams()

    const [viewVacationModalOpen, setViewVacationModalOpen] =
        useState<boolean>(false)
    const handleOpenViewVacationModalOpen = () => setViewVacationModalOpen(true)
    const handleCloseVacationModalOpen = () => {
        setViewVacationModalOpen(false)
        setSearchParams((prevParams) => {
            const newParams = new URLSearchParams(prevParams)
            newParams.delete('selectedVacation')
            return newParams
        })
    }

    return (
        <VacationContext.Provider
            value={{
                searchParams,
                setSearchParams,
                viewVacationModalOpen,
                handleOpenViewVacationModalOpen,
                handleCloseVacationModalOpen,
            }}
        >
            {children}
        </VacationContext.Provider>
    )
}

export default VacationProvider

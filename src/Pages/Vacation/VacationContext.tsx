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
    toastConfigs: {
        message: string | null
        severity: 'success' | 'error'
        isOpen: boolean
    }
    setToastConfigs: Dispatch<
        SetStateAction<{
            message: string | null
            severity: 'success' | 'error'
            isOpen: boolean
        }>
    >
    handleToastClose: () => void
}

const defaultContextValue: VacationContextType = {
    searchParams: new URLSearchParams(),
    setSearchParams: () => {},
    viewVacationModalOpen: false,
    handleOpenViewVacationModalOpen: () => {},
    handleCloseVacationModalOpen: () => {},
    toastConfigs: {
        message: null,
        severity: 'success',
        isOpen: false,
    },
    setToastConfigs: () => {},
    handleToastClose: () => {},
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
    const [toastConfigs, setToastConfigs] = useState<{
        message: string | null
        severity: 'success' | 'error'
        isOpen: boolean
    }>({
        message: null,
        severity: 'success',
        isOpen: false,
    })

    const handleToastClose = () => {
        setToastConfigs({
            isOpen: false,
            message: null,
            severity: 'success',
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
                toastConfigs,
                setToastConfigs,
                handleToastClose,
            }}
        >
            {children}
        </VacationContext.Provider>
    )
}

export default VacationProvider

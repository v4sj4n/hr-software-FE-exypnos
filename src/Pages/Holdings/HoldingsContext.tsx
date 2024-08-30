import {
    createContext,
    ReactNode,
    Dispatch,
    SetStateAction,
    FC,
    useState,
} from 'react'
import { useSearchParams } from 'react-router-dom'

interface HoldingsContextType {
    searchParams: URLSearchParams
    setSearchParams: Dispatch<SetStateAction<URLSearchParams>>
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
    itemReturnConfigs: {
        state: string
        date: string
    }
    setItemReturnConfigs: Dispatch<
        SetStateAction<{
            state: string
            date: string
        }>
    >
    handleCloseOnModal: () => void
}

const defaultContextValue: HoldingsContextType = {
    searchParams: new URLSearchParams(),
    setSearchParams: () => {},
    toastConfigs: {
        message: null,
        severity: 'success',
        isOpen: false,
    },
    setToastConfigs: () => {},
    handleToastClose: () => {},
    itemReturnConfigs: {
        state: '',
        date: new Date().toISOString(),
    },
    setItemReturnConfigs: () => {},
    handleCloseOnModal: () => {},
}

export const HoldingsContext =
    createContext<HoldingsContextType>(defaultContextValue)

const HoldingsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [searchParams, setSearchParams] = useSearchParams()

    const [toastConfigs, setToastConfigs] = useState<{
        message: string | null
        severity: 'success' | 'error'
        isOpen: boolean
    }>({
        message: null,
        severity: 'success',
        isOpen: false,
    })

    const [itemReturnConfigs, setItemReturnConfigs] = useState<{
        state: string
        date: string
    }>({
        state: '',
        date: new Date().toISOString(),
    })

    const handleToastClose = () => {
        setToastConfigs({
            isOpen: false,
            message: null,
            severity: 'success',
        })
    }
    const handleCloseOnModal = () => {
        setItemReturnConfigs({
            state: '',
            date: new Date().toISOString(),
        })
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev)
            newParams.delete('ownedItem')
            newParams.delete('assignItem')
            return newParams
        })
    }

    return (
        <HoldingsContext.Provider
            value={{
                searchParams,
                setSearchParams,
                toastConfigs,
                setToastConfigs,
                handleToastClose,
                itemReturnConfigs,
                setItemReturnConfigs,
                handleCloseOnModal,
            }}
        >
            {children}
        </HoldingsContext.Provider>
    )
}

export default HoldingsProvider

import {
    createContext,
    ReactNode,
    Dispatch,
    SetStateAction,
    FC,
    useState,
} from 'react'
import { useSearchParams } from 'react-router-dom'

interface LoginContextType {
    error: string | null
    setError: Dispatch<SetStateAction<string | null>>
    showPassword: boolean
    setShowPassword: Dispatch<SetStateAction<boolean>>
    checkingIsAuthenticated: boolean
    setCheckingIsAuthenticated: Dispatch<SetStateAction<boolean>>
    comeFromPasswordReset: boolean
    setComeFromPasswordReset: Dispatch<SetStateAction<boolean>>
    searchParams: URLSearchParams
    setSearchParams: Dispatch<SetStateAction<URLSearchParams>>
}

const defaultContextValue: LoginContextType = {
    error: null,
    setError: () => {},
    showPassword: false,
    setShowPassword: () => {},
    checkingIsAuthenticated: true,
    setCheckingIsAuthenticated: () => {},
    comeFromPasswordReset: false,
    setComeFromPasswordReset: () => {},
    searchParams: new URLSearchParams(),
    setSearchParams: () => {},
}

export const LoginContext = createContext<LoginContextType>(defaultContextValue)

export const LoginProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [error, setError] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [checkingIsAuthenticated, setCheckingIsAuthenticated] = useState(true)
    const [comeFromPasswordReset, setComeFromPasswordReset] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()

    return (
        <LoginContext.Provider
            value={{
                error,
                setError,
                showPassword,
                setShowPassword,
                checkingIsAuthenticated,
                setCheckingIsAuthenticated,
                comeFromPasswordReset,
                setComeFromPasswordReset,
                searchParams,
                setSearchParams,
            }}
        >
            {children}
        </LoginContext.Provider>
    )
}

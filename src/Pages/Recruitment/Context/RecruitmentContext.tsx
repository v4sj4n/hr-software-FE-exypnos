import {
    createContext,
    ReactNode,
    Dispatch,
    SetStateAction,
    FC,
    useState,
    RefObject,
    useRef,
} from 'react'

interface RecruitmentContextType {
    error: string | null
    setError: Dispatch<SetStateAction<string | null>>
    showModal: boolean
    setShowModal: Dispatch<SetStateAction<boolean>>
    fileInputRef: RefObject<HTMLInputElement>
}

const defaultContextValue: RecruitmentContextType = {
    error: null,
    setError: () => {},
    showModal: false,
    setShowModal: () => {},
    fileInputRef: { current: null },
}

export const RecruitmentContext =
    createContext<RecruitmentContextType>(defaultContextValue)

export const RecruitmentProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [error, setError] = useState<string | null>(null)
    const [showModal, setShowModal] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    return (
        <RecruitmentContext.Provider
            value={{
                error,
                setError,
                showModal,
                setShowModal,
                fileInputRef,
            }}
        >
            {children}
        </RecruitmentContext.Provider>
    )
}

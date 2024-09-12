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
    fileName: string | null
    setFileName: Dispatch<SetStateAction<string | null>>
}

const defaultContextValue: RecruitmentContextType = {
    error: null,
    setError: () => {},
    showModal: false,
    setShowModal: () => {},
    fileInputRef: { current: null },
    fileName: null,
    setFileName: () => {},
}

export const RecruitmentContext =
    createContext<RecruitmentContextType>(defaultContextValue)

export const RecruitmentProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [error, setError] = useState<string | null>(null)
    const [showModal, setShowModal] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [fileName, setFileName] = useState<string | null>(null)

    return (
        <RecruitmentContext.Provider
            value={{
                error,
                setError,
                showModal,
                setShowModal,
                fileInputRef,
                fileName,
                setFileName,
            }}
        >
            {children}
        </RecruitmentContext.Provider>
    )
}

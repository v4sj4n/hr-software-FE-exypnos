import {
    createContext,
    ReactNode,
    Dispatch,
    SetStateAction,
    FC,
    useState,
} from 'react'

interface ResetPasswordContextType {
    newPasswordShow: boolean
    setNewPasswordShow: Dispatch<SetStateAction<boolean>>
    confirmNewPasswordShow: boolean
    setConfirmNewPasswordShow: Dispatch<SetStateAction<boolean>>
}

const defaultContextValue: ResetPasswordContextType = {
    newPasswordShow: false,
    setNewPasswordShow: () => {},
    confirmNewPasswordShow: false,
    setConfirmNewPasswordShow: () => {},
}

export const ResetPasswordContext =
    createContext<ResetPasswordContextType>(defaultContextValue)

export const ResetPasswordProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [newPasswordShow, setNewPasswordShow] = useState(false)
    const [confirmNewPasswordShow, setConfirmNewPasswordShow] = useState(false)

    return (
        <ResetPasswordContext.Provider
            value={{
                confirmNewPasswordShow,
                setConfirmNewPasswordShow,
                newPasswordShow,
                setNewPasswordShow,
            }}
        >
            {children}
        </ResetPasswordContext.Provider>
    )
}

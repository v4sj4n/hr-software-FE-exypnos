import { createContext } from 'react'

export interface PasswordContextType {
    currentPassword: string
    newPassword: string
    confirmPassword: string
    error: string
    toastOpen: boolean
    toastSeverity: 'success' | 'error'
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleUpdatePassword: (
        event: React.FormEvent<HTMLButtonElement>,
    ) => Promise<void>
    toastMessage: string
    handleToastClose: () => void
    handleShowEye: () => void
    showPassword: boolean
}

export const PasswordContext = createContext<PasswordContextType | undefined>(
    undefined,
)

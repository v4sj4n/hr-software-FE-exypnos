import React, { useState } from 'react'
import { PasswordContext, PasswordContextType } from '../Interface/Interface'
import AxiosInstance from '../../../../../Helpers/Axios'

export const PasswordProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [toastOpen, setToastOpen] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [toastSeverity, setToastSeverity] = useState<'success' | 'error'>(
        'success',
    )
    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        switch (name) {
            case 'currentPassword':
                setCurrentPassword(value)
                break
            case 'newPassword':
                setNewPassword(value)
                break
            case 'confirmPassword':
                setConfirmPassword(value)
                break
            default:
                break
        }
    }

    const validatePasswords = () => {
        if (newPassword !== confirmPassword) {
            setError('New password and confirm password do not match')
            return false
        }
        if (newPassword.length < 5) {
            setError('New password must be at least 8 characters long')
            return false
        }
        setError('')
        return true
    }

    const handleUpdatePassword = async (
        event: React.FormEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault()

        if (!validatePasswords()) {
            return
        }

        try {
            const response = await AxiosInstance.post('/auth/updatepassword', {
                oldPassword: currentPassword,
                newPassword,
            })

            if (response.status === 201) {
                setToastOpen(true)
                setToastMessage('Paswword chnaged successfully')
                setToastSeverity('success')
                setCurrentPassword('')
                setNewPassword('')
                setConfirmPassword('')
            }
        } catch (error: unknown) {
            setToastMessage('Error updating password')
            setToastSeverity('error')
            setToastOpen(true)
        }
    }

    const handleToastClose = () => {
        setToastOpen(false)
    }

    const handleShowEye = () => {
        setShowPassword(!showPassword)
    }

    const contextValue: PasswordContextType = {
        currentPassword,
        newPassword,
        confirmPassword,
        error,
        toastMessage,
        toastOpen,
        toastSeverity,
        handleChange,
        handleUpdatePassword,
        handleToastClose,
        handleShowEye,
        showPassword,
    }

    return (
        <PasswordContext.Provider value={contextValue}>
            {children}
        </PasswordContext.Provider>
    )
}

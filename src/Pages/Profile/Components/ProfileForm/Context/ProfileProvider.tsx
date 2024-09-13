import React, { ReactNode } from 'react'
import { ProfileContext } from './Interface'
import {
    useCreatePayroll,
    useGetAndUpdateUserById,
    useUpdatePayroll,
} from './Hook'

interface ProfileProviderProps {
    children: ReactNode
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({
    children,
}) => {
    const {
        user,
        error,
        isLoading,
        isCurrentUser,
        isAdmin,
        handleChange,
        handleUpdate,
    } = useGetAndUpdateUserById()

    const {
        payroll,
        handleCreatePayroll,
        handleChangePayroll,
        createToastMessage,
        createToastOpen,
        createToastSeverity,
        handleCreateToastClose,
    } = useCreatePayroll()

    const {
        EditingPayroll,
        handleUpdateChangePayroll,
        toastOpen,
        toastMessage,
        handleToastClose,
        handleUpdatePayroll,
        toastSeverity,
    } = useUpdatePayroll()

    const value = {
        user,
        error,
        isLoading,
        isCurrentUser,
        isAdmin,
        handleChange,
        handleUpdate,
        handleUpdatePayroll,
        handleUpdateChangePayroll,
        payroll,
        handleCreatePayroll,
        EditingPayroll,
        toastOpen,
        toastMessage,
        handleToastClose,
        toastSeverity,
        handleChangePayroll,
        createToastMessage,
        createToastOpen,
        createToastSeverity,
        handleCreateToastClose,
    }

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    )
}

import React, { ReactNode } from 'react'
import { ProfileContext } from '../Interface/Interface'
import {
    useCreatePayroll,
    useGetAndUpdateUserById,
    useUpdatePayroll,
} from '../Hook/Index'

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
        handleChangePayroll,
        payroll,
        handleCreatePayroll,
        createToastMessage,
        createToastSeverity,
        createToastOpen,
        handleCreateToastClose,
    } = useCreatePayroll()

    const {
        EditingPayroll,
        handleUpdateChangePayroll,
        handleUpdatePayroll,
        toastMessage,
        toastOpen,
        handleToastClose,
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

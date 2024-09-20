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
        genderOptions,
        handleGenderChange,
        updateToastMessage,
        updateToastOpen,
        updateToastSeverity,
        handleUpdateToastClose,
        handlePlaceChange,
        Places,
        handleCancel
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
        genderOptions,
        handleGenderChange,
        updateToastOpen,
        updateToastMessage,
        updateToastSeverity,
        handleUpdateToastClose,
        handlePlaceChange,
        Places,
        handleCancel,
    }

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    )
}

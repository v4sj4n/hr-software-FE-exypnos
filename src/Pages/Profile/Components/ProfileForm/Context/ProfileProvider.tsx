import React, { ReactNode } from 'react'
import { ProfileContext } from './Interface'
import { useCreatePayroll, useGetAndUpdateUserById } from './Hook'

interface ProfileProviderProps {
    children: ReactNode
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({
    children,
}) => {

    const { user, error, isLoading, isCurrentUser, isAdmin, handleChange, handleUpdate } = useGetAndUpdateUserById()
    const { payroll, handleChangePayroll, handleCreatePayroll } = useCreatePayroll()

    const value = {
        user,
        error,
        isLoading,
        isCurrentUser,
        isAdmin,
        handleChange,
        handleUpdate,
        handleChangePayroll,
        payroll,
        handleCreatePayroll
    }

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    )
}

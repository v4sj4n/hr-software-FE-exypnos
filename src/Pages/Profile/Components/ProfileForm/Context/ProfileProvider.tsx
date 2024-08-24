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
    const { payroll, handleCreatePayroll } = useCreatePayroll()
    const { payrollId, handleChangePayroll } = useUpdatePayroll()

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
        handleCreatePayroll,
        payrollId,
    }

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    )
}

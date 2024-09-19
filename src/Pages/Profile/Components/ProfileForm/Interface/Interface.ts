import React, { createContext } from 'react'
import { UserProfileData } from '../../../../Employees/interfaces/Employe'

export interface ProfileContextType {
    user: UserProfileData | null
    error: string | null
    isLoading: boolean
    isCurrentUser: boolean
    isAdmin: boolean
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleUpdate: (event: React.FormEvent<HTMLButtonElement>) => Promise<void>
    toastOpen: boolean
    toastMessage: string
    toastSeverity: 'success' | 'error'
    handleToastClose: () => void
    handleUpdateToastClose: () => void
    handleCreateToastClose: () => void
    genderOptions: string[]
    Places: string[]
    handleUpdatePayroll: (
        event: React.FormEvent<HTMLButtonElement>,
    ) => Promise<void>
    handleGenderChange: (value: string ) => void;
    handlePlaceChange: (value: string | string[]) => void;
    updateToastOpen: boolean
    updateToastMessage: string
    updateToastSeverity:'success' | 'error'
}

export const ProfileContext = createContext<ProfileContextType | undefined>(
    undefined,
)

export interface EmployeePayroll {
    _id: string
    workingDays: number | undefined
    grossSalary: number | undefined
    month: number
    year: number
    bonus: number | undefined
    userId: string
    extraHours: number | undefined
    bonusDescription: string 
}

export interface EmployePayroll {
    workingDays: number | undefined
    grossSalary: number | undefined
    bonus: number | undefined
    userId: string
    extraHours: number | undefined
    bonusDescription: string 
}

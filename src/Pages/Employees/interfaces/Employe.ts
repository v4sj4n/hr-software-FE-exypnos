import React from 'react'
import { GridColDef, GridRowParams } from '@mui/x-data-grid'

export interface EmployeeRow {
    id: number
    originalId: number
    role: string
    phone: string
    email: string
    fullName: string
}

export interface EmployeeContextType {
    rows: EmployeeRow[]
    columns: GridColDef[]
    headerTextColors: { [key: string]: string }
    getRowId: (row: EmployeeRow) => number
    handleRowClick: (params: GridRowParams) => void
}

export interface UserProfileData {
    auth: {
        email: string
    }
    lastName: string
    phone: string
    pob: string
    dob: string
    gender: string
    role: string
    firstName: string
    imageUrl: string
    file: string
    _id: number
}

export const EmployeeContext = React.createContext<
    EmployeeContextType | undefined
>(undefined)

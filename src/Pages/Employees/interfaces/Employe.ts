import React from 'react'
import {
    GridColDef,
    GridPaginationModel,
    GridRowParams,
} from '@mui/x-data-grid'

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
    isPending: boolean
    getRowId: (row: EmployeeRow) => number
    handleRowClick: (params: GridRowParams) => void
    page: number
    pageSize: number
    totalPages: number
    handlePaginationModelChange: (paginationModel: GridPaginationModel) => void
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
    originalId: number
    role: string
    firstName: string
    imageUrl: string
    file: string
    _id: number
}

export const EmployeeContext = React.createContext<
    EmployeeContextType | undefined
>(undefined)

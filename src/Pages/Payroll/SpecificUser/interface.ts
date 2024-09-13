import { GridColDef, GridPaginationModel } from '@mui/x-data-grid'
import React from 'react'

export interface PayrollContextType {
    rows: PayrollRowSpecifc[]
    columns: GridColDef[]
    headerTextColors: { [key: string]: string }
    getRowId: (row: PayrollRowSpecifc) => number
    setMonth: (month: number) => void
    setYear: (year: number) => void
    fullName: string | undefined
    isPending: boolean
    page: number
    pageSize: number
    totalPages: number
    handlePaginationModelChange: (paginationModel: GridPaginationModel) => void
}

export const PayrollContextSpecific = React.createContext<
    PayrollContextType | undefined
>(undefined)

export interface PayrollRowSpecifc {
    id: number
    originalId: number
    netSalary: number
    workingDays: number
    currency: string
    bonus: number
    bonusDescription: string
    socialSecurity: number
    healthInsurance: number
    grossSalary: number
    month: number
    year: number
    userId: {
        _id: string
        firstName: string
        lastName: string
    }
}

export interface UserPayrolls {
    id: number
    originalId: number
    netSalary: number
    workingDays: number
    currency: string
    bonus: number
    bonusDescription: string
    socialSecurity: number
    healthInsurance: number
    grossSalary: number
    month: number
    year: number
    userId: {
        firstName: string
        lastName: string
        _id: string
    }
}

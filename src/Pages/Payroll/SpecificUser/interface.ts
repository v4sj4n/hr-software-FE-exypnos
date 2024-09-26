import { GridColDef, GridPaginationModel } from '@mui/x-data-grid'
import React from 'react'

export interface PayrollContextType {
    rows: PayrollRowSpecifc[]
    columns: GridColDef[]
    getRowId: (row: PayrollRowSpecifc) => number
    fullName: string | undefined
    isPending: boolean
    page: number
    pageSize: number
    totalPages: number
    handlePaginationModelChange: (paginationModel: GridPaginationModel) => void
    handleDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void
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

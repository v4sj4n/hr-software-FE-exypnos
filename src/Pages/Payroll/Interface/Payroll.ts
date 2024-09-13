import { GridColDef, GridPaginationModel, GridRowParams } from '@mui/x-data-grid'
import React from 'react'

export interface PayrollContextType {
    rows: PayrollRow[]
    columns: GridColDef[]
    handleRowClick: (params: GridRowParams) => void
    getRowId: (row: PayrollRow) => number
    setMonth: (month: number) => void
    setName: (name: string) => void
    setYear: (year: number) => void
    setNetSalary: (netSalary: number) => void
    setFullName: (fullName: string) => void
    setWorkingDays: (workingDays: number) => void
    setMaxNetSalary: (maxNetSalary: number) => void
    setMinNetSalary: (maxNetSalary: number) => void
    setBonus: (bonus: number) => void
    isPending: boolean
    netSalary: number | undefined
    page: number
    setFilters: React.Dispatch< React.SetStateAction<Record<string, string | boolean>>>
    filters: Record<string, string | boolean>
    pageSize: number
    totalPages: number
    handlePaginationModelChange: (paginationModel: GridPaginationModel) => void
}

export const PayrollContext = React.createContext<PayrollContextType | undefined>(undefined)

export interface PayrollRow {
    id: number
    originalId: string
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
    tax: number
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
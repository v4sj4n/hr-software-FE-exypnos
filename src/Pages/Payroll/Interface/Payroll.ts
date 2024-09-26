import {
    GridColDef,
    GridPaginationModel,
    GridRowParams,
} from '@mui/x-data-grid'
import React from 'react'

export interface PayrollContextType {
    rows: PayrollRow[]
    columns: GridColDef[]
    handleRowClick: (params: GridRowParams) => void
    getRowId: (row: PayrollRow) => number
    setMonth: (month: number) => void
    setYear: (year: number) => void
    setFullName: (fullName: string) => void
    setWorkingDays: (workingDays: number) => void
    setMaxNetSalary: (maxNetSalary: number) => void
    setMinNetSalary: (maxNetSalary: number) => void
    setBonus: (bonus: number) => void
    isPending: boolean
    page: number
    pageSize: number
    totalPages: number
    handlePaginationModelChange: (paginationModel: GridPaginationModel) => void
    handleDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleFullNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleWorkingDaysChange: (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => void
    handleMinSalaryChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleMaxSalaryChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleBonusChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const PayrollContext = React.createContext<
    PayrollContextType | undefined
>(undefined)

export interface PayrollRow {
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

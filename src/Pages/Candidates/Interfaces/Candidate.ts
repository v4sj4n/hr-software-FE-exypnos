import React from 'react'
import { GridColDef, GridPaginationModel, GridRowParams } from '@mui/x-data-grid'

export interface CandidateRow {
    _id: any
    lastName: any
    firstName: any
    id: number
    originalId: string | number
    fullName: string
    phoneNumber: string
    email: string
    experience: string
    applicationMethod: string
    age: string
    positionApplied: string
    technologiesUsed: string[]
    salaryExpectations: string
    status: string
}

export interface applicantsData {
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
    experience: string
    applicationMethod: string
    age: string
    positionApplied: string
    technologiesUsed: string[]
    salaryExpectations: string
    status: string
    _id: number
}

export interface CandidateContextType {
    rows: CandidateRow[]
    columns: GridColDef[]
    headerTextColors: { [key: string]: string }
    getRowId: (row: CandidateRow) => number
    handleRowClick: (params: GridRowParams) => void
    isPending: boolean
    page:number
    pageSize:number
    totalPages:number
    handlePaginationModelChange: (paginationModel: GridPaginationModel) => void
}

export const CandidateContext = React.createContext<
    CandidateContextType | undefined
>(undefined)

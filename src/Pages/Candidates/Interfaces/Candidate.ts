import React from 'react'
import { GridColDef, GridRowParams } from '@mui/x-data-grid'
import { SvgIconProps } from '@mui/material'

export interface CandidateRow {
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
    headerIcons: { [key: string]: React.ComponentType<SvgIconProps> }
    headerTextColors: { [key: string]: string }
    getRowId: (row: CandidateRow) => number
    handleRowClick: (params: GridRowParams) => void
}

export const CandidateContext = React.createContext<
    CandidateContextType | undefined
>(undefined)

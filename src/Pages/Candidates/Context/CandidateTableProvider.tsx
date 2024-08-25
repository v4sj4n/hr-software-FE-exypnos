import React from 'react'
import {  CandidateContext, CandidateRow } from '../Interfaces/Candidate'
import { useGetAllApplicants } from '../Hook'
import { GridRenderCellParams, GridRowParams } from '@mui/x-data-grid'
import { Link, useNavigate } from 'react-router-dom'
import { StatusBadge } from '@/Components/StatusBadge/StatusBadge'

export const CandidateProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const {  data: applicants = [] } = useGetAllApplicants()
    const navigate = useNavigate()

    const rows: CandidateRow[] = applicants.map((applicant, index) => ({
        id: index + 1,
        originalId: applicant._id,
        fullName: `${applicant.firstName} ${applicant.lastName}`,
        email: applicant.email,
        phoneNumber: applicant.phoneNumber,
        experience: applicant.experience,
        applicationMethod: applicant.applicationMethod,
        age: applicant.age,
        positionApplied: applicant.positionApplied,
        technologiesUsed: applicant.technologiesUsed,
        salaryExpectations: applicant.salaryExpectations,
        status: applicant.status,
    }))

    const columns = [
        { field: 'id', headerName: 'ID', flex:0.5},
        { field: 'fullName', headerName: 'FullName',  flex: 1.2 },
        { field: 'email', headerName: 'Email',  flex: 2 },
        {
            field: 'status',
            headerName: 'Status',
            flex:1.3,
            renderCell: (params: GridRenderCellParams) => {
                const color =
                    params.value === 'active'
                        ? 'green'
                        : params.value === 'pending'
                          ? 'orange'
                          : params.value === 'rejected'
                            ? 'red'
                            : ''
                return <StatusBadge status={params.value} color={color} />
            },
        },
        { field: 'phoneNumber', headerName: 'Phone',  flex: 1.8 },
        {
            field: 'positionApplied',
            headerName: 'Position',
      
            flex: 1.8,
        },
        { field: 'experience', headerName: 'Experience',  flex: 1.3 },
        {
            field: 'actions',
            headerName: 'Actions',
        
            flex: 1.3,
            renderCell: (params: GridRenderCellParams) => (
                <Link
                    style={{ textDecoration: 'none', color: '#4C556B' }}
                    to={`/view/${params.row.originalId}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    View More
                </Link>
            ),
        },
    ]

    const headerTextColors = {
        firstName: '#0000FF',
    }

    const getRowId = (row: CandidateRow) => row.id

    const handleRowClick = (params: GridRowParams) => {
        navigate(`/view/${params.row.originalId}`)
    }

    const contextValue = {
        rows,
        columns,
        headerTextColors,
        getRowId,
        handleRowClick,
    }

    return (
        <CandidateContext.Provider value={contextValue}>
            {children}
        </CandidateContext.Provider>
    )
}

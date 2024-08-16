import React from 'react'
import { CandidateContext, CandidateRow } from '../Interfaces/Candidate'
import { useGetAllApplicants } from '../Hook'
import { GridRenderCellParams, GridRowParams } from '@mui/x-data-grid'
import { Link, useNavigate } from 'react-router-dom'
import EmailIcon from '@mui/icons-material/Email'
import PersonIcon from '@mui/icons-material/Person'
import PhoneIcon from '@mui/icons-material/Phone'
import DateRangeIcon from '@mui/icons-material/DateRange'
import ComputerIcon from '@mui/icons-material/Computer'
import { StatusBadge } from '@/Components/StatusBadge/StatusBadge'

export const CandidateProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { applicants } = useGetAllApplicants()
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
    { field: 'id', headerName: 'ID', width: 10 },
    { field: 'fullName', headerName: 'FullName', width: 130, flex: 1 },
    { field: 'email', headerName: 'Email', width: 230, flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params: GridRenderCellParams) => {
        const color =
          params.value === 'accepted'
            ? 'green'
            : params.value === 'pending'
            ? 'orange'
            : params.value === 'rejected'
            ? 'red'
            : ''
        return <StatusBadge status={params.value} color={color} />
      },
    },
    { field: 'phoneNumber', headerName: 'Phone', width: 200, flex: 1 },
    { field: 'positionApplied', headerName: 'Position', width: 270, flex: 1 },
    { field: 'experience', headerName: 'Experience', width: 120, flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      flex: 1,
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

  const headerIcons = {
    email: EmailIcon,
    fullName: PersonIcon,
    phone: PhoneIcon,
    date: DateRangeIcon,
    position: ComputerIcon,
  }

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
    headerIcons,
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

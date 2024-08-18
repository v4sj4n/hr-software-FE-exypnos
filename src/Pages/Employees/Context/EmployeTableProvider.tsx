import React from 'react'
import { useGetAllUsers } from '../Hook'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import EmailIcon from '@mui/icons-material/Email'
import PersonIcon from '@mui/icons-material/Person'
import PhoneIcon from '@mui/icons-material/Phone'
import DateRangeIcon from '@mui/icons-material/DateRange'
import ComputerIcon from '@mui/icons-material/Computer'
import { EmployeeContext, EmployeeRow } from '../interfaces/Employe'

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const { users } = useGetAllUsers()

    const rows: EmployeeRow[] = users.map((user, index) => ({
        id: index + 1,
        originalId: user._id,
        role: user.role,
        phone: user.phone,
        email: user.auth?.email,
        fullName: `${user.firstName} ${user.lastName}`,
    }))

    const columns = [
        { field: 'id', headerName: 'No', maxWidth: 70, flex: 1 },
        { field: 'fullName', headerName: 'Full Name', width: 150, flex: 1 },
        { field: 'email', headerName: 'Email', width: 150, flex: 1 },
        { field: 'phone', headerName: 'Phone', width: 150, flex: 1 },
        { field: 'role', headerName: 'Role', width: 100, flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            renderCell: (params: GridRenderCellParams) => (
                <Link
                    style={{ textDecoration: 'none', color: '#4C556B' }}
                    to={`/profile/${params.row.originalId}`}
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

    const getRowId = (row: EmployeeRow) => row.id

    const contextValue = {
        rows,
        columns,
        headerIcons,
        headerTextColors,
        getRowId,
    }

    return (
        <EmployeeContext.Provider value={contextValue}>
            {children}
        </EmployeeContext.Provider>
    )
}

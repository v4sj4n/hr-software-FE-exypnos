import React, { useState } from 'react'
import { GridPaginationModel, GridRenderCellParams, GridRowParams } from '@mui/x-data-grid'
import { Link, useNavigate } from 'react-router-dom'
import {
    EmployeeContext,
    EmployeeRow,
    UserProfileData,
} from '../interfaces/Employe'
import AxiosInstance from '@/Helpers/Axios'
import { useQuery } from '@tanstack/react-query'

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {

    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(5)

    const handlePaginationModelChange = (model: GridPaginationModel) => {
        setPage(model.page);
        setPageSize(model.pageSize);
    };

 const fetchEmployes = async ():Promise<{data: UserProfileData[], totalPages: number}> => {
    const response = await AxiosInstance.get<{data: UserProfileData[], totalPages: number}>(
        `/user?page=${page}&limit=${pageSize}`
    )
    console.log('path:', `/user?page=${page}&limit=${pageSize}`)
    console.log('Fetched users:', response.data)
    return response.data
}

const {data: users, isPending } = useQuery<{data: UserProfileData[], totalPages: number}, Error>({
    queryKey: ['users', page, pageSize],
    queryFn: () => fetchEmployes(),
})


    const navigate = useNavigate()

    const rows: EmployeeRow[] =
    users?.data.map((user, index) => ({
        id: (page * pageSize) + index,
        originalId: user._id,
        role: user.role,
        phone: user.phone,
        email: user.auth?.email || '',
        fullName: `${user.firstName} ${user.lastName}`,
    })) || []

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

    const headerTextColors = {
        firstName: '#0000FF',
    }

    const getRowId = (row: EmployeeRow) => row.id

    const handleRowClick = (params: GridRowParams) => {
        navigate(`/profile/${params.row.originalId}`)
    }

    const contextValue = {
        rows,
        columns,
        headerTextColors,
        getRowId,
        handleRowClick,
        handlePaginationModelChange,
        isPending,
         page,
          pageSize,
          totalPages: users?.totalPages ?? 0,
    }

    return (
        <EmployeeContext.Provider value={contextValue}>
            {children}
        </EmployeeContext.Provider>
    )
}

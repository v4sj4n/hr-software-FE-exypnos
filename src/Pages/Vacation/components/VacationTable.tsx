import { CircularProgress } from '@mui/material'
import { useGetVacations } from '../Hook'
import { Vacation } from '../TVacation'
import DataTable from '@/Components/Table/Table'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { dateFormatter } from '@/Helpers/dateFormater'
import style from '../style/vacationTable.module.scss'
import { useContext } from 'react'
import { VacationContext } from '../VacationContext'
import { SelectedVacation } from './form/SelectedVacation'
import { StatusBadge } from '@/Components/StatusBadge/StatusBadge'

export const VacationTable = () => {
    const {
        setSearchParams,
        viewVacationModalOpen,
        handleOpenViewVacationModalOpen,
    } = useContext(VacationContext)
    const { data, error, isLoading } = useGetVacations()

    if (error) return <p>Error: {error.message}</p>
    if (isLoading) return <CircularProgress />

    const onLinkClick = (id: string) => {
        setSearchParams((prevParams) => {
            const newParams = new URLSearchParams(prevParams)
            if (id !== '') {
                newParams.set('selectedVacation', id)
            } else {
                newParams.delete('selectedVacation')
            }
            return newParams
        })
        id !== '' && handleOpenViewVacationModalOpen()
    }

    const rows = data?.map((vacation: Vacation, index: number) => ({
        id: index + 1,
        fullName: `${vacation.userId?.firstName} ${vacation.userId?.lastName}`,
        type: vacation.type,
        status: vacation.status,
        startDate: vacation.startDate,
        endDate: vacation.endDate,
        actions: vacation._id,
    }))
    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'fullName', headerName: 'Full Name', flex: 1 },
        { field: 'type', headerName: 'Type', flex: 1 },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            renderCell: (param: GridRenderCellParams) =>
                StatusRenderer(param.value),
        },
        {
            field: 'startDate',
            headerName: 'Start Date',
            flex: 1,
            renderCell: (param: GridRenderCellParams) =>
                dateFormatter(param.value),
        },
        {
            field: 'endDate',
            headerName: 'End Date',
            flex: 1,
            renderCell: (param: GridRenderCellParams) =>
                dateFormatter(param.value),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            renderCell: (param: GridRenderCellParams) => {
                return (
                    <span
                        onClick={() => onLinkClick(param.value)}
                        className={style.viewButton}
                    >
                        View
                    </span>
                )
            },
        },
    ]

    const getRowId = (row: { id: number | string }) => row.id

    return (
        <>
            <DataTable rows={rows} columns={columns} getRowId={getRowId} />
            {viewVacationModalOpen && <SelectedVacation />}
        </>
    )
}

const StatusRenderer = (value: string) => {
    const color =
        value === 'pending'
            ? 'orange'
            : value === 'accepted'
              ? 'green'
              : value === 'rejected'
                ? 'red'
                : ''
    return <StatusBadge color={color} status={value} />
}

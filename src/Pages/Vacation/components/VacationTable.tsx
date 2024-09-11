import { CircularProgress } from '@mui/material'
import { useGetVacations } from '../Hook'
import DataTable from '@/Components/Table/Table'
import { GridPaginationModel, GridRenderCellParams } from '@mui/x-data-grid'
import { dateFormatter } from '@/Helpers/dateFormater'
import style from '../style/vacationTable.module.scss'
import { useContext, useEffect } from 'react'
import { VacationContext } from '../VacationContext'
import { SelectedVacationModal } from './form/SelectedVacationModal'
import { StatusBadge } from '@/Components/StatusBadge/StatusBadge'
import Toast from '@/Components/Toast/Toast'
import { Vacation } from '../types'

export const VacationTable = () => {
    const {
        searchParams,
        setSearchParams,
        handleOpenViewVacationModalOpen,
        toastConfigs,
        handleToastClose,
    } = useContext(VacationContext)
    const { data, error, isPending } = useGetVacations()

    useEffect(() => {
        if (searchParams.get('page') === null) {
            setSearchParams((prev) => {
                const newParams = new URLSearchParams(prev)
                newParams.set('page', '0')
                newParams.set('limit', '5')
                return newParams
            })
        }
    }, [searchParams, setSearchParams])

    if (error) return <p>Error: {error.message}</p>
    if (isPending) return <CircularProgress />

    const rows = data?.data.map((vacation: Vacation) => ({
        id: vacation._id,
        fullName: `${vacation.userId?.firstName} ${vacation.userId?.lastName}`,
        type: vacation.type,
        status: vacation.status,
        startDate: vacation.startDate,
        endDate: vacation.endDate,
        actions: vacation._id,
    }))
    const handlePaginationModelChange = (model: GridPaginationModel) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev)
            newParams.set('page', model.page.toString())
            newParams.set('limit', model.pageSize.toString())
            return newParams
        })
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'fullName', headerName: 'Full Name', flex: 1 },
        { field: 'type', headerName: 'Type', flex: 1 },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            renderCell: ({ value }: GridRenderCellParams) => {
                const color =
                    value === 'pending'
                        ? 'orange'
                        : value === 'accepted'
                          ? 'green'
                          : value === 'rejected'
                            ? 'red'
                            : ''
                return <StatusBadge color={color} status={value} />
            },
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
                        onClick={() =>
                            handleOpenViewVacationModalOpen(
                                param.value as string,
                            )
                        }
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
            <DataTable
                onPaginationModelChange={handlePaginationModelChange}
                page={Number(searchParams.get('page')!)}
                pageSize={Number(searchParams.get('limit')!)}
                totalPages={data.totalPages}
                rows={rows}
                columns={columns}
                getRowId={getRowId}
            />
            {searchParams.get('selectedVacation') && <SelectedVacationModal />}
            <Toast
                open={toastConfigs.isOpen}
                onClose={handleToastClose}
                message={toastConfigs.message || ''}
                severity={toastConfigs.severity}
            />
        </>
    )
}

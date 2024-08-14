import { CircularProgress } from '@mui/material'
import { useGetVacations } from '../Hook'
import { Vacation } from '../TVacation'
import DataTable from '@/Components/Table/Table'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { dateFormatter } from '@/Helpers/dateFormater'
import style from '../style/vacationTable.module.scss'

export const VacationTable = () => {
  const { data, error, isLoading } = useGetVacations()

  if (error) return <p>Error: {error.message}</p>
  if (isLoading) return <CircularProgress />

  const rows = data?.map((vacation: Vacation) => ({
    id: vacation._id,
    fullName: `${vacation.userId?.firstName} ${vacation.userId?.lastName}`,
    type: vacation.type,
    status: vacation.status,
    startDate: vacation.startDate,
    endDate: vacation.endDate,
  }))
  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'fullName', headerName: 'Full Name', flex: 1 },
    { field: 'type', headerName: 'Type', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (param: GridRenderCellParams) => StatusRenderer(param.value),
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      flex: 1,
      renderCell: (param: GridRenderCellParams) => dateFormatter(param.value),
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      flex: 1,
      renderCell: (param: GridRenderCellParams) => dateFormatter(param.value),
    },
  ]

  const getRowId = (row: { id: number | string }) => row.id

  return <DataTable rows={rows} columns={columns} getRowId={getRowId} />
}

const StatusRenderer = (value: string) => {
  return (
    <span
      className={
        value === 'pending'
          ? style.badgePending
          : value === 'accepted'
          ? style.badgeSuccess
          : value === 'rejected'
          ? style.badgeError
          : ''
      }
    >
      ● {value}
    </span>
  )
}

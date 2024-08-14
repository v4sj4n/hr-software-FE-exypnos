import { CircularProgress } from '@mui/material'
import { useGetVacations } from '../Hook'
import { Vacation } from '../TVacation'
import DataTable from '@/Components/Table/Table'
import { GridRenderCellParams } from '@mui/x-data-grid'

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
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullName', headerName: 'Full Name', flex: 1 },
    { field: 'type', headerName: 'Type', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (param: GridRenderCellParams) => (
        <span
          style={{
            padding: '0.5rem 1rem',
            color: 'rgb(222 127 11)',
            backgroundColor: '#ffe6c7',
            borderRadius: '0.5rem',
            fontWeight: 'bold',
            // textTransform: 'uppercase',
          }}
        >
          ● {param.value}
        </span>
      ),
    },
    { field: 'startDate', headerName: 'Start Date', flex: 1 },
    { field: 'endDate', headerName: 'End Date', flex: 1 },
  ]

  const getRowId = (row: { id: number | string }) => row.id

  return <DataTable rows={rows} columns={columns} getRowId={getRowId} />
}

import { DataGrid, GridValidRowModel } from '@mui/x-data-grid'
import { TableStyles } from '../Input/Styles'
import { DataTableProps } from './Interface'
export default function DataTable<T extends GridValidRowModel>({
    rows,
    columns,
    getRowId = (row: T) => row.id,
    height = 'auto',
    pageSizeOptions = [5, 10, 20, 30],
    totalPages,
    page,
    pageSize,
    handleRowClick,
    onPaginationModelChange,
}: DataTableProps<T>) {
    return (
        <div style={{ height, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                getRowId={getRowId}
                onRowClick={handleRowClick}
                pagination
                paginationMode="server"
                rowCount={totalPages * pageSize}
                paginationModel={{ page, pageSize }}
                onPaginationModelChange={onPaginationModelChange}
                pageSizeOptions={pageSizeOptions}
                autoHeight={true}
                disableColumnFilter={true}
                disableColumnMenu={true}
                disableColumnSelector={true}
                disableDensitySelector={true}
                rowSelection={false}
                disableColumnSorting={true}
                disableRowSelectionOnClick={true}
                showColumnVerticalBorder={true}
                disableAutosize={true}
                sx={{
                    ...TableStyles,
                    '& .MuiDataGrid-columnHeader': {
                        backgroundColor: '#ffffff', 
                    },
                    '& .colored-row': {
                        backgroundColor: 'red',
                    },
                    '& .MuiDataGrid-row': {
                        cursor: 'pointer',
                    },
                    width: '100%',
                }}
            />
        </div>
    )
}

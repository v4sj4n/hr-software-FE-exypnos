import {
    DataGrid,
    GridColDef,
    GridRowParams,
    GridValidRowModel,
    GridPaginationModel,
} from '@mui/x-data-grid'
import React from 'react'
import { TableStyles } from '../Input/Styles'

interface DataTableProps<T extends GridValidRowModel> {
    rows: T[]
    columns: GridColDef[]
    getRowId?: (row: T) => string | number
    height?: number | string
    pageSizeOptions?: number[]
    additionalStyles?: React.CSSProperties
    handleRowClick?: (params: GridRowParams) => void
    totalPages: number
    page: number
    pageSize: number
    onPaginationModelChange: (model: GridPaginationModel) => void
}

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
    const columnsWithIcons = columns.map((column) => ({
        ...column,
        renderHeader: () => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {column.headerName}
            </div>
        ),
    }))

    return (
        <div style={{ height, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columnsWithIcons}
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
                rowSelection={false}
                disableDensitySelector={true}
                sx={{
                    ...TableStyles,
                    '& .colored-row': {
                        backgroundColor: '#5f43b2',
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

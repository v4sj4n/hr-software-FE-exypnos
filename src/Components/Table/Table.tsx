import { SvgIconProps } from '@mui/material'
import {
    DataGrid,
    GridColDef,
    GridRowParams,
    GridValidRowModel,
} from '@mui/x-data-grid'
import React from 'react'
import { TableStyles } from '../Input/Styles'

interface DataTableProps<T extends GridValidRowModel> {
    rows: T[]
    columns: GridColDef[]
    getRowId?: (row: T) => string | number
    height?: number | string
    initialPageSize?: number
    pageSizeOptions?: number[]
    additionalStyles?: React.CSSProperties
    headerIcons?: { [key: string]: React.ComponentType<SvgIconProps> }
    handleRowClick?: (params: GridRowParams) => void
}
export default function DataTable<T extends GridValidRowModel>({
    rows,
    columns,
    getRowId = (row: T) => row.id,
    height = 'auto',
    initialPageSize = 5,
    pageSizeOptions = [5, 10, 20, 30],
    headerIcons,
    handleRowClick,
}: DataTableProps<T>) {
    const getRowClassName = (params: GridRowParams) => {
        return Number(params.id) % 2 === 0 ? 'colored-row' : ''
    }
    const columnsWithIcons = columns.map((column) => {
        if (headerIcons && headerIcons[column.field]) {
            const Icon = headerIcons[column.field]
            return {
                ...column,
                renderHeader: () => (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Icon style={{ marginRight: '8px' }} />
                        {column.headerName}
                    </div>
                ),
            }
        }
        return column
    })
    return (
        <div style={{ height, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columnsWithIcons}
                getRowId={getRowId}
                getRowClassName={getRowClassName}
                onRowClick={handleRowClick}
                sx={{
                    ...TableStyles,
                    '& .colored-row': {
                        backgroundColor: '#f4f4f4',
                    },
                    '& .MuiDataGrid-row': {
                        cursor: 'pointer',
                    },
                    width: '100%',
                }}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: initialPageSize },
                    },
                }}
                pageSizeOptions={pageSizeOptions}
                checkboxSelection
            />
        </div>
    )
}

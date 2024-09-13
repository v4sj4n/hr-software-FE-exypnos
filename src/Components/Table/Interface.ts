import { GridColDef, GridPaginationModel, GridRowParams, GridValidRowModel } from "@mui/x-data-grid"

export interface TableProps {
    initialValue?: string
    id?: string
    type?: boolean | string
    icon?: React.ReactNode
    name: string
    width?: string | number
    field?: string
    headerName: string
    flex?: number | string
    rednderHeader?: (params: React.ChangeEvent<HTMLInputElement>) => void
    rendeerCell?: (params: React.ChangeEvent<HTMLInputElement>) => void
}


export interface DataTableProps<T extends GridValidRowModel> {
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
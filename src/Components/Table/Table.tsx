import { DataGrid, GridColDef, GridValidRowModel } from '@mui/x-data-grid';
import React from 'react';

interface DataTableProps<T extends GridValidRowModel> {
  data: T[];
  columns: GridColDef[];
  getRowId: (row: T) => string | number;
  height?: number | string;
  width?: number | string;
  initialPageSize?: number;
  pageSizeOptions?: number[];
  additionalStyles?: React.CSSProperties;
}

export default function DataTable<T extends GridValidRowModel>({
  data,
  columns,
  getRowId,
  height = 400,
  width = '100%',
  initialPageSize = 5,
  pageSizeOptions = [5, 10],
  additionalStyles = {}
}: DataTableProps<T>) {
  return (
    <div style={{ height, width }}>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={getRowId}
        sx={additionalStyles}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: initialPageSize },
          },
        }}
        pageSizeOptions={pageSizeOptions}
      />
    </div>
  );
}
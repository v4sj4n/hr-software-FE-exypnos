import { DataGrid, GridColDef, GridValidRowModel } from '@mui/x-data-grid';
import React from 'react';
import { TableStyles } from '../Input/Styles';

interface DataTableProps<T extends GridValidRowModel> {
  rows: T[];
  columns: GridColDef[];
  getRowId?: (row: T) => string | number;
  height?: number | string;
  width?: number | string;
  initialPageSize?: number;
  pageSizeOptions?: number[];
  additionalStyles?: React.CSSProperties;
}

export default function DataTable<T extends GridValidRowModel>({
  rows,
  columns,
  getRowId = (row: T) => (row ).id,
  height = 369,
  width = '100%',
  initialPageSize = 5,
  pageSizeOptions = [5, 10],
}: DataTableProps<T>) {
  const getRowClassName = (params: getRowParams) => {
    const rowIndex = params.indexRelativeToCurrentPage;
    return rowIndex % 2 === 0 ? 'colored-row' : '';
  };

  return (
    <div style={{ height, width }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
        getRowClassName={getRowClassName}
        sx={{
          ...TableStyles,
          '& .colored-row': {
            backgroundColor: '#f0f0f0', 
          },
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
  );
}
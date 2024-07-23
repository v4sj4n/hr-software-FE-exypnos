import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useGetAllUsers } from '../../Hooks/Actions';
import { Link } from 'react-router-dom';
import { TableStyles } from '../Input/Styles';

export default function DataTable() {

  const {users} = useGetAllUsers();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'No', width: 80 },
    { field: 'firstName', headerName: 'First name', width: 150 },
    { field: 'lastName', headerName: 'Last name', width: 150 },
    {
      field: 'email', 
      headerName: 'Email',
      type: 'string',
      width: 250,
    },
    {
      field: 'role', 
      headerName: 'Role',
      type: 'string',
      width: 150,
    },
    { 
      field: 'fullName', 
      headerName: 'Full Name', 
      width: 200,
      renderCell: (params) => (
        <Link style={{textDecoration:"none", color:"#4C556B"}} to={`/profile/${params.row.originalId}`}>
          {params.value}
        </Link>
      )
    },
  ];
  

  const rows = users.map((user, index) => ({
    id: index + 1, 
    originalId: user._id, 
    firstName: user.firstName,
    role: user.role, 
    lastName: user.lastName,
    email: user.auth?.email, 
    fullName: `${user.firstName} ${user.lastName}`,
  }));



  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
       sx={{...TableStyles}}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        
        pageSizeOptions={[5, 10]}
        
      />
    </div>
  );
}

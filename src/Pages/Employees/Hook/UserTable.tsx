import { Link } from 'react-router-dom';
import { GridColDef } from '@mui/x-data-grid';
import DataTable from '../../../Components/Table/Table';
import { TableStyles } from '../../../Components/Input/Styles';
import { GridRenderCellParams } from '@mui/x-data-grid'

interface User {
  _id: number;
  firstName: string;
  lastName: string;
  role: string;
  auth?: {
    email: string;
  };
}

interface UsersTableProps {
  users: User[];
}

export default function UsersTable({ users }: UsersTableProps) {
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
      renderCell: (params: GridRenderCellParams) => (
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
    <DataTable
      data={rows}
      columns={columns}
      getRowId={(row) => row.id}
      additionalStyles={TableStyles}
    />
  );
}
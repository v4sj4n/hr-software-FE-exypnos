import { Link } from "react-router-dom";
import DataTable from "../../Components/Table/Table";
import style from "./styles/Candidates.module.css"
import { GridRenderCellParams } from '@mui/x-data-grid'

export interface CandidateRow {
  id: number;
  originalId: string;
  firstName: string;
  role: string;
  phone: string;
  lastName: string;
  email: string | undefined;
  position: string;
  date: string;
  fullName: string;
}

const columns = [
  { field: '_id', headerName: 'ID', width: 100 },
  { field: 'firstName', headerName: 'First Name', width: 100 },
  { field: 'lastName', headerName: 'Last Name', width: 100 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'phone', headerName: 'Phone', width: 150 },
  { field: 'position', headerName: 'Position', width: 250 },
  { field: 'date', headerName: 'Date', width: 100 },
  { field: 'actions', headerName: 'Actions', width: 150 },
]

const dummyUsers = [
  {
    _id: '1a2b3c',
    firstName: 'John',
    lastName: 'Doe',
    role: 'Admin',
    phone: '123-456-7890',
    position:"Senior Frontend Developer",
    date:"22/01/2024",
    auth: {
      email: 'john.doe@example.com'
    }
  },
  {
    _id: '4d5e6f',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'User',
    phone: '987-654-3210',
    position:"Senior Backend Developer",
    date:"22/03/2024",
    auth: {
      email: 'jane.smith@example.com'
    }
  },
  {
    _id: '7g8h9i',
    firstName: 'Alice',
    lastName: 'Johnson',
    role: 'Editor',
    phone: '555-123-4567',
    position:"Junior Backend Developer",
    date:"22/05/2024",
    auth: {
      email: 'alice.johnson@example.com'
    }
  },
  {
    _id: '10j11k',
    firstName: 'Bob',
    lastName: 'Brown',
    role: 'Admin',
    phone: '444-555-6666',
    position:"Senior Backend Developer",
    date:"22/06/2024",
    auth: {
      email: 'bob.brown@example.com'
    }
  },
  {
    _id: '11k',
    firstName: 'Bobo',
    lastName: 'Brown',
    role: 'Admin',
    phone: '444-555-6666',
    position:"Senior Backend Developer",
    date:"22/06/2024",
    auth: {
      email: 'bob.brown@example.com'
    }
  },  {
    _id: '112k',
    firstName: 'Bobo2',
    lastName: 'Brown2',
    role: 'Admin2',
    phone: '444-555-6666',
    position:"Senior Backend Developer",
    date:"22/06/2024",
    auth: {
      email: 'bob.brown@example.com'
    }
  },
  { 
    field: 'actions', 
    headerName: 'Actions', 
    width: 120,
    renderCell: (params: GridRenderCellParams) => (
        <Link style={{textDecoration:"none", color:"#4C556B"}} to={`/profile/${params.row.originalId}`}>
        View More
      </Link>
    ),
},
  
];



const rows = dummyUsers.map((user, index) => ({
  id: index + 1,
  originalId: user._id,
  firstName: user.firstName,
  role: user.role,
  phone: user.phone,
  lastName: user.lastName,
  email: user.auth?.email,
  position: user.position,
  date: user.date,
  fullName: `${user.firstName} ${user.lastName}`
}));
const getRowId = (row: CandidateRow ) => row.id;
export default function Candidates() {
  return (
    <div className={style.content}>
        <div className={style.Candidates}>Candidates</div>
      <DataTable getRowId={getRowId} columns={columns} rows={rows}  />
    </div>

  )
}

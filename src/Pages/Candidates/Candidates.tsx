import { Link } from "react-router-dom";
import DataTable from "../../Components/Table/Table";
import style from "./styles/Candidates.module.css"
import { GridRenderCellParams } from '@mui/x-data-grid'
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ComputerIcon from '@mui/icons-material/Computer';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import CircleIcon from '@mui/icons-material/Circle';

export interface CandidateRow {
  id: number;
  originalId: string;
  role: string;
  phone: string;
  email: string | undefined;
  position: string;
  date: string;
  status: string;
  fullName: string;
}

const columns = [
  { field: '_id', headerName: 'ID', width: 70 },
  { field: 'fullName', headerName: 'FullName', width: 130 },
  {
    field: 'status',
    headerName: 'Status',
    width: 130,
    renderCell: (params: GridRenderCellParams) => {
      const color = params.value === 'Accepted' ? 'green' :
        params.value === 'Pending' ? '#d32f2f' : '#02a700';
      return (
        <div style={{ color: color }}>
          {params.value}
        </div>
      );
    }
  },
  { field: 'email', headerName: 'Email', width: 230 , flex: 1},
  { field: 'phone', headerName: 'Phone', width: 200, flex: 1 },
  { field: 'position', headerName: 'Position', width: 270, flex: 1 },
  { field: 'date', headerName: 'Date', width: 120, flex: 1 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 120, flex: 1,
    renderCell: (params: GridRenderCellParams) => (
      <Link style={{ textDecoration: "none", color: "#4C556B" }} to={`/profile/${params.row.originalId}`}>
        View More
      </Link>
    ),
  },
];
const dummyUsers = [
  {
    _id: '1a2b3c',
    fullName: 'John Doe',
    role: 'Admin',
    phone: '123-456-7890',
    position: "Senior Frontend Developer",
    status: 'Accepted',
    date: "22/01/2024",
    auth: {
      email: 'john.doe@example.com'
    }
  },
  {
    _id: '4d5e6f',
    fullName: 'Jane Smith',
    role: 'User',
    phone: '987-654-3210',
    position: "Senior Backend Developer",
    status: 'Accepted',
    date: "22/03/2024",
    auth: {
      email: 'jane.smith@example.com'
    }
  },
  {
    _id: '7g8h9i',
    fullName: 'Alice Johnson',
    role: 'Editor',
    phone: '555-123-4567',
    position: "Junior Backend Developer",
    status: 'Pending',
    date: "22/05/2024",
    auth: {
      email: 'alice.johnson@example.com'
    }
  },
  {
    _id: '10j11k',
    fullName: 'Bob Brown',
    role: 'Admin',
    phone: '444-555-6666',
    status: 'Pending',
    position: "Senior Backend Developer",
    date: "22/06/2024",
    auth: {
      email: 'bob.brown@example.com'
    }
  },
  {
    _id: '11k',
    fullName: 'Bobo Brown',
    role: 'Admin',
    phone: '444-555-6666',
    position: "Senior Backend Developer",
    status: 'Pending',
    date: "22/06/2024",
    auth: {
      email: 'bob.brown@example.com'
    }
  }, {
    _id: '112k',
    fullName: 'Bobo2 Brown2',
    role: 'Admin2',
    status: 'Acepted',
    phone: '444-555-6666',
    position: "Senior Backend Developer",
    date: "22/06/2024",
    auth: {
      email: 'bob.brown@example.com'
    }
  },
];

const rows = dummyUsers.map((user, index) => ({
  id: index + 1,
  originalId: user._id,
  fullName: user.fullName,
  role: user.role,
  phone: user.phone,
  email: user.auth?.email,
  position: user.position,
  status: user.status,
  date: user.date,
}));

const headerIcons = {
  email: EmailIcon,
  fullName: PersonIcon,
  phone: PhoneIcon,
  date: DateRangeIcon,
  position: ComputerIcon,
  _id: FormatListNumberedIcon,
  status: CircleIcon,
};


const getRowId = (row: CandidateRow) => row.id;
export default function Candidates() {
  return (
    <div className={style.content}>
      <div className={style.Candidates}>Candidates</div>
      <DataTable getRowId={getRowId} headerIcons={headerIcons}  columns={columns} rows={rows} />
    </div>

  )
}

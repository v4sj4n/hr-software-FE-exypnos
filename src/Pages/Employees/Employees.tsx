import { useGetAllUsers } from "./Hook";
import style from './Employees.module.css'
import DataTable from "../../Components/Table/Table";
import { GridRenderCellParams } from '@mui/x-data-grid'
import { Link } from "react-router-dom";
import { Monitor, Email, Person, Work } from "@mui/icons-material";

interface EmployeeRow {
    id: number;
    originalId: number;
    firstName: string;
    role: string;
    phone: string;
    lastName: string;
    email: string | undefined;
    fullName: string;
}

export default function Employees() {
    const { users } = useGetAllUsers();

    const rows = users.map((user, index) => ({
        id: index + 1,
        originalId: user._id,
        firstName: user.firstName,
        role: user.role,
        phone: user.phone,
        lastName: user.lastName,
        email: user.auth?.email,
        fullName: `${user.firstName} ${user.lastName}`,
    }));

    const columns = [
        { field: 'id', headerName: 'No', width: 80 },
        { field: 'firstName', headerName: 'First name', width: 100 },
        { field: 'lastName', headerName: 'Last name', width: 100 },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'phone', headerName: 'Phone', width: 200 },
        { field: 'role', headerName: 'Role', width: 100 },
        { field: 'fullName', headerName: 'Full Name', width: 200 },
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

    // const headerIcons = {
    //     email: Email,
    //     phone: Monitor,
    //     role: Work,
    //     fullName: Person,
    // };

    const getRowId = (row: EmployeeRow) => row.id;

    return (
        <>
            <div style={{ display: "flex", width: "100%", flexDirection: "column", padding: "0 16px", backgroundColor: "#f0f5ff" }}>
                <div className={style.account}>Employee List</div>
                <DataTable 
                    rows={rows} 
                    columns={columns} 
                    getRowId={getRowId} 
                    headerIcons={
                        {
                            email: Email,
                            phone: Monitor,
                            role: Work,
                            fullName: Person,
                        }
                    }
                />
            </div>
        </>
    );
}
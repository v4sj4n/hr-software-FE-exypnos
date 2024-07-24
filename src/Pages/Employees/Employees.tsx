import { useGetAllUsers } from "./Hook";
import style from './Employees.module.css'
import DataTable from "../../Components/Table/Table";

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
        { field: 'firstName', headerName: 'First name', width: 150 },
        { field: 'lastName', headerName: 'Last name', width: 150 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'phone', headerName: 'Phone', width: 250 },
        { field: 'role', headerName: 'Role', width: 150 },
        { field: 'fullName', headerName: 'Full Name', width: 200 },
    ];

    const getRowId = (row ) => row.id;

    return (
        <>
            <div style={{ display: "flex", width: "100%", flexDirection: "column", padding: "0 16px", backgroundColor: "#f0f5ff" }}>
                <div className={style.account}>Employe List</div>
                <DataTable rows={rows} columns={columns} getRowId={getRowId} />
            </div>
        </>
    );
}
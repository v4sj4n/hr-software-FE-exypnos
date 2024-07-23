// import { Link } from "react-router-dom";
import { useGetAllUsers } from "./Hook";
// import { useAuth } from "../Context/AuthProvider"; 
// import { useNavigate } from "react-router-dom";
// import Button from "../../Components/Button/Button";
// import { ButtonTypes } from "../../Components/Button/ButtonTypes";
// import Header from "../../Components/Header/header";

// import DataTable from "../../Components/Table/Table";
import style from './Employees.module.css'

import UsersTable from "./Hook/UserTable";

export default function Employees() {
    const { users } = useGetAllUsers();

    // const { logout, userRole } = useAuth();

    // const canViewUserList = userRole === 'admin' || userRole === 'hr';

    return (
        <>
            {/* {canViewUserList ? (
                users && users.length > 0 ? (
                    users.map(user => (
                        <div style={{ color: "red" }} key={user._id}>
                            <Link to={`/profile/${user._id}`}>
                                {user.firstName} - {user.auth?.email}
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No users found.</p>
                )
            ) : (
                <p>You don't have permission to view user list.</p>
            )}

            {userRole === 'dev' && (
                <p>Dev content no admin or HR.</p>
            )}

            <button onClick={handleLogOut}>Logout</button> */}
          
            
                <div style={{ display: "flex", width: "100%", flexDirection: "column", padding: "0 16px", backgroundColor:"#f0f5ff" }}>
                <div className={style.account}>Employe List</div>
                  
                    <UsersTable users={users}/>
                </div>
    
        </>
    );
}
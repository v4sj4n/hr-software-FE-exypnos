import { Link } from "react-router-dom";
import { useGetAllUsers } from "../Hooks/Actions";
import { useAuth } from "../Context/AuthProvider"; 
import { useNavigate } from "react-router-dom";

export default function Homepage() {
    const { users } = useGetAllUsers();
    const { logout, userRole } = useAuth();
    const navigate = useNavigate();

    const handleLogOut = () => {
        logout();  
        navigate("/login"); 
    };

    return (
        <>
            {(userRole === 'admin' || userRole === 'hr') ? (
                users && users.length > 0 ? (
                    users.map(user => (
                        <div style={{ color: "red" }} key={user._id}>
                            <Link to={`/profile/${user._id}`}>{user.firstName} - {user.email}</Link>
                        </div>
                    ))
                ) : (
                    <p>No users found.</p>
                )
            ) : (
                <p>You don't have permission to view user list.</p>
            )}

            {userRole === 'dev' && (
                <p>Dev content no admin or Hrrrr.</p>
            )}

            <button onClick={handleLogOut}>Logout</button>
        </>
    );
}
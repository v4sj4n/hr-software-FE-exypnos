import { useContext, useState } from "react";
import {
  NotificationsOutlined as NotificationsIcon,
  SettingsOutlined as SettingsOutlinedIcon,
  Logout as LogoutIcon,
  PermIdentity as PermIdentityIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import codeviderLogo from "/Images/codevider.png";
import style from "./header.module.css";
import { useAuth } from "../../Context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { SidebarHeaderContext } from "@/Context/SidebarHeaderContext";

export const Header = () => {
  const { isSidebarOpen: isOpen, toggleSidebar } =
    useContext(SidebarHeaderContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const { logout, currentUser } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate(`/profile/${currentUser?._id}`);
  };

  return (
    <nav className={style.header}>
      <div className={style.headerLeft}>
        <div onClick={toggleSidebar} className={style.hamburgerIcon}>
          <MenuIcon />
        </div>
        <img
          alt="logo"
          src={codeviderLogo}
          style={{
            width: "35px",
            height: "auto",
            // cursor: 'pointer',
          }}
        />
        {isOpen && (
          <h3 className={style.title}>
            <Link to={"/dashboard"}>
              <span>Code</span>
              Vider
            </Link>
          </h3>
        )}
      </div>
      <div className={style.headerRight}>
        <div className={style.icon}>
          <NotificationsIcon style={{ cursor: "pointer" }} />
          <span className={style.badge}>3</span>
        </div>
        <div className={style.icon} onClick={toggleDropdown}>
          <img
            src={currentUser?.imageUrl}
            style={{
              cursor: "pointer",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
            }}
          />
          <div className={style.username}></div>
          {showDropdown && (
            <div className={style.dropdown}>
              <div className={style.dropdownItem} onClick={handleProfileClick}>
                Profile <PermIdentityIcon />
              </div>

              <div className={style.dropdownItem}>
                Settings <SettingsOutlinedIcon />
              </div>
              <div className={style.dropdownItem} onClick={handleLogout}>
                Logout <LogoutIcon />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

import React, { useState } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import codeviderLogo from '/Images/codevider.png';
import style from './header.module.css';

const Header: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className={style.header}>
      <div className={style.headerLeft}>
        <div className={style.logo}>
          <img alt='logo' src={codeviderLogo} />
        </div>
        {isOpen && (
          <>
            <div className={style.title}>
              <h4>code</h4>
            </div>
            <div className={style.title1}>
              <h4>vider</h4>
            </div>
          </>
        )}
      </div>
      <div className={style.headerRight}>
        <div className={style.icon}>
          <EmailIcon />
          <span className={style.badge}>3</span>
        </div>
        <div className={style.icon} onClick={toggleDropdown}>
          <PersonIcon />
          <div className={style.username}></div>
          {showDropdown && (
            <div className={style.dropdown}>
              <div className={style.dropdownItem} onClick={() => console.log('View Profile')}>Profile <PermIdentityIcon/></div>
              <div className={style.dropdownItem} onClick={() => console.log('Logout')}>Logout <LogoutIcon/></div>
              <div className={style.dropdownItem} onClick={() => console.log('Settings')}>Settings <SettingsIcon />
              </div>

            </div>
          )}
        </div>
        {/* <div className={style.icon}>
          <SettingsIcon />
        </div> */}
      </div>
    </header>
  );
}

export default Header;
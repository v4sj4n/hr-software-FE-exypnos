import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React from 'react';
import codeviderLogo from '../../../Public/Images/codevider.png'
import style from './header.module.css'


const Header: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <header className={style.header}>
      <div className={style.headerLeft}>
        <div className={style.logo}>
          <img alt='logo' src={codeviderLogo}  />
        </div>
        {isOpen && (
          <>
        <div className={style.title}>
        <h4>Code</h4>
        </div>
        <div className={style.title1}>
        <h4>Vider</h4>
        </div>
        </>
        )}
      </div>
      <div className={style.headerRight}>
        <div className={style.icon}>
          <NotificationsIcon />
          <span className={style.badge}>3</span>
        </div>
        <div className={style.icon}>
          <SettingsIcon />
        </div>
        <div className={style.icon}>
          <AccountCircleIcon />
          <span className={style.username}>Profile</span>
        </div>
      </div>
    </header>
  );
}
export default Header;
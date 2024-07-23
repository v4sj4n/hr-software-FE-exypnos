import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import codeviderLogo from '../../Assets/logocodevider.png'
import  style from './header.module.css'

const Header: React.FC = () => {
  return (
    <header className={style.header}>
      <div className={style.headerLeft}>
        <div className={style.logo}>
          <img alt='logo' src={codeviderLogo} />
        </div>
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

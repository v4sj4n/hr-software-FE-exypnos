import { useContext, useState } from 'react'
import {
    SettingsOutlined as SettingsOutlinedIcon,
    Logout as LogoutIcon,
    PermIdentity as PermIdentityIcon,
    Menu as MenuIcon,
} from '@mui/icons-material'
import codeviderLogo from '/Images/codevider.png'
import style from './header.module.css'
import { useAuth } from '../../Context/AuthProvider'
import { Link, useNavigate } from 'react-router-dom'
import { SidebarHeaderContext } from '@/Context/SidebarHeaderContext'
import { EventsProvider } from '@/Pages/Events/Context/EventsContext'
import NotificationDropdown from '@/Pages/Notification/Notification'
import { ClickAwayListener } from '@mui/material'

export const HeaderContent = () => {
import AxiosInstance from '@/Helpers/Axios'
import ThemeSwitcher from '@/Theme/ThemeSwitcher'


interface NotificationData {
    _id: string
    title: string
    content: string
    type: string
    typeId: string
}

export const Header = () => {
    const { isSidebarOpen: isOpen, toggleSidebar } =
        useContext(SidebarHeaderContext)
    const [showDropdown, setShowDropdown] = useState(false)

    const navigate = useNavigate()

    const { logout, currentUser } = useAuth()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const handleProfileClick = () => {
        navigate(`/profile/${currentUser?._id}`)
    }

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
                        width: '35px',
                        height: 'auto',
                    }}
                />
                {isOpen && (
                    <h3 className={style.title}>
                        <Link to={'/dashboard'}>
                            <span>Code</span>
                            Vider
                        </Link>
                    </h3>
                )}
            </div>
            <div className={style.headerRight}>
            <ThemeSwitcher /> 

                <div className={style.icon}>
                    <NotificationDropdown />
                </div>

                <ClickAwayListener onClickAway={() => setShowDropdown(false)}>
                    <div
                        className={style.icon}
                        onClick={() => setShowDropdown(true)}
                    >
                        <img
                            src={currentUser?.imageUrl}
                            style={{
                                cursor: 'pointer',
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                            }}
                        />
                        <div className={style.username}></div>

                        {showDropdown && (
                            <div className={style.dropdown}>
                                <div
                                    className={style.dropdownItem}
                                    onClick={handleProfileClick}
                                >
                                    Profile <PermIdentityIcon />
                                </div>
                <div className={style.icon} onClick={toggleDropdown}>
                    <img
                        src={currentUser?.imageUrl}
                        style={{
                            cursor: 'pointer',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                        }}
                    />
                    <div className={style.username}></div>
                    {showDropdownNotification && (
                        <div className={style.dropdown}>
                            <div>
                                {' '}
                                {notification.map((notification) => (
                                    <div key={notification._id}>
                                        <Link
                                            onClick={updateSatusAndNvigate}
                                            to={`/${notification.type}?event=${notification.typeId}`}
                                        >
                                            <div>{notification.title}</div>
                                            <div> {notification.type}</div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {showDropdown && (
                        <div className={style.dropdown}>
                            <div
                                className={style.dropdownItem}
                                onClick={handleProfileClick}
                            >
                                Profile <PermIdentityIcon />
                            </div>

                                <div className={style.dropdownItem}>
                                    Settings <SettingsOutlinedIcon />
                                </div>
                                <div
                                    className={style.dropdownItem}
                                    onClick={handleLogout}
                                >
                                    Logout <LogoutIcon />
                                </div>
                            </div>
                        )}
                    </div>
                </ClickAwayListener>
            </div>
        </nav>
    )
}

const Header: React.FC = () => {
    return (
        <EventsProvider>
            <HeaderContent />
        </EventsProvider>
    )
}
export default Header

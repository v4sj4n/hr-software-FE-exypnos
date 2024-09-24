import { useContext, useState } from 'react'
import {
    Logout as LogoutIcon,
    PermIdentity as PermIdentityIcon,
    Menu as MenuIcon,
} from '@mui/icons-material'
import codeviderLogo from '/Images/codevider.png'
import style from './header.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { SidebarHeaderContext } from '@/ProtectedRoute/SidebarHeaderContext'
import { EventsProvider } from '@/Pages/Events/Context/EventsProvider'
import NotificationDropdown from '@/Pages/Notification/Notification'
import { ClickAwayListener } from '@mui/material'
import ThemeSwitcher from '@/Theme/ThemeSwitcher'
import { useTheme } from '@mui/material/styles'
import { useAuth } from '@/ProtectedRoute/Context/AuthContext'
import MarkChatUnreadOutlinedIcon from '@mui/icons-material/MarkChatUnreadOutlined'

export const HeaderContent = () => {
    const { isSidebarOpen: isOpen, toggleSidebar } =
        useContext(SidebarHeaderContext)
    const [showDropdown, setShowDropdown] = useState(false)

    const navigate = useNavigate()
    const { logout, currentUser } = useAuth()

    const handleLogout = () => {
        logout()
        navigate('/')
    }
    const handleNavigateToChat = () => {
        navigate('/chat')
    }

    const handleProfileClick = () => {
        navigate(`/profile/${currentUser?._id}`)
    }

    const theme = useTheme()
    const dropdownItemStyle = {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.paper,
    }

    return (
        <nav className={style.header} style={{ height: '63px' }}>
            <div className={style.headerLeft}>
                <div onClick={toggleSidebar} className={style.hamburgerIcon}>
                    <MenuIcon />
                </div>
                <div className={style.logoImage}>
                    <img
                        alt="logo"
                        src={codeviderLogo}
                        style={{
                            width: '35px',
                            height: 'auto',
                        }}
                    />
                </div>
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
                <div className={style.icon} style={dropdownItemStyle}>
                    {' '}
                    <ThemeSwitcher />
                </div>

                <div
                    className={style.icon}
                    style={dropdownItemStyle}
                    onClick={handleNavigateToChat}
                >
                    <MarkChatUnreadOutlinedIcon />
                </div>

                <div className={style.icon}>
                    <NotificationDropdown />
                </div>

                <ClickAwayListener onClickAway={() => setShowDropdown(false)}>
                    <div
                        className={style.icon}
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <img
                            src={currentUser?.imageUrl}
                            style={{
                                cursor: 'pointer',
                                width: '45px',
                                height: '45px',
                                borderRadius: '50%',
                                transform: 'scale(1.1)',
                            }}
                        />
                        {showDropdown && (
                            <div
                                className={style.dropdown}
                                style={{
                                    width: '250px',
                                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                                    padding: '25px',
                                    borderRadius: '8px',
                                }}
                            >
                                <div
                                    className={style.userInfo}
                                    style={{
                                        padding: '20px',
                                        borderBottom: '1px solid #eee',
                                        textAlign: 'center',
                                        justifyContent:'center',
                                    }}
                                >
                                    <img
                                        src={currentUser?.imageUrl}
                                        alt="Profile"
                                        style={{
                                            width: '70px',
                                            height: '70px',
                                            borderRadius: '50%',
                                            marginBottom: '10px',
                                        }}
                                        onClick={handleProfileClick}
                                    />
                                    <div className={style.userDetails}>
                                        <strong style={{ fontSize: '18px' }}>
                                            {currentUser?.firstName}
                                        </strong>
                                        <p
                                            style={{
                                                maxWidth:'60px',
                                                margin: 0,
                                                fontSize: '14px',
                                                color: theme.palette.text
                                                    .secondary,
                                                    
                                            }}
                                        >
                                            {currentUser?.email}
                                            
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className={style.dropdownItem}
                                    style={{
                                        ...dropdownItemStyle,
                                        padding: '15px',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        left: '15px',
                                    }}
                                    onClick={handleProfileClick}
                                >
                                    <PermIdentityIcon
                                        style={{ marginRight: '10px' }}
                                    />
                                    Profile
                                </div>

                                <div
                                    className={style.dropdownItem}
                                    style={{
                                        ...dropdownItemStyle,
                                        padding: '15px',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                    onClick={handleLogout}
                                >
                                    <LogoutIcon
                                        style={{ marginRight: '10px' }}
                                    />
                                    Logout
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

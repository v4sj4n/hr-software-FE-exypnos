import { useContext, useEffect, useState } from 'react'
import {
    NotificationsOutlined as NotificationsIcon,
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
import AxiosInstance from '@/Helpers/Axios'

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
    const [showDropdownNotification, setShowDropdownNotification] =
        useState(false)
    const navigate = useNavigate()
    const toggleDropdown = () => setShowDropdown(!showDropdown)
    const toggleDropdownNotification = () =>
        setShowDropdownNotification(!showDropdownNotification)

    const { logout, currentUser } = useAuth()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const [notification, setNotification] = useState<NotificationData[]>([])
    const currentUserId = currentUser?._id

    useEffect(() => {
        AxiosInstance.get<NotificationData[]>(
            `notification/user/${currentUserId}`,
        )
            .then((response) => {
                setNotification(response.data)
                console.log('Notification fetch:', response.data)
                setNotification(response.data)
            })
            .catch((error) => {
                console.error('Error fetching data:', error)
            })
    }, [currentUserId])

    const updateSatusAndNvigate = () => {
        AxiosInstance.patch(`notification/${notification[0]?._id}`)
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
                <div className={style.icon}>
                    <NotificationsIcon
                        onClick={toggleDropdownNotification}
                        style={{ cursor: 'pointer' }}
                    />
                    <span className={style.badge}>3</span>
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
            </div>
        </nav>
    )
}

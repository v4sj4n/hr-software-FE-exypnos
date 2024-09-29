import { useContext, useState } from 'react'
import codeviderLogo from '/Images/codevider.png'
import style from './header.module.css'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { SidebarHeaderContext } from '@/ProtectedRoute/SidebarHeaderContext'
import { EventsProvider } from '@/Pages/Events/Context/EventsProvider'
import NotificationDropdown from '@/Pages/Notification/Notification'
import { ClickAwayListener } from '@mui/material'
import { useAuth } from '@/ProtectedRoute/Context/AuthContext'
import { Avatar, Box, Button, Link, Typography } from '@mui/joy'
import { List, SignOut } from '@phosphor-icons/react'

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
    const handleProfileClick = () => {
        navigate(`/profile/${currentUser?._id}`)
    }

    return (
        <nav className={style.header} style={{ height: '63px' }}>
            <div className={style.headerLeft}>
                <div onClick={toggleSidebar} className={style.hamburgerIcon}>
                    <List className="size-7" />
                </div>
                <div className={style.logoImage}>
                    <img
                        alt="logo"
                        src={codeviderLogo}
                        className="h-8 w-auto"
                    />
                </div>
                {isOpen && (
                    <h3 className={style.title}>
                        <Link component={RouterLink} to={'/dashboard'}>
                            <span>Code</span>
                            Vider
                        </Link>
                    </h3>
                )}
            </div>
            <div className="flex items-center">
                <NotificationDropdown />

                <ClickAwayListener onClickAway={() => setShowDropdown(false)}>
                    <div
                        className={style.icon}
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <Avatar src={currentUser?.imageUrl} />
                        {showDropdown && (
                            <div className="absolute top-[120%] right-0 bg-white border border-white rounded-xl p-3 z-50 w-56 shadow-md ">
                                <Box className="flex flex-col items-center gap-2 mb-4">
                                    <Avatar
                                        src={currentUser?.imageUrl}
                                        alt="Profile"
                                        size="lg"
                                        onClick={handleProfileClick}
                                    />
                                    <Box>
                                        <Typography
                                            level="title-lg"
                                            className="hover:cursor text-center"
                                            onClick={handleProfileClick}
                                        >
                                            {currentUser?.firstName}{' '}
                                            {currentUser?.lastName}
                                        </Typography>
                                        <Typography
                                            level="body-xs"
                                            className="text-center"
                                        >
                                            {currentUser?.email}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Button
                                    startDecorator={
                                        <SignOut className="size-4" />
                                    }
                                    onClick={handleLogout}
                                    variant="soft"
                                    fullWidth
                                >
                                    Log out
                                </Button>
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

import React, { useState } from 'react'
import {
    Card,
    Typography,
    IconButton,
    Badge,
    Box,
    ClickAwayListener,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { useNavigate } from 'react-router-dom'
import { useGetAllNotifications } from './Hook/index'
import AxiosInstance from '@/Helpers/Axios'
import { useTheme } from '@mui/material/styles'
import { useAuth } from '@/Context/AuthProvider'

interface Notification {
    _id: number
    title: string
    type: string
    typeId: string
    content: string
    isRead: boolean
}
const NotificationDropdown: React.FC = () => {
    const { currentUser } = useAuth()
    const theme = useTheme()
    const [isOpen, setIsOpen] = useState(false)
    const [page, setPage] = useState(1)
    const { notifications, setNotifications } = useGetAllNotifications()
    const navigate = useNavigate()
    const handleToggleDropdown = () => {
        setIsOpen(!isOpen)
        setNotifications(notifications)
    }
    const handleDismiss = (id: number) => {
        setNotifications((notifications) =>
            notifications.filter((notification) => notification._id !== id),
        )
    }
    const handleClickAway = () => {
        setIsOpen(false)
    }
    const removeNotification = async (notificationId: number) => {
        try {
            await AxiosInstance.patch(`notification/${notificationId}`)
        } catch (error) {
            console.error(
                `Error removing notification ${notificationId}:`,
                error,
            )
        }
    }
    const handleNotificationClick = (notification: Notification) => {
        if (notification.type === 'events') {
            removeNotification(notification._id)
            navigate(`/events?event=${notification.typeId}`)
            setIsOpen(false)
        } else if (notification.type === 'vacation') {
            removeNotification(notification._id)
            navigate(
                `/vacation?vacationType=requests&selectedVacation=${notification.typeId}`,
            )
        } else if (notification.type === 'candidates') {
            removeNotification(notification._id)
            navigate(`/view/${notification.typeId}`)
        } else if (notification.type === 'allVacation') {
            removeNotification(notification._id)
            navigate(`/vacation?vacationType=requests&page=0&limit=5`)
        } else if (notification.type === 'allApplication') {
            removeNotification(notification._id)
            navigate(`/candidates`)
        }
    }
    const getColorByType = (type: string, isRead: boolean) => {
        if (isRead) {
            return '#6C757D'
        }
        switch (type) {
            case 'events':
                return 'blue'
            case 'vacation':
                return 'green'
            case 'candidates':
                return 'purple'
            case 'allVacation':
                return 'green'
            case 'allApplication':
                return 'purple'
            default:
                return '#6C757D'
        }
    }
    const markAllAsRead = async () => {
        try {
            for (const notification of notifications) {
                removeNotification(notification._id)
                handleDismiss(notification._id)
            }
            setNotifications([])
        } catch (error) {
            console.error('Error marking all as read:', error)
        }
    }
    const showMore = async () => {
        try {
            const result = await AxiosInstance.get(
                `notification/user/${currentUser?._id}?page=${page}$limit=5`,
            )
            setNotifications([...notifications, ...result.data.data])
            setPage(page + 1)
        } catch (error) {
            console.error('Error showing all notifications:', error)
        }
    }
    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <IconButton color="inherit" onClick={handleToggleDropdown}>
                    <Badge badgeContent={notifications.length} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                {isOpen && notifications.length > 0 &&(
                    <Box
                        sx={{
                            position: 'absolute',
                            right: 0,
                            mt: 2,
                            p: 1,
                            width: 400,
                            bgcolor: theme.palette.background.default,
                            boxShadow: 1,
                            borderRadius: 1,
                            overflow: 'auto',
                            maxHeight: 400,
                            cursor: 'pointer',
                            scrollbarWidth: 'none',
                            '&::-webkit-scrollbar': {
                                display: 'none',
                            },
                            msOverflowStyle: 'none',
                        }}
                    >
                        {notifications.length > 0 && (
                            <div style={{ textAlign: 'end' }}>
                                <a
                                    href="#"
                                    style={{ marginLeft: '70%' }}
                                    onClick={markAllAsRead}
                                >
                                    Mark all as read
                                </a>
                            </div>
                        )}

                        {notifications.map((notification) => (
                            <Card
                                key={notification._id}
                                sx={{
                                    mb: 1,
                                    borderBottom: `4px solid ${getColorByType(
                                        notification.type,
                                        notification.isRead,
                                    )}`,
                                    bgcolor: 'rgba(255, 255, 255, 0.7)',
                                    color: '#000',
                                }}
                                onClick={() =>
                                    handleNotificationClick(notification)
                                }
                            >
                                <Box
                                    sx={{
                                        padding: '8px 16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Box>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{ fontWeight: 'bold' }}
                                        >
                                            {notification.title}
                                        </Typography>
                                        <Typography variant="body2">
                                            {notification.content}
                                        </Typography>
                                    </Box>
                                    <IconButton
                                        size="small"
                                        sx={{ color: '#000' }}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            removeNotification(notification._id)
                                            handleDismiss(notification._id)
                                        }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                            </Card>
                        ))}
                        {notifications.length > 5 && (
                            <div style={{ textAlign: 'end' }}>
                                <a href="#" onClick={showMore}>
                                    Show more
                                </a>
                            </div>
                        )}
                    </Box>
                )}
            </Box>
        </ClickAwayListener>
    )
}
export default NotificationDropdown

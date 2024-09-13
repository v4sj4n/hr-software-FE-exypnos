import React, { useState, useEffect } from 'react'
import {
    Card,
    Typography,
    IconButton,
    Badge,
    Box,
    ClickAwayListener,
} from '@mui/material'
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
    date: string
    isRead: boolean
}

const NotificationDropdown: React.FC = () => {
    const { currentUser } = useAuth()
    const theme = useTheme()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const { notifications, setNotifications } = useGetAllNotifications() ?? {
        notifications: [],
        setNotifications: () => {},
    }
    const [length, setLength] = useState(0)

    useEffect(() => {
        setLength(notifications.filter((n) => !n.isRead).length)
    }, [notifications])

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const handleClickAway = () => {
        setIsOpen(false)
    }

    const removeNotification = async (notification: Notification) => {
        try {
            await AxiosInstance.patch(`notification/${notification._id}`)
            const updatedNotifications = notifications.map(n => 
                n._id === notification._id ? { ...n, isRead: true } : n
            )
            setNotifications(updatedNotifications)
            setLength(prev => prev - 1)
        } catch (error) {
            console.error(
                `Error removing notification ${notification._id}:`,
                error,
            )
        }
    }

    const handleNotificationClick = (notification: Notification) => {
        if (!notification.isRead) {
            removeNotification(notification)
        }
        if (notification.type === 'events') {
            navigate(`/events?event=${notification.typeId}`)
            setIsOpen(false)
        } else if (notification.type === 'vacation') {
            navigate(
                `/vacation?vacationType=requests&selectedVacation=${notification.typeId}`,
            )
        } else if (notification.type === 'candidates') {
            navigate(`/view/${notification.typeId}`)
        } else if (notification.type === 'allVacation') {
            navigate(`/vacation?vacationType=requests&page=0&limit=5`)
        } else if (notification.type === 'allCandidates') {
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
            const updatedNotifications = notifications.map(n => ({ ...n, isRead: true }))
            for (const notification of updatedNotifications) {
                if (!notification.isRead) {
                    await AxiosInstance.patch(`notification/${notification._id}`)
                }
            }
            setNotifications(updatedNotifications)
            setLength(0)
        } catch (error) {
            console.error('Error marking all as read:', error)
        }
    }

    const showAll = async () => {
        try {
            const result = await AxiosInstance.get(
                `notification/user/${currentUser?._id}?period=week`,
            )
            setNotifications(result.data)
        } catch (error) {
            console.error('Error showing all notifications:', error)
        }
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <IconButton color="inherit" onClick={handleToggleDropdown}>
                    <Badge badgeContent={length} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                {isOpen && (
                    <Box
                        sx={{
                            position: 'absolute',
                            right: 0,
                            mt: 2,
                            p: 1,
                            width: 450,
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
                                onClick={() => {
                                    handleNotificationClick(notification)
                                }}
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
                                        <Typography
                                            variant="body2"
                                            maxWidth="300px"
                                        >
                                            {notification.content}
                                        </Typography>
                                    </Box>
                                    <Typography
                                        variant="subtitle2"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            removeNotification(notification)
                                        }}
                                        sx={{
                                            cursor: 'pointer',
                                            color: notification.isRead
                                                ? 'text.secondary'
                                                : 'primary.main',
                                        }}
                                    >
                                        {notification.isRead
                                            ? 'Read'
                                            : 'Mark as read'}
                                    </Typography>
                                </Box>
                            </Card>
                        ))}
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            {length > 0 && (
                                <a
                                    href="#"
                                    style={{ color: 'text.secondary' }}
                                    onClick={markAllAsRead}
                                >
                                    Mark all as read
                                </a>
                            )}
                            <a
                                href="#"
                                style={{ color: 'text.secondary' }}
                                onClick={showAll}
                            >
                                Show all
                            </a>
                        </div>
                    </Box>
                )}
            </Box>
        </ClickAwayListener>
    )
}

export default NotificationDropdown
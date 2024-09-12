import React, { useState } from 'react'
import { Card, Typography, IconButton, Badge, Box, ClickAwayListener } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { useNavigate } from 'react-router-dom'
import { useGetAllNotifications } from './Hook/index'
import AxiosInstance from '@/Helpers/Axios'

interface Notification {
    _id: number
    title: string
    type: string
    typeId: string
}

const NotificationDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { notifications, setNotifications } = useGetAllNotifications()
    const navigate = useNavigate()

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const handleDismiss = (id: number) => {
        setNotifications(
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
        }
        console.log('Notification typesss:', notification.type)
    }

    const getColorByType = (type: string) => {
        switch (type) {
            case 'events':
                return '#007bff'
            case 'vacation':
                return 'green'
            case 'warning':
                return '#ffc107'
            case 'vocation':
                return '#dc3545'
            default:
                return '#6c757d'
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
                {isOpen && notifications.length > 0 && (
                    <Box
                        sx={{
                            position: 'absolute',
                            right: 0,
                            mt: 2,
                            p: 1,
                            width: 400,
                            bgcolor: 'background.paper',
                            boxShadow: 1,
                            borderRadius: 1,
                            overflow: 'hidden',
                            cursor: 'pointer',
                        }}
                    >
                        {notifications.map((notification) => (
                            <Card
                                key={notification._id}
                                sx={{
                                    mb: 1,
                                    bgcolor: getColorByType(notification.type),
                                    color: '#fff',
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
                                            variant="subtitle1"
                                            sx={{ fontWeight: 'bold' }}
                                        >
                                            {notification.type}
                                        </Typography>
                                        <Typography variant="body2">
                                            {notification.title}
                                        </Typography>
                                    </Box>
                                    <IconButton
                                        size="small"
                                        sx={{ color: '#fff' }}
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
                    </Box>
                )}
            </Box>
        </ClickAwayListener>
    )
}

export default NotificationDropdown

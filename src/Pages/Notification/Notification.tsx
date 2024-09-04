import React, { useEffect, useState } from 'react';
import { Card, Typography, IconButton, Badge, Box, ClickAwayListener } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AxiosInstance from '@/Helpers/Axios';
import { useAuth } from '@/Context/AuthProvider';
import { useNavigate } from 'react-router-dom';

interface Notification {
  _id: number;
  title: string;
  type: string;
  typeId: string;
}

const NotificationDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuth();
  const currentUserId = currentUser?._id;
  const navigate = useNavigate(); 

  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    AxiosInstance.get(`notification/user/${currentUserId}`)
      .then((response) => {
        setNotifications(response.data);
        console.log('Notification fetch:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [currentUserId]);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDismiss = (id: number) => {
    setNotifications(notifications.filter(notification => notification._id !== id));
  };

  const handleClickAway = () => {
    setIsOpen(false);
  };


  const removeNotification = async() => {
    try {
      await AxiosInstance.patch(`notification/${notifications[0]?._id}`)
    } catch (error) {
      console.error(`Error removing notification ${notifications[0]?._id}:`, error);
    }
}
  
const handleNotificationClick = (notification: Notification) => { 
  // TO-DO check based on the notification type and navigate to the corresponding event page
  removeNotification()
  navigate(`/events?event=${notification.typeId}`);
    setIsOpen(false);
};

  const getColorByType = (type: string) => {
    switch (type) {
      case 'events':
        return '#007bff';
      case 'success':
        return '#28a745';
      case 'warning':
        return '#ffc107';
      case 'error':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

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
            }}
          >
            {notifications.map(notification => (
              <Card
                key={notification._id}
                sx={{
                  mb: 1,
                  bgcolor: getColorByType(notification.type),
                  color: '#fff',
                }}
                onClick={
                  () => handleNotificationClick(notification)
                 
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
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
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
                      e.stopPropagation(); 
                      removeNotification()
                      handleDismiss(notification._id);
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
  );
};

export default NotificationDropdown;

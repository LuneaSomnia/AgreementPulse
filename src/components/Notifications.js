import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { NotificationImportant, Check, Warning } from '@mui/icons-material';

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications');
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  return (
    <List className="notifications-list">
      {notifications.map(notification => (
        <ListItem key={notification.id}>
          <ListItemIcon>
            {notification.type === 'urgent' ? <NotificationImportant color="error" /> :
             notification.type === 'warning' ? <Warning color="warning" /> :
             <Check color="success" />}
          </ListItemIcon>
          <ListItemText 
            primary={notification.title}
            secondary={notification.message}
          />
        </ListItem>
      ))}
    </List>
  );
}

export default Notifications;

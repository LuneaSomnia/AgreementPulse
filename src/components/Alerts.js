import React, { useState, useEffect } from 'react';
import { Card, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Simulated alerts data
    const mockAlerts = [
      { id: 1, title: 'Agreement Expiring', message: 'Contract #123 expires in 30 days', priority: 'high' },
      { id: 2, title: 'Renewal Due', message: 'Review renewal terms for Contract #456', priority: 'medium' }
    ];
    setAlerts(mockAlerts);
  }, []);

  return (
    <Card className="alerts-panel">
      <div className="alerts-header">
        <h2>Alerts</h2>
        <Badge badgeContent={alerts.length} color="error">
          <NotificationsIcon />
        </Badge>
      </div>
      <div className="alerts-list">
        {alerts.map(alert => (
          <div key={alert.id} className={`alert-item ${alert.priority}`}>
            <span className="alert-title">{alert.title}</span>
            <span className="alert-message">{alert.message}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default Alerts;
  

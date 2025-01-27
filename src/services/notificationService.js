// src/services/notificationService.js
import { io } from 'socket.io-client';

class NotificationService {
  constructor() {
    this.socket = io(process.env.REACT_APP_WEBSOCKET_URL);
    this.subscribers = new Set();
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  init() {
    this.socket.on('agreement-update', (data) => {
      this.subscribers.forEach(callback => callback(data));
    });

    this.socket.on('alert', (data) => {
      this.subscribers.forEach(callback => callback(data));
    });
  }
}

export default new NotificationService();

import { createContext, useEffect, useState } from 'react';
import { onForegroundMessage } from '../firebase-setup/messaging';
import toast from 'react-hot-toast';

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    let unsubscribe = () => {};
    onForegroundMessage((payload) => {
      const { title, body } = payload.notification || {};
      if (title) {
        toast(
          <div>
            <div style={{ fontFamily: 'Rajdhani', fontWeight: 700, color: '#FF6B00', fontSize: 14 }}>{title}</div>
            <div style={{ fontFamily: 'IBM Plex Mono', fontSize: 12, color: '#8888AA' }}>{body}</div>
          </div>,
          { duration: 5000 }
        );
        setNotifications(prev => [...prev, { title, body, timestamp: new Date() }]);
      }
    }).then(fn => { unsubscribe = fn; });

    return () => unsubscribe();
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications }}>
      {children}
    </NotificationContext.Provider>
  );
}

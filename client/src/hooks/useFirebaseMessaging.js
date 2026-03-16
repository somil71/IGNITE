import { useEffect } from 'react';
import { useUser } from '@clerk/react';
import { requestNotificationPermission, onForegroundMessage } from '../firebase/messaging';
import api from '@/services/api';
import toast from 'react-hot-toast';

export default function useFirebaseMessaging() {
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (!isSignedIn) return;
    if (typeof window === 'undefined') return;
    if (!('Notification' in window)) return;

    let unsubscribe = () => {};

    // Only request after user is signed in via Clerk
    requestNotificationPermission()
      .then(token => {
        if (token) {
          api.post('/auth/fcm-token', { fcmToken: token }).catch(() => {}); // silent fail — non-critical
        }
      });

    onForegroundMessage((payload) => {
      const { title } = payload?.notification || {};
      if (title) toast(title, { icon: '🔔' });
    }).then(unsub => {
      unsubscribe = unsub;
    });

    return () => unsubscribe();
  }, [isSignedIn]);
}

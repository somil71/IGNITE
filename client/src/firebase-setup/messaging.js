let messagingInstance = null;

export async function getMessagingInstance() {
  if (messagingInstance) return messagingInstance;
  
  // Dynamic import — only loaded in browser, never during SSR/build
  const { getMessaging } = await import('firebase/messaging');
  const { default: app } = await import('./config');
  
  messagingInstance = getMessaging(app);
  return messagingInstance;
}

export async function requestNotificationPermission() {
  try {
    const { getToken } = await import('firebase/messaging');
    const messaging = await getMessagingInstance();
    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.warn('FCM not available:', err);
    return null;
  }
}

export async function onForegroundMessage(callback) {
  try {
    const { onMessage } = await import('firebase/messaging');
    const messaging = await getMessagingInstance();
    return onMessage(messaging, callback);
  } catch (err) {
    console.warn('FCM foreground listener not available:', err);
    return () => {};
  }
}

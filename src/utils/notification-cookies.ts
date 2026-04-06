import Cookies from 'js-cookie';

const COOKIE_NAME = 'notification_prompted';

export type NotificationStatus = 'later' | 'configured' | undefined;

export interface NotificationPreferences {
  auctions: boolean;
  sales: boolean;
  general: boolean;
}

export const getNotificationStatus = (): NotificationStatus => {
  return Cookies.get(COOKIE_NAME) as NotificationStatus;
};

export const setNotificationLater = () => {
  // 15 minutes expiration
  Cookies.set(COOKIE_NAME, 'later', { expires: 15 / (24 * 60) });
};

export const setNotificationConfigured = (_prefs: NotificationPreferences) => {
  // 365 days expiration
  Cookies.set(COOKIE_NAME, 'configured', { expires: 365 });
  
  // Note: Local storage could optionally hold the actual preferences if needed locally,
  // but for now, the status cookie is enough to prevent the modal from re-appearing.
  // The actual preferences are sent to the backend.
};

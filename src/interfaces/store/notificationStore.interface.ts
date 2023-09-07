import { NotificationPlacement } from 'antd/es/notification/interface';
type NotificationType = 'success' | 'info' | 'warning' | 'error';
export interface INotificationStore {
  notificationData: {
    type: NotificationType;
    placement: NotificationPlacement;
    title: string;
    description: string;
  };
  showNotification: (type: NotificationType, placement: NotificationPlacement, title: string, description: string) => void;
  resetNotification: () => void;
}

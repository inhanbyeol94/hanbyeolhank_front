import { NotificationPlacement } from 'antd/es/notification/interface';
import { notification } from 'antd';
import { useNotificationStore } from '../../store/notification.store';
import { useEffect } from 'react';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const Notification = () => {
  const [api, contextHolder] = notification.useNotification();
  const { notificationData, resetNotification } = useNotificationStore();

  useEffect(() => {
    if (notificationData.title) {
      openNotification(notificationData.type, notificationData.placement, notificationData.title, notificationData.description);
      resetNotification();
    }
  }, [notificationData]);
  const openNotification = (type: NotificationType, placement: NotificationPlacement, title: string, description: string) => {
    api[type]({
      message: title,
      description: description,
      placement,
    });
  };

  return <>{contextHolder}</>;
};

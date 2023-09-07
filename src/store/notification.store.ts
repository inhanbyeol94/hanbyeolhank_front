import create from 'zustand';
import { ICreateClientStore } from '../interfaces/store/createClientStore.interface';
import { INotificationStore } from '../interfaces/store/notificationStore.interface';
import { notification } from 'antd';

export const useNotificationStore = create<INotificationStore>((set) => ({
  notificationData: {
    type: 'info',
    placement: 'topRight',
    title: '',
    description: '',
  },
  showNotification: (type, placement, title, description) => set((state) => ({ notificationData: { type, placement, title, description } })),
  resetNotification: () =>
    set((state) => ({
      notificationData: {
        type: 'info',
        placement: 'topRight',
        title: '',
        description: '',
      },
    })),
}));

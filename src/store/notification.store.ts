import create from 'zustand';
import { INotificationStore } from '../interfaces/store/notificationStore.interface';

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

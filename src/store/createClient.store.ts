import create from 'zustand';
import { ICreateClientStore } from '../interfaces/store/createClientStore.interface';

export const useCreateClientStore = create<ICreateClientStore>((set) => ({
  status: 0,
  setStatus: (currentStatus) => set((state) => ({ status: currentStatus })),
}));

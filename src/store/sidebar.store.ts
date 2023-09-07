import create from 'zustand';
import { ISidebarToggle } from '../interfaces/store/sidebarStore.interface';

export const useSidebarStore = create<ISidebarToggle>((set) => ({
  toggle: false,
  setToggle: (tg) => set((state) => ({ toggle: tg })),
}));

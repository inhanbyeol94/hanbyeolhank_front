import create from 'zustand';
import { ISequenceStore } from '../interfaces/store/identityVerifyStore.interface';

export const useIdentityVerifyStore = create<ISequenceStore>((set) => ({
  sequence: '',
  setSequence: (sequence) => set((state) => ({ sequence: sequence })),

  phone: '',
  setPhone: (phone: string) => set((state) => ({ phone: phone })),
}));

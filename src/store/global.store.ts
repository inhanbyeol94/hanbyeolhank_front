import create from 'zustand';
import { IGlobalStore } from '../interfaces/store/globalStore.interface';

export const useGlobalStore = create<IGlobalStore>((set) => ({
  name: '',
  setName: (name) => set((state) => ({ name })),
  phone: '',
  setPhone: (phone) => set((state) => ({ phone })),

  residentRegistrationNumber: '',
  setResidentRegistrationNumber: (residentRegistrationNumber) => set((state) => ({ residentRegistrationNumber })),

  sequence: '',
  setSequence: (sequence) => set((state) => ({ sequence })),

  type: 0,
  setType: (type) => set((state) => ({ type })),

  status: 0,
  setStatus: (status) => set((state) => ({ status })),

  step: [],
  setStep: (step) => set((state) => ({ step })),

  accountNumber: '',
  setAccountNumber: (accountNumber) => set((state) => ({ accountNumber })),

  reset: () => set(() => ({ name: '', phone: '', residentRegistrationNumber: '', sequence: '', type: 0, status: 0, step: [] })),
}));

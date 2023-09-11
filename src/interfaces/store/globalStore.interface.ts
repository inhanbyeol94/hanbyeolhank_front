export interface IGlobalStore {
  name: string;
  setName: (name: string) => void;

  phone: string;
  setPhone: (phone: string) => void;

  residentRegistrationNumber: string;
  setResidentRegistrationNumber: (residentRegistrationNumber: string) => void;

  sequence: string;
  setSequence: (sequence: string) => void;

  type: number;
  setType: (type: number) => void;

  status: number;
  setStatus: (currentState: number) => void;

  step: { title: string }[];
  setStep: (steps: { title: string }[]) => void;

  accountNumber: string;
  setAccountNumber: (accountNumber: string) => void;

  successSubtitle: string;
  setSuccessSubtitle: (successSubtitle: string) => void;

  successTitle: string;
  setSuccessTitle: (successTitle: string) => void;

  reset: () => void;
}

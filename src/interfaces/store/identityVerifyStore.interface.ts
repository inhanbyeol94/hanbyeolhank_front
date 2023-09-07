export interface ISequenceStore {
  sequence: string;
  setSequence: (sequence: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
}

import { ISequence } from './sequence.interface';

export interface ICreateClientData extends ISequence {
  name: string;
  phone: string;
  residentRegistrationNumber: string;
}

import { ISequence } from './sequence.interface';
import { ICreateClientData } from './createClient.interface';

export interface ICreateAccountData extends ICreateClientData {
  password: string;
  typeId: number;
}

import { IMessage } from './message.interface';

export interface IApiResult {
  message: string;
  status?: number;
  sequence?: string;
  accountNumber?: string;
}

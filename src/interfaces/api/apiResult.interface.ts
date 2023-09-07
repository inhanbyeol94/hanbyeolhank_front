import { IMessage } from './message.interface';

export interface IApiResult extends IMessage {
  status: number;
}

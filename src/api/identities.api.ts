import { IIdentityVerifyReqeust } from '../interfaces/api/identityVerifyReqeust.interface';
import { IMessage } from '../interfaces/api/message.interface';
import { IApiResult } from '../interfaces/api/apiResult.interface';
import { IIdentityVerify } from '../interfaces/api/identityVerify.interface';

export const identityVerifyReqeust = async (identity: IIdentityVerifyReqeust): Promise<IApiResult> => {
  const api = await fetch(`http://${process.env.REACT_APP_BANK_HOST}/identity`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(identity),
  });

  const { status } = await api;
  const { message }: IMessage = await api.json();

  return { message, status };
};

export const identityVerify = async (identity: IIdentityVerify): Promise<IApiResult> => {
  const api = await fetch(`${process.env.BANK_HOST}/identity`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(identity),
  });

  const { status } = await api;
  const { message }: IMessage = await api.json();

  return { message, status };
};

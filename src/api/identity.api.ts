import { IIdentityVerifyReqeust } from '../interfaces/api/identityVerifyReqeust.interface';
import { IMessage } from '../interfaces/api/message.interface';
import { IApiResult } from '../interfaces/api/apiResult.interface';
import { IIdentityVerify } from '../interfaces/api/identityVerify.interface';
import axios, { Axios, AxiosResponse } from 'axios';

const client: Axios = axios.create({
  baseURL: `http://${process.env.REACT_APP_BANK_HOST}`,
});
export const identityVerifyReqeust = async (apiData: IIdentityVerifyReqeust): Promise<IApiResult> => {
  const res: AxiosResponse<IApiResult> = await client.post('identity', apiData);
  return await res.data;
};

export const identityVerify = async (apiData: IIdentityVerify): Promise<IApiResult> => {
  const res: AxiosResponse<IApiResult> = await client.post('identity/verify', apiData);
  return await res.data;
};

import { IApiResult } from '../interfaces/api/apiResult.interface';
import { ICreateAccountData } from '../interfaces/api/createAccount.interface';
import axios, { Axios, AxiosResponse } from 'axios';
import { IAccountType } from '../interfaces/api/accountType.interface';

const client: Axios = axios.create({
  baseURL: `http://${process.env.REACT_APP_BANK_HOST}`,
});

export const findAccountType = async (): Promise<IAccountType> => {
  const res: AxiosResponse<IAccountType> = await client.get('account/type');
  return res.data;
};
export const createAccount = async (apiData: ICreateAccountData): Promise<IApiResult> => {
  const res: AxiosResponse<IApiResult> = await client.post('account', apiData);
  return await res.data;
};

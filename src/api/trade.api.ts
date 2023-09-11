import { IApiResult } from '../interfaces/api/apiResult.interface';
import { IDepositWithoutPassbook } from '../interfaces/api/depositWithoutPassbook.interface';
import axios, { Axios, AxiosResponse } from 'axios';
import { ITransfer } from '../interfaces/api/transfer.interface';
import { IBalanceinquiry } from '../interfaces/api/balanceinquiry.interface';

const client: Axios = axios.create({
  baseURL: `http://${process.env.REACT_APP_BANK_HOST}`,
});

export const depositWithoutPassbook = async (apiData: IDepositWithoutPassbook): Promise<IApiResult> => {
  const res: AxiosResponse<IApiResult> = await client.post('trade/deposit/without/passbook', apiData);
  return await res.data;
};

export const transfer = async (apiData: ITransfer): Promise<IApiResult> => {
  const res: AxiosResponse<IApiResult> = await client.post('trade/direct/deposit', apiData);
  return await res.data;
};

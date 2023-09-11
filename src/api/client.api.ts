import { IApiResult } from '../interfaces/api/apiResult.interface';
import { ICreateClientData } from '../interfaces/api/createClient.interface';
import axios, { Axios, AxiosResponse } from 'axios';

const client: Axios = axios.create({
  baseURL: `http://${process.env.REACT_APP_BANK_HOST}`,
});
export const createClient = async (apiData: ICreateClientData): Promise<IApiResult> => {
  const res: AxiosResponse<IApiResult> = await client.post('client', apiData);
  return await res.data;
};

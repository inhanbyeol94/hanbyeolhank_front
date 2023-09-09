import { IApiResult } from '../interfaces/api/apiResult.interface';
import { ICreateClientData } from '../interfaces/api/createClient.interface';

export const createClient = async (client: ICreateClientData): Promise<IApiResult> => {
  const api = await fetch(`http://${process.env.REACT_APP_BANK_HOST}/client`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(client),
  });

  const { status } = await api;
  const { message } = await api.json();

  return { message, status };
};

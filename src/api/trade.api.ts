import { IApiResult } from '../interfaces/api/apiResult.interface';
import { IDepositWithoutPassbook } from '../interfaces/api/depositWithoutPassbook.interface';

export const depositWithoutPassbook = async (depositWithoutPassbookData: IDepositWithoutPassbook): Promise<IApiResult> => {
  const api = await fetch(`http://${process.env.REACT_APP_BANK_HOST}/trade/deposit/without/passbook`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(depositWithoutPassbookData),
  });

  const { status } = await api;
  const result = await api.json();

  return { message: result.message, status };
};

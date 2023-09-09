import { useMutation } from '@tanstack/react-query';
import { IApiResult } from '../interfaces/api/apiResult.interface';
import { IDepositWithoutPassbook } from '../interfaces/api/depositWithoutPassbook.interface';
import { depositWithoutPassbook } from '../api/trade.api';
import { AxiosError } from 'axios';

export const useTradeQeuries = () => {
  const depositWithoutPassbookMutation = useMutation((info: IDepositWithoutPassbook) => depositWithoutPassbook(info), {
    onSuccess: (result: IApiResult) => {
      return result;
    },
    onError: (error: AxiosError<IApiResult>) => {
      return error;
    },
  });

  return {
    depositWithoutPassbookMutation,
  };
};

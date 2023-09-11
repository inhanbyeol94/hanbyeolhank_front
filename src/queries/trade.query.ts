import { useMutation } from '@tanstack/react-query';
import { IApiResult } from '../interfaces/api/apiResult.interface';
import { IDepositWithoutPassbook } from '../interfaces/api/depositWithoutPassbook.interface';
import { depositWithoutPassbook, transfer } from '../api/trade.api';
import { AxiosError } from 'axios';
import { ITransfer } from '../interfaces/api/transfer.interface';

export const useTradeQeuries = () => {
  const depositWithoutPassbookMutation = useMutation((data: IDepositWithoutPassbook) => depositWithoutPassbook(data), {
    onSuccess: (result: IApiResult) => {
      return result;
    },
    onError: (error: AxiosError<IApiResult>) => {
      return error;
    },
  });

  const transferMutation = useMutation((data: ITransfer) => transfer(data), {
    onSuccess: (result: IApiResult) => {
      return result;
    },
    onError: (error: AxiosError<IApiResult>) => {
      return error;
    },
  });

  return {
    depositWithoutPassbookMutation,
    transferMutation,
  };
};

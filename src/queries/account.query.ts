import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import { IApiResult } from '../interfaces/api/apiResult.interface';
import { ICreateAccountData } from '../interfaces/api/createAccount.interface';
import { balanceinquiry, createAccount, findAccountType } from '../api/account.api';
import { AxiosError } from 'axios';
import { IBalanceinquiry } from '../interfaces/api/balanceinquiry.interface';
import { ITrade } from '../interfaces/api/trade.interface';

export const useAccountQeuries = () => {
  const accountCreateMutation = useMutation((info: ICreateAccountData) => createAccount(info), {
    onSuccess: (result: IApiResult) => {
      return result;
    },
    onError: (error: AxiosError<IApiResult>) => {
      return error;
    },
  });

  const { data: findByAccountType } = useQuery(['accountType'], findAccountType);

  const balanceinquiryMutation = useMutation((info: IBalanceinquiry) => balanceinquiry(info), {
    onSuccess: (result: ITrade[]) => {
      return result;
    },
    onError: (error: AxiosError<IApiResult>) => {
      return error;
    },
  });

  return {
    accountCreateMutation,
    findByAccountType,
    balanceinquiryMutation,
  };
};

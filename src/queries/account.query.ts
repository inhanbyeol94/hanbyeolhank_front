import { useMutation } from '@tanstack/react-query';
import { IApiResult } from '../interfaces/api/apiResult.interface';
import { ICreateAccountData } from '../interfaces/api/createAccount.interface';
import { createAccount } from '../api/account.api';
import { AxiosError } from 'axios';

export const useAccountQeuries = () => {
  const accountCreateMutation = useMutation((info: ICreateAccountData) => createAccount(info), {
    onSuccess: (result: IApiResult) => {
      return result;
    },
    onError: (error: AxiosError<IApiResult>) => {
      return error;
    },
  });

  return {
    accountCreateMutation,
  };
};

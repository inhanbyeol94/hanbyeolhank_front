import { useMutation } from '@tanstack/react-query';
import { ICreateClientData } from '../interfaces/api/createClient.interface';
import { createClient } from '../api/client.api';
import { IApiResult } from '../interfaces/api/apiResult.interface';
import { AxiosError } from 'axios';

export const useClientQeuries = () => {
  const create = useMutation((info: ICreateClientData) => createClient(info), {
    onSuccess: (result: IApiResult) => {
      return result;
    },
    onError: (error: AxiosError<IApiResult>) => {
      return error;
    },
  });

  return {
    create,
  };
};

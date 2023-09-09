import { useMutation } from '@tanstack/react-query';
import { identityVerify, identityVerifyReqeust } from '../api/identity.api';
import { IIdentityVerifyReqeust } from '../interfaces/api/identityVerifyReqeust.interface';
import { IApiResult } from '../interfaces/api/apiResult.interface';
import { IIdentityVerify } from '../interfaces/api/identityVerify.interface';
import { AxiosError } from 'axios';

export const useIdentityQueries = () => {
  const identityRequestMutation = useMutation((info: IIdentityVerifyReqeust) => identityVerifyReqeust(info), {
    onSuccess: (result: IApiResult) => {
      return result;
    },
    onError: (error: AxiosError<IApiResult>) => {
      return error;
    },
  });

  const identityVerifyMutation = useMutation((info: IIdentityVerify) => identityVerify(info), {
    onSuccess: (result: IApiResult) => {
      return result;
    },
    onError: (error: AxiosError<IApiResult>) => {
      return error;
    },
  });

  return {
    identityRequestMutation,
    identityVerifyMutation,
  };
};

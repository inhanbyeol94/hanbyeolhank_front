import { useMutation, UseMutationResult, useQuery } from '@tanstack/react-query';
import { queryClient } from '../App';
import { identityVerify, identityVerifyReqeust } from '../api/identities.api';
import { IIdentityVerifyReqeust } from '../interfaces/api/identityVerifyReqeust.interface';
import { IApiResult } from '../interfaces/api/apiResult.interface';
import { useCreateClientStore } from '../store/createClient.store';
export const useIdentity = () => {
  const request = useMutation((info: IIdentityVerifyReqeust) => identityVerifyReqeust(info), {
    onSuccess: (result: IApiResult) => {
      return result;
    },
  });

  return {
    request,
  };
};

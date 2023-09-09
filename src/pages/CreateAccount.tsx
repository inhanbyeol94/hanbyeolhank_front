import React, { useEffect } from 'react';
import { IdentityVerifyComponent } from '../components/IdentityVerify.component';
import { useGlobalStore } from '../store/global.store';
import { IdentityVerifyRequestsComponent } from '../components/IdentityVerifyRequests.component';
import { CreateAccountSuccessComponent } from '../components/CreateAccountSuccess.component';
import { CreateAccountComponent } from '../components/CreateAccount.component';

const CreateAccount = () => {
  const { reset, status, setStep, setType } = useGlobalStore();

  useEffect(() => {
    /* 메뉴 이동 시 상태값 초기화 */
    reset();
    setStep([{ title: '본인확인 요청' }, { title: '본인확인 인증' }, { title: '예금계좌 개설' }, { title: '개설 완료' }]);
    setType(101);
  }, []);

  switch (status) {
    case 0:
      return <IdentityVerifyRequestsComponent />;
    case 1:
      return <IdentityVerifyComponent />;
    case 2:
      return <CreateAccountComponent />;
    case 4:
      return <CreateAccountSuccessComponent />;

    default:
      return <></>;
  }
};

export default CreateAccount;

import React, { useEffect } from 'react';
import { TransferComponent } from '../components/Transfer.component';
import { useGlobalStore } from '../store/global.store';
import { IdentityVerifyRequestsComponent } from '../components/IdentityVerifyRequests.component';
import { IdentityVerifyComponent } from '../components/IdentityVerify.component';
import { CreateClientComponent } from '../components/CreateClient.component';
import { ResultSuccessComponent } from '../components/ResultSuccess.component';

const Transfer = () => {
  const { reset, status, setStep, setType } = useGlobalStore();

  useEffect(() => {
    /* 메뉴 이동 시 상태값 초기화 */
    reset();
    setStep([{ title: '본인확인 요청' }, { title: '본인확인 인증' }, { title: '계좌이체 요청' }, { title: '이체 완료' }]);
    setType(106);
  }, []);

  switch (status) {
    case 0:
      return <IdentityVerifyRequestsComponent />;
    case 1:
      return <IdentityVerifyComponent />;
    case 2:
      return <TransferComponent />;
    case 4:
      return <ResultSuccessComponent />;

    default:
      return <></>;
  }
};

export default Transfer;

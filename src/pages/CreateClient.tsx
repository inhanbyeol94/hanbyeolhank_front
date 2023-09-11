import React, { useEffect } from 'react';
import { IdentityVerifyRequestsComponent } from '../components/IdentityVerifyRequests.component';
import { IdentityVerifyComponent } from '../components/IdentityVerify.component';
import { useGlobalStore } from '../store/global.store';
import { CreateClientComponent } from '../components/CreateClient.component';
import { ResultSuccessComponent } from '../components/ResultSuccess.component';

const CreateClient = () => {
  const { reset, status, setStep, setType } = useGlobalStore();

  useEffect(() => {
    /* 메뉴 이동 시 상태값 초기화 */
    reset();
    setStep([{ title: '본인확인 요청' }, { title: '본인확인 인증' }, { title: '고객 등록' }, { title: '등록 완료' }]);
    setType(100);
  }, []);

  switch (status) {
    case 0:
      return <IdentityVerifyRequestsComponent />;
    case 1:
      return <IdentityVerifyComponent />;
    case 2:
      return <CreateClientComponent />;
    case 4:
      return <ResultSuccessComponent />;

    default:
      return <></>;
  }
};

export default CreateClient;

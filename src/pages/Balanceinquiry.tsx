import React, { useEffect } from 'react';
import { BalanceinquiryComponent } from '../components/Balanceinquiry.component';
import { useGlobalStore } from '../store/global.store';
import { IdentityVerifyRequestsComponent } from '../components/IdentityVerifyRequests.component';
import { IdentityVerifyComponent } from '../components/IdentityVerify.component';
import { CreateAccountComponent } from '../components/CreateAccount.component';
import { ResultSuccessComponent } from '../components/ResultSuccess.component';

const Balanceinquiry = () => {
  const { reset, status, setStep, setType } = useGlobalStore();

  useEffect(() => {
    /* 메뉴 이동 시 상태값 초기화 */
    reset();
    setStep([{ title: '본인확인 요청' }, { title: '본인확인 인증' }, { title: '거래내역 조회' }]);
    setType(108);
  }, []);

  switch (status) {
    case 0:
      return <IdentityVerifyRequestsComponent />;
    case 1:
      return <IdentityVerifyComponent />;
    case 2:
      return <BalanceinquiryComponent />;

    default:
      return <></>;
  }
};

export default Balanceinquiry;

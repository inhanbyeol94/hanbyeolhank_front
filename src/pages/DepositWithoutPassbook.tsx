import React, { useEffect } from 'react';
import { useGlobalStore } from '../store/global.store';
import { DepositWithoutPassbookComponent } from '../components/DepositWithoutPassbook.component';
import { DepositWithoutPassbookSuccessComponent } from '../components/DepositWithoutPassbookSuccess.component';
import { IdentityVerifyRequestsComponent } from '../components/IdentityVerifyRequests.component';
import { IdentityVerifyComponent } from '../components/IdentityVerify.component';
import { CreateClientComponent } from '../components/CreateClient.component';
import { CreateClientSuccessComponent } from '../components/CreateClientSuccess.component';

const DespositWithoutPassbook = () => {
  const { reset, status, setStep } = useGlobalStore();

  useEffect(() => {
    /* 메뉴 이동 시 상태값 초기화 */
    reset();
    setStep([{ title: '무통장 입금 요청' }, { title: '입금 완료' }]);
  }, []);

  switch (status) {
    case 0:
      return <DepositWithoutPassbookComponent />;
    case 2:
      return <DepositWithoutPassbookSuccessComponent />;

    default:
      return <></>;
  }
};

export default DespositWithoutPassbook;

import { Result } from 'antd';
import React from 'react';
import { S } from '../styles/identityVerifyRequests.style';

export const DepositWithoutPassbookSuccessComponent = () => {
  /* Component */
  return (
    <>
      <S.Content>
        <S.Container>
          <Result status="success" title="무통장 입금이 완료되었습니다." subTitle="요청하신 계좌정보로 정상 입금 완료되었습니다." extra={[]} />
        </S.Container>
      </S.Content>
    </>
  );
};

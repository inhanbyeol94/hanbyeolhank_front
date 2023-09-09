import { Result } from 'antd';
import React from 'react';
import { S } from '../styles/identityVerifyRequests.style';

export const CreateClientSuccessComponent = () => {
  /* Component */
  return (
    <>
      <S.Content>
        <S.Container>
          <Result status="success" title="고객 등록이 완료되었습니다." subTitle="가입하신 정보로 예금계좌를 개설할 수 있습니다." extra={[]} />
        </S.Container>
      </S.Content>
    </>
  );
};

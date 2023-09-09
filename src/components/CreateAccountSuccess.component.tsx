import { Result, Input } from 'antd';
import React from 'react';
import { S } from '../styles/identityVerifyRequests.style';
import { AiOutlineAccountBook } from 'react-icons/ai';
import { useNotificationStore } from '../store/notification.store';
import { useGlobalStore } from '../store/global.store';

export const CreateAccountSuccessComponent = () => {
  /* Store */
  const { accountNumber } = useGlobalStore();

  /* Component */
  return (
    <>
      <S.Content>
        <S.Container>
          <Result
            status="success"
            title="예금계좌 개설이 완료되었습니다."
            subTitle="아래의 계좌번호를 확인 후 별도로 보관해주세요."
            extra={[<Input size="large" style={{ width: 200 }} prefix={<AiOutlineAccountBook />} value={accountNumber} readOnly={true} />]}
          />
        </S.Container>
      </S.Content>
    </>
  );
};

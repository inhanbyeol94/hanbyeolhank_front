import { Result, Input } from 'antd';
import React from 'react';
import { S } from '../styles/identityVerifyRequests.style';
import { AiOutlineAccountBook } from 'react-icons/ai';
import { useNotificationStore } from '../store/notification.store';
import { useGlobalStore } from '../store/global.store';

export const ResultSuccessComponent = () => {
  /* Store */
  const { accountNumber, successTitle, successSubtitle } = useGlobalStore();

  /* Component */
  return (
    <>
      <S.Content>
        <S.Container>
          <Result
            status="success"
            title={successTitle}
            subTitle={successSubtitle}
            extra={accountNumber ? <Input size="large" style={{ width: 200 }} prefix={<AiOutlineAccountBook />} value={accountNumber} readOnly={true} /> : null}
          />
        </S.Container>
      </S.Content>
    </>
  );
};

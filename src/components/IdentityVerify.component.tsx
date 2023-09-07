import { Button, notification, theme } from 'antd';
import React, { useState } from 'react';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { BsKey } from 'react-icons/bs';
import { S } from './identityVerify.style';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const IdentityVerifyComponent = () => {
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();

  const [api, contextHolder] = notification.useNotification();
  const [authCode, setAuthCode] = useState('');
  const [sequence, setSequence] = useState('');

  const openNotification = (type: NotificationType, placement: NotificationPlacement, title: string, description: string) => {
    api[type]({
      message: title,
      description: description,
      placement,
    });
  };

  const handleAuthCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthCode(e.target.value);
  };

  return (
    <>
      {contextHolder}
      <S.Content>
        <S.Container>
          <S.Title>인증번호를 입력해주세요.</S.Title>
          <S.SpaceCompact>
            <S.Input size="large" placeholder="000000" prefix={<BsKey />} maxLength={6} />
            <Button type="primary" size={'large'}>
              인증
            </Button>
          </S.SpaceCompact>
          <S.Explanation>입력하신 휴대폰 번호로 발송된 인증번호를 입력해주세요.</S.Explanation>
        </S.Container>
      </S.Content>
    </>
  );
};

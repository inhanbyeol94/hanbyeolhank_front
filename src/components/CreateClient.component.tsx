import { Button, Form } from 'antd';
import React, { useState } from 'react';
import { S } from '../styles/identityVerifyRequests.style';
import { useNotificationStore } from '../store/notification.store';
import { IApiResult } from '../interfaces/api/apiResult.interface';
import { useGlobalStore } from '../store/global.store';
import { AiOutlineIdcard, AiOutlinePhone, AiOutlineUser } from 'react-icons/ai';
import { useClientQeuries } from '../queries/client.query';

export const CreateClientComponent = () => {
  /* Form */
  const [form] = Form.useForm<any>();

  /* Query */
  const { create } = useClientQeuries();

  /* Store */
  const { showNotification } = useNotificationStore();
  const { setStatus, sequence, name, phone, residentRegistrationNumber, setSuccessTitle, setSuccessSubtitle } = useGlobalStore();

  /* State */
  const [isSubmit, setIsSubmit] = useState(false);

  /* Function */
  const createClient = () => {
    setIsSubmit(true);

    create.mutate(
      { name, phone, residentRegistrationNumber, sequence },
      {
        onSuccess: (result) => {
          setSuccessTitle(result.message);
          setSuccessSubtitle('등록이 완료된 고객님의 정보로 예금계좌를 생성할 수 있습니다.');
          setStatus(4);
        },
        onError: (error) => {
          setIsSubmit(false);
          if (!error.response) return showNotification('error', 'topRight', '실패', '서버가 응답하지 않거나, 잘못된 요청입니다.');
          return showNotification('error', 'topRight', '실패', error.response.data.message.replace('Bad Request Exception', '잘못된 요청입니다.'));
        },
      },
    );
  };

  /* Component */
  return (
    <>
      <S.Content>
        <S.Container>
          <Form form={form} initialValues={{ remember: true }} layout="vertical" style={{ width: 600 }} onFinish={createClient} autoComplete="off">
            <Form.Item name="name" label="이름" required={true}>
              <S.Input type="text" size="large" prefix={<AiOutlineUser />} maxLength={5} defaultValue={name} readOnly={true} />
            </Form.Item>
            <Form.Item name="phone" label="휴대폰 번호" required={true}>
              <S.Input size="large" prefix={<AiOutlinePhone />} defaultValue={phone} readOnly={true} />
            </Form.Item>
            <Form.Item name="residentRegistrationNumber" label="주민등록번호" required={true}>
              <S.Input size="large" prefix={<AiOutlineIdcard />} defaultValue={residentRegistrationNumber} maxLength={14} readOnly={true} />
            </Form.Item>
            <S.Explanation>인증된 정보로 등록할 수 있습니다.</S.Explanation>
            <Form.Item>
              <S.BtnBox>
                <Button type="primary" size={'large'} htmlType="submit" disabled={isSubmit}>
                  고객 등록
                </Button>
              </S.BtnBox>
            </Form.Item>
          </Form>
        </S.Container>
      </S.Content>
    </>
  );
};

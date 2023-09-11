import { Button, Form } from 'antd';
import React, { useState } from 'react';
import { BsKey } from 'react-icons/bs';
import { S } from '../styles/identityVerify.style';
import { useIdentityQueries } from '../queries/identity.query';
import { useNotificationStore } from '../store/notification.store';
import { IIdentityVerify } from '../interfaces/api/identityVerify.interface';
import { IApiResult } from '../interfaces/api/apiResult.interface';
import { useGlobalStore } from '../store/global.store';

export const IdentityVerifyComponent = () => {
  /* Form */
  const [form] = Form.useForm<IIdentityVerify>();

  /* Query */
  const { identityVerifyMutation } = useIdentityQueries();

  /* Store */
  const { showNotification } = useNotificationStore();
  const { setStatus, sequence, setSequence, phone } = useGlobalStore();

  /* State */
  const [isSubmit, setIsSubmit] = useState(false);

  /* Function */
  const identityVerify = (values: { code: string }) => {
    setIsSubmit(true);

    identityVerifyMutation.mutate(
      { phone, sequence, code: values.code },
      {
        onSuccess: (result: IApiResult) => {
          setStatus(2);
          setSequence(result.sequence || '');
          showNotification('success', 'topRight', '본인확인 인증', result.message);
        },
        onError: (error) => {
          setIsSubmit(false);
          if (!error.response) return showNotification('error', 'topRight', '실패', '서버가 응답하지 않거나, 잘못된 요청입니다.');
          return showNotification('error', 'topRight', '실패', error.response.data.message.replace('Bad Request Exception', '잘못된 요청입니다.'));
        },
      },
    );
  };

  /* Handler Function */
  const handleCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue('code', e.target.value.replace(/[^0-9]/g, ''));
  };

  /* Component */
  return (
    <>
      <S.Content>
        <S.Container>
          <Form form={form} initialValues={{ remember: true }} layout="vertical" style={{ width: 300 }} onFinish={identityVerify} autoComplete="off">
            <Form.Item name="code" label="인증번호" rules={[{ required: true, message: '인증번호를 입력해주세요.' }]}>
              <S.Input size="large" placeholder="123456" prefix={<BsKey />} maxLength={6} onChange={handleCode} />
            </Form.Item>
            <Form.Item style={{ textAlign: 'right' }}>
              <Button type="primary" size={'large'} htmlType="submit" disabled={isSubmit}>
                인증
              </Button>
            </Form.Item>
          </Form>
        </S.Container>
      </S.Content>
    </>
  );
};

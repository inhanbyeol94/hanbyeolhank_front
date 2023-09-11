import { Button, Form } from 'antd';
import React, { useState } from 'react';
import { AiOutlineIdcard, AiOutlinePhone, AiOutlineUser } from 'react-icons/ai';
import { S } from '../styles/identityVerifyRequests.style';
import { useIdentityQueries } from '../queries/identity.query';
import { useNotificationStore } from '../store/notification.store';
import { IIdentityVerifyReqeust } from '../interfaces/api/identityVerifyReqeust.interface';
import { useGlobalStore } from '../store/global.store';
import { IApiResult } from '../interfaces/api/apiResult.interface';
import { AxiosError } from 'axios';

export const IdentityVerifyRequestsComponent = () => {
  /* Form */
  const [form] = Form.useForm<IIdentityVerifyReqeust>();

  /* Query */
  const { identityRequestMutation } = useIdentityQueries();

  /* Store */
  const { showNotification } = useNotificationStore();
  const { setStatus, setSequence, setPhone, setName, setResidentRegistrationNumber, type } = useGlobalStore();

  /* State */
  const [isSubmit, setIsSubmit] = useState(false);

  /* Function */
  const sendAuthcode = (values: IIdentityVerifyReqeust) => {
    setIsSubmit(true);

    const { name, phone, residentRegistrationNumber } = values;

    identityRequestMutation.mutate(
      { name, residentRegistrationNumber, phone, type },
      {
        onSuccess: (result) => {
          setStatus(1);
          setSequence(result?.sequence || '');
          setPhone(phone);
          setName(name);
          setResidentRegistrationNumber(residentRegistrationNumber);
          return showNotification('success', 'topRight', '성공', result.message);
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
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue('name', e.target.value.replace(' ', ''));
  };

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue(
      'phone',
      e.target.value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
        .replace(/(\-{1,2})$/g, ''),
    );
  };

  const handleResidentRegistrationNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue(
      'residentRegistrationNumber',
      e.target.value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{0,6})(\d{0,7})$/g, '$1-$2')
        .replace(/-{1,2}$/g, ''),
    );
  };

  /* Component */
  return (
    <>
      <S.Content>
        <S.Container>
          <Form form={form} initialValues={{ remember: true }} layout="vertical" style={{ width: 600 }} onFinish={sendAuthcode} autoComplete="off">
            <Form.Item
              name="name"
              label="이름"
              rules={[
                { required: true, message: '이름을 입력해주세요.' },
                { pattern: /^[가-힣]+$/, message: '이름은 한글만 입력이 가능합니다.' },
              ]}
            >
              <S.Input type="text" size="large" placeholder="홍길동" prefix={<AiOutlineUser />} maxLength={5} onChange={handleName} />
            </Form.Item>
            <Form.Item name="phone" label="휴대폰 번호" rules={[{ required: true, pattern: /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/, message: '휴대폰 번호를 입력해주세요.' }]}>
              <S.Input size="large" placeholder="010-1234-5678" prefix={<AiOutlinePhone />} maxLength={13} onChange={handlePhone} />
            </Form.Item>
            <Form.Item
              name="residentRegistrationNumber"
              label="주민등록번호"
              rules={[{ required: true, pattern: /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))-[1-8][0-9]{6}$/, message: '주민등록번호를 입력해주세요.' }]}
            >
              <S.Input size="large" placeholder="940101-1******" prefix={<AiOutlineIdcard />} maxLength={14} onChange={handleResidentRegistrationNumber} />
            </Form.Item>

            <Form.Item>
              <S.BtnBox>
                <Button type="primary" size={'large'} htmlType="submit" disabled={isSubmit}>
                  인증번호 발송
                </Button>
              </S.BtnBox>
            </Form.Item>
          </Form>
        </S.Container>
      </S.Content>
    </>
  );
};

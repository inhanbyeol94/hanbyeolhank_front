import { Button, Form, Input, Select, Space } from 'antd';
import React, { useState } from 'react';
import { S } from '../styles/identityVerifyRequests.style';
import { useNotificationStore } from '../store/notification.store';
import { useGlobalStore } from '../store/global.store';
import { AiOutlineIdcard, AiOutlineLock, AiOutlinePhone, AiOutlineUser } from 'react-icons/ai';
import { ICreateAccountData } from '../interfaces/api/createAccount.interface';
import { useAccountQeuries } from '../queries/account.query';
import { IApiResult } from '../interfaces/api/apiResult.interface';
import { useTradeQeuries } from '../queries/trade.query';
import { ITransfer } from '../interfaces/api/transfer.interface';

const { Option } = Select;
export const TransferComponent = () => {
  /* Form */
  const [form] = Form.useForm<ITransfer>();

  /* Query */
  const { transferMutation } = useTradeQeuries();

  /* Store */
  const { showNotification } = useNotificationStore();
  const { setStatus, sequence, name, phone, residentRegistrationNumber, setAccountNumber, setSuccessTitle, setSuccessSubtitle } = useGlobalStore();

  /* State */
  const [isSubmit, setIsSubmit] = useState(false);

  /* Function */
  const transfer = (values: ITransfer) => {
    setIsSubmit(true);
    values.amount = +values.amount.toString().replace(/[^0-9]/g, '');

    const { accountNumber, password, amount, requestAccountNumber } = values;
    transferMutation.mutate(
      { accountNumber, password, amount, requestAccountNumber, name, phone, residentRegistrationNumber, sequence },
      {
        onSuccess: (result: IApiResult) => {
          setSuccessTitle(result.message);
          setSuccessSubtitle('계좌이체가 완료되었습니다.');
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

  /* Handler Function */

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue('password', e.target.value.replace(/[^0-9]/g, ''));
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue('requestName', e.target.value.replace(' ', ''));
  };

  const handleAccountNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue(
      'accountNumber',
      e.target.value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{0,6})(\d{0,2})(\d{0,6})$/g, '$1-$2-$3')
        .replace(/(\-{1,2})$/g, ''),
    );
  };

  const handleRequestAccountNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue(
      'requestAccountNumber',
      e.target.value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{0,6})(\d{0,2})(\d{0,6})$/g, '$1-$2-$3')
        .replace(/(\-{1,2})$/g, ''),
    );
  };

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue('amount', e.target.value.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ','));
  };

  /* Component */
  return (
    <>
      <S.Content>
        <S.Container>
          <Form form={form} initialValues={{ remember: true }} layout="vertical" style={{ width: 600 }} onFinish={transfer} autoComplete="off">
            <Space>
              <Form.Item name="name" label="이름" required={true}>
                <S.Input type="text" size="large" prefix={<AiOutlineUser />} maxLength={5} defaultValue={name} readOnly={true} />
              </Form.Item>
              <Form.Item name="phone" label="휴대폰 번호" required={true}>
                <S.Input size="large" prefix={<AiOutlinePhone />} defaultValue={phone} readOnly={true} />
              </Form.Item>
              <Form.Item name="residentRegistrationNumber" label="주민등록번호" required={true}>
                <S.Input size="large" prefix={<AiOutlineIdcard />} defaultValue={residentRegistrationNumber} maxLength={14} readOnly={true} />
              </Form.Item>
            </Space>
            <Space>
              <Form.Item name="accountNumber" label="계좌번호" rules={[{ required: true, pattern: /^\d{6}-\d{2}-\d{6}$/, message: '송금할 계좌번호를 입력해주세요.' }]}>
                <S.Input size="large" placeholder="000000-00-000000" prefix={<AiOutlineIdcard />} maxLength={16} onChange={handleAccountNumber} />
              </Form.Item>
              <Form.Item
                label="패스워드"
                name="password"
                required={true}
                rules={[
                  { required: true, message: '패스워드를 입력해주세요.' },
                  { pattern: /[0-9]$/, message: '비밀번호는 숫자로 입력해주세요.' },
                ]}
              >
                <Input.Password size="large" placeholder={'••••'} prefix={<AiOutlineLock />} maxLength={4} onChange={handlePassword} />
              </Form.Item>
              <Form.Item name="amount" label="출금 금액" rules={[{ required: true, message: '송금할 금액을 입력해주세요.' }]}>
                <S.Input size="large" placeholder="1,000,000" prefix={<AiOutlineIdcard />} maxLength={13} onChange={handleAmount} />
              </Form.Item>
            </Space>
            <Form.Item name="requestAccountNumber" label="상대방 계좌번호" rules={[{ required: true, pattern: /^\d{6}-\d{2}-\d{6}$/, message: '송금할 계좌번호를 입력해주세요.' }]}>
              <S.Input size="large" placeholder="000000-00-000000" prefix={<AiOutlineIdcard />} maxLength={16} onChange={handleRequestAccountNumber} />
            </Form.Item>

            <Form.Item>
              <S.BtnBox>
                <Button type="primary" size={'large'} htmlType="submit" disabled={isSubmit}>
                  계좌 개설
                </Button>
              </S.BtnBox>
            </Form.Item>
          </Form>
        </S.Container>
      </S.Content>
    </>
  );
};

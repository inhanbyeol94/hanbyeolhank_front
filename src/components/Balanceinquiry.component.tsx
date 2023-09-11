import { Button, Form, Input, Select, Space, Table } from 'antd';
import React, { useState } from 'react';
import { S } from '../styles/balanceinquiryComponent.style';
import { useNotificationStore } from '../store/notification.store';
import { useGlobalStore } from '../store/global.store';
import { AiOutlineIdcard, AiOutlineLock, AiOutlinePhone, AiOutlineUser } from 'react-icons/ai';
import { ICreateAccountData } from '../interfaces/api/createAccount.interface';
import { useAccountQeuries } from '../queries/account.query';
import { IApiResult } from '../interfaces/api/apiResult.interface';
import { useTradeQeuries } from '../queries/trade.query';
import { ITransfer } from '../interfaces/api/transfer.interface';
import { IBalanceinquiry } from '../interfaces/api/balanceinquiry.interface';
import { ITrade } from '../interfaces/api/trade.interface';
import { IResultBalanceinquiry } from '../interfaces/api/resultBalanceinquiry.interface';
export const BalanceinquiryComponent = () => {
  /* Form */
  const [form] = Form.useForm<IBalanceinquiry>();

  /* Query */
  const { balanceinquiryMutation } = useAccountQeuries();

  /* Store */
  const { showNotification } = useNotificationStore();
  const { setStatus, sequence, name, phone, residentRegistrationNumber, setAccountNumber, setSuccessTitle, setSuccessSubtitle } = useGlobalStore();

  /* State */
  const [isSubmit, setIsSubmit] = useState(false);
  const [data, setData] = useState<IResultBalanceinquiry[]>([]);

  /* Function */
  const balanceinquiry = (values: IBalanceinquiry) => {
    setIsSubmit(true);

    const { accountNumber, password } = values;
    balanceinquiryMutation.mutate(
      { accountNumber, password, name, phone, residentRegistrationNumber, sequence },
      {
        onSuccess: (result: ITrade[]) => {
          const currentAmounts: number[] = [];
          const reusltData: IResultBalanceinquiry[] = result.map((info, index) => {
            currentAmounts.push(info.status == 1 ? info.amount : info.amount * -1);
            return {
              key: index,
              date: new Date(info.createdAt).toLocaleString(),
              type: info.status == 1 ? '입금' : '출금',
              amount: `${info.amount.toLocaleString()}원`,
              log: info.logs[0].context,
              currentAmount: `${currentAmounts.reduce((acc, cur) => acc + cur, 0).toLocaleString()}원`,
            };
          });

          setData(reusltData.sort((a, b) => b.key - a.key));
          setIsSubmit(false);
        },
        onError: (error) => {
          setIsSubmit(false);
          if (!error.response) return showNotification('error', 'topRight', '실패', '서버가 응답하지 않거나, 잘못된 요청입니다.');
          console.log(error);
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

  /* Table Data */
  const columns = [
    {
      title: '날짜',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '구분',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '금액',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '기록',
      dataIndex: 'log',
      key: 'log',
    },
    {
      title: '잔액',
      dataIndex: 'currentAmount',
      key: 'currentAmount',
    },
  ];

  /* Component */
  return (
    <>
      <S.Content>
        <S.Container>
          <Form form={form} initialValues={{ remember: true }} layout="vertical" style={{ width: '90%' }} onFinish={balanceinquiry} autoComplete="off">
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
              <Form.Item name="accountNumber" label="계좌번호" rules={[{ required: true, pattern: /^\d{6}-\d{2}-\d{6}$/, message: '계좌번호를 입력해주세요.' }]}>
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
              <Form.Item label=" ">
                <S.BtnBox>
                  <Button type="primary" size={'large'} htmlType="submit" disabled={isSubmit}>
                    조회
                  </Button>
                </S.BtnBox>
              </Form.Item>
            </Space>
            <Table dataSource={data} columns={columns} pagination={{ pageSize: 9 }} />
          </Form>
        </S.Container>
      </S.Content>
    </>
  );
};

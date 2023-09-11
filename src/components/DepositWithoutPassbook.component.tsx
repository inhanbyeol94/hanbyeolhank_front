import { Button, Form } from 'antd';
import React, { useState } from 'react';
import { AiOutlineIdcard, AiOutlinePhone, AiOutlineUser } from 'react-icons/ai';
import { S } from '../styles/identityVerifyRequests.style';
import { useNotificationStore } from '../store/notification.store';
import { useGlobalStore } from '../store/global.store';
import { IDepositWithoutPassbook } from '../interfaces/api/depositWithoutPassbook.interface';
import { useTradeQeuries } from '../queries/trade.query';

export const DepositWithoutPassbookComponent = () => {
  /* Form */
  const [form] = Form.useForm<IDepositWithoutPassbook>();

  /* Query */
  const { depositWithoutPassbookMutation } = useTradeQeuries();

  /* Store */
  const { showNotification } = useNotificationStore();
  const { setStatus, setSuccessSubtitle, setSuccessTitle } = useGlobalStore();

  /* State */
  const [isSubmit, setIsSubmit] = useState(false);

  /* Function */
  const sendAuthcode = (values: IDepositWithoutPassbook) => {
    setIsSubmit(true);
    values.amount = +values.amount.toString().replace(/[^0-9]/g, '');

    const { requestName, requestPhone, accountNumber, amount } = values;

    depositWithoutPassbookMutation.mutate(
      { requestPhone, requestName, accountNumber, amount },
      {
        onSuccess: (result) => {
          setSuccessTitle(result.message);
          setSuccessSubtitle('무통장 입금이 정상 완료되었습니다.');
          return setStatus(2);
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
    form.setFieldValue('requestName', e.target.value.replace(' ', ''));
  };

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue(
      'requestPhone',
      e.target.value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
        .replace(/(\-{1,2})$/g, ''),
    );
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

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue('amount', e.target.value.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ','));
  };

  /* Component */
  return (
    <>
      <S.Content>
        <S.Container>
          <Form form={form} initialValues={{ remember: true }} layout="vertical" style={{ width: 600 }} onFinish={sendAuthcode} autoComplete="off">
            <Form.Item name="requestName" label="요청자 이름" rules={[{ required: true, pattern: /^[가-힣]+$/, message: '이름을 입력해주세요.' }]}>
              <S.Input type="text" size="large" placeholder="홍길동" prefix={<AiOutlineUser />} maxLength={5} onChange={handleName} />
            </Form.Item>
            <Form.Item
              name="requestPhone"
              label="요청자 휴대폰 번호"
              rules={[{ required: true, pattern: /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/, message: '휴대폰 번호를 입력해주세요.' }]}
            >
              <S.Input size="large" placeholder="010-1234-5678" prefix={<AiOutlinePhone />} maxLength={13} onChange={handlePhone} />
            </Form.Item>
            <Form.Item name="accountNumber" label="송금할 계좌번호" rules={[{ required: true, pattern: /^\d{6}-\d{2}-\d{6}$/, message: '송금할 계좌번호를 입력해주세요.' }]}>
              <S.Input size="large" placeholder="000000-00-000000" prefix={<AiOutlineIdcard />} maxLength={16} onChange={handleAccountNumber} />
            </Form.Item>
            <Form.Item name="amount" label="송금할 금액" rules={[{ required: true, message: '송금할 금액을 입력해주세요. (최대 송금가능 금액 9,999,999,999원)' }]}>
              <S.Input size="large" placeholder="1,000,000" prefix={<AiOutlineIdcard />} maxLength={13} onChange={handleAmount} />
            </Form.Item>

            <Form.Item>
              <S.BtnBox>
                <Button type="primary" size={'large'} htmlType="submit" disabled={isSubmit}>
                  입금 요청
                </Button>
              </S.BtnBox>
            </Form.Item>
          </Form>
        </S.Container>
      </S.Content>
    </>
  );
};

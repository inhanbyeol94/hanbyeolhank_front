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
  const { setStatus, setSequence, setPhone, setName, setResidentRegistrationNumber, type } = useGlobalStore();

  /* State */
  const [isSubmit, setIsSubmit] = useState(false);

  /* Function */
  const sendAuthcode = (values: IDepositWithoutPassbook) => {
    setIsSubmit(true);

    const { requestName, requestPhone, accountNumber, amount } = values;

    depositWithoutPassbookMutation.mutateAsync(
      { requestPhone, requestName, accountNumber, amount },
      {
        onSuccess: (result) => {
          if (result.status !== 201) {
            setIsSubmit(false);
            return showNotification('error', 'topRight', '무통장 입금 요청', result.message);
          }
          return setStatus(2);
        },
      },
    );
  };

  /* Component */
  return (
    <>
      <S.Content>
        <S.Container>
          <Form form={form} initialValues={{ remember: true }} layout="vertical" style={{ width: 600 }} onFinish={sendAuthcode} autoComplete="off">
            <Form.Item
              name="requestName"
              label="요청자 이름"
              rules={[
                { required: true, message: '이름을 입력해주세요.' },
                { pattern: /^[가-힣]+$/, message: '이름은 한글만 입력이 가능합니다.' },
              ]}
            >
              <S.Input type="text" size="large" placeholder="홍길동" prefix={<AiOutlineUser />} maxLength={5} />
            </Form.Item>
            <Form.Item
              name="requestPhone"
              label="요청자 휴대폰 번호"
              rules={[
                { required: true, message: '휴대폰 번호를 입력해주세요.' },
                { pattern: /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/, message: '하이픈(-)을 포함한 휴대폰 번호를 입력해주세요.' },
              ]}
            >
              <S.Input size="large" placeholder="010-1234-5678" prefix={<AiOutlinePhone />} />
            </Form.Item>
            <Form.Item name="accountNumber" label="송금할 계좌번호" rules={[{ required: true, message: '송금할 계좌번호를 입력해주세요.' }]}>
              <S.Input size="large" placeholder="000000-00-000000" prefix={<AiOutlineIdcard />} maxLength={16} />
            </Form.Item>
            <Form.Item name="amount" label="송금할 금액" rules={[{ required: true, message: '송금할 금액을 입력해주세요.' }]}>
              <S.Input size="large" placeholder="1,000,000" prefix={<AiOutlineIdcard />} maxLength={14} />
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

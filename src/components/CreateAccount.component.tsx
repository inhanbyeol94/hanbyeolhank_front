import { Button, Form, Input, Select } from 'antd';
import React, { useState } from 'react';
import { S } from '../styles/identityVerifyRequests.style';
import { useNotificationStore } from '../store/notification.store';
import { useGlobalStore } from '../store/global.store';
import { AiOutlineLock } from 'react-icons/ai';
import { ICreateAccountData } from '../interfaces/api/createAccount.interface';
import { useAccountQeuries } from '../queries/account.query';
import { IApiResult } from '../interfaces/api/apiResult.interface';

const { Option } = Select;
export const CreateAccountComponent = () => {
  /* Form */
  const [form] = Form.useForm<ICreateAccountData>();

  /* Query */
  const { accountCreateMutation } = useAccountQeuries();

  /* Store */
  const { showNotification } = useNotificationStore();
  const { setStatus, sequence, name, phone, residentRegistrationNumber, setAccountNumber } = useGlobalStore();

  /* State */
  const [isSubmit, setIsSubmit] = useState(false);

  /* Function */
  const createClient = (values: { password: string; typeId: number }) => {
    setIsSubmit(true);

    const { password, typeId } = values;
    accountCreateMutation.mutate(
      { name, phone, residentRegistrationNumber, sequence, password, typeId },
      {
        onSuccess: (result: IApiResult) => {
          if (result.status !== 201) {
            setIsSubmit(false);
            return showNotification('error', 'topRight', '고객 등록', result.message);
          }
          setAccountNumber(result.accountNumber as string);
          setStatus(4);
        },
      },
    );
  };

  const handleTypeId = (value: any) => {
    form.setFieldValue('typeId', value);
  };

  /* Component */
  return (
    <>
      <S.Content>
        <S.Container>
          <Form form={form} initialValues={{ remember: true }} layout="vertical" style={{ width: 600 }} onFinish={createClient} autoComplete="off">
            {/*<Form.Item name="name" label="이름" required={true} rules={[{ required: true, message: '이름을 입력해주세요.' }]}>*/}
            {/*  <S.Input type="text" size="large" prefix={<AiOutlineUser />} maxLength={5} defaultValue={name} readOnly={true} />*/}
            {/*</Form.Item>*/}
            {/*<Form.Item name="phone" label="휴대폰 번호" required={true} rules={[{ required: true, message: '휴대폰 번호를 입력해주세요.' }]}>*/}
            {/*  <S.Input size="large" prefix={<AiOutlinePhone />} defaultValue={phone} readOnly={true} />*/}
            {/*</Form.Item>*/}
            {/*<Form.Item name="residentRegistrationNumber" label="주민등록번호" required={true} rules={[{ required: true, message: '주민등록번호를 입력해주세요.' }]}>*/}
            {/*  <S.Input size="large" prefix={<AiOutlineIdcard />} defaultValue={residentRegistrationNumber} maxLength={14} readOnly={true} />*/}
            {/*</Form.Item>*/}
            <Form.Item label="예금계좌 구분" name="typeId" required={true}>
              <Select size={'large'} onChange={handleTypeId} placeholder="예금계좌의 타입을 선택해주세요.">
                <Option value="1">내일배움캠프 예금전용 계좌 전국민</Option>
              </Select>
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
              <Input.Password size="large" placeholder={'••••'} prefix={<AiOutlineLock />} maxLength={4} />
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

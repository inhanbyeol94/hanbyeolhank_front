import { Button, Input, notification, theme } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { AiOutlineLock, AiOutlinePhone, AiOutlineUser } from 'react-icons/ai';
import { S } from './identityVerifyRequests.style';
import { useIdentity } from '../queries/identity.query';
import { IApiResult } from '../interfaces/api/apiResult.interface';
import { useNotificationStore } from '../store/notification.store';

export const IdentityVerifyRequestsComponent = () => {
  const { showNotification } = useNotificationStore();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [residentRegistrationNumber, setResidentRegistrationNumber] = useState('');
  const [viewResidentRegistrationNumber, setViewResidentRegistrationNumber] = useState('');
  const [result, setResult] = useState<undefined | IApiResult>(undefined);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const { request } = useIdentity();

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(
      e.target.value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
        .replace(/(\-{1,2})$/g, ''),
    );
  };
  const handleResidentRegistrationNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setViewResidentRegistrationNumber(
      e.target.value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{0,6})(\d{0,7})$/g, '$1-$2')
        .replace(/-{1,2}$/g, ''),
    );

    setResidentRegistrationNumber(
      e.target.value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{0,6})(\d{0,7})$/g, '$1-$2')
        .replace(/-{1,2}$/g, ''),
    );
  };

  // useEffect(() => {
  //   if (isButtonClicked) {
  //     console.log(isButtonClicked);
  //     if (!name) return showNotification('error', 'topRight', '입력 필요', '실명을 입력해주세요.');
  //     if (!/[가-힣]/.test(name)) return showNotification('error', 'topRight', '잘못된 정보', '이름은 한글만 입력이 가능합니다.');
  //
  //     if (!phone) return showNotification('error', 'topRight', '입력 필요', '본인 명의 휴대폰번호를 입력해주세요.');
  //
  //     if (!residentRegistrationNumber) return showNotification('error', 'topRight', '입력 필요', '주민등록번호를 입력해주세요.');
  //   }
  // }, [isButtonClicked]);

  // const sendAuthcode = useCallback(() => {
  //   /* API 요청 */
  //   request.mutate({ name, residentRegistrationNumber, phone, type: 100 });
  //
  //   setResult(request.data);
  //   if (!result?.status || !result?.message) return showNotification('error', 'topRight', '실패', '잘못된 요청입니다.');
  //
  //   if (result.status !== 200) return showNotification('error', 'topRight', '실패', result.message);
  //   return showNotification('success', 'topRight', '인증', result.message);
  // }, [result]);

  const sendAuthcode = () => {
    /* API 요청 */
    request.mutateAsync({ name, residentRegistrationNumber, phone, type: 100 });
    console.log(request.data);
    setResult(request.data);
  };

  useEffect(() => {
    if (isButtonClicked) {
      if (!result?.status || !result?.message) return showNotification('error', 'topRight', '실패', '잘못된 요청입니다.');
      if (result.status !== 200) return showNotification('error', 'topRight', '실패', result.message);
      return showNotification('success', 'topRight', '인증', result.message);
    }
  }, [result, isButtonClicked]);

  return (
    <>
      <S.Content>
        <S.Container>
          <S.Title>본인확인 인증이 필요합니다.</S.Title>
          <S.Input type="text" size="large" placeholder="홍길동" prefix={<AiOutlineUser />} onChange={handleName} value={name} maxLength={5} />
          <Input size="large" placeholder="010-1234-5678" prefix={<AiOutlinePhone />} style={{ marginBottom: 12 }} onChange={handlePhone} value={phone} />
          <Input
            size="large"
            placeholder="940101-1******"
            prefix={<AiOutlineLock />}
            onChange={handleResidentRegistrationNumber}
            maxLength={14}
            value={viewResidentRegistrationNumber}
          />
          <S.Explanation>주민등록번호의 뒷자리는 모의로 입력해주세요.</S.Explanation>
          <div>
            <Button
              type="primary"
              size={'large'}
              onClick={() => {
                setIsButtonClicked(true);
                name && phone && residentRegistrationNumber && sendAuthcode();
              }}
            >
              인증번호 발송
            </Button>
          </div>
        </S.Container>
      </S.Content>
    </>
  );
};

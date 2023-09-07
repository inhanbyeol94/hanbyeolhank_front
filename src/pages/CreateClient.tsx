import React, { useEffect, useState } from 'react';
import { Button, Input, Layout, notification, theme } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import { AiOutlineLock, AiOutlinePhone, AiOutlineUser } from 'react-icons/ai';
import { useCreateClientStore } from '../store/createClient.store';
import { IdentityVerifyRequestsComponent } from '../components/IdentityVerifyRequests.component';
import { useIdentityVerifyStore } from '../store/identityVerify.store';

const CreateClient = () => {
  const { status, setStatus } = useCreateClientStore();
  const { setSequence, setPhone } = useIdentityVerifyStore();

  useEffect(() => {
    /* 메뉴 이동 시 상태값 초기화 */
    setStatus(0);
    setSequence('');
    setPhone('');
  }, []);

  return <>{status == 0 ? <IdentityVerifyRequestsComponent /> : null}</>;
};

export default CreateClient;

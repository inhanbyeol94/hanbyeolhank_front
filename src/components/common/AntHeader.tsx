import React from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, notification, Steps, theme } from 'antd';
import { useSidebarStore } from '../../store/sidebar.store';
import { Notification } from '../utils/Notification';
import { useGlobalStore } from '../../store/global.store';

const { Header, Sider, Content } = Layout;

const AntHeader = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { toggle, setToggle } = useSidebarStore();
  const { status, step } = useGlobalStore();
  const [api, contextHolder] = notification.useNotification();

  const handleSidebarToggle = () => {
    setToggle(toggle ? false : true);
  };

  return (
    <>
      <Notification />
      <Header style={{ padding: 0, background: colorBgContainer, height: '7vh' }}>
        <Button
          type="text"
          icon={toggle ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={handleSidebarToggle}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />
      </Header>
      <Steps current={status} style={{ height: '7vh', padding: '2vh 50px 1vh 50px' }} items={step} />
    </>
  );
};

export default AntHeader;

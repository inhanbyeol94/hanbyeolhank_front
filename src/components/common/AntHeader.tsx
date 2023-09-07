import React, { useState } from 'react';
import {
  AccountBookOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoneyCollectOutlined,
  SearchOutlined,
  SwapOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, notification } from 'antd';
import { useSidebarStore } from '../../store/sidebar.store';
import { Notification } from '../utils/Notification';

const { Header, Sider, Content } = Layout;

const AntHeader = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { toggle, setToggle } = useSidebarStore();
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
    </>
  );
};

export default AntHeader;

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
import { Layout, Menu, Button, theme } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSidebarStore } from '../../store/sidebar.store';

const { Header, Sider, Content } = Layout;

const AntLayout: React.FC = () => {
  const navigate = useNavigate();
  const path = useLocation().pathname.replace('/', '') || 'client';

  const { toggle, setToggle } = useSidebarStore();

  const createClient = () => {
    navigate('/');
  };

  const createAccount = () => {
    navigate('/account');
  };

  return (
    <Sider trigger={null} collapsible collapsed={toggle}>
      <div className="subLogo" />
      <Menu
        style={{ height: '90vh' }}
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[path]}
        items={[
          {
            key: 'client',
            icon: <UserOutlined />,
            label: '고객 등록',
            onClick: () => navigate('/'),
          },
          {
            key: 'account',
            icon: <AccountBookOutlined />,
            label: '예금계좌 생성',
            onClick: () => navigate('/account'),
          },
          {
            key: 'tranfer/nopassbook',
            icon: <MoneyCollectOutlined />,
            label: '무통장 입금',
            onClick: () => navigate('/tranfer/nopassbook'),
          },
          {
            key: 'tranfer',
            icon: <SwapOutlined />,
            label: '계좌이체',
            onClick: () => navigate('/tranfer'),
          },
          {
            key: 'balanceinquiry',
            icon: <SearchOutlined />,
            label: '잔액 조회',
            onClick: () => navigate('/balanceinquiry'),
          },
        ]}
      />
    </Sider>
  );
};

export default AntLayout;

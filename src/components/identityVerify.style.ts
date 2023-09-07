import styled from 'styled-components';
import { Button, Input, Layout, notification, Space } from 'antd';

const { Header, Sider, Content } = Layout;

export const S = {
  Content: styled(Content)`
    margin: 2vh;
    min-height: 280px;
    height: 89vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  Container: styled.div`
    gap: 10px;
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  Title: styled.span`
    font-size: 16px;
  `,
  SpaceCompact: styled(Space.Compact)`
    width: 100%;
  `,
  Input: styled(Input)`
    margin-bottom: 12px;
  `,
  Explanation: styled.span`
    color: #7f8487;
    margin-bottom: 20px;
  `,
};

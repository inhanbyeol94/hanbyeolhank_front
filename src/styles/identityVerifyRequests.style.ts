import styled from 'styled-components';
import { Button, Input, Layout, notification } from 'antd';

const { Header, Sider, Content } = Layout;

export const S = {
  Content: styled(Content)`
    margin: 2vh 2vh 0 2vh;
    min-height: 280px;
    height: 75vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 10px;
  `,
  Container: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  Title: styled.span`
    font-size: 16px;
    margin-bottom: 15px;
  `,
  Input: styled(Input)`
    //margin-bottom: 12px;
    //margin-top: 12px;
  `,
  Explanation: styled.span`
    color: #7f8487;
    margin: 10px 0px;
  `,
  BtnBox: styled.div`
    text-align: right;
  `,
};

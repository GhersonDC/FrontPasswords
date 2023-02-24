import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Button, Avatar} from 'antd';
import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import { Col, Row } from 'antd';
// import Cookies from "universal-cookie";
import CompartidoPage from './CompartidoPage';

// const cookies = new Cookies();

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('Passwords', '1', <PieChartOutlined />),
  getItem('Compartidos', '2', <DesktopOutlined />),
  getItem('Invitaciones', 'sub1', <UserOutlined />, [
    getItem('Historial', '3'),
    getItem('Activas', '4'),
  ]),
  getItem('Exportacion', '5', <FileOutlined />),
];
// Menu for values from items array
const componentsSwitch = (key) => {
  switch (key) {
    case '1':
      console.log('1');
      return ;
    case '2':
      console.log('2');
      return <CompartidoPage/>;
    case '3':
      console.log('3');
      return ;
    case '4':
      console.log('4');
      return ;
    case '5':
      console.log('5');
      return ;
    default:
      break;
   }
  };
const MenuPage = () => {
  // define states
  const [selectedMenuItem, setSelectedMenuItem]= useState(false);

  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        {/* Assign states for Menu */}
        <Menu theme="dark" selectedKeys={selectedMenuItem} mode="inline" items={items} onClick={(e) => 
        setSelectedMenuItem(e.key)}>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        ><Row>
          <Col span={20}>
              
          </Col>
        <Col span={2}>
        <Button
          onClick={ async function signOut() {
            try {
                await Auth.signOut();
                window.location.href = "/";
            } catch (error) {
                console.log('error signing out: ', error);
            }
          }}
          style={{
            padding: 0,
            width:40
          }}
          ><LogoutOutlined/></Button>
        </Col>
        <Col span={2}>
          <Avatar style={{ backgroundColor: '#f56a00' , verticalAlign: 'middle' }} size="large" >
          </Avatar>
        </Col>
      </Row>
        </Header>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {/* display content based on switch */}
            {componentsSwitch(selectedMenuItem)}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Password 2023. Project Internal for ITESO Bootcamp
        </Footer>
      </Layout>
    </Layout>
  );
};
export default MenuPage;
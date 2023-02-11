import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Button, Avatar} from 'antd';
import React, { useState } from 'react';
import { Col, Row } from 'antd';
import Cookies from "universal-cookie";
import CompartidoPage from './CompartidoPage';

const cookies = new Cookies();

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
    getItem('Gherson', '3'),
    getItem('Nestor', '4'),
  ]),
  getItem('Exportacion', '9', <FileOutlined />),
];
const MenuPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
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
          style={{
            padding: 0,
          }}
          ><LogoutOutlined 
          style={
            {
              width:50
            }
          }/></Button>
        </Col>
        <Col span={2}>
          <Row>
        <Avatar style={{ backgroundColor: '#f56a00' , verticalAlign: 'middle' }} size="large" >
        </Avatar>
          </Row>
          <Row>

      {cookies.get('nombre')}
          </Row>
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
            Bill is a cat.
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
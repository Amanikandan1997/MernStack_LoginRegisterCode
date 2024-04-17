import React, { useState, useEffect } from 'react';
import { Layout, Menu, Typography } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MailOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import Crud from "./Crud"

const { Header, Sider, Content } = Layout;

const PersistentDrawerLeft = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error, e.g., redirect to login page
      }
    };

    if (token) {
      fetchUserData();
    } else {
      // Handle case when token is not available, e.g., redirect to login page
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    // Redirect to login page or any other action you prefer
    window.location.href = '/login';
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ backgroundColor: '#001529' }}>
        <div className="logo" style={{ height: '32px', margin: '16px', background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<InboxOutlined />}>
            Inbox
          </Menu.Item>
          <Menu.Item key="2" icon={<MailOutlined />}>
            Starred
          </Menu.Item>
          <Menu.Item key="3" icon={<MailOutlined />}>
            Send email
          </Menu.Item>
          <Menu.Item key="4" icon={<MailOutlined />}>
            Drafts
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'white' }}>
          {collapsed ? (
            <MenuUnfoldOutlined className="trigger" onClick={toggleCollapsed} />
          ) : (
            <MenuFoldOutlined className="trigger" onClick={toggleCollapsed} />
          )}
          <div>
            <span>Welcome, {userData && userData.name}</span>
          
          </div>
          <button onClick={handleLogout} style={{ color: 'white', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>Logout</button>
        </Header>
        <Content style={{ margin: '16px' }}>
        <Typography  style={{ marginLeft: '10px' ,fontWeight:"bold"}}>User Email:   {userData && userData.email}</Typography>
     
        </Content>
      </Layout>
    </Layout>
  );
};

export default PersistentDrawerLeft;

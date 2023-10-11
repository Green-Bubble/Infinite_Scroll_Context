import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  InfoCircleOutlined,
  ContactsOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header } = Layout;

function Navbar() {
  const [current, setCurrent] = useState('home');

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        onClick={handleClick}
        selectedKeys={[current]}
      >
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="about" icon={<InfoCircleOutlined />}>
          <Link to="/about">About</Link>
        </Menu.Item>
        <Menu.Item key="contact" icon={<ContactsOutlined />}>
          <Link to="/contact">Contact</Link>
        </Menu.Item>
        <Menu.Item key="userlist" icon={<UserOutlined />}>
          <Link to="/userlist">UserList</Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

export default Navbar;
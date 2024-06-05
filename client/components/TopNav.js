'use client'
import { HomeFilled, LoginOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Menu } from 'antd';
import Link from 'next/link';


function TopNav() {
  return (

        <Menu mode="horizontal">
          <Menu.Item key="1" icon={<HomeFilled /> }>
            <Link href="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<LoginOutlined/>}>
            <Link href="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<PlusCircleFilled/> }>
            <Link href="/register">Register</Link>
          </Menu.Item>
        </Menu>
  );
}

export default TopNav;

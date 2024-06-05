'use client'
import { HomeFilled, LoginOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Menu } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {useState , useEffect} from 'react';

function TopNav() {
  const path = usePathname();

  return (

        <Menu mode="horizontal">
          <Menu.Item key="/" className={path === "/" ? "text-primary" : ""} icon={<HomeFilled /> }>
            <Link href="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/login" className={path === "/login" ? "text-primary" : ""} icon={<LoginOutlined/>}>
            <Link href="/login">Login</Link>
          </Menu.Item>
          <Menu.Item key="/register" className={path === "/register" ? "text-primary" : ""} icon={<PlusCircleFilled/> }>
            <Link href="/register">Register</Link>
          </Menu.Item>
        </Menu>
  );
}

export default TopNav;

'use client'
import { CoffeeOutlined, DownOutlined, HomeFilled, LoginOutlined, LogoutOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Menu } from 'antd';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useContext } from 'react';
import { Context } from '../context'
import axios from 'axios';
import { toast } from 'react-toastify';
import SubMenu from 'antd/es/menu/SubMenu';
function TopNav() {
  const path = usePathname();
  const { state, dispatch } = useContext(Context);
  const router = useRouter();
  const { user } = state;

  const logout = async () => {
    dispatch({
      type: "LOGOUT"
    });
    window.localStorage.removeItem('user');
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/logout`);
    toast.success(data.message);
    router.push('/login');
  }
  return (

    <Menu mode="horizontal" theme='dark'>
      <Menu.Item key="/" className={path === "/" ? "text-primary" : ""} icon={<HomeFilled />}>
        <Link href="/">Home</Link>
      </Menu.Item>
      {
        user === null && (
          <>
            <Menu.Item key="/login" className={path === "/login" ? "text-primary" : ""} icon={<LoginOutlined />}>
              <Link href="/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="/register" className={path === "/register" ? "text-primary" : ""} icon={<PlusCircleFilled />}>
              <Link href="/register">Register</Link>
            </Menu.Item>
          </>
        )
      }
      {
        user !== null && (
          <SubMenu icon= {<DownOutlined />} style={{ marginLeft: 'auto' }} title = {user?.name}>

            <Menu.Item key="/logout" onClick={logout} icon={<LogoutOutlined />} >
            Logout
          </Menu.Item>
          </SubMenu>
        )
      }

    </Menu>
  );
}

export default TopNav;

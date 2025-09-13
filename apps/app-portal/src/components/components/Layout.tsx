import { Dropdown, Layout, Menu } from 'antd';
import useSWR from 'swr';
import { getUser } from '../common/apiClient';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Logo = require('../public/logo.svg');
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { DownOutlined, MenuOutlined } from '@ant-design/icons';
import Link from 'next/link';
import router from 'next/router';

const { Header, Content, Footer } = Layout;

const Pages = ['home', 'application', 'admin', 'logout'] as const;
type PageLayoutProps = {
  currentPage: typeof Pages[number];
};

export const PageLayout: React.FC<PageLayoutProps> = ({ currentPage, children }) => {
  const [navOpen, setNavOpen] = useState(false);
  const { data: user } = useSWR('/api/v1/user', getUser);
  const { data: session } = useSession();
  const andClose = (f: () => void) => () => {
    f();
    setNavOpen(false);
  };
  const signOutAndRouter = () => {
    signOut({
      callbackUrl: '/auth/signin',
    });
    router.push('/auth/signin');
  };

  return (
    <Layout className="layout">
      <div className={navOpen ? 'hamburger hamburger-open' : 'hamburger'}>
        <MenuOutlined className="icon" onClick={() => setNavOpen((prev) => !prev)} height={1} />
        {navOpen && (
          <Menu theme="dark" className="menu">
            <Menu.Item className="menu-item" key="home" onClick={andClose(() => router.push('/'))}>
              Dashboard
            </Menu.Item>
            <Menu.Item
              className="menu-item"
              key="application"
              onClick={andClose(() => router.push('/application'))}
            >
              Application
            </Menu.Item>
            {user?.data?.isAdmin && (
              <Menu.Item
                className="menu-item"
                key="admin"
                onClick={andClose(() => router.push('/admin'))}
              >
                Admin
              </Menu.Item>
            )}
            <Menu.Item className="menu-item" key="signout" onClick={signOutAndRouter}>
              Sign out
            </Menu.Item>
          </Menu>
        )}
      </div>
      <Header className="header">
        <div className="logo-container">
          <Image className="logo" src={Logo} alt="HackBeanpot logo" width={32} height={32} />
        </div>
        <Menu className="menu" theme="dark" mode="horizontal" selectedKeys={[currentPage]}>
          <Menu.Item key="home">
            <Link href="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="application">
            <Link href="/application">Application</Link>
          </Menu.Item>
          {user?.data?.isAdmin && (
            <Menu.Item key="admin">
              <Link href="/admin">Admin</Link>
            </Menu.Item>
          )}
        </Menu>
        <div className="user">
          <Dropdown
            className="user"
            overlay={
              <Menu theme={'light'}>
                <Menu.Item key="signout" onClick={signOutAndRouter}>
                  Sign out
                </Menu.Item>
              </Menu>
            }
          >
            <a className="ant-dropdown-link">
              {session?.user?.email ?? 'Not Logged In'} <DownOutlined />
            </a>
          </Dropdown>
        </div>
      </Header>
      <Content className="content-container">
        <div className="content">{children}</div>
      </Content>
      <Footer className="footer">
        If you have additional feedback, we would love to hear from you in this{' '}
        <b>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://docs.google.com/forms/d/e/1FAIpQLSfhz6MjZpdCmJdik0p5F7IrqZPTZQ7OLVydiCK_I0Lbzr3m4Q/viewform?usp=sf_link"
          >
            Feedback Form
          </a>
        </b>
      </Footer>
    </Layout>
  );
};

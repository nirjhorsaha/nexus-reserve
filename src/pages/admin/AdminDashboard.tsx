import React, { useState } from 'react';
import { Button, Layout, Menu, Tooltip, Col, Row } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { adminPaths } from '@/routes/adminRoute';
import { Footer } from 'antd/es/layout/layout';
import { LogoutOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/features/auth/authSlice';
import { Helmet, HelmetProvider } from "react-helmet-async";


const { Header, Sider, Content } = Layout;

const AdminDashboard: React.FC = () => {
  const location = useLocation(); // To highlight the active menu item
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const menuItems = adminPaths.map((route) => ({
    key: `/admin/${route.path}`,
    icon: route.icon,
    label: <Link to={`/admin/${route.path}`}>{route.name}</Link>,
  }));

  return (
    <Layout >
       <HelmetProvider>
                <Helmet>
                    <title>Admin Dashboard - Nexus Reserve</title>
                </Helmet>
            </HelmetProvider>
      {/* Sidebar */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={250}
        style={{ height: '100vh', position: 'sticky', top: '0', left: '0' }}
      >
         <div className="text-center text-white p-3 font-Nunito flex flex-col md:flex-row justify-center items-center">
          {!collapsed && (
            <span className='bg-slate-800 px-6 py-1 text-base rounded-lg md:px-10 md:py-2 md:text-lg'>
              Nexus Reserve
            </span>
          )}
        </div>

        {/* Generate menu items dynamically from adminPaths */}
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} items={menuItems} />
      </Sider>

      <Layout >
        <Header className="bg-white shadow-md flex justify-between items-center px-4">
          <div className="text-lg md:text-3xl mx-auto font-semibold text-gray-800" style={{ fontFamily: 'Nunito' }}>
            Admin Dashboard
          </div>
          <Tooltip title="Logout" placement="bottom">
            <Button
              type="text"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              size='large'
              className="text-red-500"
            />
          </Tooltip>
        </Header>

        <Content style={{ margin: '24px 16px 0' }}>
          <Row gutter={16}>
            <Col span={24}>
              <Outlet />
            </Col>
          </Row>
        </Content>

        <Footer className="text-center bg-gray-200 p-4" style={{ fontFamily: 'Nunito' }}>
          Nexus Reserve ©{new Date().getFullYear()} by Nirjhor
        </Footer>

      </Layout>
    </Layout>
  );
};

export default AdminDashboard;

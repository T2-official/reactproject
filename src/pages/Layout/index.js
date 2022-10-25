import { Layout, Menu, Popconfirm } from 'antd'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'

import { useStore } from '@/store'
import './index.scss'
const { Header, Sider } = Layout


const GeekLayout = () => {
  // 这里是当前浏览器上的路径地址
  const location = useLocation()
  const selectedKey = location.pathname

  // 获取用户数据
  const { userStore, loginStore } = useStore()
  useEffect(() => {
    try {
      userStore.getUserInfo()
    } catch { }
  }, [userStore])
  // console.log(userStore.userInfo.name);

  // login out
  const navigate = useNavigate()
  const onLogout = () => {
    loginStore.loginOut()
    navigate('/login')
  }
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userStore.userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onLogout}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            style={{ height: '100%', borderRight: 0 }}
            defaultSelectedKeys={[selectedKey]}
          //defaultSelectedKeys={['/']} // 注意key对应 但是这样是静态对应
          >
            <Menu.Item icon={<HomeOutlined />} key="/">
              <Link to="/">数据概览</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/article">
              <Link to="/article">内容管理</Link>
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="/publish">
              <Link to="/publish">发布文章</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由默认页面 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default GeekLayout
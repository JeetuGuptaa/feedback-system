import React from "react";
import { Layout, Menu } from 'antd';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import FeedbackPage from './pages/FeedbackPage';
import DashboardPage from './pages/DashboardPage';

const { Header, Content } = Layout;

export default function App() {
  return (
    <BrowserRouter>
      <Layout className="min-h-screen">
        <Header className="bg-white shadow-sm">
          <div className="container mx-auto flex items-center">
            <div className="text-xl font-bold mr-8 text-gray-800">Feedback System</div>
            <Menu mode="horizontal" defaultSelectedKeys={[window.location.pathname === '/dashboard' ? 'dashboard' : 'feedback']} className="flex-1">
              <Menu.Item key="feedback">
                <Link to="/">Submit Feedback</Link>
              </Menu.Item>
              <Menu.Item key="dashboard">
                <Link to="/dashboard">Dashboard</Link>
              </Menu.Item>
            </Menu>
          </div>
        </Header>
        <Content className="p-6 max-w-5xl mx-auto">
          <Routes>
            <Route path="/" element={<FeedbackPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}

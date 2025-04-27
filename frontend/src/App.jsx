import React from 'react';
import { Layout, Typography, Divider } from 'antd';
import FeedbackForm from './components/FeedbackForm';
import FeedbackDashboard from './components/FeedbackDashboard';

const { Header, Content } = Layout;
const { Title } = Typography;

export default function App() {
  return (
    <Layout className="min-h-screen">
      <Header className="bg-white shadow-sm">
        <Title level={3} className="text-center text-gray-800">User Feedback System</Title>
      </Header>

      <Content className="p-6 max-w-5xl mx-auto space-y-8">
        <FeedbackForm />
        <Divider />
        <FeedbackDashboard />
      </Content>
    </Layout>
  );
}

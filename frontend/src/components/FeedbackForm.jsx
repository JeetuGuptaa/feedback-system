import React, { useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { api } from "../services/api";

export default function FeedbackForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await api.post("/feedback", values);
      message.success("Feedback submitted successfully!");
      form.resetFields();
    } catch (error) {
      message.error("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: "Please enter your name",
            whitespace: true,
          },
        ]}
      >
        <Input placeholder="Your name" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, type: "email", message: "Enter a valid email" },
        ]}
      >
        <Input placeholder="you@example.com" />
      </Form.Item>

      <Form.Item name="category" label="Category" initialValue="suggestion">
        <Select>
          <Select.Option value="suggestion">Suggestion</Select.Option>
          <Select.Option value="bug report">Bug Report</Select.Option>
          <Select.Option value="feature request">Feature Request</Select.Option>
          <Select.Option value="other">Other</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="text"
        label="Feedback"
        rules={[
          {
            required: true,
            message: "Please share your feedback",
            whitespace: true,
          },
        ]}
      >
        <Input.TextArea rows={4} placeholder="Your feedback..." />
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={loading} block>
        Submit Feedback
      </Button>
    </Form>
  );
}

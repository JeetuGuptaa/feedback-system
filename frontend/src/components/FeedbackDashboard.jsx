import React, { useEffect, useState } from "react";
import { Table, Select, Spin } from "antd";
import { api } from "../services/api";

const { Option } = Select;

export default function FeedbackDashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20", "50"],
  });

  const fetchFeedback = async (pag, category) => {
    setLoading(true);
    try {
      const params = { page: pag.current, limit: pag.pageSize };
      if (category) params.category = category;

      const response = await api.get("/feedback", { params });
      const { feedbacks: data, meta } = response.data.data;

      setFeedbacks(data || []);
      setPagination((prev) => ({
        ...prev,
        current: meta.page,
        pageSize: meta.limit,
        total: meta.total,
      }));
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback(pagination, categoryFilter);
  }, [pagination.current, pagination.pageSize, categoryFilter]);

  const handleTableChange = (newPag) => {
    setPagination((prev) => ({
      ...prev,
      current: newPag.current,
      pageSize: newPag.pageSize,
    }));
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Category", dataIndex: "category", key: "category" },
    {
      title: "Submitted",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleString(),
    },
    { title: "Feedback", dataIndex: "text", key: "text" },
  ];

  return (
    <div className="space-y-4">
      <Select
        allowClear
        placeholder="Filter by category"
        onChange={(value) => {
          setCategoryFilter(value);
          setPagination((prev) => ({ ...prev, current: 1 }));
        }}
        className="w-48"
      >
        <Option value="suggestion">Suggestion</Option>
        <Option value="bug report">Bug Report</Option>
        <Option value="feature request">Feature Request</Option>
        <Option value="other">Other</Option>
      </Select>

      <Table
        columns={columns}
        dataSource={feedbacks}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
        rowKey="_id"
        scroll={{ x: true }}
      />
    </div>
  );
}

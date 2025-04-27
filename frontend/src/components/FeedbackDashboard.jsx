import React, { useEffect, useState } from 'react';
import { Table, Select, Spin } from 'antd';
import { api } from '../services/api';

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
    pageSizeOptions: ['5', '10', '20', '50'],
  });
  const [sorter, setSorter] = useState({ field: 'createdAt', order: 'descend' });

  const fetchFeedback = async () => {
    setLoading(true);
    try {
      const { current, pageSize } = pagination;
      const params = {
        page: current,
        limit: pageSize,
        sort: sorter.field,
        order: sorter.order === 'ascend' ? 'asc' : 'desc',
      };
      if (categoryFilter) params.category = categoryFilter;

      const response = await api.get('/feedback', { params });
      const { feedbacks: data, meta } = response.data.data;

      setFeedbacks(data);
      setPagination(prev => ({ ...prev, total: meta.total, current: meta.page, pageSize: meta.limit }));
    } catch (error) {
      console.error('Error fetching feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.current, pagination.pageSize, categoryFilter, sorter]);

  const handleTableChange = (pag, filters, sort) => {
    setPagination(prev => ({
      ...prev,
      current: pag.current,
      pageSize: pag.pageSize,
    }));

    if (sort && sort.field) {
      setSorter({ field: sort.field, order: sort.order });
    } else {
      setSorter({ field: 'createdAt', order: 'descend' });
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      sortOrder: sorter.field === 'name' ? sorter.order : null,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: true,
      sortOrder: sorter.field === 'email' ? sorter.order : null,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      sorter: true,
      sortOrder: sorter.field === 'category' ? sorter.order : null,
    },
    {
      title: 'Submitted',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: true,
      sortOrder: sorter.field === 'createdAt' ? sorter.order : null,
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'Feedback',
      dataIndex: 'text',
      key: 'text',
    },
  ];

  return (
    <div className="space-y-4">
      <Select
        allowClear
        placeholder="Filter by category"
        onChange={(value) => {
          setCategoryFilter(value);
          setPagination(prev => ({ ...prev, current: 1 }));
        }}
        className="w-48"
        defaultValue={""}
      >
        <Option value="">All</Option>
        <Option value="suggestion">Suggestion</Option>
        <Option value="bug report">Bug Report</Option>
        <Option value="feature request">Feature Request</Option>
        <Option value="other">Other</Option>
      </Select>

      {loading ? (
        <Spin />
      ) : (
        <Table
          columns={columns}
          dataSource={feedbacks}
          loading={loading}
          pagination={pagination}
          onChange={handleTableChange}
          rowKey="_id"
          scroll={{ x: true }}
        />
      )}
    </div>
  );
}


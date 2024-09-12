import React, { useState } from 'react';
import { Table, Button, Space, Input } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, EyeOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { TSlot } from '@/types';

type SlotTableComponentProps = {
  data: TSlot[];
  onUpdate: (slot: TSlot) => void;
  onDelete: (slotId: string) => void;
  isDeleting: boolean;
};

const SlotTable: React.FC<SlotTableComponentProps> = ({ data, onUpdate, onDelete, isDeleting }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter the data based on the search term
  const filteredData = data.filter((slot: TSlot) =>
    slot?.room?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    slot?.room?.roomNo?.toString().includes(searchTerm)
  );

  const columns: ColumnsType<TSlot> = [
    {
      title: 'Room Name',
      dataIndex: ['room', 'name'],
      key: 'roomName',
      align: 'center',
      sorter: (a, b) => a.room.name.localeCompare(b.room.name),
      className: 'font-Nunito',
    },
    {
      title: 'Room No.',
      dataIndex: ['room', 'roomNo'],
      key: 'roomNo',
      align: 'center',
      sorter: (a, b) => a.room.roomNo - b.room.roomNo,
      className: 'font-Nunito',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      align: 'center',
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      render: (date: string) => new Date(date).toLocaleDateString(),
      className: 'font-Nunito',
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      align: 'center',
      className: 'font-Nunito',
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
      align: 'center',
      className: 'font-Nunito',
    },
    {
      title: 'Status',
      dataIndex: 'isBooked',
      key: 'isBooked',
      align: 'center',
      className: 'font-Nunito',
      render: (isBooked: boolean) => (
        <span
          className={`py-1 px-3 rounded text-white ${isBooked ? 'bg-green-500' : 'bg-blue-500'}`}
        >
          {isBooked ? 'Booked' : 'Available'}
        </span>
      ),
    },
    {
      title: 'Deleted',
      dataIndex: 'isDeleted',
      key: 'isDeleted',
      align: 'center',
      className: 'font-Nunito',
      render: (isDeleted: boolean) => (
        <span
          className={`py-1 px-3 rounded text-white ${isDeleted ? 'bg-red-500' : 'bg-gray-500'}`}
        >
          {isDeleted ? 'Yes' : 'No'}
        </span>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      className: 'font-Nunito',
      render: (record: TSlot) => (
        <Space size="middle">
          <Button
            shape="round"
            icon={<EyeOutlined />}
            onClick={() => onUpdate(record)}
            className={`text-cyan-600 ${record.isDeleted ? 'bg-gray-300 cursor-not-allowed' : ''}`}
            aria-label="Update slot"
            disabled={record.isDeleted || record.isBooked}
          >
            Update
          </Button>
          <Button
            shape="round"
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record._id as string)}
            className="text-red-600"
            aria-label="Delete slot"
            loading={isDeleting}
            disabled={record.isDeleted || record.isBooked}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div >
      <div className="flex flex-row-reverse items-center justify-between mb-4">
      <div className="relative flex items-center">
          <Input
            placeholder="Search by Room Name or No"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10  w-full md:min-w-64 rounded-lg border border-gray-300 shadow-sm hover:border-blue-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300 ease-in-out"
          />
          {searchTerm && (
            <button
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              aria-label="Clear search"
            >
              <CloseCircleOutlined className="text-gray-500 hover:text-gray-700" />
            </button>
          )}
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="_id"
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default SlotTable;

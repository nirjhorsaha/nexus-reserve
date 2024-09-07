/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/ui/loading";
import { useGetAllSlotsQuery } from "@/redux/features/slot/slotApi";
import { TSlot } from "@/types/slot";
import { DeleteOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { Table, Button, Space } from 'antd';

const SlotManagement: React.FC = () => {
  const { data, isLoading, isError } = useGetAllSlotsQuery({});

  const handleAddSlot = () => {
    // Logic for adding a slot
  };

  const handleUpdate = (slot: TSlot) => {
    console.log(slot);
  };

  const handleDelete = (slotId: string) => {
    // Logic for deleting a slot
    console.log(`Delete slot with ID: ${slotId}`);
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error fetching slots. Please try again later.</div>;

  const columns = [
    {
      title: 'Room Name',
      dataIndex: ['room', 'name'], // Accessing nested 'room' object
      key: 'roomName',
    },
    {
      title: 'Room No.',
      dataIndex: ['room', 'roomNo'], // Accessing nested 'room' object
      key: 'roomNo',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: TSlot) => (
        <Space size="middle">
          <Button
            shape="round"
            icon={<EyeOutlined />}
            onClick={() => handleUpdate(record)}
            className="text-cyan-600"
            aria-label="Update slot"
          >
            Update
          </Button>
          <Button
            shape="round"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id as string)}
            className="text-red-600"
            aria-label="Delete slot"
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 font-Nunito">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Slot Management</h2>
        <Button
          shape="round"
          icon={<PlusOutlined />}
          onClick={handleAddSlot}
          type="primary"
          aria-label="Add new slot"
        >
          Add Slot
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data?.data}
        rowKey="_id"
      />
    </div>
  );
};

export default SlotManagement;

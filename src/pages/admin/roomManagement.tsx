/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Pagination, Button, Table, notification } from 'antd';
import { DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { useGetAllRoomsQuery, useDeleteRoomMutation, useCreateRoomMutation } from '@/redux/features/room/roomApi';
import { TRoom } from '@/types';
import Loading from '@/components/ui/loading';
import AddRoomModal from '@/components/Modal/AddRoomModal';
import DeleteModal from '@/components/Modal/DeleteModal';
import { AnimatePresence } from 'framer-motion';
import { ColumnsType } from 'antd/es/table';
import ErrorComponent from '@/components/ui/ErrorComponent';
import UpdateRoomsModal from '@/components/Modal/UpdateRoomModal';
import toast from 'react-hot-toast';
import { Helmet, HelmetProvider } from "react-helmet-async";


const RoomManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page

  const { data, error, isLoading } = useGetAllRoomsQuery({
    page: currentPage,
    limit: itemsPerPage,
  });

  const [viewingRoom, setViewingRoom] = useState<TRoom | null>(null);
  const [isAddRoomModalVisible, setIsAddRoomModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState<string | null>(null);

  const [deleteRoom] = useDeleteRoomMutation();
  const [createRoom] = useCreateRoomMutation();

  const handleSaveNewRoom = async (newRoom: TRoom) => {
    try {
      await createRoom(newRoom).unwrap();
      notification.success({
        message: 'Success',
        description: 'Room added successfully',
      });
      setIsAddRoomModalVisible(false);
    } catch (err: any) {
      const errorMessage = err?.data?.message || 'Failed to add room';
      notification.error({
        message: 'Error',
        description: errorMessage,
      });
    }
  };

  const handleDeleteRoom = (id: string) => {
    setRoomToDelete(id);
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (roomToDelete) {
      try {
        await deleteRoom(roomToDelete).unwrap();
        toast.success('Room deleted successfully.!')
        setRoomToDelete(null);

        // // Refetch the data after deletion
        // const { data: updatedData } = await refetch();
        // const totalItems = updatedData?.data?.meta.total || 0;
        // const totalPages = Math.ceil(totalItems / itemsPerPage);

        // // Adjust currentPage if needed
        // if (currentPage > totalPages) {
        //   setCurrentPage(totalPages > 0 ? totalPages : 1);
        // }
      } catch (err: any) {
        const errorMessage = err?.data?.message || 'Failed to delete room';
        toast.error(errorMessage)
      } finally {
        setIsDeleteModalVisible(false);
      }
    }
  };



  const handleCancelDelete = () => {
    setRoomToDelete(null);
    setIsDeleteModalVisible(false);
  };

  const handleUpdateDetails = (room: TRoom) => {
    setViewingRoom(room);
  };

  const handleModalClose = () => {
    setViewingRoom(null);
  };

  const handleAddRoom = () => {
    setIsAddRoomModalVisible(true);
  };

  const handleAddRoomModalClose = () => {
    setIsAddRoomModalVisible(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorComponent message='Error fetching rooms.! Please try again later.' />;
  }

  // Extract metadata
  const totalRooms = data?.data?.result || [];
  const meta = data?.data?.meta || {};
  const totalItems = meta.total || totalRooms.length;  // Total number of items from meta
  // const totalPage = meta.totalPage || Math.ceil(totalItems / itemsPerPage);  // Total number of pages

  const columns: ColumnsType<TRoom> = [
    {
      title: 'Room Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      className: 'font-Nunito'
    },
    {
      title: 'Room No.',
      dataIndex: 'roomNo',
      key: 'roomNo',
      align: 'center',
      className: 'font-Nunito'
    },
    {
      title: 'Floor No.',
      dataIndex: 'floorNo',
      key: 'floorNo',
      align: 'center',
      className: 'font-Nunito'
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      key: 'capacity',
      align: 'center',
      className: 'font-Nunito'
    },
    {
      title: 'Price Per Slot',
      className: 'font-Nunito',
      dataIndex: 'pricePerSlot',
      key: 'pricePerSlot',
      align: 'center',
      render: (text: number) => `$${text}`
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      className: 'font-Nunito',
      render: (record: TRoom) => (
        <div className="flex justify-center space-x-2">
          <Button
            shape="round"
            icon={<EyeOutlined />}
            onClick={() => handleUpdateDetails(record)}
            className="text-cyan-600"

          >
            Update
          </Button>
          <Button
            shape="round"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteRoom(record._id as string)}
            className="text-red-600"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Room Management - Nexus Reserve</title>
        </Helmet>
      </HelmetProvider>
      <div className="p-1 md:p-6 font-Nunito">
        <div className="flex flex-col md:flex-row md:justify-between mb-4">
          <h2 className="text-xl font-bold">Room Management</h2>
          <Button
            shape="default"
            icon={<PlusOutlined />}
            onClick={handleAddRoom}
            type="primary"
            aria-label="Add new Room"
            style={{ fontFamily: 'Nunito' }}>
            Add Room
          </Button>
        </div>

        {/* Rooms Table */}
        <Table
          dataSource={totalRooms}
          columns={columns}
          rowKey="_id"
          pagination={false}
          scroll={{ x: 'max-content' }}
        // Disable default pagination
        />

        {/* Pagination */}
        <div className="flex justify-end mt-4">
          <Pagination
            current={currentPage}
            pageSize={itemsPerPage}
            total={totalItems} // Total number of items
            onChange={handlePageChange} // Update current page on change
            showSizeChanger={false} // Hide size changer if not needed
            className="ant-pagination"
          />
        </div>


        {/* View Room Details Modal */}
        <AnimatePresence>
          {viewingRoom && (
            <UpdateRoomsModal
              visible={!!viewingRoom}
              room={viewingRoom}
              onClose={handleModalClose}
            />
          )}
          {isAddRoomModalVisible && (
            <AddRoomModal
              visible={isAddRoomModalVisible}
              onSave={handleSaveNewRoom}
              onClose={handleAddRoomModalClose}
            />
          )}
          {isDeleteModalVisible && (
            <DeleteModal
              visible={isDeleteModalVisible}
              onConfirm={handleConfirmDelete}
              onCancel={handleCancelDelete}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default RoomManagement;

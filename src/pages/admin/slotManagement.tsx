import React, { useState } from 'react';
// import ErrorComponent from "@/components/ui/ErrorComponent";
import Loading from "@/components/ui/loading";
import { useGetAllSlotsQuery, useDeleteSlotMutation } from "@/redux/features/slot/slotApi";
import toast from 'react-hot-toast';
import { TError, TSlot } from '@/types';
import DeleteModal from '@/components/Modal/DeleteModal';
import AddSlotModal from '@/components/Modal/AddSlotModal';
import UpdateSlotModal from '@/components/Modal/UpdateSlotModal';
import { useGetAllRoomsQuery } from '@/redux/features/room/roomApi';
import { Button } from 'antd';
import SlotTable from '@/components/table/SlotTable';
import { PlusOutlined } from '@ant-design/icons';
import { Helmet, HelmetProvider } from "react-helmet-async";


const SlotManagement: React.FC = () => {
  const { data, isLoading } = useGetAllSlotsQuery({});
  const [deleteSlot, { isLoading: isDeleting }] = useDeleteSlotMutation();
  const { data: roomsData } = useGetAllRoomsQuery({});
  console.log(roomsData);

  const [modalVisible, setModalVisible] = useState(false);
  const [slotToDelete, setSlotToDelete] = useState<string | null>(null);
  const [addSlotModalVisible, setAddSlotModalVisible] = useState(false);
  const [updateSlotModalVisible, setUpdateSlotModalVisible] = useState(false);
  const [slotToUpdate, setSlotToUpdate] = useState<TSlot | null>(null);


  const handleAddSlot = () => {
    setAddSlotModalVisible(true);
  };

  const handleUpdate = (slot: TSlot) => {
    setSlotToUpdate(slot);
    setUpdateSlotModalVisible(true);
  };

  const handleDelete = (slotId: string) => {
    setSlotToDelete(slotId);
    setModalVisible(true);
  };

  const confirmDelete = async () => {
    if (slotToDelete) {
      try {
        await deleteSlot(slotToDelete).unwrap();
        toast.success('Slot deleted successfully');
      } catch (err) {
        const error = err as TError;
        const errorMessage = error.data?.errorSources?.[0]?.message || 'There was an error deleting the slot.';
        toast.error(errorMessage);
      }
      setModalVisible(false);
      setSlotToDelete(null);
    }
  };

  const cancelDelete = () => {
    setModalVisible(false);
    setSlotToDelete(null);
  };

  if (isLoading) return <Loading />;
  // if (isError) return <ErrorComponent message="Error fetching slots! Please try again later." />;

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Slot Management - Nexus Reserve</title>
        </Helmet>
      </HelmetProvider>
      <div className="p-1 md:p-6 font-Nunito">
        <div className="flex flex-col md:flex-row md:justify-between mb-4">
          <h2 className="text-xl font-bold">Slot Management</h2>
          <Button
            shape="default"
            icon={<PlusOutlined />}
            onClick={handleAddSlot}
            type="primary"
            aria-label="Add new slot"
            style={{ fontFamily: 'Nunito' }}

          >
            Add Slot
          </Button>
        </div>

        <SlotTable
          data={data?.data || []}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />

        <AddSlotModal
          visible={addSlotModalVisible}
          onClose={() => setAddSlotModalVisible(false)}
          rooms={roomsData?.data?.result || []}
        />

        <DeleteModal
          visible={modalVisible}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          description="Are you sure you want to delete the slot?"
        />

        <UpdateSlotModal
          visible={updateSlotModalVisible}
          onClose={() => setUpdateSlotModalVisible(false)}
          slot={slotToUpdate}
          rooms={roomsData?.data?.result || []}
        />
      </div>
    </>
  );
};

export default SlotManagement;

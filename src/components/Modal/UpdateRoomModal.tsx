import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TError, TRoom } from '@/types';
import { useUpdateRoomMutation } from '@/redux/features/room/roomApi';
import RoomForm from '../Form/RoomForm';
import ImageUploader from '@/utils/ImageUploader';
import { CloseOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import toast from 'react-hot-toast';

interface UpdateRoomsModalProps {
    visible: boolean;
    room: TRoom | null;
    onClose: () => void;
}

const UpdateRoomsModal: React.FC<UpdateRoomsModalProps> = ({ visible, room, onClose }) => {
    const [form] = Form.useForm();
    const [imageList, setImageList] = useState<string[]>(room?.images || []);
    const [uploading, setUploading] = useState(false);
    const [updateRoom] = useUpdateRoomMutation();

    useEffect(() => {
        if (room) {
            form.setFieldsValue({
                name: room.name,
                roomNo: room.roomNo,
                floorNo: room.floorNo,
                capacity: room.capacity,
                pricePerSlot: room.pricePerSlot,
            });
            setImageList(room.images || []);
        }
    }, [room, form]);

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            const updatedRoom = {
                _id: room?._id,
                ...values,
                images: imageList,
            };
            await updateRoom({ id: updatedRoom._id, room: updatedRoom }).unwrap();
            toast.success('Room updated successfully')
            onClose();
        } catch (err) {
            const error = err as TError;
            const errorMessage = error.data?.errorSources?.[0]?.message || 'There was an error updating the slot.';
            toast.error(errorMessage);
            console.error("Failed to update room", err);
        }
    };

    if (!visible) return null;

    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50 font-Nunito"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
            // style={{ maxHeight: '90vh' }}

            >
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    <CloseOutlined />
                </button>
                <h2 className="text-2xl font-semibold mb-4">Update Room</h2>
                <div className="modal-content overflow-auto" style={{ maxHeight: 'calc(100vh - 150px)' }}>

                    <div className="mb-4">
                        <RoomForm form={form} room={room} />
                    </div>

                    <div className="mb-4">
                        <ImageUploader
                            imageList={imageList}
                            setImageList={setImageList}
                            uploading={uploading}
                            setUploading={setUploading}
                        />
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={handleSave}
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-blue-600"
                            disabled={uploading}
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg shadow-sm hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default UpdateRoomsModal;

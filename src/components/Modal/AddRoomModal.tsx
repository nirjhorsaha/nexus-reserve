import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import ImageUploader from '@/utils/ImageUploader';
import { TRoom } from '@/types';
import { CloseOutlined } from '@ant-design/icons';

interface AddRoomModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (values: TRoom) => void;
}

const AddRoomModal: React.FC<AddRoomModalProps> = ({ visible, onClose, onSave }) => {
  const [formData, setFormData] = useState<TRoom>({
    name: '',
    roomNo: 0,
    floorNo: 0,
    capacity: 0,
    pricePerSlot: 0,
    amenities: [],
    images: [],
    isDeleted: false
  });

  const [imageList, setImageList] = useState<string[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);

  // Generate room numbers based on the selected floor
  const roomOptions = useMemo(() => {
    if (formData.floorNo === 0) return [];
    const roomNoPattern = formData.floorNo * 100 + 100
    const roomNoStart = roomNoPattern + 1;
    // const roomNoEnd = roomNoStart + 9;
    return Array.from({ length: 10 }, (_, i) => roomNoStart + i);


  }, [formData.floorNo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericFields = ['roomNo', 'floorNo', 'capacity', 'pricePerSlot'];
    const newValue = numericFields.includes(name) ? parseFloat(value) : value;

    setFormData(prev => ({ ...prev, [name]: newValue }));
  };

  const handleFloorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const floorNo = parseFloat(e.target.value);
    setFormData(prev => ({ ...prev, floorNo, roomNo: 0 })); // Reset roomNo when floor changes
  };

  const handleRoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, roomNo: parseFloat(e.target.value) }));
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave({ ...formData, images: imageList });
      resetForm();
      onClose();
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const handleAmenityChange = (index: number, value: string) => {
    const updatedAmenities = [...formData.amenities];
    updatedAmenities[index] = value;
    setFormData(prev => ({ ...prev, amenities: updatedAmenities }));
  };

  const addAmenity = () => {
    setFormData(prev => ({ ...prev, amenities: [...prev.amenities, ''] }));
  };

  const removeAmenity = (index: number) => {
    const updatedAmenities = formData.amenities.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, amenities: updatedAmenities }));
  };

  const validateForm = () => {
    return formData.name && formData.roomNo && formData.floorNo &&
      formData.capacity > 0 && formData.pricePerSlot >= 0;
  };

  const resetForm = () => {
    setFormData({
      name: '',
      roomNo: 0,
      floorNo: 0,
      capacity: 0,
      pricePerSlot: 0,
      amenities: [],
      images: [],
      isDeleted: false
    });
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
      >
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
          aria-label="Close modal"
        >
          <CloseOutlined />
        </button>
        <h2 className="text-2xl font-semibold mb-4">Add New Room</h2>
        <form>
          <label className="block mb-4">
            <span className="block text-gray-800 font-medium mb-2">Room Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-400 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />
          </label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
            <label>
              <span className="block text-gray-800 font-medium mb-2">Floor No.</span>
              <select
                name="floorNo"
                value={formData.floorNo}
                onChange={handleFloorChange}
                className="w-full border border-gray-400 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              >
                <option value={0} disabled>Select floor</option>
                {Array.from({ length: 10 }, (_, i) => i + 1).map(floor => (
                  <option key={floor} value={floor}>
                    Floor {floor}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="block text-gray-800 font-medium mb-2">Room No.</span>
              <select
                name="roomNo"
                value={formData.roomNo}
                onChange={handleRoomChange}
                className="w-full border border-gray-400 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                disabled={formData.floorNo === 0} // Disable room dropdown if no floor is selected
                required
              >
                <option value={0} disabled>Select room</option>
                {roomOptions.map(roomNo => (
                  <option key={roomNo} value={roomNo}>
                    {roomNo}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
            <label>
              <span className="block text-gray-800 font-medium mb-2">Capacity</span>
              <input
                type="number"
                name="capacity"
                value={formData.capacity || ''}
                onChange={handleChange}
                min={1}
                className="w-full border border-gray-400 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </label>
            <label>
              <span className="block text-gray-800 font-medium mb-2">Price Per Slot</span>
              <input
                type="number"
                name="pricePerSlot"
                value={formData.pricePerSlot || ''}
                onChange={handleChange}
                min={0}
                className="w-full border border-gray-400 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </label>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Amenities</h3>
            {formData.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={amenity}
                  onChange={(e) => handleAmenityChange(index, e.target.value)}
                  placeholder="Enter amenity name"
                  className="flex-1 border border-gray-400 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <button
                  type="button"
                  onClick={() => removeAmenity(index)}
                  className="ml-2 text-gray-600 hover:text-gray-900"
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addAmenity}
              className="w-full bg-gray-100 py-2 px-4 rounded-lg shadow-sm border border-gray-300 hover:bg-gray-200"
            >
              Add Amenity
            </button>
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
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddRoomModal;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState } from 'react';
import { Form, Input, InputNumber, Select, Row, Col, Divider } from 'antd';
import { TRoom } from '@/types';

const { Option } = Select;

interface RoomFormProps {
    form: any; 
    room: TRoom | null;
}

const RoomForm: React.FC<RoomFormProps> = ({ form, room }) => {
    const [selectedFloor, setSelectedFloor] = useState<number | undefined>(room?.floorNo);
    const [amenities, setAmenities] = useState<string[]>(room?.amenities || []);

    const floorOptions = useMemo(() => {
        // Adjust this range based on your available floors
        return Array.from({ length: 10 }, (_, i) => i + 1);
    }, []);

    const roomOptions = useMemo(() => {
        if (selectedFloor === undefined || selectedFloor === 0) return [];
        const roomNoPattern = selectedFloor * 100 + 100;
        const roomNoStart = roomNoPattern + 1;
        return Array.from({ length: 10 }, (_, i) => roomNoStart + i);
    }, [selectedFloor]);

    const handleFloorChange = (value: number) => {
        setSelectedFloor(value);
        form.setFieldsValue({ roomNo: undefined }); // Reset room number when floor changes
    };

    const handleAmenitiesChange = (value: string[]) => {
        setAmenities(value);
        form.setFieldsValue({ amenities: value }); // Update form value
    };

    const handleAddAmenity = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const newAmenity = e.currentTarget.value.trim();
            if (newAmenity && !amenities.includes(newAmenity)) {
                setAmenities([...amenities, newAmenity]);
                form.setFieldsValue({ amenities: [...amenities, newAmenity] });
                e.currentTarget.value = ''; // Clear input field
            }
        }
    };

    // const handleRemoveAmenity = (removedAmenity: string) => {
    //     const updatedAmenities = amenities.filter(amenity => amenity !== removedAmenity);
    //     setAmenities(updatedAmenities);
    //     form.setFieldsValue({ amenities: updatedAmenities });
    // };

    return (
        <Form form={form} layout="vertical" initialValues={{ ...room }}>
            <Form.Item
                name="name"
                label="Room Name"
                rules={[{ required: true, message: 'Please enter the room name!' }]}
            >
                <Input />
            </Form.Item>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="floorNo"
                        label="Floor No."
                        rules={[{ required: true, message: 'Please select a floor!' }]}
                    >
                        <Select
                            placeholder="Select a floor"
                            onChange={handleFloorChange}
                            defaultValue={room?.floorNo}
                        >
                            {floorOptions.map(floor => (
                                <Option key={floor} value={floor}>
                                     {floor}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        name="roomNo"
                        label="Room No."
                        rules={[{ required: true, message: 'Please select a room!' }]}
                    >
                        <Select placeholder="Select a room" defaultValue={room?.roomNo}>
                            {roomOptions.map(roomNo => (
                                <Option key={roomNo} value={roomNo}>
                                     {roomNo}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="capacity"
                        label="Capacity"
                        rules={[
                            { required: true, message: 'Please enter a valid capacity!' },
                            { type: 'number', min: 1, message: 'Capacity must be at least 1!' }
                        ]}
                    >
                        <InputNumber min={1} style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="pricePerSlot"
                        label="Price Per Slot"
                        rules={[
                            { required: true, message: 'Please enter a valid price per slot!' },
                            { type: 'number', min: 0, message: 'Price per slot must be at least 0!' }
                        ]}
                    >
                        <InputNumber min={0} prefix="$" style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item
                name="amenities"
                label="Amenities"
            >
                <Select
                    mode="tags"
                    placeholder="Add amenities"
                    value={amenities}
                    onChange={handleAmenitiesChange}
                    style={{ width: '100%' }}
                    onInputKeyDown={handleAddAmenity}
                >
                    {amenities.map(amenity => (
                        <Option key={amenity} value={amenity}>
                            {amenity}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Divider />
        </Form>
    );
};

export default RoomForm;

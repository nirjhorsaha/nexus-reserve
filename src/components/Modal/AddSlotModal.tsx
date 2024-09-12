import React from 'react';
import { Modal, Form, Button, DatePicker, TimePicker, Select, Row, Col } from 'antd';
import { useCreateSlotMutation } from '@/redux/features/slot/slotApi';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
import { TError, TSlot } from '@/types';

const { Option } = Select;

interface AddSlotModalProps {
    visible: boolean;
    onClose: () => void;
    rooms: { _id: string; name: string }[];
}

const AddSlotModal: React.FC<AddSlotModalProps> = ({ visible, onClose, rooms }) => {
    const [form] = Form.useForm();
    const [createSlot, { isLoading }] = useCreateSlotMutation();

    // Handle form submission and data formatting
    const handleFinish = async (values: TSlot) => {

        const formattedData = {
            room: values.room,
            date: values.date ? dayjs(values.date).format('YYYY-MM-DD') : null,
            startTime: values.startTime ? dayjs(values.startTime).format('HH:mm') : null,
            endTime: values.endTime ? dayjs(values.endTime).format('HH:mm') : null,
        };

        console.log('Formatted Data:', formattedData);

        if (!formattedData.startTime || !formattedData.endTime) {
            toast.error("Start or End time not selected");
            console.error("Start or End time not selected");
            return;
        }

        try {
            await createSlot(formattedData).unwrap();
            toast.success("Slot created successfully!");
            form.resetFields();
            onClose();
        } catch (err) {
            const error = err as TError;
            const errorMessage = error.data?.errorSources?.[0]?.message || 'There was an error creating slot.';
            toast.error(errorMessage);
            console.error('Failed to create slot', error);
        }
    };

    return (
        <Modal
            title={<span style={{ fontWeight: 'bold', fontSize: '20px' }}>Add New Slot</span>}
            open={visible}
            onCancel={onClose}
            footer={null}
            destroyOnClose
            style={{ borderRadius: '8px', fontFamily: 'Nunito' }}>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                style={{ marginTop: '20px' }}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="room"
                            label={<span style={{ fontWeight: 'bold', fontFamily: 'Nunito' }}>Room</span>}
                            rules={[{ required: true, message: 'Please select a room!' }]}
                        >
                            <Select placeholder="Select a room">
                                {rooms.map((room) => (
                                    <Option key={room._id} value={room._id}>
                                        {room.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="date"
                            label={<span style={{ fontWeight: 'bold', fontFamily: 'Nunito' }}>Date</span>}
                            rules={[{ required: true, message: 'Please select a date!' }]}
                        >
                            <DatePicker
                                format="YYYY-MM-DD"
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="startTime"
                            label={<span style={{ fontWeight: 'bold', fontFamily: 'Nunito' }}>Start Time</span>}
                            rules={[{ required: true, message: 'Please select a start time!' }]}
                        >
                            <TimePicker
                                format="HH:mm"
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="endTime"
                            label={<span style={{ fontWeight: 'bold', fontFamily: 'Nunito' }}>End Time</span>}
                            rules={[{ required: true, message: 'Please select an end time!' }]}
                        >
                            <TimePicker
                                format="HH:mm"
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isLoading}
                        style={{
                            width: '100%',
                            fontSize: '16px',
                            borderRadius: '5px',
                            fontFamily: 'Nunito'
                        }}
                    >
                        Add Slot
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddSlotModal;

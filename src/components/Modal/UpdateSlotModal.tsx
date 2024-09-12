/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { Modal, Form, DatePicker, TimePicker, Button, Select, Row, Col } from 'antd';
import { TError, TRoom, TSlot } from '@/types';
import { useUpdateSlotsMutation } from '@/redux/features/slot/slotApi';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';

const { Option } = Select;

interface UpdateSlotModalProps {
    visible: boolean;
    onClose: () => void;
    slot: TSlot | null;
    rooms: TRoom[];
}

const UpdateSlotModal: React.FC<UpdateSlotModalProps> = ({ visible, onClose, slot, rooms }) => {
    const [form] = Form.useForm();
    const [updateSlot] = useUpdateSlotsMutation();

    //  set the initial values of the form fields
    useEffect(() => {
        if (slot) {
            form.setFieldsValue({
                roomNo: slot.room.roomNo,
                date: dayjs(slot.date),
                startTime: dayjs(slot.startTime, 'HH:mm'),
                endTime: dayjs(slot.endTime, 'HH:mm'),
                isBooked: slot.isBooked,
            });
        }
    }, [slot, form]);

    const handleSubmit = async (values:any) => {
        try {
            const selectedRoom = rooms.find(room => room.roomNo === values?.roomNo);
            console.log({ selectedRoom, values });

            // if (!selectedRoom) {
            //     throw new Error("Selected room not found");
            // }

            const formattedData = {
                room: selectedRoom?._id,
                date: dayjs(values.date).format("YYYY-MM-DD"),
                startTime: dayjs(values.startTime).format("HH:mm"),
                endTime: dayjs(values.endTime).format("HH:mm"),
            };

            await updateSlot({ slot: formattedData, id: slot?._id }).unwrap();
            toast.success('Slot updated successfully');
            onClose(); // Close modal after update
        } catch (err) {
            const error = err as TError;
            const errorMessage = error.data?.errorSources?.[0]?.message || 'There was an error updating the slot.';
            toast.error(errorMessage);
            console.error("Failed to update slot", err);
        }
    };

    return (
        <Modal
            title={<span style={{ fontWeight: 'bold', fontSize: '20px' }}>Update Slot</span>}
            open={visible}
            onCancel={onClose}
            footer={null}
            style={{ borderRadius: '8px', fontFamily: 'Nunito' }}>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                style={{ marginTop: '20px' }}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="roomNo"
                            label={<span style={{ fontWeight: 'bold', fontFamily: 'Nunito' }}>Room No</span>}
                            rules={[{ required: true, message: 'Please select a room!' }]}
                        >
                            <Select style={{ fontFamily: 'Nunito' }}>
                                {rooms.map(room => (
                                    <Option key={room._id} value={room.roomNo} >
                                        {room.roomNo} - {room.name}
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
                                style={{ fontFamily: 'Nunito', width: '100%' }} format="YYYY-MM-DD" />
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
                                style={{ fontFamily: 'Nunito', width: '100%' }}
                                format="HH:mm"
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
                                style={{ fontFamily: 'Nunito', width: '100%' }}
                                format="HH:mm"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item>
                    <Button type="primary" htmlType="submit"
                        style={{
                            width: '100%',
                            fontSize: '16px',
                            borderRadius: '5px',
                            fontFamily: 'Nunito'
                        }}>
                        Update Slot
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UpdateSlotModal;

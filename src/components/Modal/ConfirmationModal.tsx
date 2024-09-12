import React, { useState } from 'react';
import { Modal } from 'antd';

interface ConfirmationModalProps {
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title?: React.ReactNode;
    description?: React.ReactNode;
    okText?: React.ReactNode;
    cancelText?: React.ReactNode;
    titleStyle?: React.CSSProperties;
    descriptionStyle?: React.CSSProperties;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    visible,
    onConfirm,
    onCancel,
    title = "Confirm",
    description = "Are you sure you want to proceed?",
    okText = "Yes, Cancel",
    cancelText = "No, Keep",
    titleStyle = { fontWeight: 'bold', fontSize: '20px', fontFamily: 'Nunito' },
    descriptionStyle = { fontFamily: 'Nunito' },
}) => {
    // Initial and hover styles for the OK button
    const [okButtonStyle, setOkButtonStyle] = useState<React.CSSProperties>({
        backgroundColor: '#e11d48', // red-600
        borderColor: '#e11d48', // red-600
        color: '#fff', // text-white
        borderRadius: '4px',
        transition: 'background-color 0.3s, border-color 0.3s',
    });

    const handleOkButtonMouseEnter = () => {
        setOkButtonStyle(prevStyle => ({
            ...prevStyle,
            backgroundColor: '#e32b2b', 
            borderColor: '#e32b2b', 
        }));
    };

    const handleOkButtonMouseLeave = () => {
        setOkButtonStyle(prevStyle => ({
            ...prevStyle,
            backgroundColor: '#d12626', 
            borderColor: '#d12626', 
        }));
    };

    return (
        <Modal
            title={<span style={titleStyle}>{title}</span>}
            open={visible}
            onOk={onConfirm}
            onCancel={onCancel}
            okText={<span style={{ fontFamily: 'Nunito' }}>{okText}</span>}
            cancelText={<span style={{ fontFamily: 'Nunito' }}>{cancelText}</span>}
            okButtonProps={{
                style: okButtonStyle,
                onMouseEnter: handleOkButtonMouseEnter,
                onMouseLeave: handleOkButtonMouseLeave,
            }}
            cancelButtonProps={{
                style: {
                    borderRadius: '4px',
                },
            }}
        >
            <p style={descriptionStyle}>{description}</p>
        </Modal>
    );
};

export default ConfirmationModal;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Upload, Button, Image, Typography, message, Divider } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';

interface ImageUploaderProps {
    imageList: string[];
    setImageList: React.Dispatch<React.SetStateAction<string[]>>;
    uploading: boolean;
    setUploading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ imageList, setImageList, uploading, setUploading }) => {
    const [showAllImages, setShowAllImages] = useState(false);

    const handleShowAllImages = () => {
        setShowAllImages(true);
    };

    const handleImageChange = async (file: any) => {
        setUploading(true);

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('https://api.imgbb.com/1/upload?key=a0ddcdcd157220efb5669dfbe702102b', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                if (data && data.data && data.data.url) {
                    setImageList([...imageList, data.data.url]);
                    message.success(`${file.name} file uploaded successfully`);
                } else {
                    message.error('Failed to get image URL from ImgBB');
                }
            } else {
                message.error('ImgBB API response was not OK');
            }
        } catch (error) {
            message.error('An error occurred while uploading the image');
            console.error('Upload error:', error);
        } finally {
            setUploading(false);
        }
    };

    const handleRemoveImage = (image: string) => {
        setImageList(imageList.filter(img => img !== image));
    };

    return (
        <>
            <Typography.Title level={5}>Pictures</Typography.Title>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {imageList.slice(0, showAllImages ? undefined : 3).map((image, index) => (
                    <div key={index} className="relative inline-block w-full  md:w-1/3 lg:w-1/4 p-1">
                        <Image
                            src={image}
                            alt={`Room Image ${index + 1}`}
                            width={120}
                            height={80}
                            style={{ borderRadius: '8px', cursor: 'pointer' }}
                            preview={{ src: image }}
                        />
                        <Button
                            icon={<DeleteOutlined />}
                            shape="circle"
                            className="absolute top-1 right-1 z-10"

                            // style={{
                            //     position: 'absolute',
                            //     top: 0,
                            //     right: 0,
                            //     margin: '5px',
                            //     zIndex: 1
                            // }}
                            onClick={() => handleRemoveImage(image)}
                        />
                    </div>
                ))}
            </div>
            {!showAllImages && imageList.length > 3 && (
                <Button type="link" onClick={handleShowAllImages} style={{ marginTop: '10px' }}>
                    Show All Images
                </Button>
            )}

            <Divider />

            <Upload
                customRequest={({ file }) => handleImageChange(file)}
                listType="picture"
                maxCount={5}
                showUploadList={false}
                accept="image/*"
                disabled={uploading}
            >
                <Button icon={<UploadOutlined />} loading={uploading}>
                    {uploading ? 'Uploading...' : 'Upload'}
                </Button>
            </Upload>
        </>
    );
};

export default ImageUploader;

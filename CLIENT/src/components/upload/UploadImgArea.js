import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import uploadIcon from '../../assets/bytesize_upload.png';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const UploadImgArea = ({ onFileUpload }) => {
    const [progress, setProgress] = useState(0);
    const [previewUrl, setPreviewUrl] = useState(null);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png']
        },
        maxSize: 10 * 1024 * 1024, // 10MB
        onDrop: (acceptedFiles) => {
            handleFileUpload(acceptedFiles);
        },
    });

    const handleFileUpload = (files) => {
        if (files.length > 0) {
            const file = files[0];
            onFileUpload(file);

            setPreviewUrl(URL.createObjectURL(file));

            let progressInterval = setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress >= 100) {
                        clearInterval(progressInterval);
                        // Show toast notification on successful upload
                        toast.success("Image uploaded successfully!");
                      
                        return 100;
                    }
                    return prevProgress + 10;
                });
            }, 100);
        }
    };

    
    return (
        <div
            {...getRootProps()}
            className={`upload-area ${isDragActive ? 'active' : ''}`}
            style={{
                border: '2px dashed #2171D8',
                padding: '20px',
                textAlign: 'center',
                borderRadius: '10px',
                cursor: 'pointer',
            }}
        >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center">
                <img src={uploadIcon} alt="upload icon" style={{ height: '50px', width: '50px' }} />
                <p className="text-3xl">
                    {isDragActive ? "Drop files here..." : "Click to upload or drag and drop"}
                </p>
                <p className="text-[#6B7280] mt-2">Supported formats: .jpg, .png, .webm</p>
                <p className="text-[#6B7280] mt-4">10MB maximum upload size</p>

                {progress > 0 && progress < 100 && (
                    <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
                        <div
                            className="bg-blue-600 h-4 rounded-full"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                )}

                {previewUrl && progress === 100 && (
                    <div className="mt-4">
                        <img
                            src={previewUrl}
                            alt="Uploaded preview"
                            className="max-w-full h-auto rounded-lg shadow-lg"
                        />
                        <p className="text-green-600 mt-2">Image uploaded successfully!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadImgArea;

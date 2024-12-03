import React, { useState,useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import uploadIcon from '../../assets/bytesize_upload.png';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadDocArea = ({ onFileUpload }) => {
    const [progress, setProgress] = useState(0);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        // Retrieve user info from localStorage and set the user's name
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        
        if (userInfo && userInfo.firstName && userInfo.lastName) {
          setUserName(`${userInfo.firstName} ${userInfo.lastName}`);
        } else {
          console.warn('User info not found or incomplete in localStorage');
        }
      }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'application/pdf': ['.pdf'],
            'application/vnd.ms-powerpoint': ['.ppt', '.pptx', '.pptm'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'text/plain': ['.txt']
        },
        maxSize: 100 * 1024 * 1024, // 5MB
        onDrop: (acceptedFiles) => {
            handleFileUpload(acceptedFiles);
        },
    });

    const handleFileUpload = (files) => {
        if (files.length > 0) {
            const file = files[0];
            console.log("file details  : ", file);

            onFileUpload(file);
            setUploadedFile(file);

            createResource(file);

            // Simulate progress
            setProgress(0);
            let progressInterval = setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress >= 100) {
                        clearInterval(progressInterval);
                        return 100;
                    }
                    return prevProgress + 10;
                });
            }, 100);
        }
    };

    const createResource = async (file) => {
        console.log("file : ", file);
        const formData = new FormData();
        formData.append('title', file.name);
        formData.append('file', file);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.log("Token expired");
                return;
            }
            
            //type shit 
            const res = await axios.post('https://student-hub-vd8o.onrender.com/api/resources/uploadDoc', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });

            if (res.status === 200) {
                console.log(res.data);
                toast.success(`File uploaded successfully by ${userName}!`); // Show success toast
            } else {
                console.log("res : ", res);
            }
        } catch (err) {
            console.log("Error : ", err);
            toast.error("File upload failed!",err); // Show error toast
        }
    };

    
    return (
        <div>
            <ToastContainer />

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
                    <p className="text-[#6B7280] mt-[15%]">Supported formats: .pdf, .pptx, .docx, .txt, .pptm</p>
                    <p className="text-[#6B7280] mt-4">10MB maximum upload size</p>

                    {/* Progress Bar */}
                    {progress > 0 && progress < 100 && (
                        <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
                            <div
                                className="bg-blue-600 h-4 rounded-full"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    )}

                    {/* File Name and Upload Success Message */}
                    {uploadedFile && progress === 100 && (
                        <div className="mt-4 text-center">
                            {/* <p className="text-green-600">File "{uploadedFile}" uploaded successfully!</p> */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UploadDocArea;

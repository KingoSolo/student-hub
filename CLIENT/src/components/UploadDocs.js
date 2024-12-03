import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import UploadDocArea from './upload/UploadDocArea';
import UploadImgArea from './upload/UploadImgArea';
import UploadYtArea from './upload/uploadYtArea';
import Sidebar from './Sidebar';

const UploadDocs = () => {
  const [activeTab, setActiveTab] = useState('document');
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoLink, setVideoLink] = useState('');
  const [userName, setUserName] = useState(''); // State for the user's name
  const [uploadMessage, setUploadMessage] = useState(''); // State for the upload success message

  useEffect(() => {
    // Retrieve user info from localStorage and set the user's name
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
    if (userInfo && userInfo.firstName && userInfo.lastName) {
      setUserName(`${userInfo.firstName} ${userInfo.lastName}`);
    } else {
      console.warn('User info not found or incomplete in localStorage');
    }
  }, []);

  const handleNavigationClick = (tab) => {
    setActiveTab(tab);
    setSelectedFile(null);
    setVideoLink('');
    setUploadMessage(''); // Clear message on tab change
  };

  const handleUpload = () => {
    if (activeTab === 'document' || activeTab === 'image') {
      if (selectedFile) {
        setUploadMessage(`${activeTab === 'document' ? 'Document' : 'Image'} uploaded by ${userName}`);
        setSelectedFile(null);
      } else {
        setUploadMessage('Please select a file before uploading.');
      }
    } else if (activeTab === 'youtube') {
      if (videoLink) {
        setUploadMessage(`YouTube video uploaded by ${userName}`);
        setVideoLink('');
      } else {
        setUploadMessage('Please enter a valid video link before uploading.');
      }
    }
  };

  return (
    <div className='flex bg-gray-50 font-montserrat'>
      <Sidebar />
      <div className="ml-64 flex flex-col items-center min-h-screen">
        <Navigation setActiveButton={handleNavigationClick} />
        <div className="ml-44  w-full max-w-xl bg-white shadow-custom-light rounded-lg p-6 space-y-6 mt-20">
          <p className="text-xl font-semibold text-center text-gray-700 mb-4">
            {activeTab === 'document' ? 'Document Upload' : activeTab === 'youtube' ? 'YouTube Video Upload' : 'Image Upload'}
          </p>

          {activeTab === 'document' && (
            <div className="space-y-4">
              <UploadDocArea onFileUpload={handleUpload} />
            </div>
          )}

          {activeTab === 'youtube' && (
            <div className="space-y-4">
              <UploadYtArea onLinkUpload={handleUpload} />
            </div>
          )}

          {activeTab === 'image' && (
            <div className="space-y-4">
              <UploadImgArea onFileUpload={handleUpload} />
            </div>
          )}

          {/* Display upload success message */}
          {uploadMessage && (
            <div className="mt-4 text-center text-green-600 font-semibold">
              {uploadMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadDocs;

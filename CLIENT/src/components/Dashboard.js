import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar.js';
import avatar from '../assets/avatar_icon .png';
import ytIcon from '../assets/youtube_icon.png'
import fileIcon from '../assets/file_icon.png';
import imageIcon from '../assets/imageIcon.png';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [userResources, setUserResources] = useState([]);
  const [youtubeResources, setYoutubeResources] = useState([]);
  const [imageResources, setImageResources] = useState([]);

  

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userInfo'));
    if (userData) {
      setUser(userData);
    }

    const fetchUserResources = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log("Token expired");
          return;
        }

        const response = await axios.get('http://localhost:3000/api/resources/getDocs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const theResources = response.data.documents;
        setUserResources(theResources.reverse());
        setYoutubeResources(response.data.youtubeLinks);
        setImageResources(response.data.images);
      } catch (error) {
        console.error('Error fetching user resources:', error);
      }
    };

    fetchUserResources();
  }, []);

  return (
    <div className="bg-[#f2f2f2] flex font-montserrat justify-between">
      <Sidebar />

      {/* Main Dashboard Content */}
      <div className="ml-64 flex-1 p-6 bg-gray-100 min-h-screen">
        {/* Search Bar */}
        <div className="flex items-center w-[80%] bg-white rounded-lg p-4 shadow mb-6">
          <input
            type="text"
            placeholder="Search for notes or questions"
            className="w-full border-none outline-none bg-transparent text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* User Profile Section */}
        <div className="bg-white rounded-lg p-4 shadow mb-6">
          <div className="flex items-center justify-evenly">
            <img
              src={avatar}
              alt="Profile"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <p className="font-semibold text-2xl text-[#050A10]">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-[#050A10]">Software Engineering</p>
            </div>
          </div>
        </div>

        {/* Tabs (All, Questions, Documents) */}
        <div className="flex space-x-4 mb-6">
  <button
    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
  >
    All
  </button>
  <button
    className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
  >
    Questions
  </button>
  <button
    className="bg-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
  >
    Documents
  </button>
</div>

        {/* Document Cards */}
        <div className="space-y-4">
        {youtubeResources && youtubeResources.map((resource, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4 flex items-center">
              <div className="bg-blue-700 text-white w-24 h-24 flex flex-col justify-center items-center rounded-lg mr-4">
                <img src={ytIcon} alt='file' className="text-lg font-semibold " />
              </div>
              <div>
                <a href={resource?.link} target='blank' className="text-blue-400 font-semibold">{resource?.link}</a>
                <p>
              Uploaded : {resource?.createdAt}
            </p>
              </div>
            </div>
          ))}
          {imageResources && imageResources.map((resource, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4 flex items-center">
              <div className="bg-blue-700 text-white w-24 h-24 flex flex-col justify-center items-center rounded-lg mr-4">
                <img src={imageIcon} alt='file' className="text-lg font-semibold" />
              </div>
              <div>
                <div className="text-gray-800 font-semibold">{resource?.filename}</div>
                <img src={resource?.path} alt={resource?.filename} className="mt-2" />
                <p className="text-gray-500 text-sm mt-2">
              Uploaded : {resource?.uploadedAt} 
            </p>
              </div>
            </div>
          ))}
           {userResources && userResources.map((resource, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4 flex items-center">
              <div className="bg-blue-700 text-white w-24 h-24 flex flex-col justify-center items-center rounded-lg mr-4">
                <img src={fileIcon} alt='file' className="text-lg font-semibold" />
              </div>
              <div>
                <p className="text-gray-800 font-semibold">{resource?.title}</p>
                <img src={`data:image/jpeg;base64,${resource?.file}`} alt={resource?.title} className="mt-2" />
                <p className="text-gray-500 text-sm mt-2">
              Uploaded : {resource?.timestamps} 
            </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

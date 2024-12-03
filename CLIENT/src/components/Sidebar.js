import React,{useState,useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import homeIcon from '../assets/tabler_home.png';
import uploadResourceIcon from '../assets/material-symbols_upload.png';
import settingsIcon from '../assets/ic_outline-settings.png';
import avatar from '../assets/avatar_icon .png';


const Sidebar = () => {
  const location = useLocation(); // Get the current path
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userInfo'));
    if (userData) {
      setUser(userData);
    }

  }, []);


  return (
    <div className="w-64 min-h-screen bg-white shadow-lg fixed top-0 left-0 flex flex-col justify-between">
      {/* Header Section */}
      <div className="p-4 mt-4">
        <p className="text-4xl font-normal text-[#2171D8] ml-4 mb-">Study Hub</p>
        
        {/* Navigation Links */}
        <div className="space-y-8 mt-20">
          <Link to="/dashboard">
            <div
              className={`flex items-center space-x-4  cursor-pointer rounded-lg p-2 ${
                location.pathname === '/dashboard' ? 'bg-[#b7c2ca]' : 'hover:bg-[#b7c2ca]'
              }`}
            >
              <img src={homeIcon} alt="home icon" className="h-6 w-6" />
              <span className="text-lg font-light font-montserrat text-[#050A10]">Home</span> 
            </div>
          </Link>
          <Link to="/upload">
            <div
              className={`flex items-center space-x-4  mt-8 cursor-pointer rounded-lg p-2 ${
                location.pathname === '/upload' ? 'bg-[#b7c2ca]' : 'hover:bg-[#b7c2ca]'
              }`}
            >
              <img src={uploadResourceIcon} alt="upload" className="h-6 w-6" />
              <span className="text-lg font-light text-[#050A10]">Upload Resources</span>
            </div>
          </Link>
        </div>
      </div>
      
      {/* Footer Section */}
      <div className="p-6 border-t border-gray-200">
        <Link to="/settings">
          <div
            className={`flex items-center space-x-4 cursor-pointer mb-4 rounded-lg p-2 ${
              location.pathname === '/settings' ? 'bg-[#b7c2ca]' : 'hover:bg-[#b7c2ca]'
            }`}
          >
            <img src={settingsIcon} alt="settings" className="h-6 w-6" />
            <span className="text-lg text-[#050A10]">Settings</span>
          </div>
        </Link>
        <div className="flex items-center space-x-4">
          <img 
            src={avatar} 
            alt="profile" 
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-gray-700 font-semibold">{user?.firstName} {user?.lastName}</p>
            <p className="text-sm text-gray-500"></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

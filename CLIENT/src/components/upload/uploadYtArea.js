import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UploadYtArea = ({ onLinkUpload }) => {
  const [link, setLink] = useState('');


  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (link) {
     

        // Trigger success toast and reset the link
        toast.success('YouTube link uploaded successfully!');
        onLinkUpload(link); // Pass the link back to the parent component
        setLink(''); // Reset the input field
      } else {
        toast.error('Failed to upload YouTube link. Please try again.');
      }
  };
  const uploadYoutubeLink = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log("Token expired");
        return;
      }

      const response = await axios.post('https://student-hub-vd8o.onrender.com/api/resources/uploadYoutubeLink', {
        youtubeLink: link
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response : ", response);

      // setUserResources(response.data);
     // setUserResources(prevResources => { console.log("data", theResources); return theResources; });
    } catch (error) {
      console.error('Error fetching user resources:', error);
    }
  }
  return (
    <div>
       <ToastContainer position="top-right" autoClose={3000} />
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-gray-700 font-semibold mb-2">YouTube Video Link</label>
        <input 
          type="url" 
          value={link} 
          onChange={handleLinkChange}
          placeholder="Enter YouTube video URL" 
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          required 
        />
        <button 
          type="submit" 
          onClick={uploadYoutubeLink}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Upload Video
        </button>
      </form>
    </div>
  );
};

export default UploadYtArea;

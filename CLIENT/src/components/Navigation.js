import React, { useState } from 'react';

const Navigation = ({ setActiveButton }) => {
  const [activeButton, setLocalActiveButton] = useState('document'); // Default to 'document'

  const handleClick = (buttonName) => {
    setLocalActiveButton(buttonName);
    setActiveButton(buttonName); // Call the parent's function to set the active tab
  };

  return (
    <div className='flex justify-center'>
      <div className=' ml-24 mt-[7%] bg-[#ffffff] space-x-2 rounded-md shadow-custom-dark p-2'>
        <button
          className={`px-10 py-2 rounded-md transition duration-200 ${
            activeButton === 'document' ? 'bg-[#2171D8] text-white' : 'bg-white text-[#6B7280]'
          } hover:bg-[#3372c5] hover:text-white`}
          onClick={() => handleClick('document')}
        >
          Upload Document
        </button>
        <button
          className={`px-10 py-2 rounded-md transition duration-200 ${
            activeButton === 'youtube' ? 'bg-[#2171D8] text-white' : 'bg-white text-[#6B7280]'
          } hover:bg-[#3372c5] hover:text-white`}
          onClick={() => handleClick('youtube')}
        >
          YouTube Video
        </button>
        <button
          className={`px-10 py-2 rounded-md transition duration-200 ${
            activeButton === 'image' ? 'bg-[#2171D8] text-white' : 'bg-white text-[#6B7280]'
          } hover:bg-[#3372c5] hover:text-white`}
          onClick={() => handleClick('image')}
        >
          Upload Image
        </button>
      </div>
    </div>
  );
};

export default Navigation;

import React from 'react';
import Sidebar from './Sidebar';

const Settings = () => {
  return (
    <div className="flex h-screen bg-gray-100 font-montserrat">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="flex flex-col items-center mb-10">
          <img
            src="https://ibukuncangiveusanimageidk.com"
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4 border-2 border-blue-500"
          />
          <h2 className="text-3xl font-semibold">Adeniyi Oreoluwa</h2>
          <p className="text-lg text-gray-600">Software Engineering, 400 level</p>
        </div>
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-6">Profile Details</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                placeholder="Oreoluwa"
                className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Middle Name
              </label>
              <input
                type="text"
                placeholder="Susan"
                className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Adeniyi"
                className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="oreadeniiyi8@gmail.com"
                className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                placeholder="Female"
                className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none"
              >
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+234 806 867 6940"
                className="w-full px-4 py-2 bg-gray-200 rounded-lg focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
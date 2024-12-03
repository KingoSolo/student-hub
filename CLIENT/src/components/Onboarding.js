// src/components/Onboarding.js
import React from 'react';
import { Link } from 'react-router-dom';


const Onboarding = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
        <h1 className="font-montserrat text-2xl font-semibold text-center mb-4">
          What is your school and course of study?
        </h1>
        <p className="text-gray-500 text-center mb-6">
          This helps us show you more relevant content
        </p>
        <form>
          <div className="mb-4">
            <select className="text-gray-500 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Computing and Engineering Sciences</option>
              {/* Add more options here */}
            </select>
          </div>
          <div className="mb-4">
            <select className="text-gray-500 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Software Engineering</option>
              {/* Add more options here */}
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
          <Link to="/signup">
            Next
          </Link>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;

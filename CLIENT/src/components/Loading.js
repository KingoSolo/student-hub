import React from 'react';

function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="w-20 h-20 border-4 borderg-[#1877F2] border-dashed rounded-full animate-spin mx-auto mb-4"></div>
        
        <p className="text-lg text-[#0C204C] font-light font-roboto">
          Please hang on while we get things ready for you
        </p>
      </div>
    </div>
  );
}

export default LoadingPage;

import React from 'react';
import { features } from '../Constants'; // Use curly braces if using named export

const Features = () => {
  return (
    <>
      {features.map((data, index) => {
        return (
          <div key={index} className="pt-6">
            <div className="flow-root bg-gray-300 rounded-lg px-6 pb-8 h-full">
              <div className="-mt-6">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#2563eb] text-white mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h3 className="mt-8 text-lg font-medium text-gray-900 text-center">{data.title}</h3>
                <p className="mt-5 text-base text-gray-500 text-center">
                  {data.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Features;

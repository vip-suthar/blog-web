import React from 'react';
import { FiSearch, FiBell, FiEdit2 } from 'react-icons/fi'; // Icons used in the component
import Navbar1 from './Navbar1';

const Navbar1= () => {
  return (
    <header className="hidden sm:flex flex items-center justify-between p-4 bg-white shadow-md">
      {/* Placeholder for logo */}
      <div className='flex flex-row gap-[5%]'>
      <div className="w-16 h-8 bg-gray-300 md:w-24"></div> {/* Smaller logo on mobile */}
      
      {/* Search bar (hidden on small screens) */}
      
      <div className="hidden sm:flex items-center  bg-gray-100 rounded-full px-3 py-2 w-[100%] max-w-lg">
        <FiSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search anything..."
          className="bg-gray-100 outline-none border-none ml-2 w-full"
        />
       
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex items-center space-x-4">
        {/* Write button hidden on mobile */}
        <button className="hidden sm:flex items-center  p-2 rounded-md">
          <FiEdit2 className="text-gray-700 mr-2" />
          <span className="text-gray-700 px-0.5">Write</span>
        </button>

        {/* Notification icon */}
        <FiBell className="text-gray-700 text-xl" />

        {/* Profile icon */}
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>
    </header>
  );
};

export default Navbar1;

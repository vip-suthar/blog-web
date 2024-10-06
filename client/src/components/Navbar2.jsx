import React from 'react';

const Navbar = () => {
  return (
    <nav className="hidden sm:flex bg-white shadow-lg">
      
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo or Placeholder */}
        <div className="w-20 h-12 bg-gray-300"></div>
        
        {/* Navbar Links */}
        <div className='flex flex-row gap-20'>
        <div className="flex items-center space-x-6">
          <a href="#about" className="text-gray-600 hover:text-black">About Us</a>
          <a href="#membership" className="text-gray-600 hover:text-black">Membership</a>
          <a href="#write" className="text-gray-600 hover:text-black">Write</a>
        </div>

        {/* Sign In / Sign Up */}
        <div className="flex items-center space-x-4">
          <a href="#signin" className="text-gray-600 hover:text-black">Sign In</a>
          <a href="#signup" className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800">Sign Up</a>
        </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

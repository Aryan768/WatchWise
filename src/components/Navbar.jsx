import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-white text-2xl font-bold">My Beautiful App</h1>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <a href="/" className="text-white text-lg hover:text-gray-300 transition duration-300">
              Home
            </a>
            <a href="/about" className="text-white text-lg hover:text-gray-300 transition duration-300">
              About Us
            </a>
            <a href="/contact" className="text-white text-lg hover:text-gray-300 transition duration-300">
              Contact
            </a>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={!isOpen ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"}></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/" className="text-white block text-lg px-3 py-2 rounded-md hover:bg-purple-700 transition duration-300">
              Home
            </a>
            <a href="/about" className="text-white block text-lg px-3 py-2 rounded-md hover:bg-purple-700 transition duration-300">
              About Us
            </a>
            <a href="/contact" className="text-white block text-lg px-3 py-2 rounded-md hover:bg-purple-700 transition duration-300">
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

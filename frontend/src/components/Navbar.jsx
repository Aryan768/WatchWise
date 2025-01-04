import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  return (
    <nav className='fixed top-0 left-0 w-full z-20 flex justify-between items-center bg-indigo-900 bg-opacity-70 text-white py-4 shadow-lg'>
      <div className="logo mx-8">
        <span className='font-bold text-2xl tracking-wide'>WatchWise</span>
      </div>
      <ul className="flex gap-8 mx-8">
        <Link to="/playlist">
          <li className='cursor-pointer hover:font-bold transition-all hover:text-yellow-400'>
            PlaylistCalculator
          </li>
        </Link>
        <Link to="/">
        <li className='cursor-pointer hover:font-bold transition-all hover:text-yellow-400'>
          Home
        </li>
        </Link>
        <Link to="/videodef">
        <li className='cursor-pointer hover:font-bold transition-all hover:text-yellow-400'>
          Video Transcription
        </li>
        </Link>
        <Link to="/youtubevideo">
        <li className='cursor-pointer hover:font-bold transition-all hover:text-yellow-400'>
          Youtube Video
        </li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;

import React from 'react';

const Navbar = () => {
  return (
    <nav className='fixed top-0 left-0 w-full z-20 flex justify-between items-center bg-indigo-900 bg-opacity-70 text-white py-4 shadow-lg'>
      <div className="logo mx-8">
        <span className='font-bold text-2xl tracking-wide'>WatchWise</span>
      </div>
      <ul className="flex gap-8 mx-8">
        <a href="/playlist">
          <li className='cursor-pointer hover:font-bold transition-all hover:text-yellow-400'>
            PlaylistCalculator
          </li>
        </a>
        <a href="/">
        <li className='cursor-pointer hover:font-bold transition-all hover:text-yellow-400'>
          Home
        </li>
        </a>
        <a href="/videodef">
        <li className='cursor-pointer hover:font-bold transition-all hover:text-yellow-400'>
          Video Transcription
        </li>
        </a>
        <a href="/youtubevideo">
        <li className='cursor-pointer hover:font-bold transition-all hover:text-yellow-400'>
          Youtube Video
        </li>
        </a>
      </ul>
    </nav>
  );
};

export default Navbar;

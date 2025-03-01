import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const LandingPage = () => {
  const slides = [
    'Uploadpart.png', 
    'transcription.png', 
    'comments.png', 
    'duration.png', 
  ];

  return (
    <div className="bg-gray-100 text-gray-800">
      {/* Navbar */}
      <header className="bg-gray-900 text-white">
        <nav className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="text-xl font-bold">WatchWise</div>
          <ul className="flex space-x-8">
            <li><Link to="/" className="hover:text-orange-400">Home</Link></li>
            <li><Link to="/videodef" className="hover:text-orange-400">Video Transcription</Link></li>
            <li><Link to="/playlist" className="hover:text-orange-400">YouTube Playlist</Link></li>
            <li><Link to="/youtubevideo" className="hover:text-orange-400">YouTube Video</Link></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section with Video */}
      <section className="bg-gray-800 text-white">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between py-16 px-6">
          <div className="lg:w-1/2">
            <h1 className="text-4xl font-bold mb-6">Welcome to WatchWise</h1>
            <p className="mb-6 text-lg">
              Unlock deeper insights from YouTube with WatchWise’s powerful tools.
              Enjoy video transcriptions, detailed playlist analysis, and personalized
              video recommendations!
            </p>
          </div>
          <div className="lg:w-1/2">
            <iframe
              src="https://www.dailymotion.com/embed/video/k5NBUNKiEj2wufBGLmU"
              width="100%"
              height="480"
              allow="autoplay; fullscreen"
              allowFullScreen
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Image Section with Hover Effect */}
      <section className="bg-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">How WatchWise Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {slides.map((slide, index) => (
              <div key={index} className="relative group">
                <img 
                  src={`${slide}`} // Adjust image path as needed
                  alt={`Feature ${index + 1}`}
                  className="rounded-lg shadow-lg w-full h-96 object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-110" 
                  style={{ width: '100%' }} // Ensure the image takes up full width
                />
              </div>
            ))}
          </div>
          <p className="text-lg mt-6">
            Discover how WatchWise helps you analyze and enhance your YouTube experience with advanced features including video transcription (Added AWS S3) with upload feature.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="text-lg">Made by Aryan Bhatia</p>
          <p>&copy; 2024 WatchWise. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

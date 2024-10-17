import React, { useState } from 'react';

const FormComponentPlaylist = ({ pInput, handleSubmitP, setpInput }) => {
  // State for the from and to numbers
  const [fromVidNumber, setFromVidNumber] = useState('');
  const [toVideoNumber, setToVideoNumber] = useState('');
  const [isChecked, setIsChecked] = useState(false); // Checkbox state

  return (
    <>
    <div className="m-24">
      <form onSubmit={(e) => handleSubmitP(e, fromVidNumber, toVideoNumber,isChecked)} className="flex items-center">
        
        {/* Playlist Link Input */}
        <input
          className="border-red-400 p-2 mr-4 flex-grow"
          value={pInput}
          onChange={(e) => setpInput(e.target.value)}
          type="text"
          id="linkUser"
          placeholder="Enter your link here..."
          required
        />

        {/* From Video Number */}
        <label htmlFor="fromVidNumber" className="mr-2 text-sm font-medium text-gray-900 dark:text-white">
          From:
        </label>
        <input
          type="number"
          id="fromVidNumber"
          value={fromVidNumber}
          onChange={(e) => setFromVidNumber(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-16 p-2.5 mr-4"
          // required
        />

        {/* To Video Number */}
        <label htmlFor="toVideoNumber" className="mr-2 text-sm font-medium text-gray-900 dark:text-white">
          To:
        </label>
        <input
          type="number"
          id="toVideoNumber"
          value={toVideoNumber}
          onChange={(e) => setToVideoNumber(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-16 p-2.5 mr-4"
          // required
        />

        {/* Checkbox */}
        <input
          type="checkbox"
          id="default-checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-2"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <label htmlFor="default-checkbox" className="text-sm font-medium text-gray-900 dark:text-gray-300">
          WatchWise Analysis
        </label>

        {/* Submit Button */}
        <button className="bg-orange-300 px-4 py-2 ml-4" type="submit">
          Submit
        </button>
      </form>
    </div>
      {/* Card Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6 transform -translate-y-6 hover:-translate-y-8 transition-transform duration-500 hover:shadow-2xl hover:scale-105">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">What This Page Does</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Subsection 1 */}
          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">YouTube Comment Analysis</h3>
            <p className="text-gray-600">Analyze the comments of any YouTube video, identifying trends and insights from user discussions.</p>
          </div>
          {/* Subsection 2 */}
          <div className="bg-gradient-to-r from-green-100 to-teal-100 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-teal-600 mb-2">Sentiment Analysis</h3>
            <p className="text-gray-600">Perform sentiment analysis to determine the general mood of the comments—whether they are positive, neutral, or negative.</p>
          </div>
          {/* Subsection 3 */}
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-purple-600 mb-2">Likes, Dislikes & Engagement</h3>
            <p className="text-gray-600">View stats like the number of likes, dislikes, and overall engagement metrics of the video to get a clear picture of its reception.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormComponentPlaylist;

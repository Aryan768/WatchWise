import React, { useState } from 'react';

const FormComponentPlaylist = ({ pInput, handleSubmitP, setpInput }) => {
  // State for the from and to numbers
  const [fromVidNumber, setFromVidNumber] = useState('');
  const [toVideoNumber, setToVideoNumber] = useState('');

  return (
    <div className='m-24'>
      <form onSubmit={(e) => handleSubmitP(e, fromVidNumber, toVideoNumber)} className="flex items-center">
        
        {/* Playlist Link Input */}
        <input
          className='border-red-400 p-2 mr-4 flex-grow'
          value={pInput}
          onChange={(e) => setpInput(e.target.value)}
          type="text"
          id='linkUser'
          placeholder='Enter your link here...'
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
          //required
        />

        {/* Submit Button */}
        <button className='bg-orange-300 px-4 py-2' type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormComponentPlaylist;

import React from 'react';

const VideoDefFormComponent = ({ input, handleSubmit2, setInput, handleUpload, handleFileChange, uploading, message }) => {
  return (
    <>
      {/* Main Container */}
      <div className="m-24 space-y-12">

        {/* Video Link Input Section */}
        <div className="flex flex-col items-center">
          <form onSubmit={handleSubmit2} className="w-full max-w-lg flex flex-col items-center space-y-4">
            <input
              className="w-full border-2 border-red-400 rounded-lg px-4 py-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              id="linkUser"
              placeholder="Enter your link here..."
            />
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-orange-300 to-yellow-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 ease-in-out"
            >
              Transcribe
            </button>
          </form>
        </div>

        {/* Video Upload Section */}
        <div className="w-full max-w-lg p-8 bg-white bg-opacity-50 rounded-lg shadow-lg mx-auto">

          <h2 className="text-2xl font-bold mb-6 text-center">Upload Your Video</h2>

          <div className="flex items-center justify-center mb-4"> 
            <input 
              type="file" 
              onChange={handleFileChange} 
              accept="video/*" 
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>

          <button 
            onClick={handleUpload} 
            className={`w-full py-2 px-4 text-white font-semibold rounded-lg shadow-md focus:outline-none ${
              uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'
            }`}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload & Transcribe'}
          </button>

          {message && (
            <div className="mt-4 text-center text-gray-600">
              {message}
            </div>
          )}
        </div>

        {/* Card Section */}
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-6 transform hover:-translate-y-2 transition-transform duration-500 hover:shadow-2xl">
          <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">What This Page Does</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Subsection 1 */}
            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-indigo-600 mb-2">Video Transcription</h3>
              <p className="text-gray-600">Our website will analyze the video and extract its spoken content.</p>
            </div>
            {/* Subsection 2 */}
            <div className="bg-gradient-to-r from-green-100 to-teal-100 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-teal-600 mb-2">Video Link or Upload</h3>
              <p className="text-gray-600">Add the video link or upload from your local device where we used AWS S3 and then see the magic !!!</p>
            </div>
            {/* Subsection 3 */}
            <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-purple-600 mb-2">About Video Link</h3>
              <p className="text-gray-600">Note: Due to permission issues, we cannot extract YouTube or ad based videos, but this may be added in the future.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoDefFormComponent;

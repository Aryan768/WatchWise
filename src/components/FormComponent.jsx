import React from 'react';

const FormComponent = ({ input, handleSubmit, setInput }) => {
  return (
    <>
      {/* Form Section */}
      <div className='m-24'>
        <form onSubmit={handleSubmit}>
          <input
            className='border-red-400 p-2 border rounded-md'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            id='linkUser'
            placeholder='Enter your link here...'
          />
          <button className='bg-orange-300 ml-2 px-4 py-2 rounded hover:bg-orange-400 transition-colors duration-300' type="submit">Click Me</button>
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

export default FormComponent;

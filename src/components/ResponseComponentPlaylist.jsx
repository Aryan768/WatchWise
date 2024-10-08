import React from 'react';

const ResponseComponentPlaylist = ({ responseP, pInput }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-cyan-100 p-6 mt-4">
      <h2 className="text-xl font-bold mb-2">Valid Link</h2>
      <p className="text-gray-700 text-base">
        The link is authenticated! You can now perform further actions.
      </p>
      <div className="mt-4">
        <p>Response from backend:</p>
        {/* <p className="text-green-600">Likes: {responseP.likeCount}</p> */}
        {/* <p>
          <a href={pInput}>
            <img src={response.imgUrl} alt="thumbnail" width={399} height={485} />
          </a>
        </p> */}
    
        <p className="text-green-600 font-bold" >TotalDuration(Selected): {responseP.totalDuration}</p>
        <p className="text-green-600">Average Duration: {responseP.averageDuration}</p>
        {/* <p className="text-green-600 ">View Count: {responseP.message}</p> */}
        <h1 className="bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-400 inline-block text-transparent bg-clip-text">
          At Different Speeds:
        </h1>
        <div>
  {Object.entries(responseP.speedDurations).map(([speed, duration], index) => (
    <p key={index}>
      {speed}: {duration}
    </p>
  ))}
</div>
      
      </div>
    </div>
  );
};

export default ResponseComponentPlaylist;

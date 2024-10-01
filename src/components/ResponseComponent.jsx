import React from 'react';

const ResponseComponent = ({ response, input }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-cyan-100 p-6 mt-4">
      <h2 className="text-xl font-bold mb-2">Valid Link</h2>
      <p className="text-gray-700 text-base">
        The link is authenticated! You can now perform further actions.
      </p>
      <div className="mt-4">
        <p>Response from backend:</p>
        <p className="text-green-600">Likes: {response.likeCount}</p>
        <p>
          <a href={input}>
            <img src={response.imgUrl} alt="thumbnail" width={399} height={485} />
          </a>
        </p>
        <p className="text-green-600">Comments Count: {response.commentCount}</p>
        <p className="text-green-600">Dislikes: {response.dislikeCount}</p>
        <p className="text-green-600">View Count: {response.viewCount}</p>
        <h1 className="bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-400 inline-block text-transparent bg-clip-text">
          AI Response
        </h1>
        <p className="text-black">{response.finalResult}</p>
      </div>
    </div>
  );
};

export default ResponseComponent;

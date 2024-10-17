import React from 'react';

const ResponseComponent = ({ response, input }) => {
  return (
    <>
    
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-cyan-100 p-6 mt-4">
        <h2 className="text-xl font-bold mb-2">Valid Link</h2>
        <p className="text-gray-700 text-base">
          The link is authenticated! You can now perform further actions.
        </p>
        <div className="mt-4">
          <p>Response from backend:</p>
          <p className="text-green-600">Likes: {response.likeCount}</p>
          {/* <p>
            <a href={input}>
              <img src={response.imgUrl} alt="thumbnail" width={399} height={485} />
            </a>
          </p> */}
          <p className="text-green-600">Comments Count: {response.commentCount}</p>
          <p className="text-green-600">Dislikes: {response.dislikeCount}</p>
          <p className="text-green-600">View Count: {response.viewCount}</p>
          {/* <h1 className="bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-400 inline-block text-transparent bg-clip-text">
            AI Response
          </h1> */}
          {/* <p className="text-black">{response.finalResult}</p> */}
        </div>
      </div>

      <div className="min-h-screen bg-yellow-400 flex justify-center items-center py-20">
        <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
          <h1 className="text-4xl uppercase font-bold from-current mb-8">
            <h1 className="bg-gradient-to-r from-blue-600 via-purple-500 to-indigo-400 inline-block text-transparent bg-clip-text">
              AI Based Comments Analysis
            </h1>
          </h1>

          <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
            {/* Card for a single video */}
            <div className="bg-white">
              <div className="shadow-lg hover:shadow-xl transform transition duration-500 hover:scale-105">
                <div>
                  {/* Use the imgUrl and title from the response */}
                  <img className="w-full" src={response.imgUrl} alt="Card image" />
                  <div className="px-4 py-2">
                    <h1 className="text-xl font-gray-700 font-bold">
                      {response.watchWiseScore}
                    </h1>
                    <h1 className="text-xl font-gray-700 font-bold">
                      {/* Assuming watchWiseScore is part of the response */}
                      {/* {response.watchWiseScore[0] + '%'} */}
                    </h1>
                    <div className="flex space-x-2 mt-2">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-yellow-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </span>
                      <h3 className="text-lg text-gray-600 font-semibold mb-2">
                        {/* {response.videoTitle[0]} Assuming there's a title in response */}
                      </h3>
                    </div>
                    {/* Display single comment */}
                    <p className="text-sm tracking-normal">
                      {response.finalResult}
                    </p>
                    <button className="mt-12 w-full text-center bg-yellow-400 py-2 rounded-lg">
                      Read more
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResponseComponent;

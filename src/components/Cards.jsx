import React from "react";

// Pagination is what this is
const Cards = ({ responseP }) => {
  return (
    <div className="min-h-screen bg-yellow-400 flex justify-center items-center py-20">
      <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
        <h1 className="text-4xl uppercase font-bold from-current mb-8">
          Responsive dynamic cards
        </h1>

        <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
          {responseP.imgUrls.map((imgUrl, index) => (
            <div className="bg-white" key={index}>
              <div className="shadow-lg hover:shadow-xl transform transition duration-500 hover:scale-105">
                <div>
                  {/* Using dynamic imgUrl */}
                  <img className="w-full" src={imgUrl} alt="Card image" />
                  <div className="px-4 py-2">
                    <h1 className="text-xl font-gray-700 font-bold">Papież gigant</h1>
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
                        New York
                      </h3>
                    </div>
                    <p className="text-sm tracking-normal">
                    {responseP.eachComments[index]}
                    </p>
                    <button className="mt-12 w-full text-center bg-yellow-400 py-2 rounded-lg">
                      Read more
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;

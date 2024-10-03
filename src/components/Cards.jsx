import React from "react";
//Pagination is what this is
const Cards = ()=>{
return(
  
    <div className="min-h-screen bg-yellow-400 flex justify-center items-center py-20">
      <div className="container mx-auto p-12 bg-gray-100 rounded-xl">
        <h1 className="text-4xl uppercase font-bold from-current mb-8">Responsive dynamic cards</h1>
   
        <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 sm:space-y-0">
          <div className="bg-white">
            <div>
              <div className="shadow-lg hover:shadow-xl transform transition duration-500 hover:scale-105">
                <div>
                  <img className="w-full" src="https://i.imgur.com/lmYYa2s.png" />
                  <div className="px-4 py-2">
                    <h1 className="text-xl font-gray-700 font-bold">Papież gigant</h1>
                    <div className="flex space-x-2 mt-2">
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </span>
                      <h3 className="text-lg text-gray-600 font-semibold mb-2">New York</h3>
                    </div>
                    <p className="text-sm tracking-normal">Częstochowski pomnik Jana Pawła II wyjątkowo interesująco wpisuje się w poprzemysłowy krajobraz tego miasta o mocnych lewicowych, robotniczych i socjalistycznych tradycjach. Powstały w 2013 roku, uchodzi za najwyższego Karola Wojtyłę w Polsce.</p>
                    <button className="mt-12 w-full text-center bg-yellow-400 py-2 rounded-lg">Read more</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
          <div className="bg-white">
            <div>
              <div className="shadow-lg hover:shadow-xl transform transition duration-500 hover:scale-105">
                <div>
                  <img className="w-full" src="https://i.imgur.com/csPYilq.png" />
                  <div className="px-4 py-2">
                    <h1 className="text-xl font-gray-700 font-bold">Papież gigant</h1>
                    <div className="flex space-x-2 mt-2">
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </span>
                      <h3 className="text-lg text-gray-600 font-semibold mb-2">New York</h3>
                    </div>
                    <p className="text-sm tracking-normal">Częstochowski pomnik Jana Pawła II wyjątkowo interesująco wpisuje się w poprzemysłowy krajobraz tego miasta o mocnych lewicowych, robotniczych i socjalistycznych tradycjach. Powstały w 2013 roku, uchodzi za najwyższego Karola Wojtyłę w Polsce.</p>
                    <button className="mt-12 w-full text-center bg-yellow-400 py-2 rounded-lg">Read more</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white">
            <div>
              <div className="shadow-lg hover:shadow-xl transform transition duration-500 hover:scale-105">
                <div>
                  <img className="w-full" src="https://i.imgur.com/chvO4cX.png" />
                  <div className="px-4 py-2">
                    <h1 className="text-xl font-gray-700 font-bold">Papież gigant</h1>
                    <div className="flex space-x-2 mt-2">
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </span>
                      <h3 className="text-lg text-gray-600 font-semibold mb-2">New York</h3>
                    </div>
                    <p className="text-sm tracking-normal">Częstochowski pomnik Jana Pawła II wyjątkowo interesująco wpisuje się w poprzemysłowy krajobraz tego miasta o mocnych lewicowych, robotniczych i socjalistycznych tradycjach. Powstały w 2013 roku, uchodzi za najwyższego Karola Wojtyłę w Polsce.</p>
                    <button className="mt-12 w-full text-center bg-yellow-400 py-2 rounded-lg">Read more</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
//     <nav aria-label="Page navigation example">
    
//   <ul className="inline-flex -space-x-px text-sm">
//     <li>
//       <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
//     </li>
//     <li>
//       <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
//     </li>
//     <li>
//       <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
//     </li>
//     <li>
//       <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
//     </li>
//     <li>
//       <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
//     </li>
//     <li>
//       <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
//     </li>
//     <li>
//       <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
//     </li>
//   </ul>
// </nav>

)

}
export default Cards
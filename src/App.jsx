import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import FormComponent from './components/FormComponent';
import ResponseComponent from './components/ResponseComponent';
import { ClipLoader } from 'react-spinners'; // Spinner

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await fetch("http://localhost:3000/c", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ x: input }),
      });

      if (!result.ok) {
        throw new Error('Failed to fetch data. Please try again.');
      }

      const data = await result.json();
      setResponse(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResponse(null);
    } finally {
      setLoading(false);
    }
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <FormComponent input={input} handleSubmit={handleSubmit} setInput={setInput} />

          {loading && (
            <div className="flex justify-center items-center h-screen">
              <ClipLoader color="#4A90E2" loading={loading} size={150} />
            </div>
          )}

          {response && !loading && (
            <ResponseComponent response={response} input={input} />
          )}

          {error && (
            <div className="text-red-500 mt-4">
              <p>{error}</p>
            </div>
          )}
        </>
      ),
    },
    {
      path: "/playlist",
      element: () => <div>Playlist Component</div>, // Replace with actual playlist component
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

// import React, { useState } from 'react';
// import Navbar from './components/Navbar';
// import FormComponent from './components/FormComponent';
// import ResponseComponent from './components/ResponseComponent';
// import { ClipLoader } from 'react-spinners'; // Spinner
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// function App() {

//   const [input, setInput] = useState('');
//   const [x, setX] = useState('');
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setX(input);
//     setLoading(true);

//     try {
//       const result = await fetch("http://localhost:3000/c", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ x: input }),
//       });

//       let data = await result.json();
//       setResponse(data);
//       setError(null);
//     } catch (err) {
//       setError('An error occurred while fetching the data.');
//       setResponse(null);
//     } finally {
//       setLoading(false);
//     }
//   };
// //Playlist Form Handling Part
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     setX(input);
//     setLoading(true);

//     try {
//       const result = await fetch("http://localhost:3000/c", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ x: input }),
//       });

//       let data = await result.json();
//       setResponse(data);
//       setError(null);
//     } catch (err) {
//       setError('An error occurred while fetching the data.');
//       setResponse(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <FormComponent input={input} handleSubmit={handleSubmit} setInput={setInput} />

//       {loading && (
//         <div className="flex justify-center items-center h-screen">
//           <ClipLoader color="#4A90E2" loading={loading} size={150} />
//         </div>
//       )}

//       {response && !loading && (
//         <ResponseComponent response={response} input={input} />
//       )}

//       {error && (
//         <div className="text-red-500 mt-4">
//           <p>{error}</p>
//         </div>
//       )}

//     </>
//   );
//   return <RouterProvider router={router} />;
// }

// export default App;


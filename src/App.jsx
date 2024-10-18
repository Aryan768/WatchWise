import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from './components/Navbar';
import FormComponent from './components/FormComponent';
import ResponseComponent from './components/ResponseComponent';
import FormComponentPlaylist from './components/FormComponentPlaylist';
import ResponseComponentPlaylist from './components/ResponseComponentPlaylist';

import { ClipLoader } from 'react-spinners'; // Spinner
import Cards from './components/Cards';
import VideoDefResponseComponent from './components/VideoDefResponse';
import VideoDefFormComponent from './components/videoDefFormComponent';
import LandingPage from './components/LandingPage';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  //Playlist
  const [pInput,setpInput] = useState('');
  const [responseP, setResponseP] = useState(null);
  const [errorP, setErrorP] = useState(null);
  const [loadingP, setLoadingP] = useState(false);

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
  //PlayList

  const handleSubmitP = async (e ,fromVidNumber,toVidNumber,isChecked) => {
    e.preventDefault();
    setLoadingP(true);

    try {
      const resultP = await fetch("http://localhost:3000/playlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ y: pInput,from:fromVidNumber,to:toVidNumber,isCheck: isChecked}),
      });

      if (!resultP.ok) {
        throw new Error('Failed to fetch data. Please try again.');
      }

      const dataP = await resultP.json();
      setResponseP(dataP);
      setErrorP(null);
    } catch (err) {
      setErrorP(err.message);
      setResponseP(null);
    } finally {
      setLoadingP(false);
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setLoading(true);
      console.log(input)
    try {
      const result = await fetch("http://localhost:3000/videodef", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ FILE_URL: input }),
      });

      if (!result.ok) {
        throw new Error('Failed to fetch data. Please try again.');
      }

      const data = await result.json();
      console.log(result)
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
      element : (
        <LandingPage/>
      )
    },
      
      {
      path: "/youtubevideo",
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
      element:  <>
      <Navbar />
      
      <FormComponentPlaylist pInput={pInput} handleSubmitP={handleSubmitP} setpInput={setpInput} />

      {loadingP && (
        <div className="flex justify-center items-center h-screen">
          <ClipLoader color="#4A90E2" loading={loadingP} size={150} />
        </div>
      )}

      {responseP && !loadingP && (
        <>
        <ResponseComponentPlaylist responseP={responseP} pInput={pInput} />
        <Cards responseP={responseP}/>     
        </>
      )}
     
         {error && (
        <div className="text-red-500 mt-4">
          <p>{errorP}</p>
        </div>
      )}
      
    </>
    },{
      path: "/videodef",
      element: (
        <>
          <Navbar />
          <VideoDefFormComponent input={input} handleSubmit2={handleSubmit2} setInput={setInput} />

          {loading && (
            <div className="flex justify-center items-center h-screen">
              <ClipLoader color="#4A90E2" loading={loading} size={150} />
            </div>
          )}

          {response && !loading && (
            <VideoDefResponseComponent response={response} input={input} />
          )}

          {error && (
            <div className="text-red-500 mt-4">
              <p>{error}</p>
            </div>
          )}
        </>
      ),

    }
 ])

  return <RouterProvider router={router} />;
}

export default App;


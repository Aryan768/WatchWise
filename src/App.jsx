import React, { useState } from 'react';
import Navbar from './components/Navbar';

function App() {
  const [input, setInput] = useState('');
  const [x, setX] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setX(input); // Store the input into x

    try {
      const result = await fetch("http://localhost:3000/c", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ x: input }) // Send x as part of an object
      });

      const response = await result.json(); // Parse the response as JSON
      console.log(response); // Log the response message
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
 <Navbar/>
    <header className="bg-blue-300 text-white p-4">
  <h1 className="text-2xl font-bold">WatchWise</h1>
</header>
      <div id='search-bar'>
        <form onSubmit={handleSubmit}>
          <input
            className='border-red-400'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            id='linkUser'
          />
          <button type="submit">Click Me</button>
        </form>
      </div>
      <p className='text-zinc-200'>{x}</p>
    </>
  );
}

export default App;

/*
  const onSubmit = async (data) => {
    await delay(2) // simulating network delay
    let r = await fetch("http://localhost:3000/", {method: "POST",  headers: {
      "Content-Type": "application/json", 
    }, body: JSON.stringify(data)})
    let res = await r.text()
    console.log(data, res)
    // if(data.username !== "sh*/


/*const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle form submission based on input
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const isPlaylist = input.includes('playlist');
    const isVideo = input.includes('watch');
    
    let apiUrl = '';
    if (isPlaylist) {
      apiUrl = `/comments?playlistId=${extractId(input)}`;
    } else if (isVideo) {
      apiUrl = `/atspeed?videoId=${extractId(input)}`;
    } else {
      setError('Invalid YouTube link');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(apiUrl);
      setResult(response.data);  // This will show the video/playlist info
    } catch (error) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to extract playlistId or videoId
  const extractId = (url) => {
    const regex = /(?:[?&]list=|[?&]v=)([^&]+)/;
    const matches = url.match(regex);
    return matches ? matches[1] : '';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white p-8 shadow-lg rounded">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">YouTube Analyzer</h1>
        <form onSubmit={handleSubmit}>
          <label className="block text-gray-600">Enter Playlist or Video Link</label>
          <input
            type="text"
            className="mt-2 p-2 border border-gray-300 rounded w-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}   /////////
            placeholder="Paste your YouTube link here"
          />
          <button className="mt-4 bg-blue-500 text-white p-2 rounded w-full">
            {loading ? 'Loading...' : 'Analyze'}
          </button>
        </form>

        {error && <p className="mt-4 text-red-500">{error}</p>}
        {result && (
          <div className="mt-4 p-4 bg-green-100 rounded">
            <h2 className="text-lg font-semibold">Results</h2>
            <pre className="mt-2">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
*/
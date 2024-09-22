const express = require('express');
const app = express();
const axios = require('axios');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Load environment variables from .env file
dotenv.config();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Parse incoming request data
app.use(bodyParser.urlencoded({ extended: true }));

// Home route (for testing)
app.get('/', (req, res) => {
  res.send('Welcome to the YouTube Analyzer!');
});

app.get('/album-duration', async (req, res) => {
    const playlistId = req.query.playlistId; // The playlist ID will be passed via URL
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`;
  
    try {
      const response = await axios.get(url);
      // console.log("response:")
      // console.log(response);
      const videoIds = response.data.items.map(item => item.contentDetails.videoId);
      // console.log("videoIds:")
      // console.log(videoIds)

      
      //  fetch the duration for each video
      const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds.join(',')}&key=${API_KEY}`;
 
      const videoDetailsResponse = await axios.get(videoDetailsUrl);
 
      let totalDurationInSeconds = 0;
  
      videoDetailsResponse.data.items.forEach(video => {
        const duration = video.contentDetails.duration;
        const seconds = parseISO8601Duration(duration);
        totalDurationInSeconds += seconds;
      });
  
      const hours = Math.floor(totalDurationInSeconds / 3600);
      const minutes = Math.floor((totalDurationInSeconds % 3600) / 60);
      const seconds = totalDurationInSeconds % 60;
  
      res.send(`Total Album Duration: ${hours}h ${minutes}m ${seconds}s`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching album duration');
    }
  });
  
  // Helper function to parse ISO 8601 duration format (like PT1H2M30S)
  function parseISO8601Duration(duration) {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;
    return hours * 3600 + minutes * 60 + seconds;
  }
  let comments = "";
  app.get('/comments', async (req, res) => {
    const videoId = req.query.videoId; // Pass video ID via URL
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}`;
  
    try {
      const response = await axios.get(url);
      
      // Remove HTML tags from each comment using a regex
       comments = response.data.items.map(item => {
        const rawComment = item.snippet.topLevelComment.snippet.textDisplay;
        return rawComment.replace(/<\/?[^>]+(>|$)/g, ""); // This strips HTML tags
      });
  
     // res.render('comments', { comments });
      const genAI = new GoogleGenerativeAI(process.env.API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      console.log(comments)
      const prompt = `Summarize the following YouTube comments:'${comments}'
      Also, provide a brief overview of the main topics discussed in the comments.`;
      
        const result = await model.generateContent(prompt);
        res.send(result.response.text())
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching comments');
    }



    //  res.send(result.response.text())
  });
  app.get('/likes',async(req,res)=>{
    const videoId=req.query.videoId;
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${API_KEY}`;
    const videoDetailsResponse = await axios.get(videoDetailsUrl);
    const videoStats = videoDetailsResponse.data.items[0].statistics;
    const { viewCount, likeCount, dislikeCount, commentCount } = videoStats;

    // Render the data
    res.render('video-analysis1', {
      comments,
      viewCount,
      likeCount,
      dislikeCount: dislikeCount || 'Unavailable',
      commentCount
    })
  })
  

app.get('/atspeed',async(req,res)=>{
  const videoId = req.query.videoId; // The playlist ID will be passed via URL
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${API_KEY}`;
  const vidDetail = await axios.get(url);

  const totalTime= vidDetail.data.items[0].contentDetails.duration
  console.log(totalTime);
  res.send(totalTime); 
 
})
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

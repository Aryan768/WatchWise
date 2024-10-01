// const express = require('express')
// const app = express()
// const axios = require('axios')
// const dotenv = require('dotenv')
// const bodyParser = require('body-parser')
// const { GoogleGenerativeAI } = require('@google/generative-ai')

// // Load environment variables from .env file
// dotenv.config()

// // Set the view engine to EJS
// app.set('view engine', 'ejs')

// // Parse incoming request data
// app.use(bodyParser.urlencoded({ extended: true }))

// // Home route (for testing)
// app.get('/', (req, res) => {
//   res.send('Welcome to the YouTube Analyzer!')
// })

// app.get('/album-duration', async (req, res) => {
//   const playlistId = req.query.playlistId // The playlist ID will be passed via URL
//   const API_KEY = process.env.YOUTUBE_API_KEY
//   const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`

//   try {
//     const response = await axios.get(url)
//     // console.log("response:")
//     // console.log(response);
//     const videoIds = response.data.items.map(
//       item => item.contentDetails.videoId
//     )
//     // console.log("videoIds:")
//     // console.log(videoIds)

//     //  fetch the duration for each video
//     const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIds.join(
//       ','
//     )}&key=${API_KEY}`

//     const videoDetailsResponse = await axios.get(videoDetailsUrl)

//     let totalDurationInSeconds = 0

//     videoDetailsResponse.data.items.forEach(video => {
//       const duration = video.contentDetails.duration
//       const seconds = parseISO8601Duration(duration)
//       totalDurationInSeconds += seconds
//     })

//     const hours = Math.floor(totalDurationInSeconds / 3600)
//     const minutes = Math.floor((totalDurationInSeconds % 3600) / 60)
//     const seconds = totalDurationInSeconds % 60

//     res.send(`Total Album Duration: ${hours}h ${minutes}m ${seconds}s`)
//   } catch (error) {
//     console.error(error)
//     res.status(500).send('Error fetching album duration')
//   }
// })

// // Helper function to parse ISO 8601 duration format (like PT1H2M30S)
// function parseISO8601Duration (duration) {
//   const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
//   const hours = parseInt(match[1]) || 0
//   const minutes = parseInt(match[2]) || 0
//   const seconds = parseInt(match[3]) || 0
//   return hours * 3600 + minutes * 60 + seconds
// }
// let comments = ''
// app.get('/comments', async (req, res) => {
//   const videoId = req.query.videoId // Pass video ID via URL
//   const API_KEY = process.env.YOUTUBE_API_KEY
//   const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}`

//   try {
//     const response = await axios.get(url)

//     // Remove HTML tags from each comment using a regex
//     comments = response.data.items.map(item => {
//       const rawComment = item.snippet.topLevelComment.snippet.textDisplay
//       return rawComment.replace(/<\/?[^>]+(>|$)/g, '') // This strips HTML tags
//     })

//     // res.render('comments', { comments });
//     const genAI = new GoogleGenerativeAI(process.env.API_KEY)
//     const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
//     console.log(comments)
//     const prompt = `Summarize the following YouTube comments:'${comments}'
//       Also, provide a brief overview of the main topics discussed in the comments.`

//     const result = await model.generateContent(prompt)
//     res.send(result.response.text())
//   } catch (error) {
//     console.error(error)
//     res.status(500).send('Error fetching comments')
//   }

//   //  res.send(result.response.text())
// })
// app.get('/likes', async (req, res) => {
//   const videoId = req.query.videoId
//   const API_KEY = process.env.YOUTUBE_API_KEY
//   const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${API_KEY}`
//   const videoDetailsResponse = await axios.get(videoDetailsUrl)
//   const videoStats = videoDetailsResponse.data.items[0].statistics
//   const { viewCount, likeCount, dislikeCount, commentCount } = videoStats

//   // Render the data
//   res.render('video-analysis1', {
//     comments,
//     viewCount,
//     likeCount,
//     dislikeCount: dislikeCount || 'Unavailable',
//     commentCount
//   })
// })

// app.get('/atspeed', async (req, res) => {
//   const videoId = req.query.videoId // The playlist ID will be passed via URL
//   const API_KEY = process.env.YOUTUBE_API_KEY
//   const url = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${API_KEY}`
//   const vidDetail = await axios.get(url)

//   const totalTime = vidDetail.data.items[0].contentDetails.duration
//   console.log(totalTime)
//   res.send(totalTime)
// })
// const PORT = process.env.PORT || 3000
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`)
// })

import express from 'express'
import axios from 'axios'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from "cors"

import { GoogleGenerativeAI } from '@google/generative-ai'
const app = express()
app.use(cors()) 
// Load environment variables from .env file
dotenv.config()

// Set the view engine to EJS
app.set('view engine', 'ejs')

// Parse incoming request data
app.use(bodyParser.urlencoded({ extended: true }))
//Global var
var gl1

// Middleware to parse JSON
app.use(express.json());

// Home route (for testing)
app.get('/', (req, res) => {
  res.send('Welcome to the YouTube Analyzer!')
})

// Helper function: Fetch video details by ID
async function fetchVideoDetails (videoId, API_KEY) {
  async function fetchVideoDetails(videoId, API_KEY) {
    const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${API_KEY}`;
  
    const response = await axios.get(videoDetailsUrl);
    const videoItem = response.data.items[0];
  
    // Check if contentDetails exists
    if (!videoItem || !videoItem.contentDetails) {
      throw new Error(`No contentDetails found for video ID: ${videoId}`);
    }
  
    return videoItem.contentDetails.duration;
  }
  
}

// Helper function: Parse ISO 8601 duration format (like PT1H2M30S)
function parseISO8601Duration (duration) {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
  const hours = parseInt(match[1]) || 0
  const minutes = parseInt(match[2]) || 0
  const seconds = parseInt(match[3]) || 0
  return hours * 3600 + minutes * 60 + seconds
}

// Helper function: Calculate video duration at different speeds
function calculateSpeedDurations (durationInSeconds) {
  const speeds = [1.25, 1.5, 1.75, 2.0]
  const durations = {}

  speeds.forEach(speed => {
    const newDuration = (durationInSeconds / speed).toFixed(2) // Keep 2 decimal places
    durations[`atSpeed ${speed}x`] = formatDuration(newDuration) //Computed Property Names in js similar but not same as unordered map in c++
  })

  return durations
}

// Helper function: Format duration into hours, minutes, seconds
function formatDuration (totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = (totalSeconds % 60).toFixed(0)
  return `${hours}h ${minutes}m ${seconds}s`
}

// Route: Calculate Album Duration
app.get('/album-duration', async (req, res) => {
  const playlistId = req.query.playlistId
  const API_KEY = process.env.YOUTUBE_API_KEY
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`
  console.log(url);
  try {
    const response = await axios.get(url)
    //console.dir(response) // Provides detailed view
    const videoIds = response.data.items.map(item => item.contentDetails.videoId)
    const noOfVideosInPlayList = videoIds.length
    console.log(noOfVideosInPlayList)
    // Fetch video durations
        // Fetch video details (thumbnails) for each video in the playlist

        async function individualvidsHelper(videoIds){
            let i=1
          for (const Id of videoIds) {
            const linkforOne = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=snippet&id=${Id}`
            const newLinkResponse = await axios.get(linkforOne)
            
            // Logging the URL being used to make the request
         
    
            // Extracting and logging the image URL
            const imgUrl = newLinkResponse.data.items[0].snippet.thumbnails.default.url
            console.log(`Number :${i++}`, imgUrl);
          }
        }
    
        individualvidsHelper(videoIds)
    

    let totalDurationInSeconds = 0
    for (const videoId of videoIds) {
      const videoDuration = await fetchVideoDetails(videoId, API_KEY)
      totalDurationInSeconds += parseISO8601Duration(videoDuration)
    }

    const totalDuration = formatDuration(totalDurationInSeconds)
    const speedDurations = calculateSpeedDurations(totalDurationInSeconds)
    const averageDuration = formatDuration(
      totalDurationInSeconds / noOfVideosInPlayList
    )
    res.render('album-duration', {
      totalDuration,
      speedDurations,
      averageDuration
    })

  } catch (error) {
    console.error(error)
    res.status(500).send('Error fetching album duration')
  }
})
var clientUrl;
// Route: Fetch YouTube Comments and Summarize
app.get('/comments', async (req, res) => {
  
  

  const videoId = req.query.videoId
  const API_KEY = process.env.YOUTUBE_API_KEY
  const url = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}`

  try {
    const response = await axios.get(url)

    // Remove HTML tags from comments
    const comments = response.data.items.map(item => {
      const rawComment = item.snippet.topLevelComment.snippet.textDisplay
      return rawComment.replace(/<\/?[^>]+(>|$)|[*]/g, '')
    })

    // Summarize comments using Google Generative AI
    const genAI = new GoogleGenerativeAI(process.env.API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `Summarize the following YouTube comments:\n${comments.join(
      '\n'
    )}`
    const result = await model.generateContent(prompt)
    var finalResult = result.response.text()
    try {
      const videoDuration = await fetchVideoDetails(videoId, API_KEY)
      const totalDurationInSeconds = parseISO8601Duration(videoDuration)
      var totalDurationv1 = formatDuration(totalDurationInSeconds)
      var speedDurations = calculateSpeedDurations(totalDurationInSeconds)
    } catch (error) {
      console.error(error)
      res.status(500).send('Error fetching video duration')
    }
    // res.send(result.response.text());
  } catch (error) {
    console.error(error)
    res.status(500).send('Error fetching comments')
  }
  //at speed part
  try {
    const videoDuration = await fetchVideoDetails(videoId, API_KEY)
    const totalDurationInSeconds = parseISO8601Duration(videoDuration)
    var speedDurations = calculateSpeedDurations(totalDurationInSeconds)

    //res.render('speed-durations', { speedDurations });
  } catch (error) {
    console.error(error)
    res.status(500).send('Error fetching video duration')
  }
  //likes part
  const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${API_KEY}`
  const videoDetailsResponse = await axios.get(videoDetailsUrl)
  const videoStats = videoDetailsResponse.data.items[0].statistics
  const { viewCount, likeCount, dislikeCount, commentCount } = videoStats
  //img part
  const newLink = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=snippet&id=${videoId}`
  const newLinkResponse = await axios.get(newLink)
  console.log(newLink)
  const imgUrl = newLinkResponse.data.items[0].snippet.thumbnails.maxres.url
  console.log(imgUrl)
  //title part
  const description = newLinkResponse.data.items[0].snippet.title
 // console.log(description)
  res.render('comments', {
    speedDurations,
    finalResult,
    totalDurationv1,
    viewCount,
    likeCount,
    dislikeCount: dislikeCount || 'Unavailable',
    commentCount,
    imgUrl,
    description
  })
})
app.post('/c', async (req, res) => {
  const { x } = req.body; // Ensure you're receiving the body as an object with { x }
  const clientUrl = x;

  try {
    const parsedUrl = new URL(clientUrl);
    const isPlaylist = parsedUrl.searchParams.has('list');
    const videoId = parsedUrl.searchParams.get("v"); // Extracts the video ID

    if (isPlaylist) {
      return res.status(400).json({ error: "This is a playlist. Please provide an individual video link." });
    }

    if (!videoId) {
      return res.status(400).json({ error: "Invalid video link. No video ID found." });
    }

    const API_KEY = process.env.YOUTUBE_API_KEY;

    // Fetch YouTube comments
    const commentsUrl = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}`;
    const commentsResponse = await axios.get(commentsUrl);

    // Extract and clean comments
    const comments = commentsResponse.data.items.map(item => {
      const rawComment = item.snippet.topLevelComment.snippet.textDisplay;
      return rawComment.replace(/<\/?[^>]+(>|$)|[*]/g, ''); // Remove HTML tags and asterisks
    });

    // Summarize comments using Google Generative AI
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Summarize the following YouTube comments:\n${comments.join('\n')}`;
    const result = await model.generateContent(prompt);
    const finalResult = result.response.text(); // Corrected response extraction

    // Fetch video details (duration, likes, views, etc.)
    const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet,contentDetails&id=${videoId}&key=${API_KEY}`;
    const videoDetailsResponse = await axios.get(videoDetailsUrl);
    const videoData = videoDetailsResponse.data.items[0];

    const videoStats = videoData.statistics;
    const { viewCount, likeCount, dislikeCount, commentCount } = videoStats;
    const videoDuration = videoData.contentDetails.duration; // Duration in ISO8601 format
    const title = videoData.snippet.title;
    const imgUrl = videoData.snippet.thumbnails.maxres?.url || videoData.snippet.thumbnails.default.url;

    // Convert ISO8601 duration to seconds and calculate at different speeds
    const totalDurationInSeconds = parseISO8601Duration(videoDuration);
    const totalDurationv1 = formatDuration(totalDurationInSeconds); // Human-readable duration
    const speedDurations = calculateSpeedDurations(totalDurationInSeconds);

    // Send the response with all fetched and computed data
    res.json({
      message: "Video data fetched successfully",
      speedDurations,
      finalResult,
      totalDurationv1,
      viewCount,
      likeCount,
      dislikeCount: dislikeCount || 'Unavailable',
      commentCount,
      imgUrl,
      title
    });
  } catch (error) {
    console.error("Error processing the request:", error);
    res.status(500).json({ error: "An internal error occurred while processing the video." });
  }
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

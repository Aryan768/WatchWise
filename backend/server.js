
import express from 'express'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

import bodyParser from 'body-parser'
import cors from "cors"
import { google } from 'googleapis'

import Sentiment from 'sentiment'
const sentiment = new Sentiment();
import { GoogleGenerativeAI } from '@google/generative-ai'
import multer from 'multer';
import multerS3 from 'multer-s3';
const app = express()
import session from 'express-session';
import { AssemblyAI } from 'assemblyai'


import { S3Client } from '@aws-sdk/client-s3';  // v3 client
import { Upload } from '@aws-sdk/lib-storage';   // v3 for upload
import path from 'path'


const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket:'aryanbucket7',
    acl: 'public-read',
    contentType:multerS3.AUTO_CONTENT_TYPE,  // Allow public read access
    key: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});
// Create an S3 client instance
// const client = new AssemblyAI({
//   apiKey: "cb02eee54d7a4e099242c80f5957597e"
// })
// Middleware to parse JSON

app.use(express.json());
// Add session middleware

app.use(cors()) 
// Load environment variables from .env file



import { fileURLToPath } from 'url';
import { type } from 'os'


// Define __dirname manually in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React frontend
app.use(express.static(path.join(__dirname, "dist")));  // Adjust the path to "dist" for Vite

// Set the view engine to EJS
app.set('view engine', 'ejs')

// Parse incoming request data
app.use(bodyParser.urlencoded({ extended: true }))
//Global var
var gl1
var transcriptT=''

//Summary of video Premium API testing

app.post('/videodef', upload.single('file'), async (req, res) => {
  const isUploadClicked = req.body.isUploadClicked;  // Capture form field
  console.log('isUploadClicked:', isUploadClicked); 

  let fileURL = '';

  if (isUploadClicked === 'false') {  // Frontend sends strings, so check as string
    const { FILE_URL } = req.body; // Use req.body for the URL sent in the POST request body

    console.log(FILE_URL);
    if (!FILE_URL) {
      return res.status(400).json({ error: "File URL is required" });
    }

    fileURL = FILE_URL;
    console.log(`File URL provided: ${fileURL}`);
  } else if (isUploadClicked === 'true') {
    console.log("File upload initiated");

    if (!req.file) {
      return res.status(400).json({ error: "File is required for upload" });
    }

    // Get the file URL from S3
    const fileUrl = req.file.location;
    console.log(`File uploaded successfully: ${fileUrl}`);
    fileURL = fileUrl;

    // Optionally send the file URL to the client
   // res.status(200).send({ message: 'File uploaded successfully', fileUrl });
  }

  console.log("Entered videoDef");

  const client = new AssemblyAI({
    apiKey: process.env.API_Key2
  });

  // Request parameters
  const data = {
    audio: fileURL,
    speech_model: "best",
    summarization: true,
    sentiment_analysis: true,
    language_detection: true,
  };

  try {
    const transcript = await client.transcripts.transcribe(data); // Wait for the transcript result
    console.log(transcript.text);
    const transcriptT = transcript.text;
    return res.json({ transcriptT });
  } catch (error) {
    console.error("Error transcribing the audio: ", error);
    return res.status(500).json({ error: "Transcription failed" });
  }
});

// app.post('/videodef', async (req, res) => {
//   const isUploadClicked = req.body.isUploadClicked;
//   console.log(isUploadClicked); 

//   let fileURL ='';
//   if(!isUploadClicked){
//     const {FILE_URL} = req.body; // Use req.body if the URL is sent in the POST request body
  
// console.log(FILE_URL)
//   if (!FILE_URL) {
//     return res.status(400).json({ error: "File URL is required" });
//   }

//     console.log(FILE_URL)
//       if (!FILE_URL) {
//         return res.status(400).json({ error: "File URL is required" });
//       }
//     fileURL =FILE_URL
//   }
//   else if(isUploadClicked){
//     console.log("Hi");
//   await upload.single('file')(req, res, (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send('Error uploading file');
//     }

//     // Get the file URL from S3
//     const fileUrl = req.file.location;
//     console.log(`File uploaded successfully: ${fileUrl}`);
//     fileURL =fileUrl

//     // Send the file URL to the client or next process (like AssemblyAI)
//     res.status(200).send({ message: 'File uploaded successfully', fileUrl });
//   }); 
//   }


//   console.log("Entered videoDef");

//   const client = new AssemblyAI({
//    // apiKey: "cb02eee54d7a4e099242c80f5957597e"
//    apiKey : process.env.API_Key2
//   });

 
//   // Request parameters
//   const data = {
//     audio: fileURL,
//     speech_model: "best",
//     summarization: true,
//     sentiment_analysis: true,
//     language_detection: true,
//   };

//   try {
//     const transcript = await client.transcripts.transcribe(data); // Wait for the transcript result
//     console.log(transcript.text);
//     transcriptT =transcript.text
//     return res.json({ transcriptT});
//   } catch (error) {
//     console.error("Error transcribing the audio: ", error);
//     return res.status(500).json({ error: "Transcription failed" });
//   }
// });

//waste
app.post('/awstry',async (req,res)=>{
  console.log("Hi");
  await upload.single('file')(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error uploading file');
    }

    // Get the file URL from S3
    const fileUrl = req.file.location;
    console.log(`File uploaded successfully: ${fileUrl}`);

    // Send the file URL to the client or next process (like AssemblyAI)
    res.status(200).send({ message: 'File uploaded successfully', fileUrl });
  });
  // Define multer upload middleware
  
// //res.send("response working!!");
// const client = new AssemblyAI({
//   // apiKey: "cb02eee54d7a4e099242c80f5957597e"
//   apiKey : process.env.API_Key2
//  });

//  const {FILE_URL} = req.body;
// console.log(FILE_URL)
//   if (!FILE_URL) {
//     return res.status(400).json({ error: "File URL is required" });
//   }

//   // Request parameters
//   const data = {
//     audio: FILE_URL,
//     speech_model: "best",
//     summarization: true,
//     sentiment_analysis: true,
//     language_detection: true,
//   };

//   try {
//     const transcript = await client.transcripts.transcribe(data); // Wait for the transcript result
//     console.log(transcript.text);
//     transcriptT =transcript.text
//     return res.json({ transcriptT});
//   } catch (error) {
//     console.error("Error transcribing the audio: ", error);
//     return res.status(500).json({ error: "Transcription failed" });
//   }
});



app.get('/', (req, res) => {
  res.send('Welcome to the YouTube Analyzer!')
})

// Helper function: Fetch video details by ID

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
    durations[`Time with ${speed}x`] = formatDuration(newDuration) //Computed Property Names in js similar but not same as unordered map in c++
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
app.post('/playlist', async (req, res) => {
  const { y } = req.body;
  const {from,to,isCheck} =req.body;
  console.log(isCheck)
  console.log(from )
  console.log(to)
  console.log(y);
  try {
    const parsedUrl = new URL(y);
    //const isVideo = parsedUrl.searchParams.has('v');
    const videoId = parsedUrl.searchParams.get("list"); // Extracts the playlist ID
 //  console.log(videoId)
    // if (isVideo) {
    //   return res.status(400).json({ error: "This is a video. Please provide a playlist link." });
    // }

    if (!videoId) {
      return res.status(400).json({ error: "Invalid video link. No video ID found." });
    }

    const playlistId = videoId;
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`;
    // console.log(url);
    const fromVidNumber = from;// req.body.fromVidNumber; // Get from user input
   // console.log(from);
//    console.log(to);
const toVideoNumber = to;//req.body.toVideoNumber; // Get from user input

let imgUrls = [];
let eachComments = [];
let videoTitle =[];
let watchWiseScore =[];

try {
  const response = await axios.get(url);
  let videoIds = response.data.items.map(item => item.contentDetails.videoId);
  const noOfVideosInPlayList = videoIds.length;
  console.log(`Total videos in playlist: ${noOfVideosInPlayList}`);

  // Validate and slice video IDs if a range is provided
  if (fromVidNumber && toVideoNumber) {
    if (fromVidNumber < 1 || toVideoNumber > noOfVideosInPlayList || fromVidNumber > toVideoNumber) {
      return res.status(400).json({ error: "Invalid video range provided." });
    }

    // Slicing the array from 'fromVidNumber - 1' to 'toVideoNumber' (0-based index)
    videoIds = videoIds.slice(fromVidNumber - 1, toVideoNumber);
    console.log(`Processing videos from ${fromVidNumber} to ${toVideoNumber}`);
  } else {
    console.log("Processing all videos in the playlist");
  }
  if(isCheck){
      // Fetch video details (thumbnails) for each video in the playlist
      async function individualvidsHelper(videoIds) {
        let i = 1;
        for (const Id of videoIds) {
         
          const linkforOne = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=snippet&id=${Id}`;
          const newLinkResponse = await axios.get(linkforOne);

          // Extracting and logging the image URL
          const thumbnails = newLinkResponse.data.items[0].snippet.thumbnails;
          const imgUrl = thumbnails.maxres?.url || thumbnails.standard?.url || thumbnails.high?.url || thumbnails.medium?.url || thumbnails.default.url;
          imgUrls.push(imgUrl)
          console.log(`Number :${i++}`, imgUrl);
          //For eact videos we are adding the prompt!!!!!!!
          
        
  const urlPrompt = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${Id}&key=${API_KEY}`
       
  try {
    
    const response = await axios.get(urlPrompt)

    // Remove HTML tags from comments
    if (response.data.items && response.data.items.length > 0) {
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
    var finalResult =  result.response.text()
    eachComments.push(finalResult);
    const sentimentResult = sentiment.analyze(finalResult)
    console.log(sentimentResult);
    const score = sentimentResult.score;
    function getPercentageScore(score)
    {
      const maxPossibleScore =10;
      const percentageScore = Math.floor(Math.min(
        Math.max(((score + maxPossibleScore) / (2 * maxPossibleScore)) * 100, 0),
        100
      )); //  const percentageScore = Math.min((Math.max(((score+maxPossibleScore)/(2*maxPossibleScore)))*100,0),100);
      
      watchWiseScore.push(percentageScore);
    }
    getPercentageScore(score);


     } else{
      eachComments.push("Comments are turned Off for this Video!!!!")
    }
        }catch(err){
          console.error(err)
        }
        try{

          const newLink = `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=snippet&id=${Id}`
         //console.log(newLink)
          const newLinkResponse = await axios.get(newLink)
          //title part
       const videoTitle1 = newLinkResponse.data.items[0].snippet.title
       videoTitle.push(videoTitle1)
       
        }catch(err){console.error(err +" i am the title error ")
        }
      }}
      await individualvidsHelper(videoIds);
    } else{
      videoTitle='';
      eachComments='';
      imgUrls='';
      watchWiseScore=0


    }
  

      // Calculate total duration
      let totalDurationInSeconds = 0;
      for (const videoId of videoIds) {
        const videoDuration = await fetchVideoDetails(videoId, API_KEY);
        console.log(videoDuration)
        totalDurationInSeconds += parseISO8601Duration(videoDuration);
      }

      const totalDuration = formatDuration(totalDurationInSeconds);
      console.log(totalDuration)
      const speedDurations = calculateSpeedDurations(totalDurationInSeconds);
      const averageDuration = formatDuration(totalDurationInSeconds / videoIds.length);
   //   console.log(eachComments)
  
      res.json ({
        message : "Message got successfully",
        totalDuration,
        speedDurations,
        averageDuration,
        imgUrls,
        eachComments,
        videoTitle,
        watchWiseScore,
        isCheck
      });

    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching album duration');
    }
  } catch (error) {
    console.error("Error processing the request:", error);
    res.status(500).json({ error: "An internal error occurred while processing the video." });
  }
});

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
  const {isCheck}= req.body;
  console.log(isCheck +"Hi ischecked--");
  
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
    const sentimentResult = sentiment.analyze(finalResult)
   // console.log(sentimentResult);
    const score = sentimentResult.score;
    let watchWiseScore;
    function getPercentageScore(score)
    {
      const maxPossibleScore =10;
      const percentageScore = Math.min(
        Math.max(((score + maxPossibleScore) / (2 * maxPossibleScore)) * 100, 0),
        100
      ); //  const percentageScore = Math.min((Math.max(((score+maxPossibleScore)/(2*maxPossibleScore)))*100,0),100);
      watchWiseScore =percentageScore;
    }
    getPercentageScore(score);
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
      title,
      watchWiseScore
    });
  } catch (error) {
    console.error("Error processing the request:", error);
    res.status(500).json({ error: "An internal error occurred while processing the video." });
  }
});


// app.get('/videodef', async (req, res) => {
//   const videoId = "PkZNo7MFNFg"; // Replace with your actual video ID

//   if (!req.session.tokens || !req.session.tokens.access_token) {
//     return res.redirect('/auth'); // Redirect to OAuth if no access token
//   }

//   oauth2Client.setCredentials(req.session.tokens);

//   const captionUrl = `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}`;

//   try {
//     const captionResponse = await axios.get(captionUrl, {
//       headers: { Authorization: `Bearer ${req.session.tokens.access_token}` }
//     });

//     const captions = captionResponse.data.items;

//     if (captions.length > 0) {
//       const captionId = captions[0].id; // Choose the first available caption
//       console.log('Caption found:', captionId);

//       // Check caption status
//       const captionStatus = captions[0].snippet.status;
//       if (captionStatus !== 'failed') {
//         const transcript = await getTranscript(captionId);
//         console.log(transcript)
//         res.json({ transcript });
//       } else {
//         console.log('Caption status is failed.');
//         res.status(404).json({ error: "Caption track is unavailable." });
//       }
//     } else {
//       console.log('No captions found for this video.');
//       res.status(404).json({ error: "No captions found for this video." });
//     }
//   } catch (error) {
//     console.error('Error retrieving captions:', error.response ? error.response.data : error.message);
//     res.status(500).json({ error: "Failed to retrieve captions." });
//   }

//   async function getTranscript(captionId) {
//     const transcriptUrl = `https://www.googleapis.com/youtube/v3/captions/${captionId}?tfmt=sbv&tlang=en`; // Use valid tfmt and tlang
//     try {
//       const transcriptResponse = await axios.get(transcriptUrl, {
//         headers: { Authorization: `Bearer ${req.session.tokens.access_token}` }
//       });
//       console.log('Transcript:', transcriptResponse.data);
//       return transcriptResponse.data;
//     } catch (error) {
//       console.error('Error retrieving transcript:', error.response ? error.response.data : error.message);
//       throw error;
//     }
//   }
// });



// Example API route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// All other requests should return the React frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});



const PORT = process.env.PORT || 40001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

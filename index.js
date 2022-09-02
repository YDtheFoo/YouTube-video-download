const express = require('express')
const axios = require("axios")
const cors = require("cors")
const app = express()
const port = 3000

app.use(cors());

app.get('/youtube-video-download', (req, res) => {
  const url = req.query.url;
  if(url){
    const options = {
        method: 'GET',
        url: 'https://youtube-search-and-download.p.rapidapi.com/video',
        params: {id: url},
        headers: {
            'X-RapidAPI-Key': process.env.youtubeDownloadAPIKey,
            'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        res.json(response.data);
    }).catch(function (error) {
        res.status(400).send(error);
    });
  }else{
    res.json({
        "type": "error",
        "message": "invalid URL"
    });
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
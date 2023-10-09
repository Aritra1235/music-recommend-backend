// Import required modules
import express from 'express'
import bodyParser from 'body-parser'
import cors  from 'cors'
import {getSongID} from "./services/getSongID.js";
import {getSongFeatures} from "./services/getSongFeatures.js";
import { getRecomendationFeatures } from './services/getRecomendationFeatures.js'
import { getSongs } from "./services/getSongs.js";
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';




const app = express();
const PORT = 8080

let songIDs
let songID1
let songID2
let audioFeatures
let recommendedFeatures
let songsList

// Allow requests from your frontend domain (replace with your actual domain)
const corsOptions = {
    origin: 'https://music-recommender.pages.dev',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
};

// Use the cors middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

const getFeatures = async () => {
    audioFeatures = await getSongFeatures(songID1, songID2)
    console.log(audioFeatures)
}


// logging

function logging() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const fileName = 'logs.log';
    // Create a timestamp with the current date and time
    const timestamp = new Date().toLocaleString();
    // Define the file path two folders back
    const filePath = path.join(__dirname, '..', '..', fileName);
    // Create a log string that includes the timestamp and the data
    const logString = `${timestamp}\nSong ID 1: ${songID1}\nSong ID 2: ${songID2}\nAudio Features: ${JSON.stringify(audioFeatures, null, 2)}\nRecommended Features: ${JSON.stringify(recommendedFeatures, null, 2)}\nSongs List: ${JSON.stringify(songsList, null, 2)}\n`;


    // Append the log string to the specified file
    fs.appendFileSync(filePath, logString);

    console.log('Data has been logged to the file and console.');

}

// For testing purposes
app.post('/api', (req, res) => {
    const song1link = req.body.song1;
    const song2link = req.body.song2;

    songIDs = getSongID(song1link, song2link)

    songID1 = songIDs[0]
    songID2 = songIDs[1]

    console.log(songID1)
    console.log(songID2)



    getFeatures().then(r => {

        recommendedFeatures = getRecomendationFeatures(audioFeatures.audio_features)
        recommendedFeatures['artistID1'] = audioFeatures.artistID1
        recommendedFeatures['artistID2'] = audioFeatures.artistID2
        console.log(recommendedFeatures)
        songsList = getSongs(recommendedFeatures)
        console.log(songsList)

    })

    getFeatures().then(features => {

        recommendedFeatures = getRecomendationFeatures(audioFeatures.audio_features)
        recommendedFeatures['artistID1'] = audioFeatures.artistID1
        recommendedFeatures['artistID2'] = audioFeatures.artistID2
        console.log(recommendedFeatures)
        return getSongs(recommendedFeatures);

    }).then(songsList => {

        console.log(songsList);
        for (let i = 0; i < 10; i++) {
            console.log("Recommendation", i+1 + ": " , songsList.tracks[i].name, "By", songsList.tracks[i].artists[0].name)

        }



        res.json({
            songs: [
                {song1: songsList.tracks[0].name},
                {song2: songsList.tracks[1].name},
                {song3: songsList.tracks[2].name},
                {song4: songsList.tracks[3].name},
                {song5: songsList.tracks[4].name},
                {song6: songsList.tracks[5].name},
                {song7: songsList.tracks[6].name},
                {song8: songsList.tracks[7].name},
                {song9: songsList.tracks[8].name},
                {song10: songsList.tracks[9].name},
            ],
            artists: [
                {artist1: songsList.tracks[0].artists[0].name},
                {artist2: songsList.tracks[1].artists[0].name},
                {artist3: songsList.tracks[2].artists[0].name},
                {artist4: songsList.tracks[3].artists[0].name},
                {artist5: songsList.tracks[4].artists[0].name},
                {artist6: songsList.tracks[5].artists[0].name},
                {artist7: songsList.tracks[6].artists[0].name},
                {artist8: songsList.tracks[7].artists[0].name},
                {artist9: songsList.tracks[8].artists[0].name},
                {artist10: songsList.tracks[9].artists[0].name}
            ],
            ids: [
                {id1: songsList.tracks[0].id},
                {id2: songsList.tracks[1].id},
                {id3: songsList.tracks[2].id},
                {id4: songsList.tracks[3].id},
                {id5: songsList.tracks[4].id},
                {id6: songsList.tracks[5].id},
                {id7: songsList.tracks[6].id},
                {id8: songsList.tracks[7].id},
                {id9: songsList.tracks[8].id},
                {id10: songsList.tracks[9].id},
            ]

        });

        logging()


    });





});

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});
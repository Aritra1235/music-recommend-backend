// Import required modules
import express from 'express'
import bodyParser from 'body-parser'
import cors  from 'cors'
import {getSongID} from "./services/getSongID.js";
import {getSongFeatures} from "./services/getSongFeatures.js";
import { getRecomendationFeatures } from './services/getRecomendationFeatures.js'
import { getSongs } from "./services/getSongs.js";



const app = express();
const PORT = 8080

// Allow requests from your frontend domain (replace with your actual domain)
const corsOptions = {
    origin: 'https://music-recommender.pages.dev',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
};

// Use the cors middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

let songIDs
let songID1
let songID2
let audioFeatures
let recommendedFeatures

const getFeatures = async () => {
    audioFeatures = await getSongFeatures(songID1, songID2)
    console.log(audioFeatures)
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
        const songsList = getSongs(recommendedFeatures)
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
            ]

        });


    });





});

app.listen(PORT, () => {
    console.log(`API is listening on port ${PORT}`);
});
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();

const getSongs = async (recommendedFeatures) => {

    const artistID1 = recommendedFeatures.artistID1
    const artistID2 = recommendedFeatures.artistID2


    const songsURL = `https://api.spotify.com/v1/recommendations?limit=10&market=US&seed_artists=${artistID1}%2C${artistID2}&target_acousticness=${recommendedFeatures.acousticness}&target_danceability=${recommendedFeatures.danceability}&target_energy=${recommendedFeatures.energy}&target_instrumentalness=${recommendedFeatures.instrumentalness}&target_liveness=${recommendedFeatures.liveness}&target_speechiness=${recommendedFeatures.speechiness}&target_valence=${recommendedFeatures.valence}`

    console.log(songsURL)

    const token = 'BQBkZ8Vew2ZWFWQ1xKdQUVgKn2PaMDpPRE22z1glmcG66sP1ppXwOOf1QgWSYtSbcF8krZd8NTEeD5lxF8t8FJtrIyKqQwACqO_mM80ZwqiHUE6tjqY';

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    // Fetch songs
    const songsResponse = await fetch(songsURL, {
        headers
    });

    const songsList = await songsResponse.json();

    return songsList

}

export { getSongs }
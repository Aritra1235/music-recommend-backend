// getSongFeatures.js

const getSongFeatures = async (songID1, songID2) => {

    const featureURL = `https://api.spotify.com/v1/audio-features?ids=${songID1},${songID2}`;
    const artistURL = `https://api.spotify.com/v1/tracks?ids=${songID1},${songID2}`

    const token = 'BQAsuIzdzbIjYGqcZWRs-w38hVn-UZLEeaGlwmMMMNmmWTfDZ53KYDc0Xc-QtzuSXmdIepZsCxTBZsqx_2PbtnKcqk_uRNkVtQTEoVIcZbxBkdNbaH8';

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    // Fetch audio features
    const featuresResponse = await fetch(featureURL, {
        headers
    });

    const featuresData = await featuresResponse.json();

    // Fetch artist features
    const artistResponce = await fetch(artistURL, {
        headers
    });

    const artistData = await artistResponce.json();

    console.log(artistData.tracks[0].artists[0].name)
    console.log(artistData.tracks[1].artists[0].name)


    featuresData.artistID1 = artistData.tracks[0].artists[0].id
    featuresData.artistID2 = artistData.tracks[1].artists[0].id



    return featuresData;

};

export { getSongFeatures };
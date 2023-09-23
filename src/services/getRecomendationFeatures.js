let dancebility
let energy
let loudness
let speechiness
let acousticness
let instrumentalness
let liveness
let valence
let recomendation
let artistID1
let artistID2

let track1
let track2

function getValue(num1, num2) {
    return (num1 + num2) / 2
}


const getRecomendationFeatures = (trackFeatures) => {
    track1 = trackFeatures[0]
    track2 = trackFeatures[1]

    dancebility = getValue(track1.danceability, track2.danceability)
    energy = getValue(track1.energy, track2.energy)
    loudness = getValue(track1.loudness, track2.loudness)
    speechiness = getValue(track1.speechiness, track2.speechiness)
    acousticness = getValue(track1.acousticness, track2.acousticness)
    instrumentalness = getValue(track1.instrumentalness, track2.instrumentalness)
    liveness = getValue(track1.liveness, track2.liveness)
    valence = getValue(track1.valence, track2.valence)
    artistID1 =
    artistID2



    recomendation = {
        danceability: dancebility,
        energy: energy,
        loudness: loudness,
        speechiness: speechiness,
        acousticness: acousticness,
        instrumentalness: instrumentalness,
        liveness: liveness,
        valence: valence
    }

    return recomendation
}

export { getRecomendationFeatures }
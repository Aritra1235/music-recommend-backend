let songIDs
const getSongID = (songlink1, songlink2) => {



    songIDs = [songlink1.match(/track\/(.*?)\?/)[1], songlink2.match(/track\/(.*?)\?/)[1]]

    return songIDs
}

export { getSongID }
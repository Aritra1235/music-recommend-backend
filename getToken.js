import fs from 'fs'

const clientId = 'ABC'; // Replace with your actual client ID
const clientSecret = 'ABC'; // Replace with your actual client secret

const spotifyApiUrl = 'https://accounts.spotify.com/api/token';

const data = new URLSearchParams();
data.append('grant_type', 'client_credentials');
data.append('client_id', clientId);
data.append('client_secret', clientSecret);

fetch(spotifyApiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: data.toString(),
})
  .then((response) => response.json())
  .then((data) => {
    console.log('Access token:', data.access_token);
    fs.writeFileSync('/path/to/your/file.txt', accessToken);

  })
  .catch((error) => {
    console.error('Error:', error);
  });

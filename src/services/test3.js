import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({ path: '../../.env' });


// Now you can access your environment variables using process.env
const token = process.env.SPOTIFY_API_TOKEN;

console.log(token)

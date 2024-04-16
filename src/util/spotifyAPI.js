require('dotenv').config({ path: '../../.env' });
const express = require('express');
var app = express();

const spotify_secret = process.env.SPOTIFY_CLIENT_SECRET;
const spotify_id = process.env.SPOTIFY_CLIENT_ID;
const redirect_uri = process.env.REDIRECT_URI;
const show_Id = process.env.ID_SHOW

class SpotifyApi {
    constructor() {
        this.accessToken = null
        this.refreshToken = null
        this.code = null
        this.audiobooks = []
        this.getCodeUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${spotify_id}&scope=user-read-private user-read-email&redirect_uri=${encodeURIComponent(redirect_uri)}`
        this.showId = show_Id
    }
    async getAccessToken() {
        try {
            const response = await fetch('https://accounts.spotify.com/api/token?code=' + this.code + '&redirect_uri=http%3A%2F%2Flocalhost%3A8001%2F&grant_type=authorization_code', {
                method: "Post",
                headers: {
                    'Authorization': 'Basic ' + (Buffer.from(spotify_id + ':' + spotify_secret).toString('base64')),
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                json: true
            });

            const data = await response.json()
            this.accessToken = data.access_token
            this.refreshToken = data.refresh_token
        } catch (error) {
            console.error('Error getting access token:', error);
            throw error;
        }
    }
    
    async refreshAccessToken() {
        try {
            const response = await fetch('https://accounts.spotify.com/api/token?grant_type=refresh_token&refresh_token=' + this.refreshToken, {
                method: "Post",
                headers: {
                    'Authorization': 'Basic ' + (Buffer.from(spotify_id + ':' + spotify_secret).toString('base64')),
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                json: true
            });
    
            const data = await response.json()
            this.accessToken = data.access_token
        } catch (error) {
            console.error('Error refreshing access token:', error);
            throw error;
        }
    }
    
    async getAudiobooks() {
        const url = `https://api.spotify.com/v1/shows/${encodeURIComponent(this.showId)}`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                }
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch audiobooks');
            }
    
            const data = await response.json();
            let books = data.episodes.items;
            for (let item of books) {
                let book = {
                    id: item.id,
                    name: item.name.includes("[") ? item.name.substring(0, item.name.indexOf("[")) : item.name, //Xoa string [Sách nói]
                    description: item.description,
                    images: item.images[0].url,
                    audio: item.audio_preview_url,
                    release_date: item.release_date,
                    likes: Math.floor(Math.random() * 999) + 1,
                    author_name: "Thư viện sách nói",
                    category_name: "Sách nói"
                }
                spotifyApi.audiobooks.push(book)
            }
        } catch (error) {
            console.error('Error fetching audiobooks:', error);
            throw error;
        }
    }
} 
let spotifyApi = new SpotifyApi()
module.exports = { spotifyApi }

app.get('/login', function(req, res) {
    res.redirect(spotifyApi.getCodeUrl)
});
  
app.get('/', async function(req, res) {
    spotifyApi.code = req.query.code || null
    await spotifyApi.getAccessToken()
    setTimeout(async() => {
        await spotifyApi.refreshAccessToken()
    }, 3500000)
    res.redirect("http://localhost:8888/bookmark")
});

app.listen(8001, () => {
    console.log('listen on port 8001...')
});

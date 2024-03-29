//env
require('dotenv').config();
const axios = require('axios');


const baseUrl = "https://api.fpt.ai/hmi/tts/v5";



async function getAudioAPI(data, voice, speed) {
    try {
        const headers = {
            "api_key": process.env.API_KEY,
            "voice": voice,
            "speed": speed
        };

        const requestOptions = {
            method: 'POST',
            url: baseUrl,
            headers: headers,
            data: data,
            redirect: 'follow',
        };

        var response = await axios(requestOptions);
        if (response.status !== 200) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        var audioData = await response.data;
        // console.log(audioData);
        
        return audioData;

    } catch (error) {
        console.log("ERROR in getAudioAPI: ",error);
    }
}

module.exports = { getAudioAPI }
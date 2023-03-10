
const axios = require('axios');


const baseUrl = "https://api.fpt.ai/hmi/tts/v5";
const  apiKey = "RKWYCowwW2I8v78HRiqdsabyKcfGoRC9";


async function getAudioAPI(data, voice, speed) {
    try {
        const headers = {
            "api_key": apiKey,
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

        const response = await axios(requestOptions);

        if (response.status !== 200) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }
        const audioData = response.data;
        console.log(audioData.async);
        
        return audioData.async;

    } catch (error) {
        console.log(error);
    }
}

module.exports = { getAudioAPI }
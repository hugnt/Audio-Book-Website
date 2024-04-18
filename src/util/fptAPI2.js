const FormData = require('form-data');
const baseUrl = "https://api.fpt.ai/hmi/asr/general";
const fs = require('fs');
const axios = require('axios');
async function speechToText(audioFilePath) {
    try {
        const headers = {
            "api_key": process.env.API_KEY
            
        };
        const formData = new FormData();
        const data = fs.readFileSync(audioFilePath);
        formData.append("file", data);

        let response = await axios.post(baseUrl, data, { headers });
        console.log("Converted text:", response.data.hypotheses[0].utterance);
        return response.data.hypotheses[0].utterance;

    } catch (error) {
        console.log("ERROR in speechToText: ", error);
        throw error;
    }
    
}

module.exports = { speechToText };
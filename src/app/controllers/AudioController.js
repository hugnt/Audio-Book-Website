
const {Audio} = require('../models/Audio');
const {Author} = require('../models/Author');
const {getAudioAPI} = require('../../util/fptAPI');
const {getTextAPI} = require('../../util/fptAPI2');

class AudioController {
    getById(req, res, next){
        let id = req.params.id;
        Audio.getAudios({audioId:id})
        .then((books)=>{
           res.json(books);
        })
        .catch(next); 
    }
    getByAPI(req, res, next){
        let user_name = req.params.user_name;
        let audio_id = req.params.audio_id;
        const {content, voice, speed} = req.body;
        getAudioAPI(content, voice, speed)
        .then(audioAPIRes =>{
            const audioUrl = audioAPIRes.async
            const audioReceived = {user_name, audio_id, audioUrl};
            res.json(audioReceived);
        })
        .catch(next);
    }
    getByAPI(req, res, next){
        let user_name = req.params.user_name;
        let audio_id = req.params.audio_id;
        const {content, voice, speed} = req.body;
        getAudioAPI(content, voice, speed)
        .then(audioAPIRes =>{
            const audioUrl = audioAPIRes.async
            const audioReceived = {user_name, audio_id, audioUrl};
            res.json(audioReceived);
        })
        .catch(next);
    }
    getTextByAPI(){
        getTextAPI()
        .then(res =>{
            console.log("RES:", res)
        })
        .catch(next);
    }
    

    
}



module.exports = new AudioController;
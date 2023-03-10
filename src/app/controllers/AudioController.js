
const {Book} = require('../models/Book');
const {Author} = require('../models/Author');
const {getAudioAPI} = require('../../util/fptAPI');


class AudioController {
    getById(req, res, next){
        let id = req.params.id;
        Book.getBooks({id:id})
        .then((books)=>{
           res.json(books);
        })
        .catch(next); 
    }
    getByAPI(req, res, next){
        let content = req.params.content;
        let voice = req.params.voice;
        let speed = req.params.speed;
        getAudioAPI(content, voice, speed)
        .then(audioSrc =>{
            res.json(audioSrc);
        })
        .catch(next);
    }
    
}

module.exports = new AudioController;

const {Book} = require('../models/Book');
const {Author} = require('../models/Author');
const {spotifyApi} = require('../../util/spotifyAPI')
class AppController {

    home(req, res, next) {
        Promise.all([Book.getBooks({accountId:1}), Author.getAuthors({})])
            .then((results)=>{
                res.render('home',{
                    books:results[0],
                    authors: results[1]
                });
            })
            .catch(next); 
    }
 
    home01(req, res) {
        res.render('home01');
    };

    home02(req, res) {
        res.render('home02');
    };

    loading(req, res) {
        res.render('loading', { layout: false });
    };

    signup(req, res) {
        res.render('signup', { layout: false });
    };

    bookmark_reading(req, res) {
        res.render('bookmark_reading');
    };

    async bookmark(req, res, next) {
        try {
            await spotifyApi.getAudiobooks();
            let data = await Book.getBooks({})
            let books = data.concat(spotifyApi.audiobooks)
            res.render('bookmark',{
                books
            });    
        } catch (error) {
            console.log(error)
            next()
        }
    };

    bookstore(req, res, next) {
        Promise.all([Book.getBooks({}), Author.getAuthors({})])
            .then((results)=>{
                res.render('bookstore',{
                    books:results[0],
                    authors: results[1]
                });
            })
            .catch(next); 
    }

    challenge(req, res) {
        res.render('challenge');
    };

    community(req, res) {
        res.render('community');
    };

    async audio_book(req, res, next) {
        try {
            await spotifyApi.getAudiobooks();
            let data = await Book.getBooks({})
            let books = data.concat(spotifyApi.audiobooks)
            res.render('audio_book',{
                books
            });    
        } catch (error) {
            console.log(error)
            next()
        }
    };

    studio(req, res, next) {
        Book.getBooks({})
        .then((books)=>{
            res.render('studio',{
                books
            });
        })
        .catch(next); 
    };


}

module.exports = new AppController;
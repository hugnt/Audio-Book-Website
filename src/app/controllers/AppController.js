
const {Book} = require('../models/Book');
const {Author} = require('../models/Author');
class AppController {

    home(req, res, next) {
        Promise.all([Book.getBooks({}), Author.getAuthors({})])
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
        res.render('loading');
    };

    signup(req, res) {
        res.render('signup');
    };

    bookmark_reading(req, res) {
        res.render('bookmark_reading');
    };

    bookmark(req, res) {
        res.render('bookmark');
    };

    bookstore(req, res) {
        res.render('bookstore');
    };

    challenge(req, res) {
        res.render('challenge');
    };

    community(req, res) {
        res.render('community');
    };

}

module.exports = new AppController;
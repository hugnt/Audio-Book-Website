const {Book} = require('../models/Book');
const {Author} = require('../models/Author');
class BookController{
    getById(req, res, next){
        let id = req.params.id;
        Book.getBooks({id:id})
        .then((books)=>{
            // res.json(books[0])
           res.render('bookmark_reading',{
                book: books[0]
           });
        })
        .catch(next); 
    }
}

module.exports = new BookController;
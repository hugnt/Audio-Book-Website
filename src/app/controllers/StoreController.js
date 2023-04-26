
const {Book} = require('../models/Book');
const {Author} = require('../models/Author');


class StoreController {
    getById(req, res, next){
        let id = req.params.id;
        Book.getBooks({id:id})
        .then((books)=>{
           res.json(books);
        })
        .catch(next); 
    }
    
}

module.exports = new StoreController;
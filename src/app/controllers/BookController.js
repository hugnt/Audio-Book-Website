const {Book} = require('../models/Book');
const {Audio} = require('../models/Audio');
const {Author} = require('../models/Author');
class BookController{
    getById(req, res, next){
        let id = req.params.id;
        if(isNaN(id)){
            res.redirect(`/${id}`);
            return;
        }
        Book.getBooks({id:id})
        .then((books)=>{
            // res.json(books[0])
           res.render('bookmark_reading',{
                book: books[0]
           });
        })
        .catch(next); 
    }
    async getBookId(req, res, next){
        var id = await Book.getBookId();
        return id;
    }
    async createBook(bookInfo){
       try {
            await Book.createBook(bookInfo);
            return true;
       } catch (error) {
            console.log("Add failed", error);
            return false;
       }

    }
    async updateBook(id, bookInfo){
        if(id != bookInfo.id) return false;
        try {
             await Book.updateBook(bookInfo);
             return true;
        } catch (error) {
             console.log("Update failed", error);
             return false;
        }
 
     }
     async getBookById(id){
        try {
             var selectedBook = await Audio.getAudios({bookId:id});
             return selectedBook[0];
        } catch (error) {
             console.log("Update failed", error);
             return null;
        }
 
     }

     async deleteBook(id){
        try {
             var isDeleted = await Book.delete(id);
             if(isDeleted) return true;
             return false;
        } catch (error) {
             console.log("Update failed", error);
             return false;
        }
 
     }

}

module.exports = new BookController;

const querySelectAll = `SELECT book.*, 
                                author.name AS author_name, 
                                bookcategory.name AS category_name
                        FROM book
                        JOIN bookcategory ON book.categoryId = bookcategory.id
                        JOIN author ON book.authorId = author.id`;
const { excuteQuery } = require('../../util/mySql')


const Book = {
    getBooks: async function (obj) {
        var query;
        if (Object.keys(obj).length === 0) {
            query = querySelectAll;
        }
        else {
            query = `SELECT * FROM book WHERE `;
            for (const [key, value] of Object.entries(obj)) {
                console.log(`${key}: ${value}`);
                query += `${key} = ${value} AND `
            }
            query += '1';
            console.log(query);
        }
        try {
            const results = await excuteQuery(query);
            return results;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    getBooksByAccount: async function (id) {
        var query = `SELECT * FROM book WHERE accountId = ${id}`;
        console.log(query);
        try {
            const results = await excuteQuery(query);
            return results;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    createBook: async function (bookInfor) {
        
        var query1 = `INSERT INTO book(name,fileName,image,accountId) VALUES('${bookInfor.name}','${userInfor.fileName}','${userInfor.cover}', ${userInfor.id})`;
        var queryBookId =  `SELECT id FROM book ORDER BY id DESC LIMIT 1`
        var queryAudioId =  `SELECT id FROM audio ORDER BY id DESC LIMIT 1`
        console.log(query);
        try {
            const resultAddBook = await excuteQuery(query1);
            const bookId = await excuteQuery(queryBookId);
            var resultAddAudio = `INSERT INTO audio(bookId,urlLink) VALUES('${bookId}','${bookInfor.url}')`
            const audioId = await excuteQuery(queryAudioId);
            var queryUpdateBook = `UPDATE book SET audioId = ${audioId} WHERE id = ${bookId};`
            const result5 = await excuteQuery(queryUpdateBook);
            return result5;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },


}

module.exports = { Book };

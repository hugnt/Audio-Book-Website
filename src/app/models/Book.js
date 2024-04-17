
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
        const queryUserId = await excuteQuery(`SELECT id FROM account ORDER BY id DESC LIMIT 1`);
        const accountId = queryUserId[0].id;
        var query1 = `INSERT INTO book(name,fileName,image,accountId) VALUES('${bookInfor.name}','${bookInfor.fileName}','${bookInfor.image}', ${accountId})`;
        var queryBookId =  `SELECT id FROM book ORDER BY id DESC LIMIT 1`
        var queryAudioId =  `SELECT id FROM audio ORDER BY id DESC LIMIT 1`
        //console.log(query);
        try {
            const resultAddBook = await excuteQuery(query1);
            const queryGetBookId = await excuteQuery(queryBookId);
            const bookId = queryGetBookId[0].id;
            var resultAddAudio = `INSERT INTO audio(bookId,urlLink,voice,speed,inputType) VALUES('${bookId}','${bookInfor.urlLink}','${bookInfor.voice}',${bookInfor.speed},'${bookInfor.inputType}')`;
            const insertAddAudio = await excuteQuery(resultAddAudio);
            const queryGetAudioId = await excuteQuery(queryAudioId);
            const audioId = queryGetAudioId[0].id;
            var queryUpdateBook = `UPDATE book SET audioId = ${audioId} WHERE id = ${bookId};`
            const result5 = await excuteQuery(queryUpdateBook);
            return result5;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    updateBook: async function (bookInfor) {
        const queryUpdateBook = `UPDATE book SET name = '${bookInfor.name}',image = '${bookInfor.image}'  WHERE id = ${bookInfor.id}`;
        //console.log(query);
        try {
            const resultUpdateBook = await excuteQuery(queryUpdateBook);
            return resultUpdateBook;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    getBookId:async function () {
        
        var queryBookId =  `SELECT id FROM book ORDER BY id DESC LIMIT 1`
        var queryAudioId =  `SELECT id FROM audio ORDER BY id DESC LIMIT 1`
        try {
            const bookId = await excuteQuery(queryBookId);
            //const audioId = await excuteQuery(queryAudioId);
           console.log(bookId[0].id);
            return bookId[0].id;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    delete: async function(id){
        try {
            await excuteQuery(`DELETE FROM book WHERE id = ${id}`);
            await excuteQuery(`DELETE FROM audio WHERE bookId = ${id}`);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }


}

module.exports = { Book };

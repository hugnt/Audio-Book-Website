
const querySelectAll = `SELECT book.*, author.name AS author_name
                        FROM book
                        JOIN author ON book.author_id = author.id`;
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
    }

}

module.exports = { Book };

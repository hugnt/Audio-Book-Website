
const querySelectAll = `SELECT book.*, 
                                author.name AS author_name, 
                                bookcategory.name AS category_name,
                                audio.fileName AS audio_fileName
                        FROM book
                        JOIN bookcategory ON book.categoryId = bookcategory.id
                        JOIN author ON book.authorId = author.id
                        JOIN audio ON book.audioId = audio.id`;
const { excuteQuery } = require('../../util/mySql')


const Audio = {
    getAudios: async function (obj) {
        var query;
        if (Object.keys(obj).length === 0) {
            query = querySelectAll;
        }
        else {
            query = querySelectAll + ` WHERE `;
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

module.exports = { Audio };


const querySelectAll = `SELECT book.*, 
                                author.name AS author_name, 
                                bookcategory.name AS category_name,
                                audio.fileName AS audio_fileName,
                                audio.urlLink AS audio_urlLink,
                                audio.voice AS audio_voice,
                                audio.speed AS audio_speed,
                                audio.inputType AS audio_inputType,
                                account.username AS username
                        FROM book
                        LEFT JOIN bookcategory ON book.categoryId = bookcategory.id
                        LEFT JOIN author ON book.authorId = author.id
                        LEFT JOIN audio ON book.audioId = audio.id
                        LEFT JOIN account ON book.accountId = account.id`;
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

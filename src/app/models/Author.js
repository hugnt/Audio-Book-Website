
const querySelectAll = `SELECT author.*, SUM(book.likes) AS total_likes
                        FROM author
                        JOIN book ON author.id = book.authorId
                        GROUP BY author.id;`;
const {excuteQuery} = require('../../util/mySql')

const Author = {
    getAuthors: async function (obj) {
        var query;
        if(!obj){
            query = querySelectAll;
        }
        else{
            query = querySelectAll;
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

module.exports = { Author };

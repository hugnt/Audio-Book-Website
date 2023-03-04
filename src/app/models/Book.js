
const querySelectAll = 'SELECT * FROM sach';
const {excuteQuery} = require('../../util/mySql')

const Book = {
    getBooks: async function (obj) {
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

module.exports = { Book };

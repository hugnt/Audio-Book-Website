
const querySelectAll = 'SELECT * FROM sach';
const {excuteQuery} = require('../../util/mySql')


const Book = {
    getBooks: async function (obj) {
        var query;
        if(Object.keys(obj).length === 0){
            query = querySelectAll;
        }
        else{
            query = `SELECT * FROM sach WHERE `; 
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

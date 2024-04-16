
const querySelectAll = `SELECT *
                        FROM account`;
const { excuteQuery } = require('../../util/mySql')


const User = {
    getAll: async function () {
        try {
            const results = await excuteQuery(querySelectAll);
            return results;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    getAccount: async function (id) {
        var query = querySelectAll + ` WHERE id = ${id}`;
        console.log(query);
        try {
            const result = await excuteQuery(query);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    createAccount: async function (userInfor) {
        var query = `INSERT INTO account(roleId,username,password) VALUES(2,'${userInfor.username}','${userInfor.password}')`;
        console.log(query);
        try {
            const result = await excuteQuery(query);
            //return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

}


  


module.exports = { User };

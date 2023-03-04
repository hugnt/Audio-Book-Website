const pool = require('../config/db/db');
module.exports = {
    excuteQuery: function(query){
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                    return;
                }
                console.log(`connected as id ${connection.threadId}`); // log threadId
                connection.query(query, (error, results) => {
                    connection.release(); // giải phóng connection để sử dụng lại
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(results);
                });
            });
        });
    }

}
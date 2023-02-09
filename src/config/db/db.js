const mysql = require('mysql');

async function connect() {
    const pool  = mysql.createPool({
        connectionLimit : 10,
        host            : 'localhost',
        user            : 'root',
        password        : '',
        database        : 'audio_book'
    });
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from admin', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                console.log("connected");
            } else {
                console.log(err)
            }

            // if(err) throw err
            // console.log('The data from beer table are: \n', rows)
        })
    })
}

module.exports = {connect};
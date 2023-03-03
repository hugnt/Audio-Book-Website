const mysql = require('mysql');
async function connect() {
    const pool  = mysql.createPool({
        connectionLimit : 10,
        host            : process.env.DB_HOST,
        user            : process.env.DB_USER,
        password        : process.env.DB_PASS,
        database        : process.env.DB_NAME
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
        })
    })
}

module.exports = {connect};
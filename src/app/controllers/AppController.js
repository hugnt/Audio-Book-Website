const mysql = require('mysql');
require('dotenv').config();

const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
});


class AppController {

    home(req, res) {
        var books, authors;
        const queryBooks = "SELECT * FROM sach";
        const queryAuthors = "SELECT * FROM tac_gia";
        pool.getConnection((err, connection) =>{
            if(err) throw err;
            
            console.log('connected as id ' + connection.threadId);
            connection.query('SELECT * from sach', (err, rows) => {
                connection.release() 
                if (!err) {
                    res.render('home', {books:rows});
                    books = rows;
                } else {
                    console.log(err)
                }
                console.log("DATA BOOKS: ",books);
            });
            // connection.query('SELECT * from tac_gia', (err, rows) => {
            //     connection.release() 
            //     if (!err) {
            //         res.render('home', {authors:rows});
            //         authors = rows;
            //     } else {
            //         console.log(err)
            //     }
            //     console.log("DATA BOOKS: ",books);
            // });

            // res.render('home', {books, authors});
            

            

        });
       

        
    }

    home01(req, res) {
        res.render('home01');
    };

    home02(req, res) {
        res.render('home02');
    };

    loading(req, res) {
        res.render('loading');
    };

    signup(req, res) {
        res.render('signup');
    };

    bookmark_reading(req, res) {
        res.render('bookmark_reading');
    };

    bookmark(req, res) {
        res.render('bookmark');
    };

    bookstore(req, res) {
        res.render('bookstore');
    };

    challenge(req, res) {
        res.render('challenge');
    };

    community(req, res) {
        res.render('community');
    };

}

module.exports = new AppController;
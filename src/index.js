const path = require('path');
const express = require('express');
const web = express();
const db = require('./config/db/db');
const route = require('./routes/index.router');
const {engine} = require('express-handlebars');

//env
require('dotenv').config();

//template engines
web.engine('.hbs', engine({
    extname: '.hbs'
}));
web.set('view engine', 'hbs');
web.set('views', [
    path.join(__dirname, 'app/views'),
    path.join(__dirname, 'admin/views'),
]);

//static path
web.use(express.static('./src/app/public'));
web.use(express.static('./node_modules/3d-flip-book'));

//connect db
db.connect();

//route
route(web);

web.listen(8888,"0.0.0.0", () => {
    console.log('listen on port 8888...')
});

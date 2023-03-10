const path = require('path');
const express = require('express');
const web = express();
const db = require('./config/db/db');
const route = require('./routes/index.router');
const {engine} = require('express-handlebars');



//template engines
web.engine('.hbs', engine({
    extname: '.hbs',
    helpers: {
        add1index: (a, b) => a + b,
        json: (context) => JSON.stringify(context),
        slice:(arr, start, end) => arr.slice(start, end)
    },
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
console.log('Connect database successfully on port',db.config.connectionConfig.port);


//route
route(web);

web.listen(8888,"0.0.0.0", () => {
    console.log('listen on port 8888...')
});

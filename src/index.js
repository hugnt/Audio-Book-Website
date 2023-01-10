const path = require('path');
const express = require('express');
const web = express();
const route = require('./routes/index.router');
const {engine} = require('express-handlebars');


//template engines
web.engine('.hbs', engine({
    extname: '.hbs'
}));
web.set('view engine', 'hbs');
web.set('views', [
    path.join(__dirname, 'app/views'),
    path.join(__dirname, 'admin/views'),
]);

web.use(express.static('./src/app/public'));

//route
route(web);

web.listen(3000,"0.0.0.0", () => {
    console.log('listen on port 3000...')
});

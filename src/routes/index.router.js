const userRouter = require('./user.router');
const adminRouter = require('./admin.router');

function route(web) {

    web.use('/admin', adminRouter);
    web.use('/', userRouter);

}

module.exports = route;

class AdminController {

    admin(req, res) {
        res.render('admin');
    }

}

module.exports = new AdminController;

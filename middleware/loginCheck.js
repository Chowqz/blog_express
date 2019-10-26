const { notLogin } = require('../models/resModel');

function loginCheck(req, res, next) {
    if(!req.session.userName) {
        res.json(notLogin());
        return;
    }
    next();
}

module.exports = loginCheck;
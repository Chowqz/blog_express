const express = require('express');
const router = express.Router();
const User = require('../controllers/user');
const { successModel, errorModel } = require('../models/resModel');
const loginCheck = require('../middleware/loginCheck');

router.post('/userList', loginCheck, (req, res, next) => {
    User.queryUserList().then(rows => {
        res.json(successModel({
            data: rows
        }));
    }).catch(err => {
        res.json(errorModel({
            message: err
        }))
    })
})

router.post('/register', (req, res, next) => {
    const { userName, nickName, password, passwordChecked } = req.body;

    if(!userName || !nickName || !password || !passwordChecked) {
        res.json(errorModel({
            message: 'lack param'
        }));
        return;
    }

    if(password !== passwordChecked) {
        res.json(errorModel({
            message: '两次密码不等'
        }));
        return;
    }

    User.register(userName, nickName, password).then(insertData => {
        res.json(successModel({
            data: insertData,
            message: 'success'
        }));
    }).catch(err => {
        let message = err;
        if(err.errno === 1062) {
            message = '重复录入';
        }
        res.json(errorModel({
            message: message
        }))
    })
})

router.post('/login', (req, res, next) => {
    if(!req.body.userName || !req.body.password) {
        res.json(errorModel({
            message: '缺少userName或password'
        }));
        return;
    }
    User.login(req.body.userName, req.body.password).then(queryData => {
        if(queryData.userName) {
            req.session.userName = queryData.userName;
            req.session.userId = queryData.id;
            res.json(successModel({
                data: queryData,
                message: 'login success'
            }))
        }
        else {
            res.json(errorModel({
                message: 'login fail'
            }))
        }
    }).catch(err => {
        res.json(errorModel({
            message: err
        }))
    })
})

module.exports = router;
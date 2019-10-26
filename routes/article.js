const express = require('express');
const router = express.Router();
const Article = require('../controllers/article');
const { successModel, errorModel } = require('../models/resModel');
const loginCheck = require('../middleware/loginCheck');
const moment = require('moment');

router.post('/articleList', (req, res, next) => {
    Article.getArticleList().then(queryData => {
        res.json(successModel({
            data: queryData
        }));
    }).catch(err => {
        res.json(errorModel({
            message: err
        }));
    })
})

router.post('/categoryList', (req, res, next) => {
    Article.getCategoryList().then(queryData => {
        res.json(successModel({
            data: queryData
        }));
    }).catch(err => {
        res.json(errorModel({
            message: err
        }));
    })
})

router.post('/createArticle', (req, res, next) => {
    const { title, content, categoryId } = req.body;

    let article = {
        title,
        content,
        categoryId,
        authorId: req.session.userId || 1
    };
    Article.createArticle(article).then(insertData => {
        res.json(successModel({
            data: insertData
        }))
    }).catch(err => {
        res.json(errorModel({
            message: err
        }))
    })
})

router.post('/updateArticle', (req, res, next) => {
    const { articleId, title, content, categoryId } = req.body;

    let article = {
        articleId,
        title,
        content,
        categoryId,
        authorId: req.session.userId
    };
    Article.updateArticle(article).then(updateRes => {
        if(updateRes.affectedRows > 0) {
            res.json(successModel({
                message: 'update success'
            }))
            return;
        }
        res.json(errorModel({
            message: 'update fail'
        }))
    }).catch(err => {
        res.json(errorModel({
            message: err
        }))
    })
})

module.exports = router;
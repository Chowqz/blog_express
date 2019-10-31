const express = require('express');
const router = express.Router();
const Comment = require('../controllers/comment');
const { successModel, errorModel } = require('../models/resModel');
const loginCheck = require('../middleware/loginCheck');

const {spawn, exec} = require('child_process');
const path = require('path')

router.post('/commentList', (req, res, next) => {
    let {articleId, pageIndex, pageSize }= req.body;
    console.log(typeof pageIndex)
    Comment.queryComment(articleId, pageIndex, pageSize).then(queryData => {
        res.json(successModel({
            data: {
                commentList: queryData,
                pageInfo: {
                    total: queryData.length,
                    pageIndex: pageIndex || 0,
                    pageSize: pageSize || 10
                }
            }
        }))
    }).catch(err => {
        res.json(errorModel({
            message: err
        }))
    })
})

router.post('/createComment', (req, res, next) => {
    let { articleId, content } = req.body;
    Comment.createComment(articleId, content, 8).then(insertData => {
        if(insertData.affectedRows > 0) {
            res.json(successModel({
                message: 'create comment success'
            }));
            return;
        }
        res.json(errorModel({
            message: insertData
        }))
    }).catch(err => {
        res.json(errorModel({
            message: err
        }))
    })
})

router.post('/replyComment', (req, res, next) => {
    let reply = {
        commentId: req.body.commentId,
        content: req.body.content,
        from_uid: req.session.userId || 8,
        to_uid: req.body.to_uid
    };
    Comment.replyComment(reply).then(insertData => {
        if(insertData.affectedRows > 0) {
            res.json(successModel({
                message: 'reply success'
            }));
            return;
        }
    }).catch(err => {
        res.json(errorModel({
            message: err
        }))
    })
})

router.post('/delComment', (req, res, next) => {
    Comment.delComment(req.body.commentId).then(delData => {
        res.json(successModel());
    }).catch(err => {
        json.json(errorModel({
            message: err
        }))
    })
})

router.post('/delReply', (req, res, next) => {
    Comment.delReply(req.body.replyId).then(delData => {
        res.json(successModel());
    }).catch(err => {
        json.json(errorModel({
            message: err
        }))
    })
})


module.exports = router;
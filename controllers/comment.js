const { execSql, handleEscape } = require('../db/mysql');
const utils = require('../utils/utils');

exports.createComment = (articleId, content, userId) => {
    let sql = `INSERT INTO comment (articleId, content, from_uid) VALUES (${handleEscape(articleId)}, ${handleEscape(content)}, ${userId});`;
    return execSql(sql);
}

exports.replyComment = (reply) => {
    let sql = `INSERT INTO comment_reply (commentId, content, from_uid, to_uid) VALUES (${reply.commentId}, ${handleEscape(reply.content)}, ${reply.from_uid}, ${reply.to_uid});`;
    return execSql(sql);
}

exports.queryComment = (articleId, pageIndex = 0, pageSize = 10) => {
    let sql = `SELECT * FROM comment`;
    if(articleId) {
        sql += ` WHERE articleId = ${articleId}`;
    }
    if(pageIndex) {
        sql += `${utils.sqlLimit(pageIndex, pageSize)};`
    }
    console.log(sql)
    return execSql(sql);
}

exports.delComment = (id) => {
    let sql = `DELETE FROM comment WHERE commentId = ${id};`;
    return execSql(sql);
}

exports.delReply = (id) => {
    let sql = `DELETE FROM comment WHERE id = ${id};`;
    return execSql(sql);
}

for(let i = 0; i < 100; i++) {
    let sql = `INSERT INTO comment (articleId, content, from_uid) VALUES (1, ${handleEscape(i)}, ${i});`;
    execSql(sql);
}
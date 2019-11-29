const { execSql, handleEscape } = require('../db/mysql');
const utils = require('../utils/utils');

exports.createComment = (articleId, content, userId) => {
    let sql = `INSERT INTO comments (articleId, content, from_uid) VALUES (${handleEscape(articleId)}, ${handleEscape(content)}, ${userId});`;
    return execSql(sql);
}

exports.replyComment = (reply) => {
    let sql = `INSERT INTO comment_replys (commentId, content, from_uid, to_uid) VALUES (${reply.commentId}, ${handleEscape(reply.content)}, ${reply.from_uid}, ${reply.to_uid});`;
    return execSql(sql);
}

exports.queryComment = (articleId, pageIndex, pageSize) => {
    let sql = `SELECT * FROM comments`;
    if(articleId) {
        sql += ` WHERE articleId = ${articleId}`;
    }
    sql += `${utils.sqlLimit(pageIndex, pageSize)};`
    return execSql(sql);
}

exports.delComment = (id) => {
    let sql = `DELETE FROM comments WHERE id = ${id};`;
    return execSql(sql);
}

exports.delReply = (id) => {
    let sql = `DELETE FROM comments WHERE id = ${id};`;
    return execSql(sql);
}

for(let i = 0; i < 100; i++) {
    let sql = `INSERT INTO comments (articleId, content, from_uid) VALUES (1, ${handleEscape(i)}, ${i});`;
    execSql(sql);
}
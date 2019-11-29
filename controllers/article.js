const { execSql, handleEscape } = require('../db/mysql');
const utils = require('../utils/utils');

exports.getArticleList = (keyword, pageIndex, pageSize) => {
    let sql1 = `SELECT a.id, a.title, a.authorId, b.userName AS authorName, a.categoryId, c.categoryName, DATE_FORMAT( a.createTime, '%Y-%m-%d %H:%i:%S' ) AS createTime, DATE_FORMAT( a.updateTime, '%Y-%m-%d %H:%i:%S' ) AS updateTime FROM articles a LEFT JOIN users b ON a.authorId = b.id LEFT JOIN categorys c ON a.categoryId = c.id`;
    if(keyword) {
        sql1 += ` WHERE a.title LIKE '%${keyword}%'`
    }
    sql1 += `${utils.sqlLimit(pageIndex, pageSize)};`;

    let sql2 = `SELECT COUNT(id) AS total FROM articles;`;

    const sql1Promise = execSql(sql1).then(res => {
        return res;
    })

    const sql2Promise = execSql(sql2).then(res => {
        return res[0]['total'];
    })

    return Promise.all([sql1Promise, sql2Promise]);
}

exports.getCategoryList = () => {
    let sql = `SELECT * FROM categorys;`;
    return execSql(sql);
}

exports.createArticle = (article) => {
    let title = handleEscape(article.title),
        authorId = handleEscape(article.authorId),
        categoryId = handleEscape(article.categoryId),
        content = handleEscape(article.content);
    let sql = `INSERT INTO articles (title, authorId, categoryId, content) VALUES (${title}, ${authorId}, ${categoryId}, ${content})`;
    return execSql(sql);
}

exports.updateArticle = (article) => {
    let articleId = handleEscape(article.articleId),
        title = handleEscape(article.title),
        authorId = handleEscape(article.authorId),
        categoryId = handleEscape(article.categoryId),
        content = handleEscape(article.content);
    let sql = `UPDATE articles SET title=${title}, categoryId=${categoryId}, content=${content} WHERE id=${articleId}`;
    return execSql(sql);
}

exports.getArticleDetail = (articleId) => {
    let sql = `SELECT
                    a.id AS articleId,
                    a.title,
                    a.authorId,
                    b.userName AS authorName,
                    a.categoryId,
                    c.categoryName,
                    a.content,
                    DATE_FORMAT( a.createTime, '%Y-%m-%d %H:%i:%S' ) AS createTime,
                    DATE_FORMAT( a.updateTime, '%Y-%m-%d %H:%i:%S' ) AS updateTime 
                FROM
                    articles a
                    LEFT JOIN users b ON a.authorId = b.id
                    LEFT JOIN categorys c ON a.categoryId = c.id
                WHERE a.id = ${handleEscape(articleId)};`
    return execSql(sql).then(queryuData => {
        return queryuData[0] || queryuData;
    });
}

exports.delArticle = (articleId, userId) => {
    let sql = `DELETE FROM articles WHERE id = ${articleId} AND authorId = ${userId}`;
    return execSql(sql);
}
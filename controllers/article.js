const { execSql, handleEscape } = require('../db/mysql');

exports.getArticleList = () => {    
    let sql = `SELECT
                    a.articleId,
                    a.title,
                    a.content,
                    a.authorId,
                    b.userName AS authorName,
                    a.categoryId,
                    c.categoryName,
                    DATE_FORMAT( a.createTime, '%Y-%m-%d %H:%i:%S' ) AS createTime,
                    DATE_FORMAT( a.updateTime, '%Y-%m-%d %H:%i:%S' ) AS updateTime 
                FROM
                    article a
                    LEFT JOIN USER b ON a.authorID = b.userId
                    LEFT JOIN category c ON a.categoryId = c.categoryId;`
    return execSql(sql);
}

exports.getCategoryList = () => {
    let sql = `SELECT * FROM category;`;
    return execSql(sql);
}

exports.createArticle = (article) => {
    let title = handleEscape(article.title),
        authorId = handleEscape(article.authorId),
        categoryId = handleEscape(article.categoryId),
        content = handleEscape(article.content);
    let sql = `INSERT INTO article (title, authorId, categoryId, content) VALUES (${title}, ${authorId}, ${categoryId}, ${content})`;
    return execSql(sql);
}

exports.updateArticle = (article) => {
    let articleId = handleEscape(article.articleId),
        title = handleEscape(article.title),
        authorId = handleEscape(article.authorId),
        categoryId = handleEscape(article.categoryId),
        content = handleEscape(article.content);
    let sql = `UPDATE article SET title=${title}, categoryId=${categoryId}, content=${content} WHERE articleId=${articleId}`;
    return execSql(sql);
}
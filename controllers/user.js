const { execSql, handleEscape } = require('../db/mysql');
const { genPassword } = require('../utils/crypto');



exports.queryUserList = () => {
    let sql = 'SELECT userId, userName, nickName, isAdmin FROM user';
    return execSql(sql);
}

exports.register = (userName, nickName, password) => {
    userName = handleEscape(userName);
    nickName = handleEscape(nickName);
    let encryptPwd = genPassword(password);
    encryptPwd = handleEscape(encryptPwd);

    let sql = `INSERT INTO user (userName, nickName, password) VALUES (${userName}, ${nickName}, ${encryptPwd})`;
    return execSql(sql).then(insertData => {
        return {
            userId: insertData.insertId
        };
    });
}

exports.login = (userName, password) => {
    userName = handleEscape(userName);
    let encryptPwd = genPassword(password);
    encryptPwd = handleEscape(encryptPwd);

    let sql = `SELECT * FROM user WHERE userName=${userName} AND password=${encryptPwd}`;
    return execSql(sql).then(queryData => {
        return queryData[0] || queryData;
    });
}
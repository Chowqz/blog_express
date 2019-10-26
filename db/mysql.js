const mysql = require('mysql');
const { MYSQL_CONF } = require('../conf/db');

const connection = mysql.createConnection(MYSQL_CONF);

connection.connect(err => {
    if(err) {
        console.log(err);
        return;
    }
    console.log('connect to database successfully');
});

function execSql(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if(err) {
                reject(err);
                return;
            }
            resolve(result);
        })
    })
}

module.exports = {
    execSql,
    handleEscape: mysql.escape
}
const devMode = process.env.NODE_ENV == 'development';

let MYSQL_CONF;

let REDIS_CONF;

if(devMode) {
    MYSQL_CONF = {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'zqz15362972856',
        database: 'myblog'
    };

    REDIS_CONF = {
        host: '127.0.0.1',
        port: '6379'
    };
}
else {
    MYSQL_CONF = {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'zqz15362972856',
        database: 'myblog'
    };

    REDIS_CONF = {
        host: '127.0.0.1',
        port: '6379'
    };
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}
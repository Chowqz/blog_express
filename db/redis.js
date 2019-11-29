const redis = require('redis');
const REDIS_CONF = require('../conf/db');

const redisClient = redis.createClient(REDIS_CONF);
redisClient.on('error', err => {
    console.error(err);
})

function set(key, val, timeout = 3600) {
    if(typeof val === 'object') {
        val = JSON.stringify(val);
    }
    redisClient.set(key, val);
    redisClient.expire(key, timeout);
}

function get(key) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if(err) {
                reject(err);
                return;
            }
            if(val == null) {
                resolve(null);
                return;
            }
            try{
                resolve(JSON.parse(val));
            }
            catch(ex) {
                resolve(val);
            }
        })
    })
}

module.exports = {
    redisClient,
    set,
    get
};
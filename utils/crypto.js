const crypto = require('crypto');
const SALT = 'Cfsa_sd8&d';

function md5(str) {
    let hash = crypto.createHash('md5');
    hash.update(str);
    return hash.digest('hex');
}


function genPassword(password) {
    let str = `password=${password}&salt=${SALT}`;
    return md5(str);
}

module.exports = {
    genPassword
}
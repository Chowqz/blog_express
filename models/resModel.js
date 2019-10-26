function successModel({data, message} = {}) {
    return {
        _data: data || '',
        _errCode: '0',
        _errMsg: message || 'success' 
    }
}

function errorModel({message}) {
    return {
        _data: '',
        _errCode: '-1',
        _errMsg: message || ''
    }
}

function notLogin() {
    return {
        _data: '',
        _errCode: '3001',
        _errMsg: '未登录'
    }
}

module.exports = {
    successModel,
    errorModel,
    notLogin
}
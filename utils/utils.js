class Utils {
    constructor() {

    }
    sqlLimit(pageIndex = 0, pageSize = 10) {
        const pageOffset = parseInt(pageSize) * parseInt(pageIndex);
        return ` LIMIT ${pageOffset}, ${parseInt(pageSize)}`;
    }
}

const utils = new Utils();

module.exports = utils;
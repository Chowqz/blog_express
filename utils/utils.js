class Utils {
    constructor() {

    }
    sqlLimit(pageIndex, pageSize) {
        const pageOffset = parseInt(pageSize) * parseInt(pageIndex);
        return ` LIMIT ${pageOffset}, ${parseInt(pageSize)}`;
    }
}

const utils = new Utils();

module.exports = utils;
const xlsx = require('xlsx');

function replaceKeyName(data, tableHeader) {
    let newData = data.map(item => {
        let newItem = {}
        Object.entries(item).map(keyVal => {
            newItem[tableHeader[keyVal[0]]] = keyVal[1];
        });
        return newItem;
    });
    return newData;
}

function _export(fileName, sheetList) {
    const workBook = xlsx.utils.book_new();
    sheetList.map((sheet, index) => {
        let formatData = replaceKeyName(sheet.data, sheet.tableHeader);
        let workSheet = xlsx.utils.json_to_sheet(formatData)
        let range = xlsx.utils.decode_range(workSheet['!ref']);
        // 解决导出纯数字以科学计数显示的问题
        for (let r = range.s.r; r <= range.e.r; r++) {
            for (let c = range.s.c; c <= range.e.c; c++) {
                let cellName = xlsx.utils.encode_cell({ c: c, r: r });
                workSheet[cellName].z = '@';
            }
        }
        xlsx.utils.book_append_sheet(workBook, workSheet, sheet.sheetName || `Sheet${index+1}`);
    })
    xlsx.writeFile(workBook, `${fileName}_${Date.now()}.xlsx`)
}

function _import(buffer, fieldSet) {
    return [];
    let result = xlsx.read(buffer, {
        type:'buffer',
        cellHTML:false
    });
    let jsonData = []
    result.SheetNames.map(item => {
        let formatData = replaceKeyName(xlsx.utils.sheet_to_json(result.Sheets[item]), fieldSet);
        jsonData.push(formatData);
    });
    return jsonData;
}

module.exports = {
    _export,
    _import
}

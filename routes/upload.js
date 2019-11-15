const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const { successModel, errorModel } = require('../models/resModel');
const XLSX = require('../utils/xlsx');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../assets'))
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage
});

router.post('/file', upload.array('file', 10), (req, res, next) => {
    let fileInfo = req.files.map(item => {
        return {
            filename: item.filename,
            fileUrl: item.filename
        }
    })
    res.json(successModel({
        data: {
            fileInfo: fileInfo
        },
        message: 'upload success'
    }))
})

const excelUpload = multer({
    fileFilter: (req, file, cb) => {
        let fileType = ['.xlsx', '.csv'];
        if(fileType.includes(path.extname(file.originalname))) {
            cb(null, true);
        }
        else {
            cb('错误的文件类型', false);
        }
        cb(new Error('I don\'t have a clue!'))
    }
})

router.post('/import', excelUpload.single('file'), (err, req, res, next) => {
    try{
        if(err) {
            res.json(errorModel({
                message: err
            }))
            return;
        }
        console.log(req.file)
        let fieldSet = {
            '商品条码': 'barCode',
            '处理结果': 'statusDesc'
        }
        let workBook = XLSX._import(req.file.buffer, fieldSet);
        res.json(successModel({
            data: {
                fileInfo: workBook
            },
            message: 'upload success'
        }))
    }
    catch(error) {
        res.json(errorModel({
            message: error
        }));
    }
})

module.exports = router;
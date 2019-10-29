const schedule = require('node-schedule');
const moment = require('moment');


const logFileSchedule = () => {
    schedule.scheduleJob('30 * * * * *', () => {
        console.log(moment().format())
    })
}

module.exports = {
    logFileSchedule
}
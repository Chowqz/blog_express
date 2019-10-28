const schedule = require('node-schedule');
const moment = require('moment');

const testSchedule = () => {
    schedule.scheduleJob('30 * * * * *', () => {
        console.log(moment().format())
    })
}

testSchedule();
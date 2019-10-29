const scheduleConf = ['log'];

// 初始化所有定时任务
function initScheduleTask() {
    scheduleConf.map(item => {
        let scheduleObj = require(`./${item}`);
        Object.keys(scheduleObj).map(key => {
            scheduleObj[key]();
        })
    });
    console.log('init schedule tasks successfully');
}

module.exports = initScheduleTask;
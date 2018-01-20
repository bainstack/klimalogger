//function to create random data
exports.createRandomdata = function () {
    let randomTemperature = (Math.random() * 61 - 20);
    let randomHumidity = (Math.random() * 101);
    let randomHour = Math.floor(Math.random() * (Math.floor(24) - Math.ceil(0))) + Math.ceil(0);
    let randomMinute = Math.floor(Math.random() * (Math.floor(61) - Math.ceil(0))) + Math.ceil(0);
    let randomSecond = Math.floor(Math.random() * (Math.floor(61) - Math.ceil(0))) + Math.ceil(0);
    let randomDay = (Math.floor(Math.random() * (Math.floor(32) - Math.ceil(1))) + Math.ceil(1));
    let randomMonth = (Math.floor(Math.random() * (Math.floor(13) - Math.ceil(1))) + Math.ceil(1));
    let randomYear = (Math.floor(Math.random() * (Math.floor(2018) - Math.ceil(1950))) + Math.ceil(1950));
    let randomreg_datetime = new Date(randomYear, randomMonth, randomDay, randomHour, randomMinute, randomSecond);
    let data = [randomTemperature, randomHumidity, randomreg_datetime];
    return data;
};
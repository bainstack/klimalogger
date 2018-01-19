//function to create random data
function createRandomdata() {
    let randomTemperature = (Math.random() * 61 - 20);
    let randomHumidity = (Math.random() * 101);
    let randomHour = checkrandomsforzero(Math.floor(Math.random() * (Math.floor(24) - Math.ceil(0))) + Math.ceil(0));
    let randomMinute = checkrandomsforzero(Math.floor(Math.random() * (Math.floor(61) - Math.ceil(0))) + Math.ceil(0));
    let randomSecond = checkrandomsforzero(Math.floor(Math.random() * (Math.floor(61) - Math.ceil(0))) + Math.ceil(0));
    let randomDay = checkrandomsforzero((Math.floor(Math.random() * (Math.floor(32) - Math.ceil(1))) + Math.ceil(1)));
    let randomMonth = checkrandomsforzero((Math.floor(Math.random() * (Math.floor(13) - Math.ceil(1))) + Math.ceil(1)));
    let randomYear = checkrandomsforzero((Math.floor(Math.random() * (Math.floor(2018) - Math.ceil(1950))) + Math.ceil(1950)));
    let randomreg_datetime = randomYear + '-' + randomMonth + '-' + randomDay + ' ' + randomHour + ':' + randomMinute + ':' + randomSecond;
    let data = [randomTemperature, randomHumidity, randomreg_datetime];
    console.log(data);
    return data;
};

//function to add 0 character if random numbers are below 10 for saving to database
function checkrandomsforzero(random) {
    if (random < 10) {
        random = '0' + random;
    }
    return random;
}

//function to insert random data
module.exports.insertRandomData = function (db, amount, table, columns) {
    for (j = 0; j < 100; j++) {
        let randomData = createRandomdata();
        let placeholders = "(" + randomData.map((randomData) => '?').join(',') + ")";
        let sql = "INSERT INTO " + table + "(" + columns + ")" + " VALUES " + placeholders;
        console.log(sql);
        console.log(randomData);
        db.run(sql, randomData, function (err) {
            if (err) {
                return console.error(err.message);
            }
            //console.log(`Rows inserted ${this.changes}`);
        });
    };
};

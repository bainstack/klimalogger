const sqlite3 = require('sqlite3').verbose();

//connect to database
let db = new sqlite3.Database('./../db_klimalogger/db_klimalogger.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    else console.log('Connected to the database: klimalogger!');
});

//perform initial query and if wanted insert random data
db.serialize(() => {

    //insertRandomData(100, "temperature_humidity", "temperature, humidity, date_time");

    let sql = (`SELECT id as id,
    temperature as temperature,
        humidity as humidity,
        date_time as date_time
    FROM temperature_humidity`)
    db.each(sql, (err, row) => {
        if (err) {
            console.error(err.message);
        }
        console.log(row.id + "\t" + row.date_time + "\t" + row.temperature + "\t" + row.humidity);
    });
});

//close db connection
db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Closed the database connection.');
});

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
function insertRandomData(amount, table, columns) {
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

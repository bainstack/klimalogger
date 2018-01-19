const sqlite3 = require('sqlite3').verbose();
let insertRandomData = require('./randomdata.js');

//connect to database
let db = new sqlite3.Database('./../db_klimalogger/db_klimalogger.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    else console.log('Connected to the database: klimalogger!');
});

//perform initial query and if wanted insert random data
db.serialize(() => {

    insertRandomData.insertRandomData(db, 100, "temperature_humidity", "temperature, humidity, date_time");

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

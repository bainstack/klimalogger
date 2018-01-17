var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'basti',
    password: 'Knaller20',
    database: 'metzstrassenklima'
});

connection.connect(function (err) {
    if (!err) {
        console.log("Database successfully connected!\n");
    } else {
        console.log("Error connecting database!\n");
    }
});

function insertData(table_name) {
    let values = new Array();
    var sql = "INSERT INTO klima (temperature, humidity, reg_time, reg_date) VALUES ?";
    var i = 0;
    do {
        console.log('Array an der Stelle ' + i);
        let randomTemperature = (Math.random() * 61 - 20);
        let randomHumidity = (Math.random() * 101);
        let randomreg_time =
            ((Math.floor(Math.random() * (Math.floor(24) - Math.ceil(0))) + Math.ceil(0)) + ":" +
                (Math.floor(Math.random() * (Math.floor(61) - Math.ceil(0))) + Math.ceil(0)) + ":" +
                (Math.floor(Math.random() * (Math.floor(61) - Math.ceil(0))) + Math.ceil(0)));
        console.log(randomreg_time);
        let randomreg_date =
            ((Math.floor(Math.random() * (Math.floor(32) - Math.ceil(1))) + Math.ceil(1)) + "." +
                (Math.floor(Math.random() * (Math.floor(13) - Math.ceil(1))) + Math.ceil(1)) + "." +
                (Math.floor(Math.random() * (Math.floor(2018) - Math.ceil(1950))) + Math.ceil(1950)));
        console.log(randomreg_date);
        //console.log(values.length);
        //console.log(randomTemperature);
        values[i] = [randomTemperature, randomHumidity, randomreg_time, randomreg_date];
        i++;
    }
    while (i < 100);
    /*
    [
    
    ]
    connection.query(sql, [values], function (err) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    })
    */
};

insertData();

let table_klima = connection.query('SELECT * from klima', function (err, rows, fields) {
    if (!err)
        console.log('Successfully loaded table KLIMA with: ', rows);
    else
        console.log('Error while performing Query for table KLIMA.', err);
});

module.exports = table_klima;
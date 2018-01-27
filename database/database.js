const sqlite3 = require('sqlite3').verbose();
let insertRandomData = require('./randomdata');
let db;

exports.queryDb = (db_path, table, orderby, callback) => {
    db = new sqlite3.Database(db_path, function (err) {
        if (err) res.render('index', { title: 'Error: ' + err });
    });
    let sql = "SELECT * FROM " + table + " ORDER BY " + orderby;
    db.all(sql, (err, rows) => {
        if (err) {
            console.log(err);
        }
        else {
            callback(rows);
        };
        db.close();
    });
};

exports.insertDb = function (db_path, table, columns, datatinsert) {
    db = new sqlite3.Database(db_path, function (err) {
        console.log(err);
        //if (err) res.render('index', { title: 'Error: ' + err });
    });

    let placeholders = "(" + datatinsert.map((datatinsert) => '?').join(',') + ")";
    let sql = "INSERT INTO " + table + "(" + columns + ")" + " VALUES " + placeholders;

    db.run(sql, datatinsert, function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(datatinsert);
        console.log(`Rows inserted ${this.changes}`);
    });
    db.close();
};

//function to insert random data
exports.insertRandomDb = function (db_path, amount, table, columns) {
    db = new sqlite3.Database(db_path, function (err) {
        if (err) res.render('index', { title: 'Error: ' + err });
    });

    for (i = 0; i < 100; i++) {
        let randomData = insertRandomData.createRandomdata();
        let placeholders = "(" + randomData.map((randomData) => '?').join(',') + ")";
        let sql = "INSERT INTO " + table + "(" + columns + ")" + " VALUES " + placeholders;
        db.run(sql, randomData, function (err) {
            if (err) {
                return console.error(err.message);
            };
        });
    };

    db.close();
};

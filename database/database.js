const sqlite3 = require('sqlite3').verbose();
let insertRandomData = require('./randomdata.js');
let db;

exports.queryDb = function (db_path, table, sql) {
    db = new sqlite3.Database(db_path, function (err) {
        if (err) res.render('index', { title: 'Error: ' + err });
    });

    let rows = db.all(sql + table, function (err) {
        db.close();
    });
    return rows;
};

exports.insertDb = function (db_path, table, sql) {
    db = new sqlite3.Database(dbpath, function (err) {
        if (err) res.render('index', { title: 'Error: ' + err });
    });

    db.run(sql, datatoinsert, function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`Rows inserted ${this.changes}`);
    });
    db.close();
};

//function to insert random data
exports.insertRandomDb = function (db_path, amount, table, columns) {
    db = new sqlite3.Database(db_path, function (err) {
        if (err) res.render('index', { title: 'Error: ' + err });
    });

    for (j = 0; j < 100; j++) {
        let randomData = insertRandomData.createRandomdata();
        let placeholders = "(" + randomData.map((randomData) => '?').join(',') + ")";
        let sql = "INSERT INTO " + table + "(" + columns + ")" + " VALUES " + placeholders;
        db.run(sql, datatoinsert, function (err) {
            if (err) {
                return console.error(err.message);
            };
        });
        db.close();
    };
};

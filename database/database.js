const sqlite3 = require('sqlite3').verbose();
let insertRandomData = require('./randomdata');
let db;

exports.queryDb = (db_path, table, orderby) => {
    let data = [];
    db = new sqlite3.Database(db_path, function (err) {
        if (err) res.render('index', { title: 'Error: ' + err });
    });

    let sql = "SELECT * FROM " + table + " ORDER BY " + orderby;

    db.all(sql, (err, data) => {
        if (err) {
            throw err;
        }
        let i = 0;
        rows.forEach((row) => {
            //console.log(row);
            data[i] = row;
            i++;
        });
        //console.log(data[0]);
        db.close();
        return data;
    });
    console.log(data[0]);
    return data;
};

exports.insertDb = function (db_path, table, sql) {
    db = new sqlite3.Database(dbpath, function (err) {
        if (err) res.render('index', { title: 'Error: ' + err });
    });

    db.run(sql, datatinsert, function (err) {
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

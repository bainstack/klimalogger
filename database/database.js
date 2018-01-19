const sqlite3 = require('sqlite3').verbose();
let insertRandomData = require('./randomdata');
let db;

exports.queryDb = function (db_path, table, orderby) {
    db = new sqlite3.Database(db_path, function (err) {
        if (err) res.render('index', { title: 'Error: ' + err });
    });

    let sql = "SELECT * FROM " + table + " ORDER BY " + orderby;
    console.log(sql);
    
    let data = db.serialize(sql, (err, rows) => {
        if (err) {
            throw err;
        }

        //console.log(rows);
        //return rows;

        /*rows.forEach((row) => {
            console.log(row.timestamp + "\t" + row.temperature + "\t" + row.humidity + "\t" + row.ID);
        });*/
    });

    console.log(data);

    db.close();
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

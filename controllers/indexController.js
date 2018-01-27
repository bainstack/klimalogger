let db = require('./../database/database');

let sql = ("SELECT * FROM");
let db_path = "./../db_klimalogger/db_klimalogger.db";

exports.index_get = (req, res) => {
    let table = "temperature_humidity";
    let columns = "temperature, humidity, timestamp";
    let orderby = "timestamp";
    //db.queryDb(db_path, table, orderby);
    function db_query(data) {
        res.render('index', { title: table, data: JSON.stringify(data) });
    }
    db.queryDb(db_path, table, orderby, db_query);
};

exports.index_set = (req, res) => {
    let table = "temperature_humidity";
    let columns = "temperature, humidity";
    //console.log(db.insertRandomDb(db_path, 100, table,columns));
    //console.log(db.queryDb(db_path, table, orderby));
    console.log(db_path, table, columns, req.body.values);
    db.insertDb(db_path, table, columns, req.body.values);
};
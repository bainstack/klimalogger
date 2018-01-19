let express = require('express');
let router = express.Router();
let db = require('./../database/database');

/* GET home page. */
router.get('/', function (req, res, next) {
  let sql = ("SELECT * FROM");
  let db_path = "./../db_klimalogger/db_klimalogger.db";
  let table = "temperature_humidity";
  let columns = "temperature, humidity, timestamp";
  let orderby = "timestamp";
  //console.log(db.insertRandomDb(db_path, 100, table,columns));
  let data = db.queryDb(db_path, table, orderby);
  res.render('index', { title: 'Express', data: data });
});

module.exports = router;

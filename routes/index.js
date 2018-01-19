let express = require('express');
let router = express.Router();
let db = require('./../database/database');

/* GET home page. */
router.get('/', function (req, res, next) {
  let sql = ("SELECT * FROM");
  let db_path = "./../db_klimalogger/db_klimalogger.db";
  let table = "temperature_humidity";
  console.log(db.queryDb(db_path, table, sql));
  res.render('index', { title: 'Express' });
});

module.exports = router;

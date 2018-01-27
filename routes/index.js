let express = require('express');
let indexController = require('../controllers/indexController');
let router = express.Router();

//GET home page
router.get('/', indexController.index_get);

//SET home page
router.post('/sendData', indexController.index_set);

module.exports = router;

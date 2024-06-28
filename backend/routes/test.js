var express = require('express');
var router = express.Router();

var testController = require('../controllers/test');

router.get('/', testController.get);

module.exports = router;

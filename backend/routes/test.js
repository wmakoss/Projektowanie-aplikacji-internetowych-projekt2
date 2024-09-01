var express = require('express');
var router = express.Router();

var testController = require('../controllers/test');

router.get('/', testController.get);
router.get('/2', testController.get2);
router.get('/2a', testController.get2a);

module.exports = router;

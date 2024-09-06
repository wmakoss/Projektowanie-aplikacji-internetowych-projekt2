var express = require('express');
var router = express.Router();

var answerController = require('../controllers/answer');

router.post('/send', answerController.sendAnswer);

module.exports = router;

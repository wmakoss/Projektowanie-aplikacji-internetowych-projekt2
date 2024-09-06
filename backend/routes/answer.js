var express = require('express');
var router = express.Router();

var answerController = require('../controllers/answer');

router.post('/send', answerController.sendAnswer);
router.post('/checkScore', answerController.checkScore);

module.exports = router;

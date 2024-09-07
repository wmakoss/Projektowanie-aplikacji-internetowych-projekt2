var express = require('express');
var router = express.Router();

var answerController = require('../controllers/answer');

router.post('/send', answerController.sendAnswer);
router.post('/checkScore', answerController.checkScore);
router.post('/reviewAnswer', answerController.reviewAnswer);

module.exports = router;

var express = require('express');
var router = express.Router();

var questionController = require('../controllers/question');

router.post('/create', questionController.createQuestion);

router.post('/getQuestionsByQuizPublicID', questionController.getQuestionsByQuizPublicID);

module.exports = router;

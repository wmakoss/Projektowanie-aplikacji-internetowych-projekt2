var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz');

router.post('/create', quizController.createQuiz);
router.post('/getNameByQuizPublicID', quizController.getNameByQuizPublicID);
router.post('/getAnswersByQuizPrivateID', quizController.getAnswersByQuizPrivateID);

module.exports = router;

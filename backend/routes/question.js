var express = require('express');
var router = express.Router();

var questionController = require('../controllers/question');

router.post('/create', questionController.createQuestion);

router.get('/getQuestionsBypublicID', questionController.getQuestionsBypublicID);

module.exports = router;

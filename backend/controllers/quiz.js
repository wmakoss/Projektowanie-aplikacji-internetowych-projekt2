
var quizService = require('../services/quiz');

async function createQuiz(req, res, next) {

    if (req.body["name"] == undefined || req.body["name"].length <= 0) {
        res.status(400).send('ERROR: Body json require with name longer than 0 character!');
        return;
    }

    var quizIDs = await quizService.createQuiz(req.body["name"]);

    res.json(quizIDs);
}

module.exports = {
    createQuiz
};

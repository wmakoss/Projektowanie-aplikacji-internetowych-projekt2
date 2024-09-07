
var quizService = require('../services/quiz');
var answerService = require('../services/answer');

async function createQuiz(req, res, next) {

    if (req.body["name"] == undefined || req.body["name"].length <= 0) {
        res.status(400).send('ERROR: Body json require with name longer than 0 character!');
        return;
    }

    var quizIDs = await quizService.createQuiz(req.body["name"]);

    res.json(quizIDs);
}

async function getNameByQuizPublicID(req, res, next) {

    if (req.body["quizPublicID"] == undefined || req.body["quizPublicID"].length <= 0) {
        res.status(400).send('ERROR: Body json require with quizPublicID longer than 0 character!');
        return;
    }

    var quizName = await quizService.getNameByQuizPublicID(req.body["quizPublicID"]);

    if (quizName == undefined) {
        res.status(400).send('ERROR: Wrong quizPublicID!');
        return;
    }

    res.json({"quizName": quizName});
}

async function getAnswersByQuizPrivateID(req, res, next) {

    if (req.body["quizPrivateID"] == undefined || req.body["quizPrivateID"].length <= 0) {
        res.status(400).send('ERROR: Body json require with quizPrivateID longer than 0 character!');
        return;
    }

    var response = await answerService.getAnswersByQuizPrivateID(req.body["quizPrivateID"]);

    if (response == undefined) {
        res.status(400).send('ERROR: Wrong quizPrivateID!');
        return;
    }

    res.json(response);
}

module.exports = {
    createQuiz,
    getNameByQuizPublicID,
    getAnswersByQuizPrivateID
};

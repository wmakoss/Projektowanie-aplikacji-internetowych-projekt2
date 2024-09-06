
var quizService = require('../services/quiz');

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

module.exports = {
    createQuiz,
    getNameByQuizPublicID
};

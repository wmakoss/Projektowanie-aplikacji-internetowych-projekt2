
var questionService = require('../services/question');

async function createQuestion(req, res, next) {

    if (req.body["quizPrivateID"] == undefined || req.body["quizPrivateID"].length <= 0) {
        res.status(400).send('ERROR: Body json require with quizPrivateID longer than 0 character!');
        return;
    }

    if (req.body["question"] == undefined || req.body["question"].length <= 0) {
        res.status(400).send('ERROR: Body json require with question longer than 0 character!');
        return;
    }

    if (req.body["answer1"] == undefined || req.body["answer1"].length <= 0) {
        res.status(400).send('ERROR: Body json require with answer1 longer than 0 character!');
        return;
    }

    if (req.body["answer2"] == undefined || req.body["answer2"].length <= 0) {
        res.status(400).send('ERROR: Body json require with answer2 longer than 0 character!');
        return;
    }

    if (req.body["answer3"] == undefined) {
        res.status(400).send('ERROR: Body json require with answer3!');
        return;
    }

    if (req.body["answer4"] == undefined) {
        res.status(400).send('ERROR: Body json require with answer4!');
        return;
    }

    if (req.body["correct"] == undefined || req.body["correct"] < 1 || req.body["correct"] > 4) {
        res.status(400).send('ERROR: Body json require with correct number from 1 to 4!');
        return;
    }

    if (req.body["answer4"] == "" && req.body["correct"] > 3) {
        res.status(400).send('ERROR: Body json require with correct number from 1 to 3 (when answer4 is empty)!');
        return;
    }

    if (req.body["answer3"] == "" && req.body["correct"] > 2) {
        res.status(400).send('ERROR: Body json require with correct number from 1 to 2 (when answer3 is empty)!');
        return;
    }

    var questionID = await questionService.createQuestion(req.body["quizPrivateID"], req.body["question"], req.body["answer1"], req.body["answer2"], req.body["answer3"], req.body["answer4"], req.body["correct"]);

    if (questionID == null) {
        res.status(400).send('ERROR: Wrong quizPrivateID!');
        return;
    }

    res.json(questionID);
}

async function getQuestionsBypublicID(req, res, next) {

    if (req.body["quizPublicID"] == undefined || req.body["quizPublicID"].length <= 0) {
        res.status(400).send('ERROR: Body json require with quizPublicID longer than 0 character!');
    }

    var response = await questionService.getQuestionsBypublicID(req.body["quizPublicID"]);

    if (response == null) {
        res.status(400).send('ERROR: Wrong quizPublicID!');
        return;
    }

    res.json(response);
}

module.exports = {
    createQuestion,
    getQuestionsBypublicID
};

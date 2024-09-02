
var questionService = require('../services/question');

async function createQuestion(req, res, next) {

    if (req.body["quizPrivateID"] == undefined || req.body["quizPrivateID"].length <= 0) {
        res.status(400).send('ERROR: Body json require with quizPrivateID longer than 0 character!');
    }

    if (req.body["question"] == undefined || req.body["question"].length <= 0) {
        res.status(400).send('ERROR: Body json require with question longer than 0 character!');
    }

    if (req.body["answer1"] == undefined || req.body["answer1"].length <= 0) {
        res.status(400).send('ERROR: Body json require with answer1 longer than 0 character!');
    }

    if (req.body["answer2"] == undefined || req.body["answer2"].length <= 0) {
        res.status(400).send('ERROR: Body json require with answer2 longer than 0 character!');
    }

    if (req.body["answer3"] == undefined || req.body["answer3"].length <= 0) {
        res.status(400).send('ERROR: Body json require with answer3 longer than 0 character!');
    }

    if (req.body["answer4"] == undefined || req.body["answer4"].length <= 0) {
        res.status(400).send('ERROR: Body json require with answer4 longer than 0 character!');
    }

    if (req.body["correct"] == undefined || req.body["correct"].length <= 0) {
        res.status(400).send('ERROR: Body json require with correct longer than 0 character!');
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

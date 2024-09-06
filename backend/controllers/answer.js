
var answerService = require('../services/answer');

async function sendAnswer(req, res, next) {

    if (req.body["userName"] == undefined || req.body["userName"].length <= 0) {
        res.status(400).send('ERROR: Body json require with userName longer than 0 character!');
        return;
    }

    if (req.body["quizPublicID"] == undefined || req.body["quizPublicID"].length <= 0) {
        res.status(400).send('ERROR: Body json require with quizPublicID longer than 0 character!');
        return;
    }

    if (req.body["answers"] == undefined || req.body["answers"].length <= 0) {
        res.status(400).send('ERROR: Body json require with answers longer than 0 answer!');
        return;
    }

    var response = await answerService.saveAnswer(req.body["userName"], req.body["quizPublicID"], req.body["answers"]);

    if (response == null) {
        res.status(400).send('ERROR: Wrong quizPublicID!');
        return;
    }

    res.json(response);
}

module.exports = {
    sendAnswer
};

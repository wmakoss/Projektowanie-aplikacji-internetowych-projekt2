
var answerModel = require('../models/answer');
var answerItemModel = require('../models/answerItem');
var questionModel = require('../models/question');
var quizService = require('../services/quiz');

async function saveAnswer(userName, quizPublicID, answers) {

    if (await quizService.getNameByQuizPublicID(quizPublicID) == undefined) {
        return;
    }

    var answerIDs = await answerModel.create(quizPublicID, userName);

    var answeredQuestions = [];

    for(let answer of answers) {
        if (answer["questionPublicID"] == undefined || answer["answer"] == undefined) {
            continue;
        }

        if (quizPublicID != await questionModel.getQuizPublicIDByQuestionPublicID(answer["questionPublicID"])) {
            continue;
        }

        if (answer["answer"] < 1 || answer["answer"] > 4 ) {
            continue;
        }

        if (answeredQuestions.includes(answer["questionPublicID"])) {
            continue;
        }

        answeredQuestions.push(answer["questionPublicID"]);

        await answerItemModel.create(answerIDs["answerPublicID"], answer["questionPublicID"], answer["answer"]);
    }

    return answerIDs;
}

module.exports = {
    saveAnswer
};


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

async function checkScore(answerPrivateID) {

    var answer = await answerModel.getByAnswerPrivateID(answerPrivateID);
    
    if (answer == undefined) {
        return;
    }
    console.log("DEBUG: " + answer);
    
    var answerItems = await answerItemModel.getByAnswerPublicID(answer["answerPublicID"]);

    var score = 0;

    for(let answerItem of answerItems) {

        var correct = await questionModel.getCorrectByQuestionPublicID(answerItem["questionPublicID"]);
        
        console.log("DEBUG: " + answerItem["answer"] + " " + correct);

        if (answerItem["answer"] == correct) {
            score++;
        }
    }

    return score;
}

module.exports = {
    saveAnswer,
    checkScore
};

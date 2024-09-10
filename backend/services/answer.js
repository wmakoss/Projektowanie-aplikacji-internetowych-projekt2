
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
    
    var answerItems = await answerItemModel.getByAnswerPublicID(answer["answerPublicID"]);

    var score = 0;

    for(let answerItem of answerItems) {

        var correct = await questionModel.getCorrectByQuestionPublicID(answerItem["questionPublicID"]);

        if (answerItem["answer"] == correct) {
            score++;
        }
    }

    return score;
}

async function reviewAnswer(answerPrivateID) {

    var answer = await answerModel.getByAnswerPrivateID(answerPrivateID);
    
    if (answer == undefined) {
        return;
    }
    
    var answerItems = await answerItemModel.getByAnswerPublicID(answer["answerPublicID"]);

    var score = 0;

    var answers = [];

    for(let answerItem of answerItems) {

        var question = await questionModel.getByQuestionPublicID(answerItem["questionPublicID"]);
        var questionScore = 0;
        if (answerItem["answer"] == question["correct"]) {
            score++;
            questionScore = 1;
        }

        answers.push({
            "question": question["question"],
            "answer1": question["answer1"],
            "answer2": question["answer2"],
            "answer3": question["answer3"],
            "answer4": question["answer4"],
            "userAnswer": answerItem["answer"],
            "correct": question["correct"],
            "score": questionScore
        });
    }

    return {
        "quizPublicID": answer["quizPublicID"],
        "userName": answer["userName"],
        "score": score,
        "answers": answers
    };
}

async function getAnswersByQuizPrivateID(quizPrivateID) {

    var quizPublicID = await quizService.getQuizPublicIDByquizPrivateID(quizPrivateID);

    if (quizPublicID == undefined) {
        return;
    }

    var answers = await answerModel.getByQuizPublicID(quizPublicID);

    var response = [];

    var score;
    var quizName;
    var numberOfQuestions;

    if (answers == undefined || answers.length == 0) {
        return response;
    }

    for(let answer of answers) {
        quizName = await quizService.getNameByQuizPublicID(answer["quizPublicID"]);
        score = await checkScore(answer["answerPrivateID"]);
        numberOfQuestions = await quizService.getNumberOfQuestionsByquizPublicID(answer["quizPublicID"]);
        response.push({
            "quizName": quizName,
            "score": score,
            "numberOfQuestions": numberOfQuestions,
            "answerPrivateID": answer["answerPrivateID"],
            "quizPublicID": answer["quizPublicID"],
            "userName": answer["userName"]
        });
    }

    return response;


}

module.exports = {
    saveAnswer,
    checkScore,
    reviewAnswer,
    getAnswersByQuizPrivateID
};

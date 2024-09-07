
var quizModel = require('../models/quiz');
var questionModel = require('../models/question');

async function createQuiz(name) {
    return await quizModel.create(name);
}

async function getNameByQuizPublicID(quizPublicID) {
    var quiz = await quizModel.getByQuizPublicID(quizPublicID);
    if (quiz == undefined || quiz["name"] == undefined) {
        return;
    }
    return quiz["name"];
}

async function getQuizPublicIDByquizPrivateID(quizPrivateID) {
    var quiz = await quizModel.getByQuizPrivateID(quizPrivateID);
    if (quiz == undefined || quiz["quizPublicID"] == undefined) {
        return;
    }
    return quiz["quizPublicID"];
}

async function getNumberOfQuestionsByquizPublicID(quizPublicID) {
    var quiz = await quizModel.getByQuizPublicID(quizPublicID);
    if (quiz == undefined || quiz["quizPublicID"] == undefined) {
        return;
    }

    var questions = await questionModel.getByQuizPublicID(quizPublicID);

    var numberOfQuestions = questions.length;

    return numberOfQuestions;
}

module.exports = {
    createQuiz,
    getNameByQuizPublicID,
    getQuizPublicIDByquizPrivateID,
    getNumberOfQuestionsByquizPublicID
};

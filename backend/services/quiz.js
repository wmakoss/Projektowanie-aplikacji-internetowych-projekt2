
var quizModel = require('../models/quiz');

async function createQuiz(name) {
    return await quizModel.create(name);
}

async function getNameByQuizPublicID(quizPublicID) {
    quiz = await quizModel.getByQuizPublicID(quizPublicID);
    if (quiz == undefined || quiz["name"] == undefined) {
        return;
    }
    return await quiz["name"];
}

module.exports = {
    createQuiz,
    getNameByQuizPublicID
};

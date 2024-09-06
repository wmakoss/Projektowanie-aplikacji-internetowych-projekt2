
var quizModel = require('../models/quiz');
var questionModel = require('../models/question');

async function createQuestion(quizPrivateID, question, answer1, answer2, answer3, answer4, correct) {

    var quiz = await quizModel.getByQuizPrivateID(quizPrivateID);

    if (quiz["quizPublicID"] == undefined) {
        return;
    }

    return await questionModel.create(quiz["quizPublicID"], question, answer1, answer2, answer3, answer4, correct);
}

async function getQuestionsByQuizPublicID(quizPublicID) {

    var questionsDB = await questionModel.getByQuizPublicID(quizPublicID);

    questions = [];

    for(let question of questionsDB) {
        questions.push({
            "questionPublicID": question["dataValues"]["questionPublicID"],
            "question": question["dataValues"]["question"],
            "answer1": question["dataValues"]["answer1"],
            "answer2": question["dataValues"]["answer2"],
            "answer3": question["dataValues"]["answer3"],
            "answer4": question["dataValues"]["answer4"]
        });
    }

    return questions;
}

module.exports = {
    createQuestion,
    getQuestionsByQuizPublicID
};
